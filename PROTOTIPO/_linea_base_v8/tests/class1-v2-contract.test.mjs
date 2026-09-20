import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const source = await readFile(`${root}/app/page.tsx`, "utf8");
const worker = await readFile(`${root}/worker/index.ts`, "utf8");
const sessionApiSource = await readFile(`${root}/worker/session-api.ts`, "utf8");
const hosting = JSON.parse(await readFile(`${root}/.openai/hosting.json`, "utf8"));

test("keeps Class 1 free of games and scopes the curricular sequence", () => {
  assert.doesNotMatch(source, /juego/i);
  assert.match(source, /termómetro/i);
  assert.match(source, /submarino/i);
  assert.match(source, /posición y movimiento/i);
  assert.match(source, /Miniquiz/i);
});

test("contains both synchronized videos and adult playback controls", () => {
  assert.match(source, /gancho-submarino\.mp4/);
  assert.match(source, /formalizacion-enteros-v2\.mp4/);
  assert.match(source, /retroceder diez segundos/i);
  assert.match(source, /Reiniciar/);
  assert.match(source, /BroadcastChannel/);
});

test("includes controllable underwater ambience and pauses it during narrated videos", async () => {
  const ambience = await readFile(`${root}/public/media/ambiente-submarino.mp3`);
  assert.ok(ambience.length > 1000);
  assert.match(source, /ambiente-submarino\.mp3/);
  assert.match(source, /player\.volume=\.12/);
  assert.match(source, /player\.pause\(\)/);
  assert.match(source, /Activar sonido/);
  assert.match(source, /!session\.hookStarted\|\|session\.hookEnded/);
  assert.match(source, /!session\.formalStarted\|\|session\.formalEnded/);
});

test("keeps the movement questions after formal teaching", () => {
  assert.match(source, /stage:\s*"formalization"/);
  assert.match(source, /stage:\s*"postIntro"/);
  assert.match(source, /stage:\s*"postQuestions"/);
  assert.match(source, /baja quince metros/i);
  assert.match(source, /sube ocho metros/i);
});

test("implements all quiz result branches and bounded recovery", () => {
  assert.match(source, /score\s*===\s*3/);
  assert.match(source, /score\s*===\s*2/);
  assert.match(source, /return <div className="student-result"><div className="result needs">/);
  assert.match(source, /slice\(0,\s*2\)/);
  assert.match(source, /stage:\s*"recovery"/);
  assert.match(source, /stage:\s*"closing"/);
});

test("adds the approved reasoning and progressive-autonomy layer", () => {
  assert.match(source, /Comparemos dos situaciones/i);
  assert.match(source, /propias palabras/i);
  assert.match(source, /Criterio para considerar correcta/i);
  assert.match(source, /Desafío breve/i);
  assert.match(source, /Cómo analizar una situación/i);
  assert.match(source, /Registro de la sesión/i);
  assert.match(source, /supportCount/);
  assert.match(source, /escúchalo completo y valora su razonamiento/i);
});

test("synchronizes isolated class sessions across devices", () => {
  assert.equal(hosting.d1, "DB");
  assert.match(worker, /sessionApi\(request, env\.DB/);
  assert.match(sessionApiSource, /INSERT INTO class_sessions/);
  assert.match(sessionApiSource, /SELECT state, revision FROM class_sessions WHERE code = \?/);
  assert.match(sessionApiSource, /revision = revision \+ 1/);
  assert.match(source, /Copiar enlace estudiante/);
  assert.match(source, /Ingresa a la clase/);
  assert.match(source, /window\.setInterval\(poll,500\)/);
  assert.match(source, /Intentando reconectar/);
});
