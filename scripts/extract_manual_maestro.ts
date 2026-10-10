import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const filePath = path.resolve('MANUAL MAESTRO', 'Sistema_Lecciones_EstudioSimple_7B_v1_2026-10-09.docx');
const xml = execSync(`tar -xOf "${filePath}" word/document.xml`, { maxBuffer: 50 * 1024 * 1024, encoding: 'utf8' });

// Extraer texto ordenado por párrafos
const paragraphs = xml.match(/<w:p[\s>].*?<\/w:p>/g) || [];
console.log('Total paragraphs:', paragraphs.length);

const cleanParagraphs = paragraphs.map(p => {
  return p.replace(/<[^>]+>/g, '').trim();
}).filter(t => t.length > 0);

console.log('Non-empty paragraphs:', cleanParagraphs.length);
fs.writeFileSync('MANUAL MAESTRO/extracted_sistema_lecciones.txt', cleanParagraphs.join('\n\n'), 'utf8');
console.log('Saved to MANUAL MAESTRO/extracted_sistema_lecciones.txt');
