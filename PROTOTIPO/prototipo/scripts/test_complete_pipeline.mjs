import fs from 'fs';
import path from 'path';
import { generateOAPackage, TEXTBOOK_MAPPINGS } from '../lib/lesson-generator.js';
import { buildOAPackageDocx } from '../lib/docx-export.js';
import { Packer } from 'docx';

const catalogPath = path.resolve('public/data/curriculum_catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log(`Loaded catalog with ${catalog.length} items.`);

const priorityOAs = catalog.filter(c => c.isPriorityDemo);
console.log(`Found ${priorityOAs.length} priority demo OAs.`);

let allPassed = true;

for (const oa of priorityOAs) {
  const pkg = generateOAPackage(oa, oa.leccionesSugeridas);
  console.log(`\nVerifying OA: [${oa.id}] ${oa.asignatura} - ${oa.oa}`);
  console.log(`  - Textbook: ${pkg.oa.referenciaTextoEscolar?.libro}`);
  console.log(`  - Unit/Lesson: ${pkg.oa.referenciaTextoEscolar?.unidad} - ${pkg.oa.referenciaTextoEscolar?.leccion} (${pkg.oa.referenciaTextoEscolar?.paginas})`);
  console.log(`  - Total Lessons: ${pkg.totalLessons}`);

  if (!pkg.oa.referenciaTextoEscolar?.libro) {
    console.error(`  FAIL: Missing textbook reference for ${oa.id}`);
    allPassed = false;
  }

  for (const lesson of pkg.lessons) {
    const p2Slides = lesson.paso2_hook.slides.length;
    const p4Slides = lesson.paso4_explicativo.slides.length;

    if (p2Slides !== 7) {
      console.error(`  FAIL: Lesson ${lesson.num} Paso 2 has ${p2Slides} slides (expected 7)`);
      allPassed = false;
    }
    if (p4Slides !== 7) {
      console.error(`  FAIL: Lesson ${lesson.num} Paso 4 has ${p4Slides} slides (expected 7)`);
      allPassed = false;
    }
  }

  // Test DOCX compilation for this OA
  const doc = buildOAPackageDocx(pkg);
  const buffer = await Packer.toBuffer(doc);
  if (!buffer || buffer.length === 0) {
    console.error(`  FAIL: DOCX buffer is empty for ${oa.id}`);
    allPassed = false;
  } else {
    console.log(`  DOCX generation verified (${buffer.length} bytes)`);
  }
}

if (allPassed) {
  console.log("\nALL 10 PRIORITY OAS PASSED 100% VERIFICATION!");
} else {
  console.error("\nSOME CHECKS FAILED!");
  process.exit(1);
}
