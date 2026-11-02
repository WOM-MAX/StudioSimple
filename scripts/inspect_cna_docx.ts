import { execSync } from 'child_process';
import path from 'path';

const docxPath = path.resolve('Web Studio Simple/public/descargas_planes_maestros/Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx');
const xml = execSync(`tar -xOf "${docxPath}" word/document.xml`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

console.log('DOCX text length:', text.length);

const leccionRegex = /LECCI[OÓ]N\s+(\d+)\s+DE\s+6\s*:\s*([^–\-—\n\r]+)/gi;
const matches = [...text.matchAll(leccionRegex)];
console.log('Found Leccion titles in DOCX:');
matches.forEach(m => console.log(`  - Lección ${m[1]}: "${m[2].trim()}"`));

// Also search for "Clase"
const claseRegex = /Clase\s+(\d+)\s*[:·-]\s*([^.]+)/gi;
const cmatches = [...text.matchAll(claseRegex)];
console.log('\nFound Clase occurrences in DOCX:');
cmatches.slice(0, 10).forEach(m => console.log(`  - Clase ${m[1]}: "${m[2].trim()}"`));
