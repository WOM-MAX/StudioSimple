import fs from 'fs';
import path from 'path';

const file7b = path.resolve('Web Studio Simple/public/data/injected_lessons_7b.json');
if (fs.existsSync(file7b)) {
  const data = JSON.parse(fs.readFileSync(file7b, 'utf8'));
  const cnaOa01 = data.find((it: any) => 
    it.oaId === '110-7-CIE-OA01' || 
    (it.curso?.includes('7') && it.asignatura?.includes('Ciencias') && !it.asignatura?.includes('Sociales') && (it.oaCodigo === 'OA 1' || it.oaCodigo === 'OA 01'))
  );
  if (cnaOa01) {
    console.log('injected_lessons_7b.json CNA OA01:');
    console.log('  oaId:', cnaOa01.oaId);
    console.log('  oaCodigo:', cnaOa01.oaCodigo);
    console.log('  totalLecciones:', cnaOa01.totalLecciones);
    console.log('  lessons length:', cnaOa01.lessons?.length);
    if (cnaOa01.lessons) {
      cnaOa01.lessons.forEach((l: any, i: number) => {
        console.log(`    Leccion ${i+1}: "${l.metadata?.lessonTitle}" (slides: ${l.formalization?.slides?.length})`);
      });
    }
  } else {
    console.log('CNA OA01 NOT FOUND in injected_lessons_7b.json');
  }
}
