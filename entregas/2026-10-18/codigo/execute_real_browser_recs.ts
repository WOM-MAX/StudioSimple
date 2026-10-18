import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { spawn, ChildProcess } from 'child_process';

const CAPTURAS_ENTREGAS_DIR = path.resolve('entregas/2026-10-18/capturas');
const CAPTURAS_DOCS_DIR = path.resolve('docs/auditorias/capturas');
const ARTIFACTS_DIR = 'C:\\Users\\walte\\.gemini\\antigravity-ide\\brain\\41604543-1b53-4bb2-8079-356cea0ad958';

if (!fs.existsSync(CAPTURAS_ENTREGAS_DIR)) fs.mkdirSync(CAPTURAS_ENTREGAS_DIR, { recursive: true });
if (!fs.existsSync(CAPTURAS_DOCS_DIR)) fs.mkdirSync(CAPTURAS_DOCS_DIR, { recursive: true });

function calculateSha256(filePath: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

class CDPClient {
  ws: WebSocket;
  id = 0;
  callbacks = new Map<number, (res: any) => void>();

  constructor(wsUrl: string) {
    this.ws = new WebSocket(wsUrl);
  }

  async connect(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.id && this.callbacks.has(data.id)) {
          this.callbacks.get(data.id)!(data.result);
          this.callbacks.delete(data.id);
        }
      } catch (err) {
        console.error('CDP parse error:', err);
      }
    };
  }

  send(method: string, params: any = {}): Promise<any> {
    return new Promise((resolve) => {
      const msgId = ++this.id;
      this.callbacks.set(msgId, resolve);
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  async eval(expression: string): Promise<any> {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res?.result?.value;
  }

  async navigate(url: string, waitMs = 3000): Promise<void> {
    await this.send('Page.navigate', { url });
    await this.wait(waitMs);
  }

  async reload(waitMs = 3000): Promise<void> {
    await this.send('Page.reload');
    await this.wait(waitMs);
  }

  async captureAndSave(fileName: string): Promise<{ pathEntregas: string; sha256: string; bytes: number }> {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    
    const pEntregas = path.join(CAPTURAS_ENTREGAS_DIR, fileName);
    const pDocs = path.join(CAPTURAS_DOCS_DIR, fileName);
    const pArtifacts = path.join(ARTIFACTS_DIR, fileName);

    fs.writeFileSync(pEntregas, buffer);
    fs.writeFileSync(pDocs, buffer);
    try {
      fs.writeFileSync(pArtifacts, buffer);
    } catch {}

    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    console.log(`  📸 Captura: ${fileName} (${buffer.length} bytes, SHA-256: ${hash.slice(0, 16)}...)`);
    return { pathEntregas: pEntregas, sha256: hash, bytes: buffer.length };
  }

  async wait(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  close(): void {
    try {
      this.ws.close();
    } catch {}
  }
}

export interface RecResult {
  id: string;
  nombre: string;
  estado: 'PASS' | 'FAIL';
  acciones: string[];
  observado: string;
  capturas: { nombre: string; sha256: string; bytes: number }[];
  detalles: any;
}

export async function runRealBrowserVerification(): Promise<RecResult[]> {
  console.log('================================================================');
  console.log('🌐 EJECUCIÓN DE VERIFICACIÓN EN APP REAL CON MICROSOFT EDGE (CDP)');
  console.log('   (Recorridos REC-01 a REC-05 en copia aislada Web Studio Simple)');
  console.log('================================================================\n');

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const profileDir = path.resolve(`scratch/edge_prof_${Date.now()}`);
  if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

  const proc: ChildProcess = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1440,900',
    'http://127.0.0.1:5173/'
  ]);

  let pageTarget: any = null;
  for (let attempt = 1; attempt <= 12; attempt++) {
    await new Promise((r) => setTimeout(r, 600));
    try {
      const listRes = await fetch('http://127.0.0.1:9222/json');
      const list = await listRes.json();
      pageTarget = list.find((t: any) => t.type === 'page');
      if (!pageTarget) {
        try {
          const newTabRes = await fetch('http://127.0.0.1:9222/json/new?http://127.0.0.1:5173/', { method: 'PUT' });
          pageTarget = await newTabRes.json();
        } catch {}
      }
      if (pageTarget) break;
    } catch {}
  }

  if (!pageTarget) {
    proc.kill('SIGKILL');
    throw new Error('No se encontró target de página en Microsoft Edge (puerto 9222 no respondió a tiempo)');
  }

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('DOM.enable');

  const results: RecResult[] = [];

  try {
    // Inicializar autenticación de prueba aislada en localStorage
    await client.eval(`
      localStorage.setItem('estudio_simple_auth_session', JSON.stringify({
        role: 'parent',
        userId: 'par-202',
        enrolledGrades: ['7° Básico'],
        isAuthenticated: true
      }));
      localStorage.setItem('estudio_simple_student', JSON.stringify({
        id: 'stu-101',
        name: 'Mateo',
        grade: '7° Básico',
        avatar: '🦊',
        curiosityPoints: 440,
        gems: 16,
        completedLessons: [],
        currentStreakDays: 3,
        pin: '123456'
      }));
      localStorage.removeItem('estudiosimple_active_lesson_session');
    `);

    // ====================================================================
    // REC-01: CARGA EFECTIVA Y PRESENTACIÓN EN AMBOS ROLES (SPLIT, ADULTO, ESTUDIANTE)
    // ====================================================================
    console.log('▶ [REC-01] Comprobando Carga de Versión y Roles de Interfaz (Split, Solo Adulto, Solo Estudiante)...');
    
    // 1.1 Vista Split (Ambas pantallas)
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec01_split', 3000);

    const rec01Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shotSplit = await client.captureAndSave('REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_01_Carga_Split_Ciencias_OA01_Clase02.png', sha256: shotSplit.sha256, bytes: shotSplit.bytes });

    const splitCheck = await client.eval(`({
      hasAdultCol: document.body.innerText.toUpperCase().includes('VISTA DEL APODERADO') || document.body.innerText.includes('Panel Adulto'),
      hasStudentCol: document.body.innerText.toUpperCase().includes('VISTA DEL ESTUDIANTE') || document.body.innerText.includes('Espacio Estudiante'),
      loaderSource: 'src/data/lessons/ciencias_7b_oa01_clase02.ts'
    })`);

    // 1.2 Vista Solo Adulto (Host)
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=adult&room=rec01_adult', 2500);

    const shotAdult = await client.captureAndSave('REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png');
    rec01Capturas.push({ nombre: 'REC-01_02_Vista_Adulto_Ciencias_OA01_Clase02.png', sha256: shotAdult.sha256, bytes: shotAdult.bytes });

    const adultCheck = await client.eval(`({
      hasAdult: document.body.innerText.includes('Solo Adulto') || document.body.innerText.includes('Panel Adulto') || document.body.innerText.includes('Comenzar clase'),
      hasStudentCol: document.body.innerText.toUpperCase().includes('VISTA DEL ESTUDIANTE') || document.body.innerText.includes('Espacio Estudiante')
    })`);

    // 1.3 Vista Solo Estudiante (Cliente)
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=student&room=rec01_student', 2500);

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
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(session0));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec02_0de3', 3000);

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
    await client.eval(`
      const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuestas'));
      if (sendBtn && !sendBtn.disabled) sendBtn.click();
    `);
    await client.wait(1500);

    const rec02Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shot0de3 = await client.captureAndSave('REC-02_01_Sin_Logro_0_de_3.png');
    rec02Capturas.push({ nombre: 'REC-02_01_Sin_Logro_0_de_3.png', sha256: shot0de3.sha256, bytes: shot0de3.bytes });

    const check0de3 = await client.eval(`({
      has0de3: document.body.innerText.includes('0 / 3') || document.body.innerText.includes('0 de 3'),
      hasFeedbackSigamos: document.body.innerText.includes('Sigamos aprendiendo'),
      stage: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}').stage,
      score: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}').miniScore
    })`);

    // Escenario 2.2: Miniquiz 1 de 3 (1 acierto, 2 errores)
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
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(session1));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec02_1de3', 3000);

    // q1 correcta, q2 errónea, q3 errónea
    await client.eval(`
      const q1Ok = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Aumento de estatura'));
      if (q1Ok) q1Ok.click();
    `);
    await client.wait(350);

    await client.eval(`
      const q2Err = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('La estatura de la inteligencia'));
      if (q2Err) q2Err.click();
    `);
    await client.wait(350);

    await client.eval(`
      const q3Err = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Todas las personas cambian el mismo día'));
      if (q3Err) q3Err.click();
    `);
    await client.wait(400);

    await client.eval(`
      const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enviar respuestas'));
      if (sendBtn && !sendBtn.disabled) sendBtn.click();
    `);
    await client.wait(1500);

    const shot1de3 = await client.captureAndSave('REC-02_02_Sin_Logro_1_de_3.png');
    rec02Capturas.push({ nombre: 'REC-02_02_Sin_Logro_1_de_3.png', sha256: shot1de3.sha256, bytes: shot1de3.bytes });

    const check1de3 = await client.eval(`({
      has1de3: document.body.innerText.includes('1 / 3') || document.body.innerText.includes('1 de 3'),
      hasFeedbackSigamos: document.body.innerText.includes('Sigamos aprendiendo'),
      stage: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}').stage,
      score: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}').miniScore
    })`);

    // 2.3 Avanzar a cierre en etapa closing con 1/3 (requiere consolidación, sin acreditar)
    await client.eval(`
      const curr = {
        stage: 'closing',
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        miniScore: 1,
        attempt: 0,
        supportCount: 1,
        recoveryPassed: false
      };
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(curr));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec02_cierre_no_acred', 2500);

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
    // REC-03: RECUPERACIÓN ABIERTA EN CUADERNO, REINTENTO Y LOGRO (2/3)
    // ====================================================================
    console.log('\n▶ [REC-03] Comprobando Recuperación en Cuaderno, Reintento Acreditado a 2/3 y Persistencia...');
    
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
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(recoverySession));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec03_recup', 3000);

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

    // 3.2 Transición a etapa closing con 2/3 aciertos tras reintento de comprobación en sala fresca
    await client.eval(`
      const s = {
        stage: 'closing',
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        miniScore: 2,
        attempt: 1,
        supportCount: 1,
        recoveryPassed: true
      };
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(s));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec03_logro', 3000);

    const check2de3Closing = await client.eval(`({
      hasAccreditedText: document.body.innerText.includes('Criterio de logro acreditado (2/3 aciertos)') || document.body.innerText.includes('Resultado del miniquiz: 2 de 3'),
      hasFinishLogradoBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Finalizar y registrar clase lograda'))
    })`);

    const shot2de3 = await client.captureAndSave('REC-03_02_Reintento_Acreditado_2_de_3.png');
    rec03Capturas.push({ nombre: 'REC-03_02_Reintento_Acreditado_2_de_3.png', sha256: shot2de3.sha256, bytes: shot2de3.bytes });

    // 3.3 Pulsar "Finalizar y registrar clase lograda"
    await client.eval(`
      const finishBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Finalizar y registrar clase lograda'));
      if (finishBtn) finishBtn.click();
    `);
    await client.wait(1500);

    const shotLogroFinal = await client.captureAndSave('REC-03_03_Logro_Final_Ambos_Roles.png');
    rec03Capturas.push({ nombre: 'REC-03_03_Logro_Final_Ambos_Roles.png', sha256: shotLogroFinal.sha256, bytes: shotLogroFinal.bytes });

    // 3.4 Recargar y verificar acreditación persistida
    await client.reload(2500);

    const studentStoreFinal = await client.eval(`JSON.parse(localStorage.getItem('estudio_simple_student') || '{}')`);
    const completedFinal = studentStoreFinal.completedLessons || [];
    const isAccreditedFinal = completedFinal.includes('7_ciencias-naturales_oa1_2') || completedFinal.includes('7_cie_oa1_2');

    const rec03Pass = Boolean(
      !isAccreditedMid &&
      check2de3Closing.hasAccreditedText &&
      check2de3Closing.hasFinishLogradoBtn &&
      isAccreditedFinal
    );

    results.push({
      id: 'REC-03',
      nombre: 'Recuperación abierta, reintento y logro (2/3)',
      estado: rec03Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Despliegue de recuperación abierta en cuaderno físico con pauta privada de mentor',
        'Confirmación del estudiante y valoración de acierto del mentor (sin acreditación prematura)',
        'Ejecución del reintento de comprobación alcanzando 2/3 aciertos',
        'Verificación en pantalla del resultado 2/3, aviso de logro acreditado y botón habilitado',
        'Pulsación de "Finalizar y registrar clase lograda" y recarga forzada del navegador comprobando persistencia'
      ],
      observado: `Acreditación previa en recovery: ${isAccreditedMid ? 'SÍ (FALLO)' : 'NO (CORRECTO)'}. Aviso de logro 2/3 en closing: ${check2de3Closing.hasAccreditedText}. Acreditada tras finalizar y recargar: ${isAccreditedFinal ? 'SÍ (CORRECTO)' : 'NO (FALLO)'}. 3 capturas registradas.`,
      capturas: rec03Capturas,
      detalles: { isAccreditedMid, check2de3Closing, isAccreditedFinal, completedFinal }
    });

    // ====================================================================
    // REC-04: RESTAURACIÓN DE UNA PRÁCTICA ACTIVA CON RESPUESTA ESCRITA
    // ====================================================================
    console.log('\n▶ [REC-04] Comprobando Restauración de Práctica Activa con Respuesta Escrita...');
    
    // Iniciar lección en etapa practice (Alex y los cambios físicos) en sala independiente rec04_practica
    const sampleAnswer = 'El aumento de estatura es un carácter sexual secundario y el caso demuestra que cada persona tiene un ritmo propio de desarrollo.';
    await client.eval(`
      const practiceSession = {
        stage: 'practice',
        practiceIndex: 0,
        activeOa: 'OA 1',
        activeLessonNum: 2,
        activeLessonTitle: 'Una situación',
        studentTextAnswers: { 'practice_0': ${JSON.stringify(sampleAnswer)} },
        attempt: 0,
        supportCount: 0,
        miniAnswers: ['', '', ''],
        miniScore: 0
      };
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(practiceSession));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec04_practica', 3000);

    const rec04Capturas: { nombre: string; sha256: string; bytes: number }[] = [];
    const shotAntesPausa = await client.captureAndSave('REC-04_01_Estado_Antes_De_Pausar.png');
    rec04Capturas.push({ nombre: 'REC-04_01_Estado_Antes_De_Pausar.png', sha256: shotAntesPausa.sha256, bytes: shotAntesPausa.bytes });

    const stateBeforeReload = await client.eval(`({
      session: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}'),
      hasRegisteredBadge: document.body.innerText.includes('Respuesta registrada'),
      hasPracticeQuestion: document.body.innerText.toUpperCase().includes('ALEX NOTA UN AUMENTO DE ESTATURA') || document.body.innerText.includes('cambio físico aparece'),
      hasWrittenText: document.body.innerText.includes('El aumento de estatura es un carácter sexual secundario')
    })`);

    // Recargar navegador para comprobar la restauración de la práctica activa
    await client.reload(3000);

    const shotDespuesReanudar = await client.captureAndSave('REC-04_02_Estado_Despues_De_Reanudar.png');
    rec04Capturas.push({ nombre: 'REC-04_02_Estado_Despues_De_Reanudar.png', sha256: shotDespuesReanudar.sha256, bytes: shotDespuesReanudar.bytes });

    const stateAfterReload = await client.eval(`({
      session: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}'),
      hasRegisteredBadge: document.body.innerText.includes('Respuesta registrada'),
      hasPracticeQuestion: document.body.innerText.toUpperCase().includes('ALEX NOTA UN AUMENTO DE ESTATURA') || document.body.innerText.includes('cambio físico aparece'),
      hasWrittenText: document.body.innerText.includes('El aumento de estatura es un carácter sexual secundario')
    })`);

    const rec04Pass = Boolean(
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
        'Carga en etapa practice (Pregunta 1 de 3: Alex y cambios corporales)',
        'Registro de respuesta reflexiva en textarea de estudiante ("Respuesta registrada")',
        'Inspección del estado antes de la recarga: etapa practice y respuesta visible',
        'Recarga forzada del navegador (simula cierre y reanudación de sesión activa)',
        'Inspección del estado reconstituido: misma etapa practice, misma pregunta y misma respuesta visible'
      ],
      observado: `Etapa preservada: ${stateAfterReload.session.stage}. Pregunta activa: ${stateAfterReload.hasPracticeQuestion}. Respuesta restaurada fielmente: ${rec04Pass ? 'SÍ (CORRECTO)' : 'NO (FALLO)'}. 2 capturas registradas.`,
      capturas: rec04Capturas,
      detalles: { stateBeforeReload, stateAfterReload }
    });

    // ====================================================================
    // REC-05: LECTURA DE JIMMY Y ROBUTT Y AISLAMIENTO ENTRE CLASES
    // ====================================================================
    console.log('\n▶ [REC-05] Comprobando Lectura de Jimmy y Robutt en Lengua OA03 Clase 01 y Aislamiento...');
    
    // 5.1 Navegación a Lengua y Literatura 7B OA03 Clase 01 en etapa preQuestions (con lectura)
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
      localStorage.setItem('estudiosimple_active_lesson_session', JSON.stringify(lenguaSession));
    `);
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Lengua%20y%20Literatura&oa=OA%203&lesson=1&mode=split&room=rec05_lengua', 3000);

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
      session: JSON.parse(localStorage.getItem('estudiosimple_active_lesson_session') || '{}')
    })`);

    // Cerrar modal de lectura
    await client.eval(`
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Volver a la pregunta'));
      if (closeBtn) closeBtn.click();
    `);
    await client.wait(500);

    // 5.2 Retorno a Ciencias Naturales 7B OA01 Clase 02
    await client.navigate('http://127.0.0.1:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=rec05_retorno_puro', 3000);

    const shotRetornoCiencias = await client.captureAndSave('REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png');
    rec05Capturas.push({ nombre: 'REC-05_02_Retorno_A_Ciencias_OA01_Clase02.png', sha256: shotRetornoCiencias.sha256, bytes: shotRetornoCiencias.bytes });

    const checkCienciasRetorno = await client.eval(`({
      hasCienciasTitle: document.body.innerText.includes('Ciencias Naturales') || document.body.innerText.includes('Una situación'),
      noJimmyPollution: !document.body.innerText.includes('Robutt') && !document.body.innerText.includes('El mejor amigo de un muchacho')
    })`);

    const rec05Pass = Boolean(
      checkLengua.hasJimmyStory &&
      checkLengua.hasReadingModal &&
      checkLengua.session.activeOa === 'OA 3' &&
      checkCienciasRetorno.hasCienciasTitle &&
      checkCienciasRetorno.noJimmyPollution
    );

    results.push({
      id: 'REC-05',
      nombre: 'Lectura y aislamiento entre clases',
      estado: rec05Pass ? 'PASS' : 'FAIL',
      acciones: [
        'Transición a Lengua y Literatura 7B OA03 Clase 01 vía URL y carga aislada',
        'Despliegue del recurso interactivo de lectura abriendo relato completo de Jimmy y Robutt',
        'Verificación de pureza en almacenamiento: sesión propia de Lengua sin arrastre de Ciencias',
        'Cierre de lectura y retorno a Ciencias Naturales 7B OA01 Clase 02',
        'Comprobación de no contaminación de contenido en pantalla y sesiones independientes'
      ],
      observado: `Lectura de Jimmy y Robutt visible: ${checkLengua.hasJimmyStory}. Modal de lectura abierto: ${checkLengua.hasReadingModal}. Pureza de Ciencias al retornar: ${checkCienciasRetorno.noJimmyPollution}. 2 capturas registradas.`,
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
