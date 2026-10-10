import fs from 'fs';
import path from 'path';

const guionPath = path.resolve(
  __dirname,
  '..',
  'SALIDA_SISTEMA_LECCIONES_V2',
  'EJECUCION_2026-10-09_1735',
  '05_PILOTO',
  '110-7-CIE-OA01',
  'Clase_01',
  'Guion_Pedagogico_Clase01.md'
);

let guion = fs.readFileSync(guionPath, 'utf-8');

// 1. Actualizar fuente oficial
guion = guion.replace(
  /\*\*Fuente Oficial:\*\*.*$/m,
  '**Fuente Oficial:** Texto del estudiante de Ciencias Naturales 7° básico SM (Edición 2024, SM S.A. / MINEDUC, ISBN 978-956-403-295-5, Unidad 4: Salud sexual y reproducción, págs. 114 a 125).'
);

// 2. Actualizar subobjetivo si es necesario
guion = guion.replace(
  /\*\*Subobjetivo:\*\*.*$/m,
  '**Subobjetivo:** Identificar las cuatro dimensiones de la sexualidad humana (biológica, afectiva, psicológica y social) y reconocer que el inicio de la pubertad está regulado por el eje hormonal hipotálamo-hipófisis-gónadas.'
);

// 3. Reemplazos de sociocultural por social
guion = guion.replaceAll('sociocultural', 'social');
guion = guion.replaceAll('Sociocultural', 'Social');

// 4. Asegurar que las 4 dimensiones sean consistentes
guion = guion.replace(
  '| **E5** | **Mente, Afecto y Cultura**',
  '| **E5** | **Mente, Afecto y Sociedad**'
);

// 5. Verificar miniquiz pregunta 3
guion = guion.replace(
  '* **B) Las dimensiones afectiva y social. [CORRECTA]**',
  '* **B) Las dimensiones afectiva y social. [CORRECTA]**'
);

fs.writeFileSync(guionPath, guion, 'utf-8');
console.log('✅ Guion_Pedagogico_Clase01.md actualizado con éxito.');

// Actualizar también Ficha_OA01_Ciencias_7B.md
const fichaPath = path.resolve(
  __dirname,
  '..',
  'SALIDA_SISTEMA_LECCIONES_V2',
  'EJECUCION_2026-10-09_1735',
  '05_PILOTO',
  '110-7-CIE-OA01',
  'Clase_01',
  'Ficha_OA01_Ciencias_7B.md'
);

let ficha = fs.readFileSync(fichaPath, 'utf-8');
ficha = ficha.replaceAll('sociocultural', 'social');
ficha = ficha.replaceAll('Sociocultural', 'Social');
ficha = ficha.replace(
  /Texto del Estudiante Ciencias Naturales 7° Básico.*$/m,
  'Texto del estudiante de Ciencias Naturales 7° básico SM (Edición 2024, SM S.A. / MINEDUC, ISBN 978-956-403-295-5, Unidad 4: Salud sexual y reproducción, págs. 114 a 125).'
);
fs.writeFileSync(fichaPath, ficha, 'utf-8');
console.log('✅ Ficha_OA01_Ciencias_7B.md actualizada con éxito.');
