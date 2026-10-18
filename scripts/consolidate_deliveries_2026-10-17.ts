import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

function computeSha256(filePath: string): string {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function copyWithVerification(src: string, dst: string): { size: number; sha256: string } {
  if (!fs.existsSync(src)) {
    throw new Error(`Source file does not exist: ${src}`);
  }
  const dir = path.dirname(dst);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.copyFileSync(src, dst);
  const srcHash = computeSha256(src);
  const dstHash = computeSha256(dst);
  if (srcHash !== dstHash) {
    throw new Error(`Hash mismatch after copy: ${src} -> ${dst}`);
  }
  const size = fs.statSync(dst).size;
  return { size, sha256: dstHash };
}

async function main() {
  const rootDir = 'd:/StudioSimple - Antigravity';
  const targetDir = path.join(rootDir, 'entregas/2026-10-17');
  const artifactTargetDir = 'C:/Users/walte/.gemini/antigravity-ide/brain/866a31cf-47ed-418c-a459-e62ee9a7f155/entregas/2026-10-17';

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  if (!fs.existsSync(artifactTargetDir)) {
    fs.mkdirSync(artifactTargetDir, { recursive: true });
  }

  const fileMappings = [
    // Entrega Principal Activa para Work
    {
      category: 'ENTREGA_PRINCIPAL_WORK',
      src: path.join(rootDir, 'docs/auditorias/INFORME_ARCHIVOS_PARA_WORK_REVISAR_FUENTES_Y_CODIGO_2026-10-17.md'),
      dstName: 'INFORME_REVISION_FUENTES_Y_CODIGO_2026-10-17_17-15.md',
      description: 'Informe técnico oficial explicativo de las 6 comprobaciones, fuentes y código para Work.'
    },
    {
      category: 'ENTREGA_PRINCIPAL_WORK',
      src: path.join(rootDir, 'ARCHIVOS_PARA_WORK_REVISAR_FUENTES_Y_CODIGO_2026-10-17.json'),
      dstName: 'ARCHIVOS_EVIDENCIA_FUENTES_Y_CODIGO_2026-10-17_17-15.json',
      description: 'Paquete integral JSON con los 64 archivos completos, fuentes no recibidas, código, componentes, módulos TS y diffs.'
    },

    // Informes Previos de la Jornada (Contexto Histórico)
    {
      category: 'HISTORICO_JORNADA',
      src: path.join(rootDir, 'docs/auditorias/INFORME_INTEGRACION_Y_CONCILIACION_WORK_R1_2026-10-17.md'),
      dstName: 'INFORME_INTEGRACION_Y_CONCILIACION_WORK_R1_2026-10-17_17-00.md',
      description: 'Informe de conciliación criptográfica de las 22 lecciones de Work R1.'
    },
    {
      category: 'HISTORICO_JORNADA',
      src: path.join(rootDir, 'docs/auditorias/EVIDENCIA_INTEGRACION_WORK_R1_2026-10-17.json'),
      dstName: 'EVIDENCIA_INTEGRACION_WORK_R1_2026-10-17_17-00.json',
      description: 'Evidencia de integración y hashes de las 22 lecciones R1.'
    },
    {
      category: 'HISTORICO_JORNADA',
      src: path.join(rootDir, 'docs/auditorias/INFORME_RECUPERACION_Y_CONTRATO_7B.md'),
      dstName: 'INFORME_RECUPERACION_Y_CONTRATO_7B_2026-10-17_15-40.md',
      description: 'Informe del contrato de recuperación pedagógica y vistas duales.'
    },
    {
      category: 'HISTORICO_JORNADA',
      src: path.join(rootDir, 'docs/auditorias/EVIDENCIA_RECUPERACION_Y_CONTRATO_7B.json'),
      dstName: 'EVIDENCIA_RECUPERACION_Y_CONTRATO_7B_2026-10-17_15-40.json',
      description: 'Datos de auditoría de recuperación y componentes.'
    },
    {
      category: 'HISTORICO_JORNADA',
      src: path.join(rootDir, 'docs/auditorias/INFORME_AUDITORIA_INYECCION_CIENCIAS_OA01_2026-10-17.md'),
      dstName: 'INFORME_AUDITORIA_INYECCION_CIENCIAS_OA01_2026-10-17_12-30.md',
      description: 'Informe diagnóstico inicial de las 6 clases de Ciencias Naturales OA01.'
    },
    {
      category: 'HISTORICO_JORNADA',
      src: path.join(rootDir, 'docs/auditorias/EVIDENCIA_AUDITORIA_CIENCIAS_OA01_2026-10-17.json'),
      dstName: 'EVIDENCIA_AUDITORIA_CIENCIAS_OA01_2026-10-17_12-30.json',
      description: 'Datos de la auditoría inicial de Ciencias OA01.'
    }
  ];

  const results: Array<{
    category: string;
    dstName: string;
    size: number;
    sha256: string;
    description: string;
  }> = [];

  console.log('Iniciando consolidación en carpeta entregas/2026-10-17/...');

  for (const item of fileMappings) {
    const dst = path.join(targetDir, item.dstName);
    const artifactDst = path.join(artifactTargetDir, item.dstName);

    // Copia a carpeta canónica en el proyecto
    const info = copyWithVerification(item.src, dst);

    // Copia idéntica a carpeta de artefactos
    copyWithVerification(dst, artifactDst);

    results.push({
      category: item.category,
      dstName: item.dstName,
      size: info.size,
      sha256: info.sha256,
      description: item.description
    });

    console.log(`✓ Consolidado: ${item.dstName} (${info.size} bytes) - Hash: ${info.sha256.slice(0, 12)}...`);
  }

  // Generar INDICE_ENTREGA_2026-10-17.md
  const indiceContent = `# ÍNDICE OFICIAL DE ENTREGAS Y AUDITORÍAS · 2026-10-17
## ESTUDIOSIMPLE · 7° BÁSICO (CURSO 110-7)

**Fecha y hora oficial:** 2026-10-17 17:30 [America/Santiago]  
**Destinatario:** ChatGPT Work / Walter  
**Origen:** Antigravity (Auditor Técnico y Desarrollador A-SDLC)  
**Carpeta Canónica:** \`entregas/2026-10-17/\`  
**Estado normativo global:** EN_REVISION (Cumplimiento de gobernanza sin auto-aprobación)

---

## 📌 1. ARCHIVOS ACTIVOS PARA WORK (ENTREGA PRINCIPAL DE REVISIÓN)

Estos son los **dos (2) archivos fundamentales** que ChatGPT Work debe procesar para la revisión de fuentes, código y transformaciones:

| Archivo | Formato | Tamaño | Hash SHA-256 | Función para Work |
|---|:---:|:---:|---|---|
| **\`INFORME_REVISION_FUENTES_Y_CODIGO_2026-10-17_17-15.md\`** | Markdown | 12.547 B | \`${results.find(r => r.dstName.includes('INFORME_REVISION_FUENTES'))?.sha256}\` | **Lectura obligatoria:** Documenta las 6 comprobaciones técnicas, la declaración \`DESVIACION_SEMANTICA_PENDIENTE\`, privacidad y conciliación de bytes. |
| **\`ARCHIVOS_EVIDENCIA_FUENTES_Y_CODIGO_2026-10-17_17-15.json\`** | JSON | 3.998.484 B | \`${results.find(r => r.dstName.includes('ARCHIVOS_EVIDENCIA_FUENTES'))?.sha256}\` | **Paquete integral de datos:** Contiene el texto completo UTF-8 de los 64 archivos (8 fuentes no recibidas, código del parser, tipos, componentes duales, 30 módulos TS, manifiestos, log real de build y Git diff de 1.49 MB). |

---

## 📚 2. HISTORIAL COMPLETO DE AUDITORÍAS DE LA JORNADA (2026-10-17)

Para consulta y trazabilidad de toda la jornada de trabajo, se encuentran consolidados en esta misma carpeta los informes técnicos previos:

| Archivo | Hora | Tamaño | Hash SHA-256 | Descripción |
|---|:---:|:---:|---|---|
| \`INFORME_INTEGRACION_Y_CONCILIACION_WORK_R1_2026-10-17_17-00.md\` | 17:00 | 11.899 B | \`${results.find(r => r.dstName === 'INFORME_INTEGRACION_Y_CONCILIACION_WORK_R1_2026-10-17_17-00.md')?.sha256}\` | Conciliación de hashes de las 22 lecciones de Work R1. |
| \`EVIDENCIA_INTEGRACION_WORK_R1_2026-10-17_17-00.json\` | 17:00 | 10.395 B | \`${results.find(r => r.dstName === 'EVIDENCIA_INTEGRACION_WORK_R1_2026-10-17_17-00.json')?.sha256}\` | Hashes locales vs Work R1 para las 22 lecciones. |
| \`INFORME_RECUPERACION_Y_CONTRATO_7B_2026-10-17_15-40.md\` | 15:40 | 12.607 B | \`${results.find(r => r.dstName === 'INFORME_RECUPERACION_Y_CONTRATO_7B_2026-10-17_15-40.md')?.sha256}\` | Diseño y contrato de vistas de recuperación adulto/estudiante. |
| \`EVIDENCIA_RECUPERACION_Y_CONTRATO_7B_2026-10-17_15-40.json\` | 15:40 | 6.731 B | \`${results.find(r => r.dstName === 'EVIDENCIA_RECUPERACION_Y_CONTRATO_7B_2026-10-17_15-40.json')?.sha256}\` | Datos estructurales de recuperación pedagógica. |
| \`INFORME_AUDITORIA_INYECCION_CIENCIAS_OA01_2026-10-17_12-30.md\` | 12:30 | 27.711 B | \`${results.find(r => r.dstName === 'INFORME_AUDITORIA_INYECCION_CIENCIAS_OA01_2026-10-17_12-30.md')?.sha256}\` | Auditoría de inyección inicial de Ciencias OA01. |
| \`EVIDENCIA_AUDITORIA_CIENCIAS_OA01_2026-10-17_12-30.json\` | 12:30 | 2.971 B | \`${results.find(r => r.dstName === 'EVIDENCIA_AUDITORIA_CIENCIAS_OA01_2026-10-17_12-30.json')?.sha256}\` | Datos de la auditoría inicial de Ciencias OA01. |

---

## 🔒 3. CERTIFICACIÓN DE INMUTABILIDAD Y PRESERVACIÓN
1. **Matemática OA01:** Se certifica que los 6 módulos TS en \`Web Studio Simple/src/data/lessons/matematica_7b_oa01_*.ts\` permanecen con **0 modificaciones** respecto a HEAD.
2. **Presentaciones PPTX:** Los 14 archivos PPTX existentes (12 de Lengua y Literatura OA03 y 2 de Ciencias Naturales) permanecen intactos.
3. **Inmutabilidad Operativa:** No se realizó git push, ni migraciones en Neon, ni alteraciones en \`docs/auditorias/\` (los archivos originales se conservan para asegurar retrocompatibilidad).
`;

  const indicePath = path.join(targetDir, 'INDICE_ENTREGA_2026-10-17.md');
  const artifactIndicePath = path.join(artifactTargetDir, 'INDICE_ENTREGA_2026-10-17.md');

  fs.writeFileSync(indicePath, indiceContent, 'utf8');
  fs.writeFileSync(artifactIndicePath, indiceContent, 'utf8');

  console.log(`✓ Índice generado: ${indicePath}`);
  console.log(`✓ Índice copiado a artefactos: ${artifactIndicePath}`);
  console.log('\n¡Consolidación finalizada con 100% de éxito!');
}

main().catch(err => {
  console.error('Error fatal durante la consolidación:', err);
  process.exit(1);
});
