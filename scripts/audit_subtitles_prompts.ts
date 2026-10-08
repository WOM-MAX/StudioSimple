import { MATEMATICA_7B_OA04_CLASE01 } from './oa04_data/clase01';
import { MATEMATICA_7B_OA04_CLASE02 } from './oa04_data/clase02';
import { MATEMATICA_7B_OA04_CLASE03 } from './oa04_data/clase03';
import { MATEMATICA_7B_OA04_CLASE04 } from './oa04_data/clase04';
import { MATEMATICA_7B_OA04_CLASE05 } from './oa04_data/clase05';
import { MATEMATICA_7B_OA04_CLASE06 } from './oa04_data/clase06';

const lessons = [
  MATEMATICA_7B_OA04_CLASE01,
  MATEMATICA_7B_OA04_CLASE02,
  MATEMATICA_7B_OA04_CLASE03,
  MATEMATICA_7B_OA04_CLASE04,
  MATEMATICA_7B_OA04_CLASE05,
  MATEMATICA_7B_OA04_CLASE06
];

console.log('=== AUDITORIA DE SUBTITULOS Y PROMPTS (84 LAMINAS) ===');

lessons.forEach((l, lIdx) => {
  const cNum = lIdx + 1;
  const slides = [...(l.hook?.slides || []), ...(l.formalization?.slides || [])];
  slides.forEach((s, sIdx) => {
    const sub = s.overlaySubtitle || '';
    const words = sub.trim().split(/\s+/).filter(Boolean);
    const mod = sIdx < 7 ? 'Hook' : 'Expl';
    const sNum = (sIdx % 7) + 1;

    if (words.length > 8) {
      console.log(`[SUBTITLE > 8 PALABRAS] C0${cNum} ${mod} S0${sNum} (${words.length} w): "${sub}"`);
    }

    const vp = s.visualPrompt || '';
    // Check duplicates like "Two 13-year-old student explorers... Two 13-year-old student explorers"
    const regexDuo = /Two 13-year-old student/g;
    const matchesDuo = (vp.match(regexDuo) || []).length;
    if (matchesDuo > 1) {
      console.log(`[PROMPT DUPLICATE DUO] C0${cNum} ${mod} S0${sNum}`);
    }

    // Check asking for text/numbers/letters in prompt
    // e.g., asking for specific words written, numbers written, etc.
    const textRequestRegex = /(showing the text|displaying text|words|numbers|letters A, B, C, D|showing numbers)/i;
    if (textRequestRegex.test(vp)) {
      console.log(`[PROMPT TEXT REQUEST] C0${cNum} ${mod} S0${sNum}: "${vp.substring(0, 100)}..."`);
    }
  });
});
