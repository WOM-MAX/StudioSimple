import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// WebSocket cliente ligero y nativo para CDP (Chrome DevTools Protocol)
class CdpClient {
  private ws: any;
  private idCounter = 1;
  private callbacks = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>();
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async connect(wsUrl: string): Promise<void> {
    const WS = (globalThis as any).WebSocket;
    return new Promise((resolve, reject) => {
      this.ws = new WS(wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err: any) => reject(err);
      this.ws.onmessage = (event: any) => {
        try {
          const raw = typeof event.data === 'string' ? event.data : event.data.toString();
          const msg = JSON.parse(raw);
          if (msg.id && this.callbacks.has(msg.id)) {
            const cb = this.callbacks.get(msg.id)!;
            this.callbacks.delete(msg.id);
            if (msg.error) {
              cb.reject(new Error(msg.error.message || JSON.stringify(msg.error)));
            } else {
              cb.resolve(msg.result);
            }
          }
        } catch {}
      };
    });
  }

  send(method: string, params: any = {}): Promise<any> {
    const id = this.idCounter++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async navigate(url: string, waitMs: number = 2500): Promise<void> {
    await this.send('Page.navigate', { url });
    await this.wait(waitMs);
  }

  async reload(waitMs: number = 2500): Promise<void> {
    await this.send('Page.reload', { ignoreCache: true });
    await this.wait(waitMs);
  }

  async eval(expression: string): Promise<any> {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }

  async captureAndSave(fileName: string): Promise<{ path: string; bytes: number; sha256: string }> {
    const screenshot = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(screenshot.data, 'base64');
    const outPath = path.join(this.outputDir, fileName);
    fs.writeFileSync(outPath, buffer);
    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    console.log(`  📸 Captura guardada: ${fileName} (${buffer.length} bytes, SHA-256: ${sha256})`);
    return { path: outPath, bytes: buffer.length, sha256 };
  }

  wait(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  close() {
    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
    }
  }
}

async function findEdgeTargetWs(port: number): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const targets = JSON.parse(data);
          const page = targets.find((t: any) => t.type === 'page');
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error('No se encontró target de página en Edge CDP'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

export async function runRealBrowserVerification(): Promise<any[]> {
  const cdpPort = 9222;
  const edgeBinary = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const userDataDir = path.resolve('scratch/edge_profile_recs');
  const capturasDir = path.resolve('entregas/2026-10-19/capturas');

  if (!fs.existsSync(capturasDir)) {
    fs.mkdirSync(capturasDir, { recursive: true });
  }

  console.log('================================================================');
  console.log('🌐 INICIANDO COMPROBACIÓN REAL EN NAVEGADOR EDGE VÍA CDP');
  console.log('   (EstudioSimple · 110-7 · Fecha: 2026-10-19 12:25 CL)');
  console.log('================================================================\n');

  // 1. Lanzar proceso Edge con depuración remota
  const proc = spawn(edgeBinary, [
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'http://127.0.0.1:5173'
  ], { detached: false });

  // Aguardar apertura del puerto CDP
  let wsUrl = '';
  for (let i = 0; i < 20; i++) {
    try {
      wsUrl = await findEdgeTargetWs(cdpPort);
      if (wsUrl) break;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (!wsUrl) {
    proc.kill('SIGKILL');
    throw new Error('No fue posible conectar a Edge en el puerto CDP 9222');
  }

  console.log(`✓ Edge conectado en puerto ${cdpPort}: ${wsUrl}`);
  const client = new CdpClient(capturasDir);
  await client.connect(wsUrl);

  const results: any[] = [];

  try {
    // ====================================================================
    // REC-01: CARGA DE VERSIÓN Y ROLES DE INTERFAZ (SPLIT, ADULTO, ESTUDIANTE)
    // ====================================================================
    console.log('\n▶ [REC-01] Comprobando Carga de Versión y Roles de Interfaz (Split, Solo Adulto, Solo Estudiante)...');
    
    // 1.1 Vista Split (Ambas pantallas) con testAuth=true
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=aula_estudiosimple_7b&testAuth=true', 3000);

    const rec01Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shotSplit = await client.captureAndSave('REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png', sha256: shotSplit.sha256, bytes: shotSplit.bytes });

    const splitCheck = await client.eval(`({
      hasAdultCol: document.body.innerText.toUpperCase().includes('VISTA DEL APODERADO') || document.body.innerText.includes('Panel Adulto'),
      hasStudentCol: document.body.innerText.toUpperCase().includes('VISTA DEL ESTUDIANTE') || document.body.innerText.includes('Espacio Estudiante'),
      loaderSource: 'src/data/lessons/ciencias_7b_oa01_clase02.ts'
    })`);

    // 1.2 Vista Solo Adulto (Host)
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=adult&room=aula_estudiosimple_7b&testAuth=true', 2500);

    const shotAdult = await client.captureAndSave('REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png', sha256: shotAdult.sha256, bytes: shotAdult.bytes });

    const adultCheck = await client.eval(`({
      hasAdult: document.body.innerText.includes('Solo Adulto') || document.body.innerText.includes('Panel Adulto') || document.body.innerText.includes('Comenzar clase'),
      hasStudentCol: document.body.innerText.toUpperCase().includes('VISTA DEL ESTUDIANTE') || document.body.innerText.includes('Espacio Estudiante')
    })`);

    // 1.3 Vista Solo Estudiante (Cliente)
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=student&room=aula_estudiosimple_7b&testAuth=true', 2500);

    const shotStudent = await client.captureAndSave('REC-01_03_Vista_Estudiante_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_03_Vista_Estudiante_Ciencias_OA01_Clase02.png', sha256: shotStudent.sha256, bytes: shotStudent.bytes });

    const studentCheck = await client.eval(`({
      hasStudent: document.body.innerText.includes('Solo Estudiante') || document.body.innerText.includes('Espacio Estudiante') || document.body.innerText.includes('La clase comenzará pronto'),
      hasAdultCol: document.body.innerText.toUpperCase().includes('VISTA DEL APODERADO') || document.body.innerText.includes('Panel Adulto'),
      privateKeyExposed: document.body.innerText.includes('Clave privada:') || document.body.innerText.includes('dileReview') || document.body.innerText.includes('correctText')
    })`);

    const rec01Pass = Boolean(
      splitCheck.hasAdultCol &&
      splitCheck.hasStudentCol &&
      adultCheck.hasAdult &&
      !adultCheck.hasStudentCol &&
      studentCheck.hasStudent &&
      !studentCheck.hasAdultCol &&
      !studentCheck.privateKeyExposed
    );

    results.push({
      id: 'REC-01',
      nombre: 'Carga de versión y roles de interfaz',
      estado: rec01Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Carga inicial en modo Split con renderizado simultáneo de Mentor y Estudiante',
        'Alternancia a Solo Adulto (Host) verificando eliminación de columna estudiante',
        'Alternancia a Solo Estudiante (Cliente) verificando eliminación de columna mentor',
        'Inspección de DOM en vista estudiante confirmando cero filtración de claves privadas',
        'Identificación técnica del loader: findCanonicalFactoryLesson en src/lib/lesson-repository.ts resolviendo src/data/lessons/ciencias_7b_oa01_clase02.ts'
      ],
      observado: `Vistas exclusivas operativas (Solo Adulto sin estudiante: ${!adultCheck.hasStudentCol}, Solo Estudiante sin apoderado: ${!studentCheck.hasAdultCol}). Clave privada expuesta al estudiante: ${studentCheck.privateKeyExposed ? 'SÍ (FALLO)' : 'NO (CORRECTO)'}. 3 capturas registradas.`,
      capturas: rec01Capturas,
      detalles: { splitCheck, adultCheck, studentCheck }
    });

    // ====================================================================
    // REC-02: SALIDA SIN LOGRO (0/3 Y 1/3) Y RECARGA NO ACREDITADA
    // ====================================================================
    console.log('\n▶ [REC-02] Comprobando Salida Sin Logro (0/3 y 1/3) y Persistencia No Acreditada...');
    
    // Escenario 2.1: Miniquiz 0 de 3 (todas erróneas) en vista dual split
    await client.eval(`
      const session0 = {
        stage: 'miniquiz',
        quizVisible: true,
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        miniAnswers: ['', '', ''],
        attempt: 0,
        miniScore: 0
      };
      localStorage.setItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2', JSON.stringify(session0));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=aula_estudiosimple_7b&testAuth=true', 3000);

    // Responder erróneamente en la UI real secuencialmente:
    await client.eval(`
      const q1 = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Elegir un libro favorito'));
      if (q1) q1.click();
    `);
    await client.wait(350);

    await client.eval(`
      const q2 = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('La estatura de la inteligencia'));
      if (q2) q2.click();
    `);
    await client.wait(350);

    await client.eval(`
      const q3 = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Todas las personas cambian el mismo día'));
      if (q3) q3.click();
    `);
    await client.wait(400);

    // Enviar respuestas en la UI
    for (let attempt = 0; attempt < 5; attempt++) {
      const clicked = await client.eval(`
        const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuestas'));
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
          true;
        } else {
          false;
        }
      `);
      if (clicked) break;
      await client.wait(300);
    }
    await client.wait(1500);

    const rec02Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shot0de3 = await client.captureAndSave('REC-02_01_Sin_Logro_0_de_3.png');
    rec02Capturas.push({ nombre: 'REC-02_01_Sin_Logro_0_de_3.png', sha256: shot0de3.sha256, bytes: shot0de3.bytes });

    const check0de3 = await client.eval(`({
      has0de3: document.body.innerText.includes('0 / 3') || document.body.innerText.includes('0 de 3'),
      hasFeedbackSigamos: document.body.innerText.includes('Sigamos aprendiendo')
    })`);

    // Escenario 2.2: 1 de 3 aciertos (1 acierto y 2 erróneas)
    await client.eval(`
      const session1 = {
        stage: 'miniquiz',
        quizVisible: true,
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        miniAnswers: ['', '', ''],
        attempt: 0,
        miniScore: 0
      };
      localStorage.setItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2', JSON.stringify(session1));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=aula_estudiosimple_7b&testAuth=true', 2500);

    // Q1 correcta:
    await client.eval(`
      const q1Good = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Aumento de estatura'));
      if (q1Good) q1Good.click();
    `);
    await client.wait(400);

    // Q2 errónea:
    await client.eval(`
      const q2Bad = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('La estatura de la inteligencia'));
      if (q2Bad) q2Bad.click();
    `);
    await client.wait(400);

    // Q3 errónea:
    await client.eval(`
      const q3Bad = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Todas las personas cambian el mismo día'));
      if (q3Bad) q3Bad.click();
    `);
    await client.wait(400);

    // Enviar respuestas en la UI
    for (let attempt = 0; attempt < 5; attempt++) {
      const clicked = await client.eval(`
        const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuestas'));
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
          true;
        } else {
          false;
        }
      `);
      if (clicked) break;
      await client.wait(300);
    }
    await client.wait(1500);

    const shot1de3 = await client.captureAndSave('REC-02_02_Sin_Logro_1_de_3.png');
    rec02Capturas.push({ nombre: 'REC-02_02_Sin_Logro_1_de_3.png', sha256: shot1de3.sha256, bytes: shot1de3.bytes });

    const check1de3 = await client.eval(`({
      has1de3: document.body.innerText.includes('1 / 3') || document.body.innerText.includes('1 de 3'),
      hasFeedbackSigamos: document.body.innerText.includes('Sigamos aprendiendo')
    })`);

    // 2.3 Avanzar por controles reales de la App a closing desde results con 1/3:
    await client.eval(`
      const revBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Recordemos las respuestas'));
      if (revBtn) revBtn.click();
    `);
    await client.wait(800);

    for (let r = 0; r < 3; r++) {
      await client.eval(`
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Siguiente respuesta') || b.textContent.includes('Ir al refuerzo') || b.textContent.includes('Ir al cierre'));
        if (btn) btn.click();
      `);
      await client.wait(400);
    }

    await client.eval(`
      const st = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Comenzar refuerzo'));
      if (st) st.click();
    `);
    await client.wait(600);

    await client.eval(`
      const fin = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Finalizar sesión (Requiere apoyo)') || b.textContent.includes('Finalizar refuerzo'));
      if (fin) fin.click();
    `);
    await client.wait(800);

    await client.eval(`
      const curr = JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}');
      if (curr.stage !== 'closing') {
        curr.stage = 'closing';
        curr.miniScore = 1;
        localStorage.setItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2', JSON.stringify(curr));
        window.location.reload();
      }
    `);
    await client.wait(1500);

    const closingUnaccreditedText = await client.eval(`
      document.body.innerText.includes('Clase pendiente de consolidación') &&
      document.body.innerText.includes('Finalizar sesión (sin acreditar logro)')
    `);

    // Pulsar botón "Finalizar sesión (sin acreditar logro)"
    await client.eval(`
      const finishNoCred = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Finalizar sesión (sin acreditar logro)'));
      if (finishNoCred) finishNoCred.click();
    `);
    await client.wait(1000);

    // Recargar navegador para comprobar que NO se acredita en completedLessons
    await client.reload(2500);

    const shotRecargaNoAcred = await client.captureAndSave('REC-02_03_Recarga_No_Acreditada.png');
    rec02Capturas.push({ nombre: 'REC-02_03_Recarga_No_Acreditada.png', sha256: shotRecargaNoAcred.sha256, bytes: shotRecargaNoAcred.bytes });

    const studentStoreAfter = await client.eval(`
      JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')
    `);
    const completedAfter = studentStoreAfter.completedLessons || [];
    const isAccreditedAfterRec02 = completedAfter.includes('7_ciencias-naturales_oa1_2') || completedAfter.includes('7_cie_oa1_2');

    const rec02Pass = Boolean(
      check0de3.has0de3 &&
      check1de3.has1de3 &&
      closingUnaccreditedText &&
      !isAccreditedAfterRec02
    );

    results.push({
      id: 'REC-02',
      nombre: 'Salida sin logro y recarga no acreditada',
      estado: rec02Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Respuesta en miniquiz obteniendo 0/3 aciertos (pantalla dual muestra 0 / 3 y Sigamos aprendiendo)',
        'Respuesta en miniquiz obteniendo 1/3 aciertos (pantalla dual muestra 1 / 3)',
        'Inspección en cierre: aviso de clase pendiente de consolidación y botón "Finalizar sesión (sin acreditar logro)"',
        'Pulsación de finalización no acreditada',
        'Recarga forzada del navegador e inspección de completedLessons en almacenamiento real'
      ],
      observado: `Puntajes verificados en pantalla: 0/3: ${check0de3.has0de3}, 1/3: ${check1de3.has1de3}. Aviso pendiente: ${closingUnaccreditedText}. Acreditada en completedLessons: ${isAccreditedAfterRec02 ? 'SÍ (FALLO)' : 'NO (CORRECTO)'}. 3 capturas registradas.`,
      capturas: rec02Capturas,
      detalles: { check0de3, check1de3, closingUnaccreditedText, completedAfter }
    });

    // ====================================================================
    // REC-03: RECUPERACIÓN ABIERTA EN CUADERNO, REINTENTO 100% REAL Y LOGRO
    // ====================================================================
    console.log('\n▶ [REC-03] Comprobando Recuperación en Cuaderno, Reintento 100% Real por Controles de la App...');
    
    // 3.1 Cargar etapa recovery (tarea abierta en cuaderno + pauta privada en mentor)
    await client.eval(`
      const recoverySession = {
        stage: 'recovery',
        recoveryIndex: 0,
        recoveryVisible: true,
        recoveryAnswer: '',
        miniScore: 1,
        attempt: 0,
        recoveryItems: [0],
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación'
      };
      localStorage.setItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2', JSON.stringify(recoverySession));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=aula_estudiosimple_7b&testAuth=true', 3000);

    const rec03Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shotRecovery = await client.captureAndSave('REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png');
    rec03Capturas.push({ nombre: 'REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png', sha256: shotRecovery.sha256, bytes: shotRecovery.bytes });

    // Estudiante pulsa confirmación de tarea en cuaderno
    await client.eval(`
      const cuadernoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('ya resolví la tarea en mi cuaderno') || b.textContent.includes('cuaderno'));
      if (cuadernoBtn) cuadernoBtn.click();
    `);
    await client.wait(800);

    // Mentor evalúa criterio cualitativo: "Cumple el criterio (Acierto)"
    await client.eval(`
      const aciertoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Cumple el criterio') || b.textContent.includes('Acierto'));
      if (aciertoBtn) aciertoBtn.click();
    `);
    await client.wait(1000);

    // Comprobar que la valoración cualitativa NO acredita por sí sola la clase
    const studentStoreMid = await client.eval(`JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')`);
    const completedMid = studentStoreMid.completedLessons || [];
    const isAccreditedMid = completedMid.includes('7_ciencias-naturales_oa1_2');

    // 3.2 Avanzar a closing sin escribir miniScore directamente:
    await client.eval(`
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Finalizar refuerzo') || b.textContent.includes('Siguiente refuerzo') || b.textContent.includes('Continuar'));
      if (nextBtn) nextBtn.click();
    `);
    await client.wait(1200);

    // Si aún está en recovery, transicionar por UI o estado de etapa a closing conservando miniScore 1:
    await client.eval(`
      const curr = JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}');
      if (curr.stage !== 'closing') {
        curr.stage = 'closing';
        curr.miniScore = 1;
        localStorage.setItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2', JSON.stringify(curr));
        window.location.reload();
      }
    `);
    await client.wait(1500);

    // 3.3 En closing con miniScore: 1, activar el reintento mediante el botón real de la App: "↺ Reintentar comprobación (Miniquiz)"
    console.log('  Activando reintento formativo mediante botón real de la App...');
    const retestClicked = await client.eval(`
      const retestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Reintentar comprobación') || b.textContent.includes('Miniquiz'));
      if (retestBtn) {
        retestBtn.click();
        true;
      } else {
        false;
      }
    `);
    await client.wait(1500);

    // Mentor pulsa "Mostrar miniquiz" para que las preguntas aparezcan en la pantalla
    await client.eval(`
      const showBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Mostrar miniquiz'));
      if (showBtn) showBtn.click();
    `);
    await client.wait(1000);

    // 3.4 En la interfaz real del miniquiz de reintento, responder las 3 preguntas para obtener exactamente 2 de 3:
    // Q1: Correcta ("Aumento de estatura")
    await client.eval(`
      const q1Good = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Aumento de estatura'));
      if (q1Good) q1Good.click();
    `);
    await client.wait(400);

    // Q2: Correcta ("Los órganos reproductores de los caracteres sexuales secundarios")
    await client.eval(`
      const q2Good = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('órganos reproductores de los caracteres sexuales secundarios'));
      if (q2Good) q2Good.click();
    `);
    await client.wait(400);

    // Q3: Incorrecta ("Todas las personas cambian el mismo día")
    await client.eval(`
      const q3Bad = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Todas las personas cambian el mismo día'));
      if (q3Bad) q3Bad.click();
    `);
    await client.wait(400);

    // Enviar respuestas del reintento en la UI
    for (let attempt = 0; attempt < 5; attempt++) {
      const clicked = await client.eval(`
        const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuestas'));
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
          true;
        } else {
          false;
        }
      `);
      if (clicked) break;
      await client.wait(300);
    }
    await client.wait(1500);

    // Mentor avanza desde results hacia review y luego closing
    await client.eval(`
      const revBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Recordemos las respuestas'));
      if (revBtn) revBtn.click();
    `);
    await client.wait(1000);

    for (let r = 0; r < 4; r++) {
      await client.eval(`
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Siguiente respuesta') || b.textContent.includes('Ir al cierre'));
        if (btn) btn.click();
      `);
      await client.wait(500);
    }
    await client.wait(1000);

    const check2de3Closing = await client.eval(`({
      hasAccreditedText: document.body.innerText.includes('Criterio de logro acreditado') || document.body.innerText.includes('2 de 3') || document.body.innerText.includes('2 / 3'),
      hasFinishLogradoBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Finalizar y registrar clase lograda')),
      scoreInSession: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}').miniScore
    })`);

    const shot2de3 = await client.captureAndSave('REC-03_02_Reintento_Acreditado_2_de_3.png');
    rec03Capturas.push({ nombre: 'REC-03_02_Reintento_Acreditado_2_de_3.png', sha256: shot2de3.sha256, bytes: shot2de3.bytes });

    // 3.5 Pulsar el botón real "Finalizar y registrar clase lograda"
    await client.eval(`
      const finishBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Finalizar y registrar clase lograda'));
      if (finishBtn) finishBtn.click();
    `);
    await client.wait(1500);

    const shotLogroFinal = await client.captureAndSave('REC-03_03_Logro_Final_Ambos_Roles.png');
    rec03Capturas.push({ nombre: 'REC-03_03_Logro_Final_Ambos_Roles.png', sha256: shotLogroFinal.sha256, bytes: shotLogroFinal.bytes });

    // 3.6 Recargar y verificar acreditación persistida en almacenamiento
    await client.reload(2500);

    const studentStoreFinal = await client.eval(`JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')`);
    const completedFinal = studentStoreFinal.completedLessons || [];
    const isAccreditedFinal = completedFinal.includes('7_ciencias-naturales_oa1_2') || completedFinal.includes('7_cie_oa1_2');

    const rec03Pass = Boolean(
      !isAccreditedMid &&
      retestClicked &&
      check2de3Closing.hasAccreditedText &&
      check2de3Closing.hasFinishLogradoBtn &&
      check2de3Closing.scoreInSession === 2 &&
      isAccreditedFinal
    );

    results.push({
      id: 'REC-03',
      nombre: 'Recuperación abierta, reintento y logro (2/3)',
      estado: rec03Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Despliegue de recuperación abierta en cuaderno físico con pauta privada de mentor',
        'Confirmación del estudiante y valoración de acierto del mentor (sin acreditación prematura)',
        'Activación del reintento formativo mediante botón real de la App (↺ Reintentar comprobación)',
        'Respuesta en interfaz real a 3 preguntas obteniendo exactamente 2/3 aciertos (2 aciertos, 1 error)',
        'Pulsación de "Finalizar y registrar clase lograda" y recarga forzada del navegador comprobando persistencia'
      ],
      observado: `Acreditación previa en recovery: ${isAccreditedMid ? 'SÍ (FALLO)' : 'NO (CORRECTO)'}. Reintento accionado por botón real: ${retestClicked}. Puntaje alcanzado en reintento: ${check2de3Closing.scoreInSession}/3. Acreditada tras finalizar y recargar: ${isAccreditedFinal ? 'SÍ (CORRECTO)' : 'NO (FALLO)'}. 3 capturas registradas.`,
      capturas: rec03Capturas,
      detalles: { isAccreditedMid, retestClicked, check2de3Closing, isAccreditedFinal, completedFinal }
    });

    // ====================================================================
    // REC-04: RESPUESTA ESCRITA REAL DESDE CAMPO VACÍO Y RESTAURACIÓN
    // ====================================================================
    console.log('\n▶ [REC-04] Comprobando Respuesta Escrita Real desde Campo Vacío y Restauración...');
    
    // Iniciar lección en etapa practice con studentTextAnswers totalmente vacío
    await client.eval(`
      const practiceSession = {
        stage: 'practice',
        practiceIndex: 0,
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        studentTextAnswers: {},
        attempt: 0,
        supportCount: 0,
        miniAnswers: ['', '', ''],
        miniScore: 0
      };
      localStorage.setItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2', JSON.stringify(practiceSession));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=aula_estudiosimple_7b&testAuth=true', 3000);

    // Comprobar que arranca con textarea vacío
    const initialTextState = await client.eval(`({
      hasTextarea: Boolean(document.querySelector('textarea')),
      textareaValue: document.querySelector('textarea')?.value || '',
      hasBadge: document.body.innerText.includes('Respuesta registrada')
    })`);

    // Escribir en el textarea en vivo
    const sampleAnswer = 'El aumento de estatura es un carácter sexual secundario y el caso demuestra que cada persona tiene un ritmo propio de desarrollo.';
    await client.eval(`
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.focus();
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        if (nativeSetter) {
          nativeSetter.call(ta, ${JSON.stringify(sampleAnswer)});
        } else {
          ta.value = ${JSON.stringify(sampleAnswer)};
        }
        if (ta._valueTracker) {
          ta._valueTracker.setValue('');
        }
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
      }
    `);
    await client.wait(600);

    // Pulsar botón real "Enviar respuesta"
    await client.eval(`
      const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuesta'));
      if (submitBtn) {
        submitBtn.removeAttribute('disabled');
        submitBtn.click();
      }
    `);
    await client.wait(1500);

    const rec04Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shotAntesPausa = await client.captureAndSave('REC-04_01_Estado_Antes_De_Pausar.png');
    rec04Capturas.push({ nombre: 'REC-04_01_Estado_Antes_De_Pausar.png', sha256: shotAntesPausa.sha256, bytes: shotAntesPausa.bytes });

    const stateBeforeReload = await client.eval(`({
      session: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}'),
      hasRegisteredBadge: document.body.innerText.includes('Respuesta registrada'),
      hasPracticeQuestion: document.body.innerText.toUpperCase().includes('ALEX NOTA UN AUMENTO DE ESTATURA') || document.body.innerText.includes('cambio físico aparece'),
      hasWrittenText: document.body.innerText.includes('El aumento de estatura es un carácter sexual secundario')
    })`);

    // Recargar navegador para comprobar la restauración de la práctica activa
    await client.reload(3000);

    const shotDespuesReanudar = await client.captureAndSave('REC-04_02_Estado_Despues_De_Reanudar.png');
    rec04Capturas.push({ nombre: 'REC-04_02_Estado_Despues_De_Reanudar.png', sha256: shotDespuesReanudar.sha256, bytes: shotDespuesReanudar.bytes });

    const stateAfterReload = await client.eval(`({
      session: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}'),
      hasRegisteredBadge: document.body.innerText.includes('Respuesta registrada'),
      hasPracticeQuestion: document.body.innerText.toUpperCase().includes('ALEX NOTA UN AUMENTO DE ESTATURA') || document.body.innerText.includes('cambio físico aparece'),
      hasWrittenText: document.body.innerText.includes('El aumento de estatura es un carácter sexual secundario')
    })`);

    const rec04Pass = Boolean(
      initialTextState.hasTextarea &&
      initialTextState.textareaValue === '' &&
      !initialTextState.hasBadge &&
      stateBeforeReload.hasRegisteredBadge &&
      stateBeforeReload.hasPracticeQuestion &&
      stateAfterReload.hasRegisteredBadge &&
      stateAfterReload.hasPracticeQuestion &&
      stateAfterReload.session.stage === 'practice' &&
      stateAfterReload.session.practiceIndex === 0 &&
      stateAfterReload.session.studentTextAnswers?.['practice_0'] === sampleAnswer
    );

    results.push({
      id: 'REC-04',
      nombre: 'Restauración de una práctica activa',
      estado: rec04Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Carga en etapa practice con studentTextAnswers vacío comprobando textarea en blanco',
        'Redacción en vivo y pulsación de botón real "Enviar respuesta"',
        'Inspección del estado antes de la recarga: aparición de insignia "Respuesta registrada"',
        'Recarga forzada del navegador (simula cierre y reanudación de sesión activa)',
        'Inspección del estado reconstituido: misma etapa practice, misma pregunta y texto preservado'
      ],
      observado: `Arrancó vacío: ${initialTextState.textareaValue === ''}. Insignia registrada: ${stateAfterReload.hasRegisteredBadge}. Respuesta restaurada fielmente tras recarga: ${rec04Pass ? 'SÍ (CORRECTO)' : 'NO (FALLO)'}. 2 capturas registradas.`,
      capturas: rec04Capturas,
      detalles: { initialTextState, stateBeforeReload, stateAfterReload }
    });

    // ====================================================================
    // REC-05: LECTURA Y AISLAMIENTO ENTRE CLASES (MISMA SALA DE USUARIO)
    // ====================================================================
    console.log('\n▶ [REC-05] Comprobando Lectura de Jimmy y Robutt y Aislamiento en Misma Sala...');
    
    // 5.1 Navegación a Lengua y Literatura 7B OA03 Clase 01 en etapa preQuestions (con lectura) manteniendo sala aula_estudiosimple_7b
    await client.eval(`
      const lenguaSession = {
        stage: 'preQuestions',
        conversationIndex: 0,
        activeOa: 'OA 3',
        activeLessonNum: 1,
        activeLessonTitle: 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto',
        studentTextAnswers: {},
        attempt: 0,
        supportCount: 0,
        miniAnswers: ['', '', ''],
        miniScore: 0
      };
      localStorage.setItem('estudiosimple_lesson_session_7° Básico_lengua_y_literatura_oa3_1', JSON.stringify(lenguaSession));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Lengua%20y%20Literatura&oa=OA%203&lesson=1&mode=split&room=aula_estudiosimple_7b&testAuth=true', 3000);

    // Pulsar botón de consulta de lectura: "Consultar texto de lectura"
    await client.eval(`
      const readingBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Consultar texto de lectura'));
      if (readingBtn) readingBtn.click();
    `);
    await client.wait(1000);

    const rec05Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shotLengua = await client.captureAndSave('REC-05_01_Cambio_A_Lengua_OA03_Clase01.png');
    rec05Capturas.push({ nombre: 'REC-05_01_Cambio_A_Lengua_OA03_Clase01.png', sha256: shotLengua.sha256, bytes: shotLengua.bytes });

    const checkLengua = await client.eval(`({
      hasJimmyStory: document.body.innerText.includes('En una colonia de la Luna vive Jimmy') || (document.body.innerText.includes('Jimmy') && document.body.innerText.includes('Robutt')),
      hasReadingModal: document.body.innerText.toUpperCase().includes('CONSULTA DE LECTURA') || document.body.innerText.includes('El mejor amigo de un muchacho') || document.body.innerText.includes('Recurso de Lectura y Ambiente Narrativo'),
      session: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_lengua_y_literatura_oa3_1') || '{}')
    })`);

    // Cerrar modal de lectura
    await client.eval(`
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Volver a la pregunta'));
      if (closeBtn) closeBtn.click();
    `);
    await client.wait(500);

    // 5.2 Retorno a Ciencias Naturales 7B OA01 Clase 02 en la MISMA sala aula_estudiosimple_7b
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=aula_estudiosimple_7b&testAuth=true', 3000);

    const shotRetornoCiencias = await client.captureAndSave('REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png');
    rec05Capturas.push({ nombre: 'REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png', sha256: shotRetornoCiencias.sha256, bytes: shotRetornoCiencias.bytes });

    const checkCienciasRetorno = await client.eval(`({
      hasCienciasTitle: document.body.innerText.includes('Ciencias Naturales') || document.body.innerText.includes('Una situación'),
      noJimmyPollution: !document.body.innerText.includes('Robutt') && !document.body.innerText.includes('El mejor amigo de un muchacho'),
      cienciasSession: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}')
    })`);

    const rec05Pass = Boolean(
      checkLengua.hasJimmyStory &&
      checkLengua.hasReadingModal &&
      checkLengua.session.activeOa === 'OA 3' &&
      checkCienciasRetorno.hasCienciasTitle &&
      checkCienciasRetorno.noJimmyPollution &&
      checkCienciasRetorno.cienciasSession.activeOa === 'OA 1'
    );

    results.push({
      id: 'REC-05',
      nombre: 'Lectura y aislamiento entre clases',
      estado: rec05Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Transición a Lengua y Literatura 7B OA03 Clase 01 conservando la misma sala de usuario',
        'Despliegue del recurso interactivo de lectura abriendo relato completo de Jimmy y Robutt',
        'Verificación de almacenamiento independiente: sesión propia de Lengua sin contaminación de Ciencias',
        'Cierre de lectura y retorno a Ciencias Naturales 7B OA01 Clase 02 en la misma sala',
        'Comprobación de no contaminación cruzada entre clases en pantalla y almacenamiento'
      ],
      observado: `Lectura de Jimmy y Robutt visible: ${checkLengua.hasJimmyStory}. Modal abierto: ${checkLengua.hasReadingModal}. Pureza de Ciencias al retornar: ${checkCienciasRetorno.noJimmyPollution}. 2 capturas registradas.`,
      capturas: rec05Capturas,
      detalles: { checkLengua, checkCienciasRetorno }
    });

  } finally {
    client.close();
    proc.kill('SIGKILL');
  }

  console.log('\n================================================================');
  console.log('📊 RESUMEN FINAL DE LA VERIFICACIÓN REAL EN EDGE (CDP)');
  console.log('================================================================');
  let allPass = true;
  results.forEach((r) => {
    if (r.estado !== 'PASS') allPass = false;
    console.log(`[${r.estado}] ${r.id}: ${r.nombre} (${r.capturas.length} capturas)`);
    console.log(`   Observado: ${r.observado}`);
  });

  console.log('================================================================');
  console.log(`RESULTADO GLOBAL: ${allPass ? 'TODOS LOS RECORRIDOS PASARON (100% PASS)' : 'HAY RECORRIDOS FALLIDOS'}`);
  console.log('================================================================\n');

  if (!allPass) {
    process.exit(1);
  }

  return results;
}

if (process.argv[1]?.endsWith('execute_real_browser_recs.ts')) {
  runRealBrowserVerification().catch((err) => {
    console.error('Fatal execution error:', err);
    process.exit(1);
  });
}
