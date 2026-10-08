import fs from 'fs';
import path from 'path';

// Load base classes
import { MATEMATICA_7B_OA04_CLASE01 } from './oa04_data/clase01';
import { MATEMATICA_7B_OA04_CLASE02 } from './oa04_data/clase02';
import { MATEMATICA_7B_OA04_CLASE03 } from './oa04_data/clase03';
import { MATEMATICA_7B_OA04_CLASE04 } from './oa04_data/clase04';
import { MATEMATICA_7B_OA04_CLASE05 } from './oa04_data/clase05';
import { MATEMATICA_7B_OA04_CLASE06 } from './oa04_data/clase06';

function formatUniversalPrompt(specificAction: string): string {
  // Cleans any forbidden words
  let cleanAction = specificAction
    .replace(/\b(badge|emblem|logotipo|insignia de maestría)\b/gi, 'interactive study guide')
    .replace(/\s+/g, ' ')
    .trim();

  // If already starts with the canonical standard duo description, keep it
  const standardPrefix = 'Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, ';
  const standardSuffix = ' Clear lighting, vibrant colors, clear negative space for layout. No text drawn by AI.';

  return `${standardPrefix}${cleanAction}.${standardSuffix}`;
}

async function main() {
  console.log('=== CALIBRANDO DATOS ESTRUCTURADOS DE MATEMÁTICA 7° OA04 (CLASES 1 A 6) ===\n');

  const classes = [
    { num: 1, name: 'clase01', data: MATEMATICA_7B_OA04_CLASE01, varName: 'MATEMATICA_7B_OA04_CLASE01' },
    { num: 2, name: 'clase02', data: MATEMATICA_7B_OA04_CLASE02, varName: 'MATEMATICA_7B_OA04_CLASE02' },
    { num: 3, name: 'clase03', data: MATEMATICA_7B_OA04_CLASE03, varName: 'MATEMATICA_7B_OA04_CLASE03' },
    { num: 4, name: 'clase04', data: MATEMATICA_7B_OA04_CLASE04, varName: 'MATEMATICA_7B_OA04_CLASE04' },
    { num: 5, name: 'clase05', data: MATEMATICA_7B_OA04_CLASE05, varName: 'MATEMATICA_7B_OA04_CLASE05' },
    { num: 6, name: 'clase06', data: MATEMATICA_7B_OA04_CLASE06, varName: 'MATEMATICA_7B_OA04_CLASE06' }
  ];

  for (const c of classes) {
    const d = c.data;
    console.log(`Calibrando Clase ${c.num}...`);

    // 1. Calibrar prompts en las 14 láminas (7 gancho + 7 explicativas)
    const hookSlides = d.hook.slides;
    const explSlides = d.formalization.slides;

    for (let i = 0; i < hookSlides.length; i++) {
      const s = hookSlides[i];
      // Extract specific narrative essence from previous prompt
      let action = s.visualPrompt
        .replace(/Modern anime style 16:9 widescreen illustration\.\s*/i, '')
        .replace(/No text drawn by AI\.?\s*/i, '')
        .replace(/The two 13-year-old students\s*/i, '')
        .replace(/Both 13-year-old students\s*/i, '')
        .replace(/Two 13-year-old students\s*/i, '')
        .replace(/The 13-year-old boy and girl\s*/i, '')
        .replace(/The 13-year-old girl with braided hair and the 13-year-old boy in a teal jacket\s*/i, '')
        .replace(/Clear lighting.*negative space[^\.]*\.?/i, '')
        .trim();

      if (!action || action.length < 10) {
        action = `collaborating actively on problem-solving during moment ${s.tituloMomento}`;
      }
      s.visualPrompt = formatUniversalPrompt(action);
    }

    for (let i = 0; i < explSlides.length; i++) {
      const s = explSlides[i];
      let action = s.visualPrompt
        .replace(/Modern anime style 16:9 widescreen illustration\.\s*/i, '')
        .replace(/No text drawn by AI\.?\s*/i, '')
        .replace(/The two 13-year-old students\s*/i, '')
        .replace(/Both 13-year-old students\s*/i, '')
        .replace(/Two 13-year-old students\s*/i, '')
        .replace(/The 13-year-old boy and girl\s*/i, '')
        .replace(/The 13-year-old girl with braided hair and the 13-year-old boy in a teal jacket\s*/i, '')
        .replace(/Clear lighting.*negative space[^\.]*\.?/i, '')
        .trim();

      if (!action || action.length < 10) {
        action = `examining mathematical models attentively during moment ${s.tituloMomento}`;
      }
      s.visualPrompt = formatUniversalPrompt(action);
    }

    // 2. Diapositiva 6: Isomorfismo estricto con practice[0] (Caso 1)
    const p1 = d.practice[0];
    const s6 = explSlides.find((s) => s.slideNumber === 6)!;
    s6.overlayText = `EJEMPLO MODELADO: CASO 1`;
    s6.overlayTitle = `EJEMPLO MODELADO: CASO 1`;
    s6.overlaySubtitle = p1.context.substring(0, 80);
    s6.vectorialOverlayPptx = `Resolución canónica: ${p1.reveal || p1.expected}`;
    s6.speakerNotes = `Analicemos paso a paso el caso modelado: ${p1.context} ${p1.question} ${p1.reveal || p1.support} Por lo tanto, el resultado esperado es: ${p1.expected}.`;

    // 3. Diapositiva 7: Cierre teleológico con Regla de Oro y pase directo a la práctica
    const s7 = explSlides.find((s) => s.slideNumber === 7)!;
    s7.overlayTitle = `REGLA DE ORO DE LA LECCIÓN`;
    s7.overlayText = `REGLA DE ORO DE LA LECCIÓN`;
    s7.speakerNotes = `Regla de oro: ${s7.overlaySubtitle || 'p% = p ÷ 100'}. Ahora pon a prueba lo aprendido resolviendo los casos de práctica en la plataforma interactiva.`;

    // 4. Reutilización fiel en postQuestions (enlace caso 1 y caso 2 en 5 dimensiones)
    const p2 = d.practice[1];
    d.postQuestions = [
      {
        context: p1.context,
        question: p1.question,
        expected: p1.expected,
        success: p1.success || '¡Excelente resolución!',
        support: p1.support || 'Aplica los pasos aprendidos en la lección.',
        reveal: p1.reveal || p1.expected,
        studentReveal: p1.studentReveal || p1.expected
      },
      {
        context: p2.context,
        question: p2.question,
        expected: p2.expected,
        success: p2.success || '¡Muy bien calculado!',
        support: p2.support || 'Aplica la regla correspondiente para resolver este caso.',
        reveal: p2.reveal || p2.expected,
        studentReveal: p2.studentReveal || p2.expected
      }
    ];

    // 5. Ajustes específicos por clase
    if (c.num === 1) {
      explSlides[0].overlaySubtitle = 'Comprender el porcentaje y su modelo pictórico en cuadrícula de 100';
      explSlides[0].speakerNotes = 'Hoy aprenderemos a representar y comprender el porcentaje como una razón de consecuente cien, utilizando cuadrículas de diez por diez para visualizar cada cantidad.';
    } else if (c.num === 2) {
      explSlides[0].overlaySubtitle = 'Equivalencia triple: porcentaje, fracción simplificada y número decimal';
      explSlides[0].speakerNotes = 'Hoy aprenderemos la equivalencia triple entre porcentaje, fracción simplificada y número decimal, utilizando simplificaciones rigurosas.';
    } else if (c.num === 3) {
      explSlides[0].overlaySubtitle = 'Estrategias de cálculo mental usando división por fracciones canónicas';
      explSlides[0].speakerNotes = 'Hoy aprenderemos estrategias de cálculo mental de porcentajes notables mediante divisiones directas por dos, cuatro, cinco y diez.';
    } else if (c.num === 4) {
      explSlides[0].overlaySubtitle = 'Multiplicación por decimal y regla de proporcionalidad directa';
      explSlides[0].speakerNotes = 'Hoy aprenderemos a calcular cualquier porcentaje utilizando la multiplicación por decimal y la proporción directa.';
    } else if (c.num === 5) {
      explSlides[0].overlaySubtitle = 'Cálculo de rebajas comerciales e IVA 19% en boletas chilenas';
      explSlides[0].speakerNotes = 'Hoy resolveremos problemas cotidianos de descuentos comerciales e IVA del diecinueve por ciento en operaciones comerciales afectas.';
    } else if (c.num === 6) {
      explSlides[0].overlaySubtitle = 'Hallar el total conociendo una parte y el porcentaje correspondiente';
      explSlides[0].speakerNotes = 'Hoy aprenderemos a hallar el total correspondiente al cien por ciento conociendo una parte y su porcentaje, consolidando todas las estrategias de porcentajes para evaluaciones formales.';

      // Asegurar que no quede 'porcentaje acumulado'
      let jsonStr = JSON.stringify(d);
      jsonStr = jsonStr.replace(/porcentaje acumulado/gi, 'cálculo inverso del total');
      Object.assign(d, JSON.parse(jsonStr));
    }

    // 6. Escribir archivo actualizado
    const filePath = path.resolve(`scripts/oa04_data/${c.name}.ts`);
    const fileContent = `import { LessonData } from '../../Web Studio Simple/src/types/lesson';\n\nexport const ${c.varName}: LessonData = ${JSON.stringify(d, null, 2)};\n`;
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`✓ Clase ${c.num} calibrada y guardada en ${filePath}`);
  }

  console.log('\n=== CALIBRACIÓN DE DATOS CONCLUIDA CON ÉXITO ===\n');
}

main().catch((err) => {
  console.error('Error en calibración de datos:', err);
  process.exit(1);
});
