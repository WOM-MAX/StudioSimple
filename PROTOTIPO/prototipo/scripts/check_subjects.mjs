import fs from 'fs';
const data = JSON.parse(fs.readFileSync('public/data/curriculum_catalog.json', 'utf8'));
const subjects = {};
for (const d of data) {
  if (!subjects[d.asignatura]) subjects[d.asignatura] = [];
  subjects[d.asignatura].push({ oa: d.oa, num: d.oaNumero });
}

for (const [s, oas] of Object.entries(subjects)) {
  console.log(`${s}: ${oas.length} OAs -> ${oas.slice(0, 5).map(x => x.oa).join(', ')}`);
}
