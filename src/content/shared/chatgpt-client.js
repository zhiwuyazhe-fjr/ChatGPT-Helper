function waitWithSignal(promise, signal) {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () =>
      reject(signal.reason || new DOMException("Cancelled", "AbortError"));
    signal.addEventListener("abort", abort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", abort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", abort);
        reject(error);
      },
    );
  });
}

// One authenticated transport for all features. No DOM discovery or UI state lives here.
export class BackendError extends Error {
  constructor(status, message, retryAfterMs = 0) {
    super(message);
    this.name = "BackendError";
    this.status = status;
    this.retryAfterMs = retryAfterMs;
  }
}
export class ChatGPTClient {
  constructor({
    origin = location.origin,
    fetcher = (...args) => fetch(...args),
    cookie = () => document.cookie,
    timeout = 30000,
  } = {}) {
    this.origin = origin;
    this.fetcher = fetcher;
    this.cookie = cookie;
    this.timeout = timeout;
    this.session = null;
    this.sessionFlight = null;
    this.account = null;
  }
  workspace() {
    return (
      this.cookie()
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith("_account="))
        ?.slice(9) || ""
    );
  }
  async token() {
    if (this.session && this.session.expires > Date.now() + 60000)
      return this.session.token;
    if (!this.sessionFlight) {
      const controller = new AbortController();
      const timer = setTimeout(
        () =>
          controller.abort(
            new DOMException("Session request timed out", "TimeoutError"),
          ),
        this.timeout,
      );
      const pending = this.fetcher(`${this.origin}/api/auth/session`, {
        credentials: "include",
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok)
            throw new BackendError(
              response.status,
              `Session request failed (${response.status})`,
            );
          const session = await waitWithSignal(
            response.json(),
            controller.signal,
          );
          if (typeof session.accessToken !== "string" || !session.accessToken)
            throw new BackendError(401, "ChatGPT session is unavailable");
          this.session = {
            token: session.accessToken,
            expires: Date.parse(session.expires) || Date.now() + 3600000,
          };
          return session.accessToken;
        })
        .finally(() => {
          clearTimeout(timer);
          if (this.sessionFlight === pending) this.sessionFlight = null;
        });
      this.sessionFlight = pending;
    }
    return this.sessionFlight;
  }
  async accountId(workspace, signal) {
    if (!workspace) return null;
    if (this.account?.workspace === workspace) return this.account.id;
    const data = await this.json(
      "/accounts/check/v4-2023-04-27",
      { signal },
      false,
    );
    const id = data?.accounts?.[workspace]?.account?.account_id;
    if (!id)
      throw new BackendError(
        409,
        "ChatGPT workspace changed; refresh before exporting",
      );
    this.account = { workspace, id };
    return id;
  }
  async request(
    path,
    options = {},
    includeAccount = true,
    read = (response) => response,
  ) {
    const url = new URL(
      path.startsWith("/backend-api/") ? path : `/backend-api${path}`,
      this.origin,
    );
    if (url.origin !== this.origin || !url.pathname.startsWith("/backend-api/"))
      throw new TypeError("Invalid backend path");
    const workspace = this.workspace();
    const controller = new AbortController();
    const abort = () => controller.abort(options.signal?.reason);
    if (options.signal?.aborted) abort();
    else options.signal?.addEventListener("abort", abort, { once: true });
    const timeout = setTimeout(
      () =>
        controller.abort(new DOMException("Request timed out", "TimeoutError")),
      this.timeout,
    );
    try {
      for (let attempt = 0; attempt < 2; attempt++) {
        controller.signal.throwIfAborted();
        let token;
        try {
          token = await waitWithSignal(this.token(), controller.signal);
        } catch (error) {
          if (controller.signal.aborted)
            throw controller.signal
              .reason; /* Cookie auth remains valid in some workspaces. */
        }
        controller.signal.throwIfAborted();
        const account = includeAccount
          ? await this.accountId(workspace, controller.signal)
          : null;
        controller.signal.throwIfAborted();
        if (workspace !== this.workspace())
          throw new BackendError(
            409,
            "ChatGPT workspace changed during the request",
          );
        const headers = {
          ...options.headers,
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
                "X-Authorization": `Bearer ${token}`,
              }
            : {}),
          ...(account ? { "Chatgpt-Account-Id": account } : {}),
        };
        const response = await this.fetcher(url.href, {
          ...options,
          credentials: "include",
          headers,
          signal: controller.signal,
        });
        if (workspace !== this.workspace())
          throw new BackendError(
            409,
            "ChatGPT workspace changed during the request",
          );
        if (response.status !== 401 || attempt === 1)
          return await waitWithSignal(
            Promise.resolve().then(() => read(response)),
            controller.signal,
          );
        this.session = null;
      }
    } finally {
      clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
    }
  }
  async json(path, options = {}, includeAccount = true) {
    return this.request(path, options, includeAccount, async (response) => {
      if (!response.ok) {
        const value = response.headers?.get("Retry-After");
        const seconds = value == null ? NaN : Number(value);
        const retryAfterMs = Number.isFinite(seconds)
          ? Math.max(0, seconds * 1000)
          : Math.max(0, Date.parse(value) - Date.now()) || 30000;
        throw new BackendError(
          response.status,
          `ChatGPT request failed (${response.status})`,
          response.status === 429 ? retryAfterMs : 0,
        );
      }
      return response.json();
    });
  }
}
