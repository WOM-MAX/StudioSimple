import fs from 'fs';
import path from 'path';

const baseUrl = 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/110-7/LENGUAJE/OA03/';
const lessonsDir = path.resolve(__dirname, '../Web Studio Simple/src/data/lessons');

for (let i = 1; i <= 6; i++) {
  const num = String(i).padStart(2, '0');
  const filePath = path.join(lessonsDir, `lengua_7b_oa03_clase${num}.ts`);
  let content = fs.readFileSync(filePath, 'utf-8');

  const motivacionUrl = `${baseUrl}110-7-LYL-OA03-CLASE${num}-MOTIVACION.pptx.mp4`;
  const explicacionUrl = `${baseUrl}110-7-LYL-OA03-CLASE${num}-EXPLICACION.pptx.mp4`;

  let count = 0;
  content = content.replace(/"videoSrc":\s*""/g, () => {
    count++;
    if (count === 1) return `"videoSrc": "${motivacionUrl}"`;
    if (count === 2) return `"videoSrc": "${explicacionUrl}"`;
    return `"videoSrc": ""`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Clase ${num} (${filePath}) actualizada con ${count} reemplazos.`);
}
console.log('✅ Inyección completada con éxito.');
