import { generateOAPackage, OACatalogItem } from '../src/lib/lesson-generator';

const testOAs: OACatalogItem[] = [
  {
    id: "110-7-LEN-OA03",
    curso: "7° Básico",
    asignatura: "Lengua y Literatura",
    eje: "Lectura",
    oa: "OA 03",
    oaNumero: 3,
    isPriorityDemo: true,
    descripcion: "Analizar narraciones leídas para enriquecer su comprensión..."
  },
  {
    id: "110-7-CIE-OA01",
    curso: "7° Básico",
    asignatura: "Ciencias Naturales",
    eje: "Biología",
    oa: "OA 01",
    oaNumero: 1,
    isPriorityDemo: true,
    descripcion: "Explicar los aspectos biológicos, afectivos, sociales y éticos de la sexualidad..."
  },
  {
    id: "110-7-HIS-OA02",
    curso: "7° Básico",
    asignatura: "Historia, Geografía y Ciencias Sociales",
    eje: "Historia",
    oa: "OA 02",
    oaNumero: 2,
    isPriorityDemo: true,
    descripcion: "Explicar que el surgimiento de la agricultura revolucionó la forma de vida..."
  },
  {
    id: "110-7-ING-OA09",
    curso: "7° Básico",
    asignatura: "Inglés",
    eje: "Comprensión Lectora",
    oa: "OA 09",
    oaNumero: 9,
    isPriorityDemo: true,
    descripcion: "Demostrar comprensión de textos narrativos breves adaptados..."
  }
];

testOAs.forEach((oa) => {
  console.log(`\n=================== TESTING ${oa.asignatura} (${oa.oa}) ===================`);
  const pkg = generateOAPackage(oa, 3);
  console.log(`Package generated with ${pkg.lessons.length} lessons.`);
  
  // Inspect Lesson 1 (Canonical)
  const l1 = pkg.lessons[0];
  console.log(`>> Lesson 1 (Canonical): "${l1.title}"`);
  console.log(`   Hook slides: ${l1.paso2_hook.slides.length}`);
  console.log(`   Hook S1: Title="${l1.paso2_hook.slides[0].overlayTitle}" | Sub="${l1.paso2_hook.slides[0].overlaySubtitle}" | Vect="${l1.paso2_hook.slides[0].vectorialOverlayPptx?.slice(0, 40)}..."`);
  console.log(`   Expl slides: ${l1.paso4_explicativo.slides.length}`);
  console.log(`   Expl S1: Title="${l1.paso4_explicativo.slides[0].overlayTitle}" | Sub="${l1.paso4_explicativo.slides[0].overlaySubtitle}" | Vect="${l1.paso4_explicativo.slides[0].vectorialOverlayPptx?.slice(0, 40)}..."`);
  console.log(`   Expl S1 Notes: "${l1.paso4_explicativo.slides[0].speakerNotes.slice(0, 80)}..."`);

  // Inspect Lesson 2 (Generic algorithmically generated)
  const l2 = pkg.lessons[1];
  console.log(`>> Lesson 2 (Generic generated): "${l2.title}"`);
  console.log(`   Hook slides: ${l2.paso2_hook.slides.length}`);
  console.log(`   Hook S1: Title="${l2.paso2_hook.slides[0].overlayTitle}" | Sub="${l2.paso2_hook.slides[0].overlaySubtitle}" | Vect="${l2.paso2_hook.slides[0].vectorialOverlayPptx?.slice(0, 40)}..."`);
  console.log(`   Expl slides: ${l2.paso4_explicativo.slides.length}`);
  console.log(`   Expl S1: Title="${l2.paso4_explicativo.slides[0].overlayTitle}" | Sub="${l2.paso4_explicativo.slides[0].overlaySubtitle}" | Vect="${l2.paso4_explicativo.slides[0].vectorialOverlayPptx?.slice(0, 40)}..."`);
  console.log(`   Expl S1 Notes: "${l2.paso4_explicativo.slides[0].speakerNotes.slice(0, 80)}..."`);
  console.log(`   Expl S7 Notes: "${l2.paso4_explicativo.slides[6].speakerNotes.slice(0, 80)}..."`);
});
