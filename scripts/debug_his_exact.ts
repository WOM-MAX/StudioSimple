import http from 'http';
import { spawn } from 'child_process';
import path from 'path';

const CDP_PORT = 9350;
const USER_DATA_DIR = path.resolve('scratch/edge_debug_his_exact');

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

  // Inyectar auth y sesión de Historia OA02 Clase 01
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
    sessionStorage.setItem('estudiosimple_editor_grade', '7° Básico');
    sessionStorage.setItem('estudiosimple_editor_subject', 'Historia, Geografía y Ciencias Sociales');
    sessionStorage.setItem('estudiosimple_editor_oa_id', '110-7-HIS-OA02');
    sessionStorage.setItem('estudiosimple_editor_lesson_num', '1');
    sessionStorage.setItem('estudiosimple_editor_step_id', 'prep');
  `);

  await send('Page.navigate', { url: 'http://localhost:5173/?view=admin' });
  await new Promise(r => setTimeout(r, 2200));

  // Modificar textarea
  await evalJs(`(() => {
    const routeHeading = Array.from(document.querySelectorAll('strong')).find(s => s.textContent && s.textContent.includes('RUTA DE HOY'));
    const card = routeHeading ? routeHeading.closest('div.w-full') : null;
    const rt = card ? card.querySelector('textarea') : document.querySelectorAll('textarea')[1];
    if (rt) {
      rt.focus();
      const tracker = rt._valueTracker;
      if (tracker) tracker.setValue('');
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      nativeSetter.call(rt, 'Ruta verificada TEST_UNIVERSAL_HIS');
      rt.dispatchEvent(new Event('input', { bubbles: true }));
      rt.dispatchEvent(new Event('change', { bubbles: true }));
    }
  })()`);

  // Pulsar guardar y capturar console.warn / console.error y retorno
  await evalJs(`
    window._lastSaveResult = null;
    const origWarn = console.warn;
    const origError = console.error;
    window._logs = [];
    console.warn = (...args) => { window._logs.push({ type: 'warn', args }); origWarn(...args); };
    console.error = (...args) => { window._logs.push({ type: 'error', args }); origError(...args); };
  `);

  await evalJs(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Guardar Cambios'));
    if (btn) btn.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));

  const diag = await evalJs(`(() => {
    const raw = localStorage.getItem('estudiosimple_custom_player_lessons');
    return {
      logs: window._logs,
      rawStorageKeys: raw ? Object.keys(JSON.parse(raw)) : null,
      bannerText: document.querySelector('.text-rose-950, .text-rose-800')?.textContent,
      saveFeedback: document.querySelector('.bg-emerald-50, .text-emerald-800')?.textContent,
      validationErrorsTable: Array.from(document.querySelectorAll('tbody tr')).map(tr => tr.innerText)
    };
  })()`);
  console.log('Diagnóstico INMEDIATO de guardado Historia:');
  console.log(JSON.stringify(diag, null, 2));

  console.log('\nRecargando página...');
  await evalJs(`
    sessionStorage.setItem('estudiosimple_editor_grade', '7° Básico');
    sessionStorage.setItem('estudiosimple_editor_subject', 'Historia, Geografía y Ciencias Sociales');
    sessionStorage.setItem('estudiosimple_editor_oa_id', '110-7-HIS-OA02');
    sessionStorage.setItem('estudiosimple_editor_lesson_num', '1');
    sessionStorage.setItem('estudiosimple_editor_step_id', 'prep');
  `);
  await send('Page.navigate', { url: 'http://localhost:5173/?view=admin' });
  await new Promise(r => setTimeout(r, 2500));

  const diagReload = await evalJs(`(() => {
    const raw = localStorage.getItem('estudiosimple_custom_player_lessons');
    const parsed = raw ? JSON.parse(raw)['7_his_oa2_1'] : null;
    return {
      rawStorageKeys: raw ? Object.keys(JSON.parse(raw)) : null,
      foundKey: Boolean(parsed),
      routeInStorage: parsed ? parsed.prep?.routeToday : null,
      h1: document.querySelector('h1')?.textContent,
      titleInput: document.querySelector('input[type="text"]')?.value,
      banner: document.querySelector('.text-rose-950')?.textContent
    };
  })()`);
  console.log('Diagnóstico POST-RECARGA Historia:');
  console.log(JSON.stringify(diagReload, null, 2));

  proc.kill();
}

run().catch(console.error);
