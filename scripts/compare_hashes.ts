import fs from 'fs';
import crypto from 'crypto';
import { execSync } from 'child_process';
import path from 'path';

function getNormalizedHash(contentStr: string): { hash: string; bytes: number } {
  // Normalizar CRLF a LF para consistencia multiplataforma
  const normalized = contentStr.replace(/\r\n/g, '\n');
  const buf = Buffer.from(normalized, 'utf8');
  return {
    hash: crypto.createHash('sha256').update(buf).digest('hex'),
    bytes: buf.length
  };
}

function getDiskHash(p: string): { hash: string; bytes: number } {
  const content = fs.readFileSync(p, 'utf8');
  return getNormalizedHash(content);
}

function getGitHeadHash(p: string): { hash: string; bytes: number } {
  const normalizedPath = p.split(path.sep).join('/');
  const content = execSync(`git show HEAD:"${normalizedPath}"`, { encoding: 'utf8' });
  return getNormalizedHash(content);
}

const files = [
  {
    path: 'Web Studio Simple/src/data/lessons/matematica_7b_oa01_clase01.ts',
    rol: 'Matemática OA01 Clase 01 (PROTEGIDO DE FÁBRICA)',
    esProtegido: true
  },
  {
    path: 'Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts',
    rol: 'Ciencias Naturales OA01 Clase 02 (REFERENCIA CERTIFICADA PLAN B)',
    esProtegido: true
  },
  {
    path: 'Web Studio Simple/src/data/canonicalReference.json',
    rol: 'Referencia Canónica Universal de Títulos y Continuidad',
    esProtegido: true
  },
  {
    path: 'Web Studio Simple/src/lib/lesson-canonical-validator.ts',
    rol: 'Validador Canónico Transversal de Lecciones',
    esProtegido: true
  },
  {
    path: 'Web Studio Simple/src/lib/lesson-repository.ts',
    rol: 'Repositorio Unificado de Acceso a Lecciones',
    esProtegido: true
  },
  {
    path: 'Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx',
    rol: 'Editor Universal de Lecciones (UI Canónica)',
    esProtegido: true
  },
  {
    path: 'Web Studio Simple/src/data/lessons/lengua_7b_oa03_clase01.ts',
    rol: 'Lengua y Literatura OA03 Clase 01 (RESTAURACIÓN CASO A)',
    esProtegido: false
  }
];

const results = files.map(f => {
  const head = getGitHeadHash(f.path);
  const disk = getDiskHash(f.path);
  const intacto = head.hash === disk.hash;

  return {
    archivo: f.path,
    rol: f.rol,
    esProtegido: f.esProtegido,
    hashAntes_GitHEAD: head.hash,
    bytesAntes: head.bytes,
    hashDespues_Disco: disk.hash,
    bytesDespues: disk.bytes,
    estado: f.esProtegido ? (intacto ? 'INTACTO' : 'MUTADO_NO_AUTORIZADO') : 'MODIFICADO_AUTORIZADO_CASO_A',
    intacto
  };
});

const allProtectedIntact = results.filter(r => r.esProtegido).every(r => r.intacto);

const report = {
  fechaAuditoria: '2026-10-27T17:48:00 [America/Santiago]',
  commitBase: execSync('git rev-parse HEAD').toString().trim(),
  dictamen: allProtectedIntact ? 'ARCHIVOS_PROTEGIDOS_PRESERVADOS_INTACTOS' : 'FALLO_INTEGRIDAD_PROTEGIDOS',
  archivos: results
};

fs.writeFileSync('staging_cierre_definitivo_plan_b/ARCHIVOS_PROTEGIDOS_HASHES_ANTES_DESPUES.json', JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(report, null, 2));

if (!allProtectedIntact) {
  process.exit(1);
}
