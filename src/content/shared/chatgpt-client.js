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
    this.context = null;
  }
  currentContext() {
    const cookies = this.cookie().split(";").map(part => part.trim());
    const value = name => cookies.find(part => part.startsWith(name + "="))?.slice(name.length + 1) || "";
    const selected = value("_account");
    const workspace = selected === "personal" ? "" : selected;
    const epoch = value("oai-client-session-epoch");
    if (this.context?.workspace !== workspace || this.context.epoch !== epoch) {
      this.context = { workspace, epoch, session: null, sessionFlight: null, accountId: null };
    }
    return this.context;
  }
  assertCurrent(context) {
    if (this.currentContext() !== context)
      throw new BackendError(409, "ChatGPT workspace changed during the request");
  }
  async token(context) {
    if (context.session && context.session.expires > Date.now() + 60000)
      return context.session.token;
    if (!context.sessionFlight) {
      const controller = new AbortController();
      const timer = setTimeout(
        () =>
          controller.abort(
            new DOMException("Session request timed out", "TimeoutError"),
          ),
        this.timeout,
      );
      context.sessionFlight = this.fetcher(`${this.origin}/api/auth/session`, {
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
          context.session = {
            token: session.accessToken,
            accountId: session.account?.id,
            expires: Date.parse(session.expires) || Date.now() + 3600000,
          };
          return session.accessToken;
        })
        .finally(() => {
          clearTimeout(timer);
          context.sessionFlight = null;
        });
    }
    return context.sessionFlight;
  }
  async accountId(context, signal) {
    const { workspace } = context;
    if (!workspace) return null;
    if (context.session?.accountId === workspace) return workspace;
    if (context.accountId) return context.accountId;
    const data = await this.json(
      "/accounts/check/v4-2023-04-27",
      { signal },
      false,
    );
    const accounts = data?.accounts ?? {};
    const id = Object.values(accounts).some(entry => entry?.account?.account_id === workspace)
      ? workspace
      : accounts[workspace]?.account?.account_id;
    if (!id)
      throw new BackendError(
        409,
        "The selected ChatGPT workspace could not be resolved",
      );
    context.accountId = id;
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
    const context = this.currentContext();
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
          token = await waitWithSignal(this.token(context), controller.signal);
        } catch (error) {
          if (controller.signal.aborted)
            throw controller.signal
              .reason; /* Cookie auth remains valid in some workspaces. */
        }
        controller.signal.throwIfAborted();
        this.assertCurrent(context);
        const account = includeAccount
          ? await this.accountId(context, controller.signal)
          : null;
        controller.signal.throwIfAborted();
        this.assertCurrent(context);
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
        this.assertCurrent(context);
        if (response.status !== 401 || attempt === 1) {
          const result = await waitWithSignal(
            Promise.resolve().then(() => read(response)),
            controller.signal,
          );
          this.assertCurrent(context);
          return result;
        }
        if (context.session?.token === token) context.session = null;
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
