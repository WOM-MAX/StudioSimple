import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dir = 'LECCIONES/110-7/Matematica/OA04';
const docxFile = fs.readdirSync(dir).find(f => f.endsWith('.docx'));
if (!docxFile) {
  console.log('No docx found');
  process.exit(1);
}
const fullPath = path.resolve(dir, docxFile);
console.log('Inspecting docx:', fullPath);

const xml = execSync(`tar -xOf "${fullPath}" word/document.xml`, { maxBuffer: 50 * 1024 * 1024, encoding: 'utf8' });
const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

console.log('Length of text:', text.length);

// 1. Check for 19% or successive variations
console.log('Contains "19%":', text.includes('19%'));
console.log('Contains "sucesiv":', /sucesiv/i.test(text));
console.log('Contains "descuento sucesivo":', /descuento.*sucesivo/i.test(text));

// Find occurrences of 19%
let idx = 0;
while ((idx = text.indexOf('19%', idx)) !== -1) {
  console.log('Occurrence of 19%:', text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 100)));
  idx += 3;
}

// 2. Check Clase 6 Slide 6
const cl6Idx = text.indexOf('Clase 6');
console.log('\n--- BÚSQUEDA EN CLASE 6 ---');
if (cl6Idx !== -1) {
  const cl6Full = text.substring(cl6Idx);
  // Search for Slide 6 in explanation of class 6
  console.log('Does Clase 6 mention biblioteca?:', cl6Full.includes('biblioteca') || cl6Full.includes('Biblioteca'));
  console.log('Does Clase 6 mention 18 libros?:', cl6Full.includes('18 libros'));
  console.log('Does Clase 6 mention 120 libros?:', cl6Full.includes('120 libros'));
  console.log('Does Clase 6 mention uniforme?:', /uniforme/i.test(cl6Full));
  console.log('Does Clase 6 mention "No text drawn by AI"?:', cl6Full.includes('No text drawn by AI'));
}

// 3. Check question 1 in Clase 6 miniquiz
console.log('\n--- EVALUACIÓN FINAL CLASE 6 ---');
console.log('Contains distractor 39?:', text.includes('39 estudiantes'));
console.log('Contains distractor 14?:', text.includes('14 estudiantes'));
console.log('Contains "28 - 14 = 14"?:', text.includes('28 − 14 = 14') || text.includes('28 - 14 = 14'));

// 4. Check subtitle length > 8 words in DOCX
console.log('\n--- SUBTÍTULOS EN DOCX ---');
const subRegex = /Subtítulo[:\s]+([^|\n\r]+)/g;
let m;
while ((m = subRegex.exec(text)) !== null) {
  const words = m[1].trim().split(/\s+/).filter(Boolean);
  if (words.length > 8) {
    console.log(`Subtitle > 8 words (${words.length} w): "${m[1].trim().substring(0, 60)}"`);
  }
}
