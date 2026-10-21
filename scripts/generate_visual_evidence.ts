import { spawn, ChildProcess } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class CdpClient {
  private ws: any;
  private idCounter = 1;
  private callbacks = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>();
  public outputDir: string;

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

  async eval(expression: string): Promise<any> {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result ? res.result.value : null;
  }

  async captureAndSave(filename: string): Promise<{ filename: string; sha256: string; bytes: number }> {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const targetPath = path.join(this.outputDir, filename);
    fs.writeFileSync(targetPath, buffer);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    console.log(`  📸 Captura generada: ${filename} (${buffer.length} bytes, SHA-256: ${hash})`);
    return { filename, sha256: hash, bytes: buffer.length };
  }

  wait(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function findEdgeTargetWs(port: number): Promise<string> {
  for (let i = 0; i < 25; i++) {
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json`, res => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve(body));
        });
        req.on('error', reject);
      });
      const targets = JSON.parse(data);
      const page = targets.find((t: any) => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error('No se encontró página en Edge CDP en el puerto ' + port);
}

async function ensureViteServer(port = 5173): Promise<{ proc?: ChildProcess; cleanup: () => void }> {
  const isUp = await new Promise<boolean>(resolve => {
    const req = http.get(`http://localhost:${port}/`, res => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
  });

  if (isUp) {
    console.log(`Vite dev server ya está activo en puerto ${port}`);
    return { cleanup: () => {} };
  }

  console.log(`Iniciando Vite dev server en puerto ${port}...`);
  const proc = spawn('npx', ['vite', '--port', String(port)], {
    cwd: path.resolve('Web Studio Simple'),
    shell: true
  });

  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 800));
    const up = await new Promise<boolean>(resolve => {
      const req = http.get(`http://localhost:${port}/`, res => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
    });
    if (up) {
      console.log(`Vite dev server listo en http://localhost:${port}/`);
      return {
        proc,
        cleanup: () => {
          proc.kill();
        }
      };
    }
  }

  proc.kill();
  throw new Error('Vite dev server no inició a tiempo');
}

export async function runVisualEvidence() {
  console.log('================================================================');
  console.log('📸 GENERACIÓN DE EVIDENCIA VISUAL FOCALIZADA (EDGE CDP)');
  console.log('================================================================\n');

  const capturesDir = path.resolve('scratch/capturas_evidencia_final');
  if (!fs.existsSync(capturesDir)) fs.mkdirSync(capturesDir, { recursive: true });

  const { proc: viteProc, cleanup: cleanupVite } = await ensureViteServer(5173);

  const cdpPort = 9230;
  const userDir = path.resolve('scratch/edge_visual_evidence_profile_6');
  if (fs.existsSync(userDir)) {
    fs.rmSync(userDir, { recursive: true, force: true });
  }
  fs.mkdirSync(userDir, { recursive: true });

  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  const edgeExe = edgePaths.find(p => fs.existsSync(p)) || 'msedge.exe';

  const edgeProc = spawn(edgeExe, [
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--window-size=1600,1000'
  ]);

  const client = new CdpClient(capturesDir);
  const evidenceList: any[] = [];

  try {
    const wsUrl = await findEdgeTargetWs(cdpPort);
    await client.connect(wsUrl);

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    const freshRoom = 'ROOM_VERIF_EVAL_' + Date.now();

    // Inicializar perfil sintético con sesión en 'practice' Caso 1 para Lengua OA03 Clase 01
    await client.navigate('http://localhost:5173/', 2000);
    await client.eval(`
      localStorage.clear();
      localStorage.setItem('estudio_simple_auth_session', JSON.stringify({
        role: 'parent',
        userId: 'usr_work_eval',
        name: 'Mentor Evaluación Work',
        enrolledGrades: ['7° Básico'],
        isAuthenticated: true
      }));
      localStorage.setItem('estudio_simple_student', JSON.stringify({
        id: 'stu-work-eval',
        name: 'Estudiante Evaluación Work',
        grade: '7° Básico',
        completedLessons: []
      }));
      const sessionKey = 'estudiosimple_lesson_session_7° Básico_lengua_y_literatura_oa3_1';
      localStorage.setItem(sessionKey, JSON.stringify({
        stage: 'practice',
        activeOa: 'OA 3',
        activeLessonNum: 1,
        activeLessonTitle: 'Jimmy y Robutt: leer el ambiente y descubrir el conflicto',
        practiceIndex: 0,
        feedback: null,
        attempt: 0,
        conversationIndex: 0,
        postIndex: 0,
        summaryIdea: 0,
        quizVisible: false,
        studentConnected: true,
        studentTextAnswers: {}
      }));
    `);

    // Navegar a Lengua OA03 Clase 01 en modo split con sala fresca
    const targetUrl = `http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Lengua%20y%20Literatura&oa=OA%203&lesson=1&mode=split&room=${freshRoom}`;
    console.log(`Navegando a sala aislada: ${targetUrl}`);
    await client.navigate(targetUrl, 3000);

    // Helper para hacer click confiable en botones por texto
    const clickButton = async (text: string, waitMs = 1200) => {
      const clicked = await client.eval(`(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => (b.innerText || b.textContent || '').includes('${text}'));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      })()`);
      console.log(`  Buscando y clickeando botón con '${text}': ${clicked}`);
      await client.wait(waitMs);
      return clicked;
    };

    // ====================================================================
    // CASO 1: CAPTURA DIRECTA DE PRÁCTICA CASO 1
    // ====================================================================
    console.log('\n▶ [CASO 1] Capturando Práctica Caso 1 de 3...');
    const shotCaso1 = await client.captureAndSave('CASO_01_Practica_Sincronizada_1_de_3.png');
    const infoCaso1 = await client.eval(`({
      hasCaso1: document.body.innerText.includes('CASO 1') && document.body.innerText.includes('1 DE 3'),
      hasQuestion: document.body.innerText.includes('Redacta dos oraciones para ubicar la historia'),
      hasConsultButton: Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Consultar texto de lectura'))
    })`);
    console.log(`  Texto 'CASO 1 DE 3' visible: ${infoCaso1.hasCaso1}`);
    console.log(`  Pregunta del Caso 1 visible: ${infoCaso1.hasQuestion}`);
    console.log(`  Botón 'Consultar texto de lectura' presente en estudiante: ${infoCaso1.hasConsultButton}`);
    evidenceList.push({ caso: 'Caso 1 de 3', capture: shotCaso1, coherent: infoCaso1.hasCaso1 });

    // ====================================================================
    // CASO 2: AVANZAR MEDIANTE CONTROL REAL AL CASO 2
    // ====================================================================
    console.log('\n▶ [CASO 2] Evaluando Caso 1 y avanzando al Caso 2 mediante controles reales...');
    // 1. Mentor califica Caso 1 con botón real 🟢 "Respondió correctamente"
    await clickButton('Respondió correctamente', 1200);

    // 2. Mentor presiona botón real "Continuar"
    await clickButton('Continuar', 1200);

    // 3. Mentor presiona "Mostrar segundo caso"
    await clickButton('Mostrar segundo caso', 1500);

    const shotCaso2 = await client.captureAndSave('CASO_02_Practica_Sincronizada_2_de_3.png');
    const infoCaso2 = await client.eval(`({
      hasCaso2: document.body.innerText.includes('CASO 2') && document.body.innerText.includes('2 DE 3'),
      hasQuestion2: document.body.innerText.includes('Explica en tres oraciones qué origina el conflicto')
    })`);
    console.log(`  Texto 'CASO 2 DE 3' visible: ${infoCaso2.hasCaso2}`);
    console.log(`  Pregunta del Caso 2 visible: ${infoCaso2.hasQuestion2}`);
    evidenceList.push({ caso: 'Caso 2 de 3', capture: shotCaso2, coherent: infoCaso2.hasCaso2 });

    // ====================================================================
    // CASO 3: AVANZAR MEDIANTE CONTROL REAL AL CASO 3
    // ====================================================================
    console.log('\n▶ [CASO 3] Evaluando Caso 2 y avanzando al Caso 3 mediante controles reales...');
    // 1. Mentor califica Caso 2 con botón real 🟢 "Respondió correctamente"
    await clickButton('Respondió correctamente', 1200);

    // 2. Mentor presiona botón real "Continuar"
    await clickButton('Continuar', 1200);

    // 3. Mentor presiona "Mostrar tercer caso"
    await clickButton('Mostrar tercer caso', 1500);

    const shotCaso3 = await client.captureAndSave('CASO_03_Practica_Sincronizada_3_de_3.png');
    const infoCaso3 = await client.eval(`({
      hasCaso3: document.body.innerText.includes('CASO 3') && document.body.innerText.includes('3 DE 3'),
      hasQuestion3: document.body.innerText.includes('Aplica la estrategia del cuento de Jimmy') || document.body.innerText.includes('Microrrelato original')
    })`);
    console.log(`  Texto 'CASO 3 DE 3' visible: ${infoCaso3.hasCaso3}`);
    console.log(`  Pregunta del Caso 3 visible: ${infoCaso3.hasQuestion3}`);
    evidenceList.push({ caso: 'Caso 3 de 3', capture: shotCaso3, coherent: infoCaso3.hasCaso3 });

    // ====================================================================
    // LECTURA: ABRIR RECURSO DE LECTURA MEDIANTE CONTROL REAL
    // ====================================================================
    console.log('\n▶ [LECTURA] Presionando control real "Consultar texto de lectura"...');
    await clickButton('Consultar texto de lectura', 2000);

    const shotLectura = await client.captureAndSave('LECTURA_Lengua_OA03_Clase01_Tres_Parrafos.png');
    const infoLectura = await client.eval(`({
      hasP1: document.body.innerText.includes('En una colonia de la Luna vive Jimmy'),
      hasP2: document.body.innerText.includes('Robutt activa una alarma y llega un equipo de rescate'),
      hasP3: document.body.innerText.includes('Propone regalar a Robutt a otro niño')
    })`);
    console.log(`  Párrafo 1 visible: ${infoLectura.hasP1}`);
    console.log(`  Párrafo 2 visible: ${infoLectura.hasP2}`);
    console.log(`  Párrafo 3 visible: ${infoLectura.hasP3}`);
    evidenceList.push({ caso: 'Lectura Tres Párrafos', capture: shotLectura, complete: infoLectura.hasP1 && infoLectura.hasP2 && infoLectura.hasP3 });

  } finally {
    client.close();
    if (edgeProc.pid) {
      try {
        spawn('taskkill', ['/F', '/T', '/PID', String(edgeProc.pid)], { shell: true });
      } catch {}
    }
    cleanupVite();
  }

  const outJson = path.join(capturesDir, 'EVIDENCIA_VISUAL_RESULTADOS.json');
  fs.writeFileSync(outJson, JSON.stringify(evidenceList, null, 2), 'utf8');
  console.log(`\nEvidencias visuales guardadas en: ${capturesDir}`);
  return evidenceList;
}

if (require.main === module || process.argv[1]?.endsWith('generate_visual_evidence.ts')) {
  runVisualEvidence().catch(err => {
    console.error('Error visual:', err);
    process.exit(1);
  });
}
