export interface SessionDatabase {
  prepare(query: string): {
    bind(...values: unknown[]): {
      run(): Promise<unknown>;
      first<T>(): Promise<T | null>;
    };
  };
}

const sessionAlphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function sessionCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (value) => sessionAlphabet[value % sessionAlphabet.length]).join("");
}

function normalizeSessionCode(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

function json(payload: unknown, status = 200) {
  return Response.json(payload, { status, headers: { "cache-control": "no-store" } });
}

export async function sessionApi(request: Request, db: SessionDatabase, url = new URL(request.url)): Promise<Response | null> {
  if (url.pathname === "/api/sessions" && request.method === "POST") {
    try {
      const payload = (await request.json()) as { state?: unknown };
      if (!payload.state || typeof payload.state !== "object") return json({ error: "El estado inicial es obligatorio." }, 400);
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const code = sessionCode();
        try {
          await db.prepare("INSERT INTO class_sessions (code, state) VALUES (?, ?)").bind(code, JSON.stringify(payload.state)).run();
          return json({ code, state: payload.state, revision: 0 }, 201);
        } catch (error) {
          const message = error instanceof Error ? error.message.toLowerCase() : "";
          if (!message.includes("unique")) throw error;
        }
      }
      return json({ error: "No fue posible crear la sesión." }, 503);
    } catch {
      return json({ error: "No fue posible crear la sesión." }, 500);
    }
  }

  const match = url.pathname.match(/^\/api\/sessions\/([A-Za-z0-9]{1,12})$/);
  if (!match) return null;
  const code = normalizeSessionCode(match[1]);

  if (request.method === "GET") {
    try {
      const row = await db.prepare("SELECT state, revision FROM class_sessions WHERE code = ?").bind(code).first<{ state: string; revision: number }>();
      if (!row) return json({ error: "Sesión no encontrada." }, 404);
      return json({ code, state: JSON.parse(row.state), revision: row.revision });
    } catch {
      return json({ error: "No fue posible recuperar la sesión." }, 500);
    }
  }

  if (request.method === "PUT") {
    try {
      const payload = (await request.json()) as { state?: unknown };
      if (!payload.state || typeof payload.state !== "object") return json({ error: "El estado de la clase es obligatorio." }, 400);
      const row = await db.prepare("UPDATE class_sessions SET state = ?, revision = revision + 1, updated_at = CURRENT_TIMESTAMP WHERE code = ? RETURNING revision").bind(JSON.stringify(payload.state), code).first<{ revision: number }>();
      if (!row) return json({ error: "Sesión no encontrada." }, 404);
      return json({ code, revision: row.revision });
    } catch {
      return json({ error: "No fue posible actualizar la sesión." }, 500);
    }
  }

  return json({ error: "Método no permitido." }, 405);
}
