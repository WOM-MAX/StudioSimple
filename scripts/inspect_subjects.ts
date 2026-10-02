import fs from 'fs';
import path from 'path';

function inspect7B() {
  const jsonPath = path.resolve('Web Studio Simple/public/data/injected_lessons_7b.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const b7 = data.filter((p: any) => p.curso?.includes('7') || p.oaId?.startsWith('110-7'));
  console.log('=== PAQUETES 7° BASICO EN INJECTED_LESSONS_7B.JSON ===');
  console.log('Total paquetes 7° Básico:', b7.length);
  for (const p of b7) {
    console.log(`\nPaquete: ${p.oaId} | Asignatura: ${p.asignatura} | OA: ${p.oaCodigo} | Total: ${p.lessons?.length}`);
    p.lessons.forEach((l: any, i: number) => {
      const hCount = l.hook?.slides?.length || 0;
      const fCount = l.formalization?.slides?.length || 0;
      const hVideo = l.hookVideoSrc ? 'SI' : 'NO';
      const fVideo = l.formalVideoSrc ? 'SI' : 'NO';
      console.log(`  Leccion ${i + 1} (Fase ${l.lessonNumber}): "${l.title}" | Slides Hook: ${hCount}, Slides Formal: ${fCount} | Video Hook: ${hVideo}, Video Formal: ${fVideo}`);
    });
  }
}

inspect7B();
