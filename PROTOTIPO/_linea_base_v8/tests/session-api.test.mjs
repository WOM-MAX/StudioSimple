import test from "node:test";
import assert from "node:assert/strict";
import { sessionApi } from "../worker/session-api.ts";

class MemoryD1 {
  sessions = new Map();
  prepare(query) {
    return {
      bind: (...values) => ({
        run: async () => {
          if (!query.startsWith("INSERT")) throw new Error("unexpected run");
          const [code, state] = values;
          if (this.sessions.has(code)) throw new Error("UNIQUE constraint failed");
          this.sessions.set(code, { state, revision: 0 });
          return {};
        },
        first: async () => {
          if (query.startsWith("SELECT")) return this.sessions.get(values[0]) ?? null;
          if (query.startsWith("UPDATE")) {
            const [state, code] = values;
            const current = this.sessions.get(code);
            if (!current) return null;
            const next = { state, revision: current.revision + 1 };
            this.sessions.set(code, next);
            return { revision: next.revision };
          }
          throw new Error("unexpected first");
        },
      }),
    };
  }
}

async function send(db, path, method = "GET", state) {
  const response = await sessionApi(new Request(`https://example.test${path}`, {
    method,
    headers: state ? { "content-type": "application/json" } : undefined,
    body: state ? JSON.stringify({ state }) : undefined,
  }), db);
  return { response, body: await response.json() };
}

test("two devices share one isolated class session and recover the latest state", async () => {
  const db = new MemoryD1();
  const created = await send(db, "/api/sessions", "POST", { stage: "cover", video: { playing: false } });
  assert.equal(created.response.status, 201);
  assert.match(created.body.code, /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);

  const code = created.body.code;
  const joined = await send(db, `/api/sessions/${code}`);
  assert.deepEqual(joined.body.state, { stage: "cover", video: { playing: false } });

  const advanced = await send(db, `/api/sessions/${code}`, "PUT", { stage: "miniquiz", video: { playing: true }, miniAnswers: ["−7", "", ""] });
  assert.equal(advanced.body.revision, 1);

  const reconnected = await send(db, `/api/sessions/${code}`);
  assert.equal(reconnected.body.revision, 1);
  assert.equal(reconnected.body.state.stage, "miniquiz");
  assert.equal(reconnected.body.state.video.playing, true);
  assert.deepEqual(reconnected.body.state.miniAnswers, ["−7", "", ""]);

  const other = await send(db, "/api/sessions", "POST", { stage: "cover" });
  assert.notEqual(other.body.code, code);
  await send(db, `/api/sessions/${other.body.code}`, "PUT", { stage: "closing" });
  const original = await send(db, `/api/sessions/${code}`);
  assert.equal(original.body.state.stage, "miniquiz");

  const missing = await send(db, "/api/sessions/AAAAAA");
  assert.equal(missing.response.status, 404);
});
