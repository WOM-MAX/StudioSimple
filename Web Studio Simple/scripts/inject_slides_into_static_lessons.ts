import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getCanonicalClase1Lengua,
  getCanonicalClase1Ciencias,
  getCanonicalClase1Historia,
  getCanonicalClase1Ingles,
  SlidePrompt
} from '../src/lib/lesson-generator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sanitizeSlide(s: SlidePrompt): any {
  const vectorial = s.vectorialOverlayPptx || (s as any).mathOverlayPptx || '';
  return {
    slideNumber: s.slideNumber,
    tituloMomento: s.tituloMomento,
    didacticPurpose: s.didacticPurpose || s.tituloMomento,
    visualPrompt: s.visualPrompt,
    overlayText: s.overlayText || s.overlayTitle || '',
    overlayTitle: s.overlayTitle || s.overlayText || '',
    overlaySubtitle: s.overlaySubtitle || '',
    vectorialOverlayPptx: vectorial,
    mathOverlayPptx: vectorial,
    speakerNotes: s.speakerNotes.replace(/^(Locución:\s*|Narración:\s*)/i, '').trim(),
    palabrasAprox: s.palabrasAprox || 20,
    duracionSeg: s.duracionSeg || 10
  };
}

function formatSlidesTs(slides: any[], baseIndent: string = '    '): string {
  const jsonStr = JSON.stringify(slides, null, 2);
  const lines = jsonStr.split('\n');
  return lines.map((l, i) => (i === 0 ? l : baseIndent + l)).join('\n');
}

function injectSlidesIntoFile(
  filePath: string,
  hookSlides: any[],
  explSlides: any[]
): void {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Regex to match hook section up to its closing brace
  const hookRegex = /(\n\s*hook:\s*\{[\s\S]*?)(\n\s*\},\s*\n(?:\s*\/\/[^\n]*\n)*\s*preQuestions:)/;
  const hookMatch = content.match(hookRegex);
  if (!hookMatch) {
    throw new Error(`No se pudo encontrar el bloque hook en ${filePath}`);
  }

  const hookSlidesBlock = `,\n    slides: ${formatSlidesTs(hookSlides, '    ')}`;
  content = content.replace(hookRegex, `$1${hookSlidesBlock}$2`);

  // Regex to match formalization section up to its closing brace
  const formalRegex = /(\n\s*formalization:\s*\{[\s\S]*?)(\n\s*\},\s*\n(?:\s*\/\/[^\n]*\n)*\s*postQuestions:)/;
  const formalMatch = content.match(formalRegex);
  if (!formalMatch) {
    throw new Error(`No se pudo encontrar el bloque formalization en ${filePath}`);
  }

  const explSlidesBlock = `,\n    slides: ${formatSlidesTs(explSlides, '    ')}`;
  content = content.replace(formalRegex, `$1${explSlidesBlock}$2`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Inyectadas exitosamente 14 slides en: ${path.basename(filePath)}`);
}

async function main() {
  const lessonsDir = path.resolve(__dirname, '../src/data/lessons');

  const lengua = getCanonicalClase1Lengua();
  const lenguaHook = (lengua.paso2_hook?.slides || []).map(sanitizeSlide);
  const lenguaExpl = (lengua.paso4_explicativo?.slides || []).map(sanitizeSlide);
  injectSlidesIntoFile(path.join(lessonsDir, 'lengua_7b_oa03_clase01.ts'), lenguaHook, lenguaExpl);

  const ciencias = getCanonicalClase1Ciencias();
  const cienciasHook = (ciencias.paso2_hook?.slides || []).map(sanitizeSlide);
  const cienciasExpl = (ciencias.paso4_explicativo?.slides || []).map(sanitizeSlide);
  injectSlidesIntoFile(path.join(lessonsDir, 'ciencias_7b_oa01_clase01.ts'), cienciasHook, cienciasExpl);

  const historia = getCanonicalClase1Historia();
  const historiaHook = (historia.paso2_hook?.slides || []).map(sanitizeSlide);
  const historiaExpl = (historia.paso4_explicativo?.slides || []).map(sanitizeSlide);
  injectSlidesIntoFile(path.join(lessonsDir, 'historia_7b_oa02_clase01.ts'), historiaHook, historiaExpl);

  const ingles = getCanonicalClase1Ingles();
  const inglesHook = (ingles.paso2_hook?.slides || []).map(sanitizeSlide);
  const inglesExpl = (ingles.paso4_explicativo?.slides || []).map(sanitizeSlide);
  injectSlidesIntoFile(path.join(lessonsDir, 'ingles_7b_oa09_clase01.ts'), inglesHook, inglesExpl);

  console.log('Inyeccion en los 4 archivos estaticos completada con exito.');
}

main().catch((err) => {
  console.error('Error inyectando slides:', err);
  process.exit(1);
});
