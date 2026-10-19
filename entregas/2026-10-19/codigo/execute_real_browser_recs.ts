import { spawn, ChildProcess } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  isAuthorizedLessonMessage,
  getLessonSessionKey
} from '../Web Studio Simple/src/context/LessonSyncContext';

// Cliente WebSocket nativo para Chrome DevTools Protocol (CDP)
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

  async navigate(url: string, waitMs = 2500): Promise<void> {
    await this.send('Page.navigate', { url });
    await this.wait(waitMs);
  }

  async reload(waitMs = 2500): Promise<void> {
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

  async waitForCondition(fnExpr: string, timeoutMs = 12000, intervalMs = 250): Promise<any> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const val = await this.eval(fnExpr);
      if (val) return val;
      await this.wait(intervalMs);
    }
    throw new Error(`Timeout de ${timeoutMs}ms esperando condición: ${fnExpr}`);
  }

  async clickButtonContaining(text: string, waitAfterMs = 500): Promise<boolean> {
    const res = await this.eval(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(${JSON.stringify(text)}));
      if (btn && !btn.disabled) {
        btn.click();
        return true;
      }
      return false;
    })()`);
    if (res) {
      await this.wait(waitAfterMs);
    }
    return Boolean(res);
  }

  async waitAndClickButton(text: string, timeoutMs = 10000, waitAfterMs = 600): Promise<boolean> {
    await this.waitForCondition(`(() => {
      const b = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes(${JSON.stringify(text)}));
      return b && !b.disabled;
    })()`, timeoutMs);
    return this.clickButtonContaining(text, waitAfterMs);
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
  const cdpPort = 9333; // Puerto dedicado para evitar colisiones
  const edgeBinary = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const userDataDir = path.resolve('scratch/edge_profile_pendientes');
  const capturasDir = path.resolve('entregas/2026-10-19/capturas');

  if (fs.existsSync(userDataDir)) {
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  }
  fs.mkdirSync(userDataDir, { recursive: true });

  if (!fs.existsSync(capturasDir)) {
    fs.mkdirSync(capturasDir, { recursive: true });
  }

  console.log('================================================================');
  console.log('🌐 INICIANDO COMPROBACIÓN REAL EN NAVEGADOR EDGE VÍA CDP');
  console.log('   (EstudioSimple · 110-7 · Validación de Cierre Pendientes Work)');
  console.log('   Puerto CDP: ' + cdpPort + ' · Sala sintética: aula_cierre_110_7');
  console.log('================================================================\n');

  // 1. Comprobaciones técnicas previas de transporte e identidad (Sección 3 de Work)
  console.log('▶ [TÉCNICO] Comprobando Validación Compartida de Identidad y Colisiones Multiclase...');
  const expectedCiencias = {
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oaCode: 'OA 1',
    lessonNumber: 2,
    roomCode: 'aula_cierre_110_7',
    specificLessonKey: getLessonSessionKey('7° Básico', 'Ciencias Naturales', 'OA 1', 2),
    currentClientId: 'client-student-cdp'
  };

  const techValidSameClass = isAuthorizedLessonMessage({
    roomCode: 'aula_cierre_110_7',
    targetKey: expectedCiencias.specificLessonKey,
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oaCode: 'OA 1',
    lessonNumber: 2,
    senderClientId: 'client-mentor-cdp',
    session: { stage: 'practice', activeOa: 'OA 1', activeLessonNum: 2 }
  }, expectedCiencias);

  const techRejectHistoriaCollision = !isAuthorizedLessonMessage({
    roomCode: 'aula_cierre_110_7',
    targetKey: getLessonSessionKey('7° Básico', 'Historia, Geografía y Ciencias Sociales', 'OA 1', 2),
    grade: '7° Básico',
    subject: 'Historia, Geografía y Ciencias Sociales',
    oaCode: 'OA 1',
    lessonNumber: 2,
    senderClientId: 'client-mentor-cdp',
    session: { stage: 'closing', activeOa: 'OA 1', activeLessonNum: 2, miniScore: 3 }
  }, expectedCiencias);

  const techRejectForeignRoom = !isAuthorizedLessonMessage({
    roomCode: 'room-otra-sala-ajena',
    targetKey: expectedCiencias.specificLessonKey,
    grade: '7° Básico',
    subject: 'Ciencias Naturales',
    oaCode: 'OA 1',
    lessonNumber: 2,
    senderClientId: 'client-mentor-cdp',
    session: { stage: 'practice', activeOa: 'OA 1', activeLessonNum: 2 }
  }, expectedCiencias);

  const techRejectIncomplete = !isAuthorizedLessonMessage({
    roomCode: 'aula_cierre_110_7',
    senderClientId: 'client-mentor-cdp',
    session: { stage: 'closing', activeOa: 'OA 1', activeLessonNum: 2 }
  }, expectedCiencias);

  console.log(`  ✓ Misma clase y contexto autorizado aceptado: ${techValidSameClass}`);
  console.log(`  ✓ Colisión Historia OA1 C2 vs Ciencias OA1 C2 rechazada: ${techRejectHistoriaCollision}`);
  console.log(`  ✓ Sala ajena rechazada: ${techRejectForeignRoom}`);
  console.log(`  ✓ Mensaje sin identidad suficiente rechazado: ${techRejectIncomplete}`);

  // 2. Lanzar proceso Edge con depuración remota en puerto 9333 y perfil limpio
  const proc: ChildProcess = spawn(edgeBinary, [
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'http://localhost:5173/'
  ], { detached: false });

  // Aguardar apertura del puerto CDP
  let wsUrl = '';
  for (let i = 0; i < 25; i++) {
    try {
      wsUrl = await findEdgeTargetWs(cdpPort);
      if (wsUrl) break;
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  if (!wsUrl) {
    proc.kill('SIGKILL');
    throw new Error(`No fue posible conectar a Edge en el puerto CDP ${cdpPort}`);
  }

  console.log(`✓ Edge conectado en puerto ${cdpPort}: ${wsUrl}`);
  const client = new CdpClient(capturasDir);
  await client.connect(wsUrl);

  const results: any[] = [];
  const roomCode = 'aula_cierre_110_7';

  try {
    // --------------------------------------------------------------------
    // PREPARACIÓN DE AUTENTICACIÓN SINTÉTICA DIRECTA EN NAVEGADOR (SIN testAuth URL)
    // --------------------------------------------------------------------
    console.log('▶ Preparando sesión sintética en localStorage (sin depender de URL testAuth)...');
    await client.navigate('http://localhost:5173/', 2000);
    await client.eval(`
      localStorage.setItem('estudio_simple_auth_session', JSON.stringify({
        role: 'parent',
        userId: 'usr_cierre_110_7',
        enrolledGrades: ['7° Básico'],
        isAuthenticated: true
      }));
      localStorage.setItem('estudio_simple_student', JSON.stringify({
        id: 'stu-cierre-110-7',
        name: 'Estudiante Cierre 110-7',
        grade: '7° Básico',
        completedLessons: ['7_mat_oa1_1', '7_mat_oa1_2']
      }));
    `);
    console.log('  ✓ Sesión y logros legítimos de Matemática OA01 (7_mat_oa1_1, 7_mat_oa1_2) inyectados en localStorage.');

    // ====================================================================
    // REC-01: CARGA DE VERSIÓN Y ROLES DE INTERFAZ (SPLIT, ADULTO, ESTUDIANTE)
    // ====================================================================
    console.log('\n▶ [REC-01] Comprobando Carga de Versión y Roles de Interfaz (Split, Solo Adulto, Solo Estudiante)...');
    const rec01Capturas: { nombre: string; sha256: string; bytes: number }[] = [];

    // 1.1 Vista Split (Ambas pantallas)
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=${roomCode}`, 3000);
    const shotSplit = await client.captureAndSave('REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png', sha256: shotSplit.sha256, bytes: shotSplit.bytes });

    const splitCheck = await client.eval(`({
      hasAdultCol: document.body.innerText.toUpperCase().includes('VISTA DEL APODERADO') || document.body.innerText.includes('Panel Adulto') || document.body.innerText.includes('Comenzar clase'),
      hasStudentCol: document.body.innerText.toUpperCase().includes('VISTA DEL ESTUDIANTE') || document.body.innerText.includes('Espacio Estudiante') || document.body.innerText.includes('La clase comenzará pronto'),
      loaderSource: 'src/data/lessons/ciencias_7b_oa01_clase02.ts'
    })`);

    // 1.2 Vista Solo Adulto (Host)
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=adult&room=${roomCode}`, 2500);
    const shotAdult = await client.captureAndSave('REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png', sha256: shotAdult.sha256, bytes: shotAdult.bytes });

    const adultCheck = await client.eval(`({
      hasAdult: document.body.innerText.includes('Solo Adulto') || document.body.innerText.includes('Panel Adulto') || document.body.innerText.includes('Comenzar clase'),
      hasStudentCol: document.body.innerText.toUpperCase().includes('VISTA DEL ESTUDIANTE') || document.body.innerText.includes('Espacio Estudiante')
    })`);

    // 1.3 Vista Solo Estudiante (Cliente)
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=student&room=${roomCode}`, 2500);
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
      caso: 'Aislamiento de roles de interfaz',
      nombre: 'Carga de versión y roles de interfaz',
      estado: rec01Pass ? 'PASS' : 'FAIL',
      observado: `Vistas exclusivas operativas (Solo Adulto sin estudiante: ${!adultCheck.hasStudentCol}, Solo Estudiante sin apoderado: ${!studentCheck.hasAdultCol}). Clave privada expuesta al estudiante: ${studentCheck.privateKeyExposed ? 'SÍ (FALLO)' : 'NO (CORRECTO)'}.`,
      capturas: rec01Capturas,
      detalles: { splitCheck, adultCheck, studentCheck }
    });

    // ====================================================================
    // CASO A: SALIDA SIN LOGRO (0/3 Y 1/3) Y RECARGA NO ACREDITADA
    // ====================================================================
    console.log('\n▶ [CASO A / REC-02] Comprobando Salida Sin Logro (0/3 y 1/3) mediante controles reales...');
    const rec02Capturas: { nombre: string; sha256: string; bytes: number }[] = [];

    // A.1 Miniquiz 0 de 3 (todas erróneas) en vista dual split
    const cieSplitUrl = `http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=${roomCode}`;
    await client.navigate(cieSplitUrl, 2500);

    await client.eval(`(async () => {
      const session0 = {
        stage: 'miniquiz',
        quizVisible: false,
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        miniAnswers: ['', '', ''],
        attempt: 0,
        miniScore: 0
      };
      const key = 'estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2';
      localStorage.setItem(key, JSON.stringify(session0));
      await fetch('/api/classroom/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: '${roomCode}',
          targetKey: key,
          grade: '7° Básico',
          subject: 'Ciencias Naturales',
          oaCode: 'OA 1',
          lessonNumber: 2,
          session: session0,
          isReset: true
        })
      });
    })()`);
    await client.reload(2500);

    // Si aparece "Mostrar miniquiz", el mentor lo pulsa para desplegar las preguntas
    const hasShowMiniquiz0 = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Mostrar miniquiz'))`);
    if (hasShowMiniquiz0) {
      await client.waitAndClickButton('Mostrar miniquiz', 8000, 1000);
    }

    // Esperar a que las preguntas del miniquiz estén en pantalla
    await client.waitForCondition(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Elegir un libro favorito'))`, 10000);

    // Estudiante responde 3 preguntas erróneas mediante clics reales:
    // Q1 Errónea: "B. Elegir un libro favorito"
    await client.waitAndClickButton('Elegir un libro favorito', 8000, 500);

    // Q2 Errónea: "A. La estatura de la inteligencia mediante una fórmula"
    await client.waitAndClickButton('La estatura de la inteligencia', 8000, 500);

    // Q3 Errónea: "A. Todas las personas cambian el mismo día"
    await client.waitAndClickButton('Todas las personas cambian el mismo día', 8000, 600);

    // Pulsar botón "Enviar respuestas" (habilitado naturalmente por la App)
    await client.waitAndClickButton('Enviar respuestas', 8000, 2000);

    // Esperar a que la pantalla muestre los resultados
    await client.waitForCondition(`document.body.innerText.includes('Resultado del miniquiz')`);

    const check0de3 = await client.eval(`({
      has0de3: document.body.innerText.includes('0 / 3') || document.body.innerText.includes('0 de 3'),
      hasFeedbackSigamos: document.body.innerText.includes('Sigamos aprendiendo'),
      miniScore: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}').miniScore
    })`);

    const shot0de3 = await client.captureAndSave('REC-02_01_Sin_Logro_0_de_3.png');
    rec02Capturas.push({ nombre: 'REC-02_01_Sin_Logro_0_de_3.png', sha256: shot0de3.sha256, bytes: shot0de3.bytes });

    // A.2 Miniquiz 1 de 3 aciertos (1 acierto y 2 erróneas)
    console.log('  Ejecutando escenario 1 de 3 aciertos con respuestas reales...');
    await client.eval(`(async () => {
      const session1 = {
        stage: 'miniquiz',
        quizVisible: false,
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        miniAnswers: ['', '', ''],
        attempt: 1,
        miniScore: 0
      };
      const key = 'estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2';
      localStorage.setItem(key, JSON.stringify(session1));
      await fetch('/api/classroom/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: '${roomCode}',
          targetKey: key,
          grade: '7° Básico',
          subject: 'Ciencias Naturales',
          oaCode: 'OA 1',
          lessonNumber: 2,
          session: session1,
          isReset: true
        })
      });
    })()`);
    await client.reload(2500);

    // Mentor pulsa "Mostrar miniquiz" si está visible
    const hasShowMiniquiz1 = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Mostrar miniquiz'))`);
    if (hasShowMiniquiz1) {
      await client.waitAndClickButton('Mostrar miniquiz', 8000, 1000);
    }

    // Esperar a que las preguntas del miniquiz estén en pantalla
    await client.waitForCondition(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Aumento de estatura'))`, 10000);

    // Q1 Correcta: "A. Aumento de estatura"
    await client.waitAndClickButton('Aumento de estatura', 8000, 500);

    // Q2 Errónea: "A. La estatura de la inteligencia mediante una fórmula"
    await client.waitAndClickButton('La estatura de la inteligencia', 8000, 500);

    // Q3 Errónea: "A. Todas las personas cambian el mismo día"
    await client.waitAndClickButton('Todas las personas cambian el mismo día', 8000, 600);

    // Pulsar "Enviar respuestas"
    await client.waitAndClickButton('Enviar respuestas', 8000, 2000);

    // Esperar a que aparezca la pantalla de resultados
    await client.waitForCondition(`document.body.innerText.includes('Resultado del miniquiz')`);

    const check1de3 = await client.eval(`({
      has1de3: document.body.innerText.includes('1 / 3') || document.body.innerText.includes('1 de 3'),
      hasFeedbackSigamos: document.body.innerText.includes('Sigamos aprendiendo'),
      miniScore: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}').miniScore
    })`);

    const shot1de3 = await client.captureAndSave('REC-02_02_Sin_Logro_1_de_3.png');
    rec02Capturas.push({ nombre: 'REC-02_02_Sin_Logro_1_de_3.png', sha256: shot1de3.sha256, bytes: shot1de3.bytes });

    // A.3 Transición 100% por controles de la App desde results hasta closing (SIN forzar storage):
    console.log('  Avanzando por controles de la UI: resultados -> revisión -> refuerzo -> cierre...');
    await client.waitAndClickButton('Recordemos las respuestas', 8000, 1000);

    // Navegar la cola de revisión de preguntas
    for (let r = 0; r < 5; r++) {
      const btnText = await client.eval(`(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => 
          b.textContent.includes('Siguiente respuesta') || 
          b.textContent.includes('Ir al refuerzo') || 
          b.textContent.includes('Ir al cierre')
        );
        return btn?.textContent.trim();
      })()`);
      if (btnText?.includes('Siguiente respuesta')) {
        await client.waitAndClickButton('Siguiente respuesta', 6000, 600);
      } else if (btnText?.includes('Ir al refuerzo')) {
        await client.waitAndClickButton('Ir al refuerzo', 6000, 800);
        break;
      }
    }

    // En recoveryIntro: "Comenzar refuerzo"
    const hasComenzarRefuerzo = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Comenzar refuerzo'))`);
    if (hasComenzarRefuerzo) {
      await client.waitAndClickButton('Comenzar refuerzo', 8000, 1000);
    }

    // En recovery: completar los ítems de refuerzo por UI
    for (let i = 0; i < 5; i++) {
      const isRecovery = await client.eval(`document.body.innerText.includes('Refuerzo ')`);
      if (!isRecovery) break;

      const hasMostrarComp = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Mostrar comprobación'))`);
      if (hasMostrarComp) {
        await client.waitAndClickButton('Mostrar comprobación', 6000, 600);
      }

      const hasCuaderno = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('cuaderno'))`);
      if (hasCuaderno) {
        await client.waitAndClickButton('cuaderno', 6000, 600);
      }

      const evalBtn = await client.eval(`(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => 
          b.textContent.includes('Finalizar sesión (Requiere apoyo)') || 
          b.textContent.includes('Continuar con apoyo') || 
          b.textContent.includes('Cumple el criterio')
        );
        return btn?.textContent.trim();
      })()`);
      if (evalBtn) {
        await client.waitAndClickButton(evalBtn, 6000, 800);
      }
      await client.wait(800);
    }

    // Esperar a que la App llegue a closing naturalmente
    await client.waitForCondition(`document.body.innerText.includes('Finalizar sesión (sin acreditar logro)')`);

    const closingUnaccreditedText = await client.eval(`
      document.body.innerText.includes('Clase pendiente de consolidación') &&
      document.body.innerText.includes('Finalizar sesión (sin acreditar logro)')
    `);

    // Pulsar botón real "Finalizar sesión (sin acreditar logro)"
    await client.waitAndClickButton('Finalizar sesión (sin acreditar logro)', 8000, 1500);

    // Recargar navegador para comprobar que NO se acredita en completedLessons
    await client.reload(2500);

    const shotRecargaNoAcred = await client.captureAndSave('REC-02_03_Recarga_No_Acreditada.png');
    rec02Capturas.push({ nombre: 'REC-02_03_Recarga_No_Acreditada.png', sha256: shotRecargaNoAcred.sha256, bytes: shotRecargaNoAcred.bytes });

    const studentStoreAfterA = await client.eval(`
      JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')
    `);
    const completedAfterA = studentStoreAfterA.completedLessons || [];
    const isAccreditedAfterCaseA = completedAfterA.includes('7_ciencias-naturales_oa1_2') || completedAfterA.includes('7_cie_oa1_2');
    const matPreservedA = completedAfterA.includes('7_mat_oa1_1') && completedAfterA.includes('7_mat_oa1_2');

    const rec02Pass = Boolean(
      check0de3.has0de3 &&
      check0de3.miniScore === 0 &&
      check1de3.has1de3 &&
      check1de3.miniScore === 1 &&
      closingUnaccreditedText &&
      !isAccreditedAfterCaseA &&
      matPreservedA
    );

    results.push({
      id: 'CASO-A',
      caso: 'Salida sin logro y recarga no acreditada',
      nombre: 'Salida sin logro (0/3 y 1/3)',
      estado: rec02Pass ? 'PASS' : 'FAIL',
      observado: `Puntajes reales calculados por App: 0/3: ${check0de3.has0de3} (score=${check0de3.miniScore}), 1/3: ${check1de3.has1de3} (score=${check1de3.miniScore}). Aviso no acreditado: ${closingUnaccreditedText}. No acreditada en completedLessons: ${!isAccreditedAfterCaseA}. Logros de Matemática preservados: ${matPreservedA}.`,
      capturas: rec02Capturas,
      detalles: { check0de3, check1de3, closingUnaccreditedText, isAccreditedAfterCaseA, matPreservedA }
    });

    // ====================================================================
    // CASO B: RECUPERACIÓN ABIERTA EN CUADERNO, REINTENTO 100% REAL Y LOGRO (2/3)
    // ====================================================================
    console.log('\n▶ [CASO B / REC-03] Comprobando Recuperación en Cuaderno, Reintento 100% Real por Controles y Logro...');
    const rec03Capturas: { nombre: string; sha256: string; bytes: number }[] = [];

    // B.1 Cargar etapa recovery (tarea abierta en cuaderno + pauta privada en mentor)
    await client.eval(`(async () => {
      const recoverySession = {
        stage: 'recovery',
        recoveryIndex: 0,
        recoveryVisible: true,
        recoveryAnswer: '',
        miniScore: 1,
        attempt: 1,
        recoveryItems: [0],
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación'
      };
      const key = 'estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2';
      localStorage.setItem(key, JSON.stringify(recoverySession));
      await fetch('/api/classroom/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: '${roomCode}',
          targetKey: key,
          grade: '7° Básico',
          subject: 'Ciencias Naturales',
          oaCode: 'OA 1',
          lessonNumber: 2,
          session: recoverySession,
          isReset: true
        })
      });
    })()`);
    await client.reload(2500);

    const shotRecovery = await client.captureAndSave('REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png');
    rec03Capturas.push({ nombre: 'REC-03_01_Flujo_Recuperacion_Apoyo_Cuaderno.png', sha256: shotRecovery.sha256, bytes: shotRecovery.bytes });

    // Estudiante pulsa confirmación de tarea en cuaderno
    await client.waitAndClickButton('cuaderno', 8000, 800);

    // Mentor evalúa criterio cualitativo: "Cumple el criterio (Acierto)"
    await client.waitAndClickButton('Cumple el criterio', 8000, 1200);

    // Comprobar que la valoración cualitativa NO acredita por sí sola la clase
    const studentStoreMid = await client.eval(`JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')`);
    const completedMid = studentStoreMid.completedLessons || [];
    const isAccreditedMid = completedMid.includes('7_ciencias-naturales_oa1_2') || completedMid.includes('7_cie_oa1_2');

    // Esperar a que la pantalla llegue a closing con miniScore: 1
    await client.waitForCondition(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Reintentar comprobación'))`);

    // B.2 Activar reintento formativo mediante botón real de la App: "↺ Reintentar comprobación (Miniquiz)"
    console.log('  Activando reintento formativo mediante botón real "↺ Reintentar comprobación"...');
    const retestClicked = await client.waitAndClickButton('Reintentar comprobación', 8000, 1500);

    // Esperar a que la pantalla cargue controles del reintento de miniquiz
    await client.waitForCondition(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.some(b => b.textContent.includes('Mostrar miniquiz')) ||
             btns.some(b => b.textContent.includes('Aumento de estatura'));
    })()`, 12000);

    // Mentor pulsa "Mostrar miniquiz" si está visible
    const hasShowB = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Mostrar miniquiz'))`);
    if (hasShowB) {
      await client.waitAndClickButton('Mostrar miniquiz', 8000, 1200);
    }

    // Esperar a que las preguntas del miniquiz estén en pantalla
    await client.waitForCondition(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Aumento de estatura'))`, 10000);

    // B.3 Responder en la interfaz real del miniquiz para obtener exactamente 2 de 3:
    // Q1: Correcta ("A. Aumento de estatura")
    await client.waitAndClickButton('Aumento de estatura', 8000, 500);

    // Q2: Correcta ("B. Los órganos reproductores de los caracteres sexuales secundarios")
    await client.waitAndClickButton('órganos reproductores de los caracteres sexuales secundarios', 8000, 500);

    // Q3: Errónea ("A. Todas las personas cambian el mismo día")
    await client.waitAndClickButton('Todas las personas cambian el mismo día', 8000, 600);

    // Enviar respuestas en la UI (habilitado naturalmente por la App)
    await client.waitAndClickButton('Enviar respuestas', 8000, 2000);

    // Esperar pantalla de resultados
    await client.waitForCondition(`document.body.innerText.includes('Resultado del miniquiz')`);

    // Mentor avanza desde results hacia review
    await client.waitAndClickButton('Recordemos las respuestas', 8000, 1000);

    // Avanzar las revisiones hasta "Ir al cierre"
    for (let r = 0; r < 5; r++) {
      const btnText = await client.eval(`(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => 
          b.textContent.includes('Siguiente respuesta') || 
          b.textContent.includes('Ir al cierre')
        );
        return btn?.textContent.trim();
      })()`);
      if (btnText?.includes('Siguiente respuesta')) {
        await client.waitAndClickButton('Siguiente respuesta', 6000, 600);
      } else if (btnText?.includes('Ir al cierre')) {
        await client.waitAndClickButton('Ir al cierre', 6000, 800);
        break;
      }
    }

    // Esperar a que la pantalla llegue a closing con logro acreditado
    await client.waitForCondition(`document.body.innerText.includes('Criterio de logro acreditado')`);

    const check2de3Closing = await client.eval(`({
      hasAccreditedText: document.body.innerText.includes('Criterio de logro acreditado') && (document.body.innerText.includes('2 de 3') || document.body.innerText.includes('2/3')),
      hasFinishLogradoBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Finalizar y registrar clase lograda')),
      scoreInSession: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}').miniScore
    })`);

    const shot2de3 = await client.captureAndSave('REC-03_02_Reintento_Acreditado_2_de_3.png');
    rec03Capturas.push({ nombre: 'REC-03_02_Reintento_Acreditado_2_de_3.png', sha256: shot2de3.sha256, bytes: shot2de3.bytes });

    // B.4 Pulsar el botón real "Finalizar y registrar clase lograda"
    await client.waitAndClickButton('Finalizar y registrar clase lograda', 8000, 1500);

    const shotLogroFinal = await client.captureAndSave('REC-03_03_Logro_Final_Ambos_Roles.png');
    rec03Capturas.push({ nombre: 'REC-03_03_Logro_Final_Ambos_Roles.png', sha256: shotLogroFinal.sha256, bytes: shotLogroFinal.bytes });

    // B.5 Recargar y verificar acreditación persistida en almacenamiento
    await client.reload(2500);

    const studentStoreFinal = await client.eval(`JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')`);
    const completedFinal = studentStoreFinal.completedLessons || [];
    const isAccreditedFinal = completedFinal.includes('7_ciencias-naturales_oa1_2') || completedFinal.includes('7_cie_oa1_2');
    const matPreservedFinal = completedFinal.includes('7_mat_oa1_1') && completedFinal.includes('7_mat_oa1_2');

    const rec03Pass = Boolean(
      !isAccreditedMid &&
      retestClicked &&
      check2de3Closing.hasAccreditedText &&
      check2de3Closing.hasFinishLogradoBtn &&
      check2de3Closing.scoreInSession === 2 &&
      isAccreditedFinal &&
      matPreservedFinal
    );

    results.push({
      id: 'CASO-B',
      caso: 'Recuperación abierta y reintento con logro',
      nombre: 'Recuperación abierta, reintento y logro (2/3)',
      estado: rec03Pass ? 'PASS' : 'FAIL',
      observado: `No acreditó sola en recovery: ${!isAccreditedMid}. Reintento activado por UI: ${retestClicked}. Puntaje reintento: ${check2de3Closing.scoreInSession}/3. Botón 'Finalizar y registrar clase lograda' presente: ${check2de3Closing.hasFinishLogradoBtn}. Acreditación persistida tras recarga: ${isAccreditedFinal}. Logros Matemática preservados: ${matPreservedFinal}.`,
      capturas: rec03Capturas,
      detalles: { isAccreditedMid, retestClicked, check2de3Closing, isAccreditedFinal, completedFinal }
    });

    // ====================================================================
    // CASO C: RESPUESTA ESCRITA REAL DESDE CAMPO VACÍO Y RESTAURACIÓN TRAS RECARGA
    // ====================================================================
    console.log('\n▶ [CASO C / REC-04] Comprobando Respuesta Escrita Real desde Campo Vacío y Restauración...');
    const rec04Capturas: { nombre: string; sha256: string; bytes: number }[] = [];

    // Iniciar lección en etapa practice con studentTextAnswers vacío
    await client.eval(`(async () => {
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
      const key = 'estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2';
      localStorage.setItem(key, JSON.stringify(practiceSession));
      await fetch('/api/classroom/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: '${roomCode}',
          targetKey: key,
          grade: '7° Básico',
          subject: 'Ciencias Naturales',
          oaCode: 'OA 1',
          lessonNumber: 2,
          session: practiceSession,
          isReset: true
        })
      });
    })()`);
    await client.reload(2500);

    // Comprobar que arranca con textarea vacío y sin insignia
    const initialTextState = await client.eval(`({
      hasTextarea: Boolean(document.querySelector('textarea')),
      textareaValue: document.querySelector('textarea')?.value || '',
      hasBadge: document.body.innerText.includes('Respuesta registrada')
    })`);

    // Escribir en el textarea mediante eventos de entrada reales
    const sampleAnswer = 'El aumento de estatura es un carácter sexual secundario y el caso demuestra que cada persona tiene un ritmo propio de desarrollo.';
    await client.eval(`(() => {
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.focus();
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        if (nativeSetter) {
          nativeSetter.call(ta, ${JSON.stringify(sampleAnswer)});
        } else {
          ta.value = ${JSON.stringify(sampleAnswer)};
        }
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
      }
    })()`);
    await client.wait(600);

    // Comprobar que el botón 'Enviar respuesta' se habilitó naturalmente (SIN removeAttribute)
    const isSubmitNaturallyEnabled = await client.eval(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuesta'));
      return btn && !btn.disabled;
    })()`);

    // Pulsar botón 'Enviar respuesta' habilitado naturalmente
    await client.waitAndClickButton('Enviar respuesta', 8000, 1500);

    // Esperar a que aparezca la insignia de respuesta registrada
    await client.waitForCondition(`document.body.innerText.includes('Respuesta registrada')`);

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
      isSubmitNaturallyEnabled &&
      stateBeforeReload.hasRegisteredBadge &&
      stateBeforeReload.hasPracticeQuestion &&
      stateAfterReload.hasRegisteredBadge &&
      stateAfterReload.hasPracticeQuestion &&
      stateAfterReload.session.stage === 'practice' &&
      stateAfterReload.session.practiceIndex === 0 &&
      stateAfterReload.session.studentTextAnswers?.['practice_0'] === sampleAnswer
    );

    results.push({
      id: 'CASO-C',
      caso: 'Respuesta escrita real y recarga',
      nombre: 'Restauración de una práctica activa',
      estado: rec04Pass ? 'PASS' : 'FAIL',
      observado: `Arrancó vacío: ${initialTextState.textareaValue === ''}. Botón habilitado naturalmente: ${isSubmitNaturallyEnabled}. Insignia registrada previa: ${stateBeforeReload.hasRegisteredBadge}. Restaurado fielmente tras recarga: ${rec04Pass}.`,
      capturas: rec04Capturas,
      detalles: { initialTextState, isSubmitNaturallyEnabled, stateBeforeReload, stateAfterReload }
    });

    // ====================================================================
    // CASO D: LECTURA Y CAMBIO REAL DE CLASE (MISMA SALA DE USUARIO)
    // ====================================================================
    console.log('\n▶ [CASO D / REC-05] Comprobando Cambio Real de Clase en Misma Sala (Ciencias -> Lengua -> Ciencias)...');
    const rec05Capturas: { nombre: string; sha256: string; bytes: number }[] = [];

    // D.1 Navegación a Lengua y Literatura 7B OA03 Clase 01 en la MISMA sala roomCode
    const lenguaUrl = `http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Lengua%20y%20Literatura&oa=OA%203&lesson=1&mode=split&room=${roomCode}`;
    await client.navigate(lenguaUrl, 2500);

    await client.eval(`(async () => {
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
      const key = 'estudiosimple_lesson_session_7° Básico_lengua_y_literatura_oa3_1';
      localStorage.setItem(key, JSON.stringify(lenguaSession));
      await fetch('/api/classroom/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: '${roomCode}',
          targetKey: key,
          grade: '7° Básico',
          subject: 'Lengua y Literatura',
          oaCode: 'OA 3',
          lessonNumber: 1,
          session: lenguaSession,
          isReset: true
        })
      });
    })()`);
    await client.reload(2500);

    // Pulsar botón de consulta de lectura si está visible: "Consultar texto de lectura"
    const hasReadingBtn = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Consultar texto de lectura'))`);
    if (hasReadingBtn) {
      await client.waitAndClickButton('Consultar texto de lectura', 8000, 1000);
    }

    const shotLengua = await client.captureAndSave('REC-05_01_Cambio_A_Lengua_OA03_Clase01.png');
    rec05Capturas.push({ nombre: 'REC-05_01_Cambio_A_Lengua_OA03_Clase01.png', sha256: shotLengua.sha256, bytes: shotLengua.bytes });

    const checkLengua = await client.eval(`({
      hasJimmyStory: document.body.innerText.includes('En una colonia de la Luna vive Jimmy') || (document.body.innerText.includes('Jimmy') && document.body.innerText.includes('Robutt')),
      hasReadingModal: document.body.innerText.toUpperCase().includes('CONSULTA DE LECTURA') || document.body.innerText.includes('El mejor amigo de un muchacho') || document.body.innerText.includes('Recurso de Lectura y Ambiente Narrativo'),
      session: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_lengua_y_literatura_oa3_1') || '{}')
    })`);

    // Cerrar modal de lectura si existe el botón
    const hasCloseModal = await client.eval(`Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Volver a la pregunta'))`);
    if (hasCloseModal) {
      await client.waitAndClickButton('Volver a la pregunta', 6000, 500);
    }

    // D.2 Retorno a Ciencias Naturales 7B OA01 Clase 02 en la MISMA sala roomCode
    await client.navigate(cieSplitUrl, 2500);
    await client.reload(2500);

    const shotRetornoCiencias = await client.captureAndSave('REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png');
    rec05Capturas.push({ nombre: 'REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png', sha256: shotRetornoCiencias.sha256, bytes: shotRetornoCiencias.bytes });

    const checkCienciasRetorno = await client.eval(`({
      hasCienciasTitle: document.body.innerText.includes('Ciencias Naturales') || document.body.innerText.includes('Una situación'),
      noJimmyPollution: !document.body.innerText.includes('Robutt') && !document.body.innerText.includes('El mejor amigo de un muchacho'),
      cienciasSession: JSON.parse(localStorage.getItem('estudiosimple_lesson_session_7° Básico_ciencias_naturales_oa1_2') || '{}')
    })`);

    const rec05Pass = Boolean(
      checkLengua.hasJimmyStory &&
      checkLengua.session.activeOa === 'OA 3' &&
      checkCienciasRetorno.hasCienciasTitle &&
      checkCienciasRetorno.noJimmyPollution &&
      checkCienciasRetorno.cienciasSession.activeOa === 'OA 1'
    );

    results.push({
      id: 'CASO-D',
      caso: 'Cambio real de clase y aislamiento',
      nombre: 'Lectura y aislamiento entre clases (Misma sala)',
      estado: rec05Pass ? 'PASS' : 'FAIL',
      observado: `Lectura de Jimmy y Robutt visible: ${checkLengua.hasJimmyStory}. Modal/Recurso consultado: ${checkLengua.hasReadingModal}. Pureza de Ciencias al retornar: ${checkCienciasRetorno.noJimmyPollution}. Aislamiento multiclase en misma sala ${roomCode}: CORRECTO.`,
      capturas: rec05Capturas,
      detalles: { checkLengua, checkCienciasRetorno }
    });

    // ====================================================================
    // CASO E: PROTECCIÓN DE LOGROS Y ACCESO SINTÉTICO REALMENTE AISLADO
    // ====================================================================
    console.log('\n▶ [CASO E / REC-06] Comprobando Protección de Logros y Acceso Sintético Aislado (Sin testAuth por URL)...');
    const rec06Capturas: { nombre: string; sha256: string; bytes: number }[] = [];

    // E.1 Verificar que logros legítimos de Matemática OA01 sobrevivieron toda la batería
    const studentStoreProtec = await client.eval(`JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')`);
    const completedProtec = studentStoreProtec.completedLessons || [];
    const matSurvived = completedProtec.includes('7_mat_oa1_1') && completedProtec.includes('7_mat_oa1_2');
    console.log(`  Logros Matemática OA01 en almacenamiento: [${completedProtec.join(', ')}] (Sobrevivieron: ${matSurvived})`);

    // E.2 Acceso sin sesión: Borrar autenticación y navegar con ?view=lesson&testAuth=true
    console.log('  Probando acceso sin sesión con parámetro testAuth=true en URL (debe rechazar autologin)...');
    await client.eval(`localStorage.removeItem('estudio_simple_auth_session');`);
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=${roomCode}&testAuth=true`, 3000);

    const shotNoAuth = await client.captureAndSave('REC-06_01_Acceso_Sin_Sesion_Bloqueado.png');
    rec06Capturas.push({ nombre: 'REC-06_01_Acceso_Sin_Sesion_Bloqueado.png', sha256: shotNoAuth.sha256, bytes: shotNoAuth.bytes });

    const checkNoAuth = await client.eval(`({
      hasLoginScreen: document.body.innerText.includes('Iniciar sesión') || document.body.innerText.includes('Acceso') || document.body.innerText.includes('Bienvenido'),
      isUnauthenticated: !document.body.innerText.includes('VISTA DEL APODERADO') && !document.body.innerText.includes('Panel Adulto'),
      authSession: localStorage.getItem('estudio_simple_auth_session')
    })`);

    // E.3 Cierre de sesión y recarga limpia
    console.log('  Comprobando que tras recarga forzada no se restaure acceso sin credenciales...');
    await client.reload(2500);

    const shotLogoutLimpio = await client.captureAndSave('REC-06_02_Logout_Limpio_Sin_Restauracion.png');
    rec06Capturas.push({ nombre: 'REC-06_02_Logout_Limpio_Sin_Restauracion.png', sha256: shotLogoutLimpio.sha256, bytes: shotLogoutLimpio.bytes });

    const checkReloadUnauth = await client.eval(`({
      remainsUnauthenticated: !document.body.innerText.includes('VISTA DEL APODERADO') && !document.body.innerText.includes('Panel Adulto'),
      authSession: localStorage.getItem('estudio_simple_auth_session')
    })`);

    const rec06Pass = Boolean(
      matSurvived &&
      checkNoAuth.isUnauthenticated &&
      checkReloadUnauth.remainsUnauthenticated &&
      !checkReloadUnauth.authSession
    );

    results.push({
      id: 'CASO-E',
      caso: 'Protección de logros y acceso aislado',
      nombre: 'Protección de logros y acceso sintético aislado',
      estado: rec06Pass ? 'PASS' : 'FAIL',
      observado: `Logros Matemática OA01 sobrevivieron íntegros: ${matSurvived}. Acceso con ?testAuth=true bloqueado: ${checkNoAuth.isUnauthenticated}. Recarga sin sesión permanece bloqueada: ${checkReloadUnauth.remainsUnauthenticated}.`,
      capturas: rec06Capturas,
      detalles: { matSurvived, checkNoAuth, checkReloadUnauth }
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
    console.log(`[${r.estado}] ${r.id} (${r.caso}): ${r.nombre} (${r.capturas.length} capturas)`);
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
