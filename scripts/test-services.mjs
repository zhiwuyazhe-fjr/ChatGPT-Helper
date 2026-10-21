import assert from "node:assert/strict";
import { ChatGPTClient } from "../src/content/shared/chatgpt-client.js";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const origin = "https://chatgpt.com";
const response = (value, status = 200, headers = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: new Headers(headers),
  json: async () => value,
});
const tests = [];
const test = async (name, fn) => {
  try {
    await fn();
    tests.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    tests.push({ name, passed: false });
    console.error(`FAIL ${name}: ${error.stack}`);
  }
};
await test("shared client coalesces simultaneous session requests", async () => {
  let sessions = 0;
  const calls = [];
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    fetcher: async (url, options) => {
      if (url.endsWith("/api/auth/session")) {
        sessions++;
        await new Promise((resolve) => setTimeout(resolve, 10));
        return response({ accessToken: "test" });
      }
      calls.push(options);
      return response({ ok: true });
    },
  });
  await Promise.all([
    client.json("/conversations"),
    client.json("/conversation/one"),
  ]);
  assert.equal(sessions, 1);
  assert.equal(calls.length, 2);
  assert.ok(
    calls.every((call) => call.headers.Authorization === "Bearer test"),
  );
});
await test("aborting while session auth is pending immediately releases the caller", async () => {
  let resolveSession;
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    fetcher: () => new Promise((resolve) => (resolveSession = resolve)),
  });
  const controller = new AbortController();
  const result = client.json("/conversations", { signal: controller.signal });
  controller.abort();
  await assert.rejects(result, (error) => error.name === "AbortError");
  resolveSession(response({ accessToken: "test" }));
});
await test("request deadline covers stalled response bodies", async () => {
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    timeout: 25,
    fetcher: async (url) =>
      url.endsWith("/session")
        ? response({ accessToken: "test" })
        : { ...response({}), json: () => new Promise(() => {}) },
  });
  await assert.rejects(
    client.json("/conversations"),
    (error) => error.name === "TimeoutError",
  );
});
await test("401 retries exactly once and never loops on an expired account", async () => {
  let requests = 0,
    sessions = 0;
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    fetcher: async (url) =>
      url.endsWith("/session")
        ? (sessions++, response({ accessToken: "test-" + sessions }))
        : (requests++, response({}, 401)),
  });
  await assert.rejects(
    client.json("/conversations"),
    (error) => error.status === 401,
  );
  assert.equal(requests, 2);
  assert.equal(sessions, 2);
});
await test("cookie authentication remains usable when the session endpoint is unavailable", async () => {
  let auth;
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    fetcher: async (url, options) =>
      url.endsWith("/session")
        ? response({}, 403)
        : ((auth = options.headers.Authorization), response({ ok: true })),
  });
  assert.deepEqual(await client.json("/conversations"), { ok: true });
  assert.equal(auth, undefined);
});
await test("workspace changes invalidate in-flight responses instead of exporting another account", async () => {
  let cookie = "";
  let complete;
  const client = new ChatGPTClient({
    origin,
    cookie: () => cookie,
    fetcher: async (url) =>
      url.endsWith("/session")
        ? response({ accessToken: "test" })
        : new Promise((resolve) => (complete = resolve)),
  });
  const result = client.json("/conversations");
  while (!complete) await new Promise((resolve) => setTimeout(resolve, 1));
  cookie = "_account=new-workspace";
  complete(response({ items: [] }));
  await assert.rejects(result, (error) => error.status === 409);
});
await test("workspace cookie parsing tolerates spaces and sends the resolved account header", async () => {
  let header;
  const client = new ChatGPTClient({
    origin,
    cookie: () => "foo=bar;   _account=workspace-one; x=y",
    fetcher: async (url, options) => {
      if (url.endsWith("/session")) return response({ accessToken: "test" });
      if (url.includes("/accounts/check/"))
        return response({
          accounts: {
            "workspace-one": { account: { account_id: "account-one" } },
          },
        });
      header = options.headers["Chatgpt-Account-Id"];
      return response({ items: [] });
    },
  });
  await client.json("/conversations");
  assert.equal(header, "account-one");
});
await test("workspace lookup failure does not silently export the personal account", async () => {
  let dataCalls = 0;
  const client = new ChatGPTClient({
    origin,
    cookie: () => "_account=missing",
    fetcher: async (url) =>
      url.endsWith("/session")
        ? response({ accessToken: "test" })
        : url.includes("/accounts/check/")
          ? response({ accounts: {} })
          : (dataCalls++, response({})),
  });
  await assert.rejects(
    client.json("/conversations"),
    (error) => error.status === 409,
  );
  assert.equal(dataCalls, 0);
});
await test("backend traversal is rejected before credentials are requested", async () => {
  let calls = 0;
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    fetcher: async () => {
      calls++;
      return response({});
    },
  });
  await assert.rejects(client.json("/../api/auth/session"), TypeError);
  assert.equal(calls, 0);
});
await test("rate limit retry values include HTTP dates", async () => {
  const client = new ChatGPTClient({
    origin,
    cookie: () => "",
    fetcher: async (url) =>
      url.endsWith("/session")
        ? response({ accessToken: "test" })
        : response({}, 429, {
            "Retry-After": new Date(Date.now() + 60000).toUTCString(),
          }),
  });
  await assert.rejects(
    client.json("/conversations"),
    (error) =>
      error.status === 429 &&
      error.retryAfterMs > 50000 &&
      error.retryAfterMs <= 60000,
  );
});
const modelSource = await readFile(
  new URL("../src/content/exporter/model/conversation.ts", import.meta.url),
  "utf8",
);
const model = await import(
  "data:text/javascript;base64," +
    Buffer.from(
      ts.transpileModule(modelSource, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
      }).outputText,
    ).toString("base64")
);
const raw = () => ({
  id: "test",
  title: "Test",
  current_node: "a2",
  mapping: {
    root: { id: "root", parent: null, children: ["a1"], message: null },
    a1: {
      id: "a1",
      parent: "root",
      children: ["a2"],
      message: {
        author: { role: "assistant" },
        recipient: "all",
        content: { content_type: "text", parts: ["one"] },
      },
    },
    a2: {
      id: "a2",
      parent: "a1",
      children: [],
      message: {
        author: { role: "assistant" },
        recipient: "all",
        content: { content_type: "text", parts: ["two"] },
      },
    },
  },
});
await test("conversation normalization is deterministic and does not mutate imported data", () => {
  const input = raw();
  const before = JSON.stringify(input);
  assert.deepEqual(
    model.processConversation(input),
    model.processConversation(input),
  );
  assert.equal(JSON.stringify(input), before);
});
await test("cyclic ancestry fails before rendering or attaching reasoning", () => {
  const input = raw();
  input.mapping.a1.parent = "a2";
  assert.throws(
    () => model.processConversation(input, { enableThinking: true }),
    /cyclic/,
  );
});
await test("older messages without recipient fields are retained", () => {
  const input = raw();
  delete input.mapping.a1.message.recipient;
  assert.equal(model.processConversation(input).conversationNodes.length, 2);
});
await test("empty continuation parts never generate undefined text", () => {
  const input = raw();
  input.mapping.a1.message.content.parts = [];
  const result = model.processConversation(input);
  assert.ok(!JSON.stringify(result).includes("undefined"));
});
await test("large parent chains preserve chronology without recursive traversal", () => {
  const input = raw();
  input.mapping = {
    root: { id: "root", parent: null, children: [], message: null },
  };
  for (let i = 0; i < 5000; i++)
    input.mapping["m" + i] = {
      id: "m" + i,
      parent: i ? "m" + (i - 1) : "root",
      children: [],
      message: {
        author: { role: i % 2 ? "assistant" : "user" },
        recipient: "all",
        content: { content_type: "text", parts: [String(i)] },
      },
    };
  input.current_node = "m4999";
  const result = model.processConversation(input);
  assert.equal(result.conversationNodes.length, 5000);
  assert.equal(result.conversationNodes[0].id, "m0");
  assert.equal(result.conversationNodes.at(-1).id, "m4999");
});
if (tests.some((test) => !test.passed)) process.exitCode = 1;
