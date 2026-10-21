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
    console.log(`  📸 Captura: ${filename} (${buffer.length} bytes, SHA-256: ${hash.slice(0, 12)}...)`);
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
  for (let i = 0; i < 20; i++) {
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
  throw new Error('No se encontró target de página en Edge CDP en el puerto ' + port);
}

export async function runVerification() {
  console.log('================================================================');
  console.log('🧪 VERIFICACIÓN PROPORCIONAL DE CORRECCIÓN ESTRUCTURAL (EDGE CDP)');
  console.log('================================================================\n');

  const cdpPort = 9223;
  const userDir = path.resolve('scratch/edge_structural_verification_profile');
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const capturesDir = path.resolve('docs/auditorias/capturas_correccion_estructural');
  if (!fs.existsSync(capturesDir)) fs.mkdirSync(capturesDir, { recursive: true });

  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  const edgeExe = edgePaths.find(p => fs.existsSync(p)) || 'msedge.exe';

  const proc = spawn(edgeExe, [
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

    // Activar Page & Runtime
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    // Inicializar localStorage con sesión válida
    await client.navigate('http://localhost:5173/', 2000);
    await client.eval(`
      localStorage.setItem('estudio_simple_auth_session', JSON.stringify({
        role: 'parent',
        userId: 'usr_verif_110_7',
        name: 'Mentor Verificación',
        enrolledGrades: ['7° Básico'],
        isAuthenticated: true
      }));
      localStorage.setItem('estudio_simple_student', JSON.stringify({
        id: 'stu-verif-110-7',
        name: 'Estudiante Verificación',
        grade: '7° Básico',
        completedLessons: ['7_mat_oa1_1', '7_mat_oa1_2']
      }));
    `);

    // ====================================================================
    // TEST 1: CIENCIAS NATURALES 7B OA01 CLASE 02
    // ====================================================================
    console.log('\n▶ [TEST 1] Ciencias Naturales 7B OA01 Clase 02');
    const roomCna = 'ROOM_VERIF_CNA02';
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Ciencias%20Naturales&oa=OA%201&lesson=2&mode=split&room=${roomCna}`, 3000);

    const shotCnaIntro = await client.captureAndSave('CNA02_01_Split_Inicio_Titulo_Oficial.png');

    const cnaCheckIntro = await client.eval(`({
      pageTitle: document.title,
      bodyText: document.body.innerText,
      hasThematicTitle: document.body.innerText.includes('Cambios físicos durante la pubertad'),
      hasUnaSituacionAsTitle: document.querySelector('h1')?.innerText === 'Una situación',
      hasConsultarLectura: Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Consultar texto de lectura'))
    })`);
    console.log(`  Título temático visible: ${cnaCheckIntro.hasThematicTitle}`);
    console.log(`  Botón 'Consultar texto de lectura' ausente en Ciencias: ${!cnaCheckIntro.hasConsultarLectura}`);

    // Avanzar a preQuestions directamente con el hook de test
    await client.eval(`
      window.__ESTUDIO_SIMPLE_TEST_UPDATE__?.({
        stage: 'preQuestions',
        conversationIndex: 0
      });
    `);
    await client.wait(1500);

    const shotCnaRecorrido = await client.captureAndSave('CNA02_02_Recorrido_Sin_Texto_Lectura.png');
    const cnaCheckRecorrido = await client.eval(`({
      hasConsultarLectura: Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Consultar texto de lectura')),
      preCounter: Array.from(document.querySelectorAll('span')).map(s => s.innerText).find(t => t.includes('Pregunta') && t.includes('de'))
    })`);
    console.log(`  En recorrido - Botón 'Consultar texto de lectura': ${cnaCheckRecorrido.hasConsultarLectura ? 'PRESENTE (ERROR)' : 'AUSENTE (CORRECTO)'}`);
    console.log(`  En recorrido - Contador visible: ${cnaCheckRecorrido.preCounter}`);

    // Inyectar estado en sesión de práctica summary y comprobar ideas importantes
    await client.eval(`
      window.__ESTUDIO_SIMPLE_TEST_UPDATE__?.({
        stage: 'practiceSummary',
        summaryIdea: 2
      });
    `);
    await client.wait(1000);

    const shotCnaIdeas = await client.captureAndSave('CNA02_03_Ideas_Importantes_Dinamicas.png');
    const cnaCheckIdeas = await client.eval(`({
      heading: document.querySelector('h1')?.innerText,
      hasTresIdeasFalsas: document.body.innerText.includes('Tres ideas importantes') && !document.body.innerText.includes('Idea 3'),
      ideasCount: document.querySelectorAll('article').length,
      nextBtnText: Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('miniquiz') || b.innerText.includes('Mostrar idea'))?.innerText
    })`);
    console.log(`  En resumen - Encabezado: ${cnaCheckIdeas.heading}`);
    console.log(`  En resumen - Cantidad real de ideas renderizadas: ${cnaCheckIdeas.ideasCount}`);
    console.log(`  En resumen - Botón de avance: ${cnaCheckIdeas.nextBtnText}`);

    // Inyectar estado closing y comprobar tarjeta de próxima clase
    await client.eval(`
      window.__ESTUDIO_SIMPLE_TEST_UPDATE__?.({
        stage: 'completed',
        miniScore: 3
      });
    `);
    await client.wait(1000);

    const shotCnaCierre = await client.captureAndSave('CNA02_04_Cierre_Proxima_Clase_Oficial.png');
    const cnaCheckCierre = await client.eval(`({
      hasProximaClase: document.body.innerText.includes('Próxima clase: Emociones, afectividad e imagen personal'),
      hasEmptyProximaClase: document.body.innerText.includes('Próxima clase: ') && !document.body.innerText.includes('Próxima clase: Emociones')
    })`);
    console.log(`  En cierre - Próxima clase oficial visible: ${cnaCheckCierre.hasProximaClase}`);

    evidenceList.push({
      case: 'Ciencias 7B OA01 Clase 02',
      status: (!cnaCheckIntro.hasConsultarLectura && cnaCheckIntro.hasThematicTitle && cnaCheckCierre.hasProximaClase) ? 'PASS' : 'FAIL',
      capturas: [shotCnaIntro, shotCnaRecorrido, shotCnaIdeas, shotCnaCierre]
    });

    // ====================================================================
    // TEST 2: LENGUA Y LITERATURA 7B OA03 CLASE 01 (Conserva lectura legítima)
    // ====================================================================
    console.log('\n▶ [TEST 2] Lengua y Literatura 7B OA03 Clase 01 (Conserva lectura)');
    const roomLyl = 'ROOM_VERIF_LYL01';
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Lengua%20y%20Literatura&oa=OA%203&lesson=1&mode=split&room=${roomLyl}`, 3000);

    // Colocar en preQuestions
    await client.eval(`
      window.__ESTUDIO_SIMPLE_TEST_UPDATE__?.({
        stage: 'preQuestions',
        conversationIndex: 0
      });
    `);
    await client.wait(1000);

    const shotLyl = await client.captureAndSave('LYL01_01_Lectura_Legitima_Preservada.png');
    const lylCheck = await client.eval(`({
      hasConsultarLectura: Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Consultar texto de lectura')),
      title: document.title
    })`);
    console.log(`  En Lengua - Botón 'Consultar texto de lectura' habilitado: ${lylCheck.hasConsultarLectura}`);

    evidenceList.push({
      case: 'Lengua 7B OA03 Clase 01',
      status: lylCheck.hasConsultarLectura ? 'PASS' : 'FAIL',
      capturas: [shotLyl]
    });

    // ====================================================================
    // TEST 3: MATEMÁTICA 7B OA01 CLASE 01 (Protegida e Intacta)
    // ====================================================================
    console.log('\n▶ [TEST 3] Matemática 7B OA01 Clase 01 (Protección y Cero Regresiones)');
    const roomMat = 'ROOM_VERIF_MAT01';
    await client.navigate(`http://localhost:5173/?view=lesson&grade=7%C2%B0%20B%C3%A1sico&subject=Matem%C3%A1tica&oa=OA%201&lesson=1&mode=split&room=${roomMat}`, 3000);

    const shotMat = await client.captureAndSave('MAT01_01_Protegida_Sin_Regresiones.png');
    const matCheck = await client.eval(`({
      bodyHasContent: document.body.innerText.length > 100,
      hasReferencePoint: document.body.innerText.includes('referencia') || document.body.innerText.includes('Posición') || document.body.innerText.includes('enteros'),
      hasConsultarLectura: Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Consultar texto de lectura'))
    })`);
    console.log(`  En Matemática - Carga correcta: ${matCheck.bodyHasContent}`);
    console.log(`  En Matemática - Botón de lectura ausente: ${!matCheck.hasConsultarLectura}`);

    evidenceList.push({
      case: 'Matemática 7B OA01 Clase 01',
      status: (matCheck.bodyHasContent && !matCheck.hasConsultarLectura) ? 'PASS' : 'FAIL',
      capturas: [shotMat]
    });

  } finally {
    client.close();
    proc.kill('SIGKILL');
  }

  console.log('\n================================================================');
  console.log('📊 RESULTADOS DE LA VERIFICACIÓN EN NAVEGADOR');
  console.log('================================================================');
  evidenceList.forEach(e => {
    console.log(`[${e.status}] ${e.case} (${e.capturas.length} capturas)`);
  });

  const outPath = path.resolve('docs/auditorias/EVIDENCIA_VERIFICACION_NAVEGADOR_ESTRUCTURAL.json');
  fs.writeFileSync(outPath, JSON.stringify(evidenceList, null, 2), 'utf8');
  console.log(`\nEvidencia guardada en: ${outPath}`);

  return evidenceList;
}

if (process.argv[1]?.endsWith('verify_structural_fixes_browser.ts')) {
  runVerification().catch(err => {
    console.error('Error fatal:', err);
    process.exit(1);
  });
}
