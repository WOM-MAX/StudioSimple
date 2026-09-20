import { generateOAPackage } from '../src/lib/lesson-generator.ts';

const testOAs = [
  {
    id: "110-7-MAT-OA01",
    curso: "7° Básico",
    asignatura: "Matemática",
    eje: "Números",
    oa: "OA 01",
    oaNumero: 1,
    descripcion: "Mostrar que comprenden la adición y la sustracción de números enteros.",
    indicadores: [
      "Representan los números enteros positivos y negativos en la recta numérica.",
      "Resuelven adiciones de números enteros usando la recta numérica.",
      "Resuelven sustracciones de números enteros utilizando el inverso aditivo.",
      "Resuelven problemas contextualizados que involucran adición y sustracción en Z."
    ],
    conceptosClave: ["Números enteros", "Recta numérica", "Inverso aditivo", "Valor absoluto"],
    leccionesSugeridas: 5,
    isPriorityDemo: true,
    justificacionLecciones: "Desglose formal según temario EELL"
  },
  {
    id: "110-7-CIE-OA01",
    curso: "7° Básico",
    asignatura: "Ciencias Naturales",
    eje: "Biología",
    oa: "OA 01",
    oaNumero: 1,
    descripcion: "Explicar los aspectos biológicos, afectivos y sociales de la sexualidad humana.",
    indicadores: [
      "Reconocen la dimensión biológica, afectiva y social en el desarrollo humano.",
      "Describen los cambios físicos en la pubertad.",
      "Analizan la importancia del autocuidado y el respeto mutuo."
    ],
    conceptosClave: ["Sexualidad", "Pubertad", "Dimensión biológica", "Dimensión afectiva"],
    leccionesSugeridas: 5,
    isPriorityDemo: true,
    justificacionLecciones: "Desglose oficial MINEDUC"
  },
  {
    id: "110-7-HIS-OA02",
    curso: "7° Básico",
    asignatura: "Historia, Geografía y Ciencias Sociales",
    eje: "Historia",
    oa: "OA 02",
    oaNumero: 2,
    descripcion: "Explicar el surgimiento de la agricultura y la domesticación de animales.",
    indicadores: [
      "Identifican las causas del paso del nomadismo al sedentarismo.",
      "Analizan el impacto de la revolución agrícola en la organización social.",
      "Relacionan el desarrollo de poblados con la división del trabajo."
    ],
    conceptosClave: ["Revolución Neolítica", "Sedentarismo", "Agricultura", "División del trabajo"],
    leccionesSugeridas: 5,
    isPriorityDemo: true,
    justificacionLecciones: "Desglose temario EELL"
  },
  {
    id: "110-7-LEN-OA03",
    curso: "7° Básico",
    asignatura: "Lengua y Literatura",
    eje: "Lectura",
    oa: "OA 03",
    oaNumero: 3,
    descripcion: "Analizar las narraciones leídas para enriquecer su comprensión.",
    indicadores: [
      "Identifican el conflicto narrativo y las motivaciones de los personajes.",
      "Reconocen el arquetipo del héroe y su viaje.",
      "Interpretan el sentido global del texto y el uso del lenguaje figurado."
    ],
    conceptosClave: ["Conflicto narrativo", "El viaje del héroe", "Motivaciones de personajes"],
    leccionesSugeridas: 5,
    isPriorityDemo: true,
    justificacionLecciones: "Desglose temario EELL"
  },
  {
    id: "110-7-ING-OA09",
    curso: "7° Básico",
    asignatura: "Idioma Extranjero Inglés",
    eje: "Comprensión Lectora",
    oa: "OA 09",
    oaNumero: 9,
    descripcion: "Demostrar comprensión de ideas generales e información explícita en textos adaptados.",
    indicadores: [
      "Identifican el tema general y detalles específicos en historias cortas.",
      "Reconocen vocabulario clave de personas, lugares y acciones.",
      "Responden preguntas simples de comprensión en inglés (Wh- questions)."
    ],
    conceptosClave: ["Reading comprehension", "Vocabulary in context", "Wh- questions"],
    leccionesSugeridas: 5,
    isPriorityDemo: true,
    justificacionLecciones: "Desglose oficial temario EELL"
  }
];

console.log("=== INICIANDO AUDITORIA Y VALIDACION DISCIPLINA POR DISCIPLINA ===");
let totalErrors = 0;

for (const oa of testOAs) {
  console.log(`\nValidando Asignatura: ${oa.asignatura} (${oa.oa})...`);
  const pkg = generateOAPackage(oa, oa.leccionesSugeridas);

  if (pkg.lessons.length !== oa.leccionesSugeridas) {
    console.error(`ERROR: Se esperaban ${oa.leccionesSugeridas} lecciones pero se generaron ${pkg.lessons.length}`);
    totalErrors++;
  }

  // Verificar libro asignado
  if (!pkg.oa.referenciaTextoEscolar?.libro) {
    console.error(`ERROR: Falta referencia a texto escolar para ${oa.id}`);
    totalErrors++;
  } else {
    console.log(`  Texto Escolar: ${pkg.oa.referenciaTextoEscolar.libro} (${pkg.oa.referenciaTextoEscolar.paginas})`);
  }

  // Iterar por cada leccion generada
  pkg.lessons.forEach((lesson, idx) => {
    const num = idx + 1;
    // 1. Validar presencia de 8 fases
    if (!lesson.situacionIntro?.dialogo) { console.error(`  Clase ${num}: Falta paso 1 (situacionIntro)`); totalErrors++; }
    if (!lesson.paso2_hook?.slides || lesson.paso2_hook.slides.length !== 7) { console.error(`  Clase ${num}: Falta paso 2 (7 slides hook)`); totalErrors++; }
    if (!lesson.paso3_recorrido || lesson.paso3_recorrido.length === 0) { console.error(`  Clase ${num}: Falta paso 3 (recorrido)`); totalErrors++; }
    if (!lesson.paso4_explicativo?.slides || lesson.paso4_explicativo.slides.length !== 7) { console.error(`  Clase ${num}: Falta paso 4 (7 slides explicativo)`); totalErrors++; }
    if (!Array.isArray(lesson.paso5_practica) || lesson.paso5_practica.length === 0 || !lesson.paso5_practica[0].question) { console.error(`  Clase ${num}: Falta paso 5 (practica en cuaderno)`); totalErrors++; }
    if (!lesson.paso6_resumen?.ideaClave || !lesson.paso6_resumen?.sintesis) { console.error(`  Clase ${num}: Falta paso 6 (resumen)`); totalErrors++; }
    if (!Array.isArray(lesson.paso7_miniquiz) || lesson.paso7_miniquiz.length < 3) { console.error(`  Clase ${num}: Falta paso 7 (miniquiz 3 preguntas)`); totalErrors++; }
    if (!Array.isArray(lesson.paso7b_recuperacion) || lesson.paso7b_recuperacion.length === 0 || !lesson.paso7b_recuperacion[0].q) { console.error(`  Clase ${num}: Falta paso 7b (recuperacion)`); totalErrors++; }
    if (!lesson.paso8_cierre?.preguntaSintesis) { console.error(`  Clase ${num}: Falta paso 8 (cierre)`); totalErrors++; }

    // 2. Verificar filtrado de boilerplate matematico en asignaturas no matematicas
    if (oa.asignatura !== "Matemática") {
      const quizJson = JSON.stringify(lesson.paso7_miniquiz);
      const recupJson = JSON.stringify(lesson.paso7b_recuperacion);
      
      const mathLeaks = ["antes de operar", "calcular al azar", "memorizar números"];
      mathLeaks.forEach(phrase => {
        if (quizJson.includes(phrase) || recupJson.includes(phrase)) {
          console.error(`  ERROR Clase ${num}: Fuga de boilerplate matematico ("${phrase}") detectada en ${oa.asignatura}!`);
          totalErrors++;
        }
      });
    }

    // 3. Verificaciones de especificidad disciplinar
    if (oa.asignatura.includes("Inglés")) {
      const quizJson = JSON.stringify(lesson.paso7_miniquiz);
      // Debe contener preguntas en ingles
      const hasEnglishQuiz = quizJson.includes("?") && (quizJson.includes("Which") || quizJson.includes("What") || quizJson.includes("Why") || quizJson.includes("According to"));
      if (!hasEnglishQuiz && num > 1) { // num 1 can have general foundation or english
        console.warn(`  Aviso Clase ${num}: Preguntas de quiz de inglés deberían incluir enunciados en inglés`);
      }
    }

    console.log(`  Clase ${num}: "${lesson.title}" | Foco: "${lesson.focoDidactico.substring(0, 50)}..."`);
  });
}

console.log(`\n======================================================`);
if (totalErrors === 0) {
  console.log("VALIDACION EXITOSA: 0 ERRORES ENCONTRADOS. TODAS LAS ASIGNATURAS CONSERVAN 8 FASES Y TIENEN CONTENIDO DISCIPLINAR AUTENTICO.");
} else {
  console.error(`VALIDACION FALLIDA: Se detectaron ${totalErrors} errores.`);
  process.exit(1);
}
