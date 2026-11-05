import http from 'http';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';

const CDP_PORT = 9345;
const USER_DATA_DIR = path.resolve('scratch/edge_debug_v02');

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

async function debugV02() {
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

  // Inyectar auth y sesión de Lengua OA03 Clase 02
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
    sessionStorage.setItem('estudiosimple_editor_subject', 'Lengua y Literatura');
    sessionStorage.setItem('estudiosimple_editor_oa_id', '110-7-LEN-OA03');
    sessionStorage.setItem('estudiosimple_editor_lesson_num', '2');
    sessionStorage.setItem('estudiosimple_editor_step_id', 'prep');
  `);

  await send('Page.navigate', { url: 'http://localhost:5173/?view=admin' });
  await new Promise(r => setTimeout(r, 2500));

  console.log('1. Estado inicial en navegador:');
  const initialInfo = await evalJs(`(() => {
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent,
      lessonTitleInput: document.querySelector('input[type="text"]')?.value,
      validationError: document.querySelector('.text-rose-950')?.textContent,
      validationErrorMsg: document.querySelector('.text-rose-800')?.textContent,
      saveButton: Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Guardar Cambios'))?.textContent
    };
  })()`);
  console.log(initialInfo);

  console.log('\n2. Modificando textarea de RUTA DE HOY:');
  const modResult = await evalJs(`(() => {
    const routeHeading = Array.from(document.querySelectorAll('strong')).find(s => s.textContent && s.textContent.includes('RUTA DE HOY'));
    const card = routeHeading ? routeHeading.closest('div.w-full') : null;
    const rt = card ? card.querySelector('textarea') : document.querySelectorAll('textarea')[1];
    if (!rt) return { success: false, error: 'textarea not found' };
    
    const beforeValue = rt.value;
    rt.focus();
    const tracker = rt._valueTracker;
    if (tracker) tracker.setValue('');
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    nativeSetter.call(rt, 'Ruta modificada TEST_UNIVERSAL_DEBUG');
    rt.dispatchEvent(new Event('input', { bubbles: true }));
    rt.dispatchEvent(new Event('change', { bubbles: true }));
    
    return {
      success: true,
      beforeValue,
      afterValue: rt.value
    };
  })()`);
  console.log(modResult);

  console.log('\n3. Almacenamiento ANTES de pulsar Guardar:');
  const storageBefore = await evalJs(`localStorage.getItem('estudiosimple_custom_player_lessons')`);
  console.log('  Keys en custom_player_lessons:', storageBefore ? Object.keys(JSON.parse(storageBefore)) : null);

  console.log('\n4. Pulsando botón Guardar Cambios:');
  const clickResult = await evalJs(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Guardar Cambios'));
    if (!btn) return { clicked: false, error: 'button not found' };
    btn.click();
    return { clicked: true };
  })()`);
  console.log(clickResult);
  await new Promise(r => setTimeout(r, 1000));

  console.log('\n5. Estado INMEDIATAMENTE después de Guardar:');
  const stateAfter = await evalJs(`(() => {
    const raw = localStorage.getItem('estudiosimple_custom_player_lessons');
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      keys: parsed ? Object.keys(parsed) : null,
      valFor7_len_oa3_2: parsed ? parsed['7_len_oa3_2']?.prep?.routeToday : undefined,
      validationError: document.querySelector('.text-rose-950')?.textContent,
      validationErrorMsg: document.querySelector('.text-rose-800')?.textContent,
      saveFeedback: document.querySelector('.bg-emerald-50, .text-emerald-800')?.textContent
    };
  })()`);
  console.log(stateAfter);

  console.log('\n6. Navegando/Recargando página:');
  await send('Page.navigate', { url: 'http://localhost:5173/?view=admin' });
  await new Promise(r => setTimeout(r, 2500));

  const stateAfterReload = await evalJs(`(() => {
    const raw = localStorage.getItem('estudiosimple_custom_player_lessons');
    const parsed = raw ? JSON.parse(raw) : null;
    const textareas = Array.from(document.querySelectorAll('textarea'));
    return {
      keys: parsed ? Object.keys(parsed) : null,
      valInStorage: parsed ? parsed['7_len_oa3_2']?.prep?.routeToday : undefined,
      valInDom: textareas[1]?.value,
      badge: document.querySelector('.bg-amber-50, .text-amber-800')?.textContent,
      resetButton: Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Restablecer'))?.textContent
    };
  })()`);
  console.log('Estado después de recargar:');
  console.log(stateAfterReload);

  proc.kill();
}

debugV02().catch(console.error);
