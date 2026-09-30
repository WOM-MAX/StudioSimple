import fs from 'fs';
import path from 'path';
import { Packer } from 'docx';
import { generateOAPackage, OACatalogItem } from '../src/lib/lesson-generator';
import { buildOAPackageDocx } from '../src/lib/docx-export';

const matOA: OACatalogItem = {
  id: "110-7-MAT-OA01",
  curso: "7° Básico",
  asignatura: "Matemática",
  eje: "Números",
  oa: "OA 01",
  oaNumero: 1,
  isPriorityDemo: true,
  descripcion: "Mostrar que comprenden la adición y la sustracción de números enteros: representando los números enteros en la recta numérica; representándolas de manera concreta, pictórica y simbólica; dándole significado a los símbolos + y - según el contexto (por ejemplo: un movimiento en una dirección seguido de un movimiento equivalente en la posición opuesta no representa ningún cambio de posición); resolviendo problemas en contextos cotidianos.",
  indicadores: [
    "Describen relaciones y situaciones de la vida diaria en las que se usan números enteros.",
    "Representan los números enteros positivos y negativos en la recta numérica.",
    "Explican el significado de los números enteros positivos y negativos según el contexto.",
    "Resuelven problemas que involucran la adición y la sustracción de números enteros."
  ],
  conceptosClave: ["Números enteros", "Punto de referencia", "Recta numérica", "Valor absoluto", "Opuesto", "Adición", "Sustracción"],
  leccionesSugeridas: 6,
  justificacionLecciones: "6 Lecciones estructuradas para el dominio cabal del OA 1 según las Bases Curriculares del MINEDUC y el Temario Oficial de Exámenes Libres.",
  referenciaTextoEscolar: {
    libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Números"',
    leccion: 'Lección 1: "Números enteros"',
    paginas: "Páginas 6 a 25"
  }
};

async function exportDocx() {
  console.log("Generando paquete OA01 para Matemática 7° Básico (6 Lecciones)...");
  const pkg = generateOAPackage(matOA, 6);
  console.log(`Paquete generado con ${pkg.lessons.length} lecciones.`);
  
  console.log("Construyendo documento Word oficial con buildOAPackageDocx...");
  const doc = buildOAPackageDocx(pkg);
  
  console.log("Empaquetando buffer binario DOCX...");
  const buffer = await Packer.toBuffer(doc);
  console.log(`Buffer DOCX creado con éxito: ${buffer.length} bytes.`);
  
  const destDir = 'D:\\OneDrive\\EstudioSimple-Contenido\\EstudioSimple_7B_Planes_Actualizados-29-09-2026';
  const file1 = path.join(destDir, 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones(5).docx');
  const file2 = path.join(destDir, 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones(4).docx');
  const file3 = path.join(destDir, 'Plan_Maestro_7Básico_110-7-MAT-OA01_6Lecciones.docx');
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.writeFileSync(file1, buffer);
  console.log(`Guardado exitoso en: ${file1}`);
  
  fs.writeFileSync(file2, buffer);
  console.log(`Guardado exitoso en: ${file2}`);

  fs.writeFileSync(file3, buffer);
  console.log(`Guardado exitoso en: ${file3}`);
}

exportDocx().catch((err) => {
  console.error("Error durante la generación de DOCX:", err);
  process.exit(1);
});
