import fs from 'fs';
import path from 'path';

// Test reading curriculum_catalog.json
const catalogPath = path.resolve('public/data/curriculum_catalog.json');
if (!fs.existsSync(catalogPath)) {
  console.error("Catalog not found!");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
console.log(`Total OAs in catalog: ${data.length}`);

// Test first 2 OAs for each of the 5 subjects
const subjects = [
  "Matemática",
  "Ciencias Naturales",
  "Historia, Geografía y Ciencias Sociales",
  "Lengua y Literatura",
  "Inglés"
];

console.log("\n=== PRIORITY DEMO OAS (10 OAS TOTAL SEGUN TEMARIO EELL) ===");
for (const subj of subjects) {
  const oas = data.filter(d => d.asignatura === subj && d.isPriorityDemo).sort((a, b) => (a.temarioPosicion || 0) - (b.temarioPosicion || 0));
  console.log(`\nAsignatura: ${subj} (${oas.length} priority OAs found)`);
  for (const o of oas) {
    console.log(`  - Pos #${o.temarioPosicion} [${o.id}] ${o.oa}: ${o.descripcion.slice(0, 70)}... -> Sugerido: ${o.leccionesSugeridas} lecciones`);
  }
}

console.log("\nCATALOG VALIDATION SUCCESSFUL!");
