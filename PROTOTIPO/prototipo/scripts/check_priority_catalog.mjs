import fs from "fs";

const catalog = JSON.parse(fs.readFileSync("d:/StudioSimple - Antigravity/PROTOTIPO/prototipo/public/data/curriculum_catalog.json", "utf-8"));

const priority = catalog.filter(o => o.isPriorityDemo);
console.log(`Total Priority Demo OAs: ${priority.length}`);
priority.forEach(p => {
  console.log(`[${p.asignatura}] ${p.oa} (Pos EELL: #${p.temarioPosicion}) -> ${p.descripcion.slice(0, 50)}...`);
});
