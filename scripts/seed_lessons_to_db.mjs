import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateOAPackage } from "../Web Studio Simple/src/lib/lesson-generator.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient({
  datasources: {
    db: { url: "file:C:/Proyectos/StudioSimple/prisma/dev.db" }
  }
});

const catalogPath = path.resolve(__dirname, "../Web Studio Simple/public/data/curriculum_catalog.json");
const catalogData = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));

async function main() {
  console.log("=== INICIANDO INYECCION DE LECCIONES EN LA BASE DE DATOS ===");

  // 1. Cursos unicos
  const cursosNombres = Array.from(new Set(catalogData.map(c => c.curso)));
  const cursosMap = new Map();
  for (const nombre of cursosNombres) {
    const gradoNum = parseInt(nombre.replace(/[^0-9]/g, "")) || 0;
    const curso = await prisma.curso.upsert({
      where: { grado: gradoNum },
      update: { nombre },
      create: { grado: gradoNum, nombre }
    });
    cursosMap.set(nombre, curso);
  }
  console.log(`Cursos sincronizados: ${cursosMap.size}`);

  // 2. Asignaturas unicas
  const asigNombres = Array.from(new Set(catalogData.map(c => c.asignatura)));
  const asigMap = new Map();
  for (const nombre of asigNombres) {
    const asig = await prisma.asignatura.upsert({
      where: { nombre },
      update: {},
      create: { nombre }
    });
    asigMap.set(nombre, asig);
  }
  console.log(`Asignaturas sincronizadas: ${asigMap.size}`);

  // 3. Filtrar los OAs prioritarios de 7° Basico para inyeccion completa
  const priorityOaIds = [
    "110-7-MAT-OA01",
    "110-7-CIE-OA01",
    "110-7-HIS-OA02",
    "110-7-LEN-OA03",
    "110-7-ING-OA09"
  ];

  const targetOAs = catalogData.filter(oa => priorityOaIds.includes(oa.id));
  console.log(`OAs a procesar e inyectar con sus clases completas: ${targetOAs.length}`);

  let totalClasesInyectadas = 0;
  const injectedCatalog = [];

  for (const oaItem of targetOAs) {
    const curso = cursosMap.get(oaItem.curso);
    const asignatura = asigMap.get(oaItem.asignatura);

    // Upsert ObjetivoAprendizaje
    const dbOa = await prisma.objetivoAprendizaje.upsert({
      where: {
        codigo_cursoId_asignaturaId: {
          codigo: oaItem.oa,
          cursoId: curso.id,
          asignaturaId: asignatura.id
        }
      },
      update: {
        descripcion: oaItem.descripcion,
        actividadesSugeridas: JSON.stringify(oaItem.indicadores || [])
      },
      create: {
        codigo: oaItem.oa,
        descripcion: oaItem.descripcion,
        actividadesSugeridas: JSON.stringify(oaItem.indicadores || []),
        cursoId: curso.id,
        asignaturaId: asignatura.id
      }
    });

    // Generar el paquete pedagogico oficial con las 8 fases
    const totalLecciones = oaItem.leccionesSugeridas || 5;
    console.log(`\nGenerando paquete para: ${oaItem.asignatura} (${oaItem.oa}) - ${totalLecciones} lecciones...`);
    const pkg = generateOAPackage(oaItem, totalLecciones);

    for (const lesson of pkg.lessons) {
      const dbClase = await prisma.clase.upsert({
        where: {
          numero_cursoId_asignaturaId: {
            numero: lesson.num,
            cursoId: curso.id,
            asignaturaId: asignatura.id
          }
        },
        update: {
          titulo: lesson.title,
          unidad: oaItem.eje,
          duracionMinutos: 30,
          focoDidactico: lesson.focoDidactico,
          contenidoJson: JSON.stringify(lesson),
          objetivoId: dbOa.id
        },
        create: {
          numero: lesson.num,
          titulo: lesson.title,
          unidad: oaItem.eje,
          duracionMinutos: 30,
          focoDidactico: lesson.focoDidactico,
          contenidoJson: JSON.stringify(lesson),
          cursoId: curso.id,
          asignaturaId: asignatura.id,
          objetivoId: dbOa.id
        }
      });

      totalClasesInyectadas++;
      console.log(`  [OK] Clase ${lesson.num}: "${lesson.title}" -> Guardada con contenidoJson (${(JSON.stringify(lesson).length / 1024).toFixed(1)} KB)`);
    }

    injectedCatalog.push({
      oaId: oaItem.id,
      curso: oaItem.curso,
      asignatura: oaItem.asignatura,
      oaCodigo: oaItem.oa,
      totalLecciones: pkg.totalLessons,
      lessons: pkg.lessons
    });
  }

  // Guardar archivo JSON con las lecciones inyectadas para lectura instantanea del cliente Vite
  const outputPath = path.resolve(__dirname, "../Web Studio Simple/public/data/injected_lessons_7b.json");
  fs.writeFileSync(outputPath, JSON.stringify(injectedCatalog, null, 2), "utf-8");
  console.log(`\n[OK] Copia sincronizada generada para Vite en: public/data/injected_lessons_7b.json`);

  console.log(`\n======================================================`);
  console.log(`INYECCION EXITOSA: ${totalClasesInyectadas} clases estructuradas guardadas en la base de datos dev.db`);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("Error durante la inyeccion:", e);
  await prisma.$disconnect();
  process.exit(1);
});