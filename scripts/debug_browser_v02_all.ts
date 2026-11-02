import http from 'http';
import { spawn } from 'child_process';
import path from 'path';

const CDP_PORT = 9346;
const USER_DATA_DIR = path.resolve('scratch/edge_debug_v02_loop');

function findWsTarget(port: number): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find((t: any) => t.type === 'page');
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error('No page target'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

const CASES = [
  { id: 'MAT_OA04', grade: '7° Básico', subject: 'Matemática', oaId: '110-7-MAT-OA04', lessonNum: '1', key: '7_mat_oa4_1' },
  { id: 'LEN_OA03_C02', grade: '7° Básico', subject: 'Lengua y Literatura', oaId: '110-7-LEN-OA03', lessonNum: '2', key: '7_len_oa3_2' },
  { id: 'CIE_OA01', grade: '7° Básico', subject: 'Ciencias Naturales', oaId: '110-7-CIE-OA01', lessonNum: '2', key: '7_cie_oa1_2' },
  { id: 'HIS_OA02', grade: '7° Básico', subject: 'Historia, Geografía y Ciencias Sociales', oaId: '110-7-HIS-OA02', lessonNum: '1', key: '7_his_oa2_1' },
  { id: 'ING_OA09', grade: '7° Básico', subject: 'Inglés', oaId: '110-7-ING-OA09', lessonNum: '1', key: '7_ing_oa9_1' }
];

async function run() {
  const proc = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--window-size=1440,900',
    'http://localhost:5173/?view=admin'
  ]);

  let wsUrl = '';
  for (let i = 0; i < 25; i++) {
    try {
      wsUrl = await findWsTarget(CDP_PORT);
      if (wsUrl) break;
    } catch {}
    await new Promise(r => setTimeout(r, 400));
  }

  const WebSocket = require('ws');
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.on('open', r));

  let idCounter = 1;
  const callbacks = new Map<number, (v: any) => void>();
  ws.on('message', (d: string) => {
    const msg = JSON.parse(d);
    if (msg.method === 'Fetch.requestPaused') {
      if (msg.params.request.url.includes('injected_lessons_all_grades.json')) {
        ws.send(JSON.stringify({ id: idCounter++, method: 'Fetch.failRequest', params: { requestId: msg.params.requestId, errorReason: 'ConnectionRefused' } }));
      } else {
        ws.send(JSON.stringify({ id: idCounter++, method: 'Fetch.continueRequest', params: { requestId: msg.params.requestId } }));
      }
      return;
    }
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id)!;
      callbacks.delete(msg.id);
      cb(msg.result);
    }
  });

  const send = (method: string, params: any = {}) => {
    const id = idCounter++;
    return new Promise<any>(resolve => {
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  const evalJs = async (expr: string) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res.result?.value;
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');
  await send('Fetch.enable', { patterns: [{ urlPattern: '*injected_lessons_all_grades.json*' }] });

  // Inyectar auth
  await evalJs(`
    const sessionObj = JSON.stringify({
      email: 'profesor.universal@estudiosimple.cl',
      name: 'Profesor Universal',
      role: 'admin',
      userId: 'admin_test_universal',
      isAuthenticated: true,
      enrolledGrades: ['7° Básico']
    });
    localStorage.setItem('estudio_simple_auth_session', sessionObj);
    localStorage.setItem('estudiosimple_auth_session', sessionObj);
    sessionStorage.setItem('estudiosimple_admin_auth', 'true');
    sessionStorage.setItem('estudiosimple_admin_active_module', 'lesson-editor');
  `);

  for (const c of CASES) {
    console.log(`\n======================================================`);
    console.log(`Probando caso: ${c.id} (${c.subject})`);
    
    // Limpiar localStorage de custom player lessons
    await evalJs(`localStorage.removeItem('estudiosimple_custom_player_lessons');`);

    // Inyectar selección
    await evalJs(`
      sessionStorage.setItem('estudiosimple_editor_grade', '7° Básico');
      sessionStorage.setItem('estudiosimple_editor_subject', ${JSON.stringify(c.subject)});
      sessionStorage.setItem('estudiosimple_editor_oa_id', ${JSON.stringify(c.oaId)});
      sessionStorage.setItem('estudiosimple_editor_lesson_num', '${c.lessonNum}');
      sessionStorage.setItem('estudiosimple_editor_step_id', 'prep');
    `);

    await send('Page.navigate', { url: 'http://localhost:5173/?view=admin' });
    await new Promise(r => setTimeout(r, 2200));

    // Modificar textarea
    const mod = await evalJs(`(() => {
      const routeHeading = Array.from(document.querySelectorAll('strong')).find(s => s.textContent && s.textContent.includes('RUTA DE HOY'));
      const card = routeHeading ? routeHeading.closest('div.w-full') : null;
      const rt = card ? card.querySelector('textarea') : document.querySelectorAll('textarea')[1];
      if (!rt) return { ok: false, err: 'no textarea' };
      rt.focus();
      const tracker = rt._valueTracker;
      if (tracker) tracker.setValue('');
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      nativeSetter.call(rt, 'Ruta verificada [TEST_UNIVERSAL_${c.id}]');
      rt.dispatchEvent(new Event('input', { bubbles: true }));
      rt.dispatchEvent(new Event('change', { bubbles: true }));
      return { ok: true, val: rt.value };
    })()`);
    console.log('  Modificación:', mod);

    // Click Guardar
    const save = await evalJs(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Guardar Cambios'));
      if (!btn) return { ok: false, err: 'no save button' };
      btn.click();
      return { ok: true };
    })()`);
    console.log('  Click guardar:', save);
    await new Promise(r => setTimeout(r, 800));

    // Comprobar storage inmediato
    const storageImm = await evalJs(`(() => {
      const raw = localStorage.getItem('estudiosimple_custom_player_lessons');
      const parsed = raw ? JSON.parse(raw)['${c.key}'] : null;
      return {
        key: '${c.key}',
        found: Boolean(parsed),
        route: parsed ? parsed.prep?.routeToday : null,
        errBanner: document.querySelector('.text-rose-950')?.textContent
      };
    })()`);
    console.log('  Inmediato:', storageImm);

    // Recargar página
    await evalJs(`
      sessionStorage.setItem('estudiosimple_editor_grade', '7° Básico');
      sessionStorage.setItem('estudiosimple_editor_subject', ${JSON.stringify(c.subject)});
      sessionStorage.setItem('estudiosimple_editor_oa_id', ${JSON.stringify(c.oaId)});
      sessionStorage.setItem('estudiosimple_editor_lesson_num', '${c.lessonNum}');
      sessionStorage.setItem('estudiosimple_editor_step_id', 'prep');
    `);
    await send('Page.navigate', { url: 'http://localhost:5173/?view=admin' });
    await new Promise(r => setTimeout(r, 2200));

    // Comprobar storage y dom post-recarga
    const storagePost = await evalJs(`(() => {
      const raw = localStorage.getItem('estudiosimple_custom_player_lessons');
      const parsed = raw ? JSON.parse(raw)['${c.key}'] : null;
      const textareas = Array.from(document.querySelectorAll('textarea'));
      return {
        key: '${c.key}',
        found: Boolean(parsed),
        routeInStorage: parsed ? parsed.prep?.routeToday : null,
        routeInDom: textareas[1]?.value,
        hasMarker: Boolean(parsed && parsed.prep?.routeToday?.includes('TEST_UNIVERSAL')),
        badge: document.querySelector('.bg-amber-50, .text-amber-800')?.textContent
      };
    })()`);
    console.log('  Post-recarga:', storagePost);
  }

  proc.kill();
}

run().catch(console.error);
