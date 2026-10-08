# Bitácora de Corrección Integral: Historia 7° Básico OA02 (6 Lecciones) y Actualización Aditiva de la Skill

- **Fecha:** 2026-10-07
- **Hora:** 20:10
- **Asignatura:** Historia, Geografía y Ciencias Sociales
- **Curso:** 7° Básico (110-7)
- **Objetivo de Aprendizaje:** OA 02 (*Explicar que el surgimiento de la agricultura, la domesticación de animales, la sedentarización, la acumulación de bienes y el desarrollo del comercio fueron procesos que transformaron la vida humana.*)
- **Estado Normativo en Manifest:** `REQUIERE_AJUSTES` (a la espera de la auditoría humana oficial)

---

## 1. Contexto y Diagnóstico Previo

A partir de la revisión y directrices de ChatGPT Work, se identificaron y corrigieron las siguientes brechas en el paquete de Historia 7° Básico OA02:
1. **Fórmulas Matemáticas y Procedimentales en Lecciones 2 a 6:** Las lecciones 2 a 6 contenían textos heredados de plantillas matemáticas (*"idea matemática"*, *"procedimiento formal"*, *"interpretar cada valor"*, *"resultado consistente"*). Fueron completamente eliminados y sustituidos por razonamiento histórico genuino.
2. **Determinismo y Notación de Fechas en Lección 1:** Se corrigió la mención errónea `"(hace unos 10.000 años a.C.)"` por la convención uniforme `"hace unos 10.000 a 12.000 años (aprox. 10.000 a 8.000 a.C.)"`. Se presentó la transición al Neolítico como un proceso en mosaico, multicausal y gradual, incorporando el caso natufiense (sedentarismo preagrícola) y los focos independientes del mundo (Creciente Fértil, China, Mesoamérica y Andes).
3. **Focos Curriculares Cruzados en Clases 5 y 6:**
   - La Clase 5 estaba etiquetada erróneamente con *"Comercio"*; fue realineada estrictamente con **Propiedad, jerarquías y especialización del trabajo**.
   - La Clase 6 estaba etiquetada erróneamente con *"Agricultura"*; fue realineada estrictamente con **Excedentes, comercio y primeras ciudades**.
4. **Contradicción Estructural de Dosificación:** Se corrigió el campo `justificacionLecciones` en `curriculum_catalog.json` para eliminar la mención a *"Secuencia estándar de 5 clases"* y reflejar la secuencia integral de 6 lecciones de 30 minutos.
5. **Textos y Ejercicios Truncados:** Se purgó el fragmento cortado `"...del Neo..."` y los títulos incompletos en el generador y en los módulos TypeScript.
6. **Estandarización Psicométrica en 7° Básico (4 Alternativas A-D):** Todos los miniquizes formativos (Paso 7) y reactivos de recuperación (Paso 6) se estructuraron con 4 alternativas (A, B, C, D), distractores basados en confusiones históricas plausibles (anacronismos, evolucionismo lineal) y rotación balanceada de la clave correcta.
7. **Correspondencia Isomórfica Video - Comprobación - Práctica:** Las preguntas de comprobación posterior al video (Paso 6) reutilizan exactamente el mismo caso arqueológico modelado en las diapositivas (Paso 4) y ejercitado en el cuaderno (Paso 5).
8. **Directivas Visuales y Acústicas:** Subtítulos $\le 8$ palabras (36 pt / 48 pt), presencia de ambos exploradores de 13 años en el 100% de las 84 escenas, prompts sin texto ni logo dibujado por IA, y flexibilización de los 60s/90s como metas de producción en Google Vids sin cronometraje forzado.

---

## 2. Desglose de las 6 Lecciones Canónicas Corregidas

| Clase | Título Oficial | Foco Didáctico Central | Casos / Yacimientos Modelados |
| :---: | :--- | :--- | :--- |
| **1** | La transición al Neolítico y orígenes agrícolas | Proceso en mosaico, multicausalidad y focos independientes | Campamentos natufienses; focos en Creciente Fértil, China, América. |
| **2** | Domesticación de plantas y animales en el Creciente Fértil | Selección artificial empírica, ciclos agrícolas y silos | Trigo escanda (raquis no quebradizo), cabras/ovejas en corrales, silos subterráneos. |
| **3** | Primeras aldeas sedentarias y organización comunitaria | Hábitat de adobe, defensa colectiva y división del trabajo | Urbanismo adosado sin calles en Çatalhöyük; murallas y torre de Jericó. |
| **4** | Innovaciones tecnológicas del Neolítico | Piedra pulimentada, alfarería cocida, telar y metalurgia incipiente | Hachas de deforestación, molinos barquiformes de mano, cerámica de cocción, telares de lino/lana, cobre martillado. |
| **5** | Propiedad, jerarquías y especialización del trabajo | Posesión familiar por trabajo invertido, acumulación asimétrica y jefaturas | Linderos de piedra familiares, linajes con grandes silos, jefaturas y artesanos de tiempo completo. |
| **6** | Excedentes, comercio y primeras ciudades | Excedentes de regadío, trueque interregional, metrópolis de Uruk y ensayo formal | Canales de Mesopotamia, barcas con madera y cobre, murallas de Uruk, sellos de arcilla, ensayo evaluativo tipo MINEDUC. |

---

## 3. Actualización Aditiva de la Skill `estudiosimple-lecciones`

Se incorporaron de forma aditiva:
- **En `reglas_universales.md`:**
  * Regla 13: Prompts de arte limpios sin texto y sin logotipo dibujado por IA (el logo se incorpora como vector en PPTX por Codex/Work).
  * Regla 14: Erradicación estricta de fórmulas procedimentales matemáticas en humanidades.
- **En `perfil_7_basico.md`:**
  * Rotación obligatoria y balanceada de la clave correcta (A, B, C, D) en miniquiz y unidad.
  * Reactivo de recuperación con 4 alternativas completas sin respuestas duplicadas.
- **En `historia_geografia.md`:**
  * Prohibición expresa de jerga matemática en historia.
  * Enfoque de larga duración y multilinealidad en el Neolítico (fechado uniforme, foco natufiense).
  * Desglose temático obligatorio de las 6 lecciones de OA02.
  * Correspondencia isomórfica obligatoria entre el caso modelado en video y la comprobación posterior.
- **En `rubrica_evaluacion_oa.md` y `auditor_coherencia_estudiosimple/SKILL.md`:**
  * Casos de Regresión REG-011 a REG-015 (y Controles 18 a 22):
    - REG-011 / Control 18: Inyección de jerga matemática en historia.
    - REG-012 / Control 19: Focos curriculares cruzados en cierre de unidad.
    - REG-013 / Control 20: Enunciados y actividades truncadas (`"...del Neo..."`).
    - REG-014 / Control 21: Reactivos psicométricos incompletos o sin rotación de clave.
    - REG-015 / Control 22: Discrepancia entre caso de video y comprobación posterior.

---

## 4. Artefactos Oficiales Generados y Verificados

- **DOCX Canónico Único:** `LECCIONES/110-7/Historia_Geografia/OA02/Plan_Maestro_7Básico_110-7-HIS-OA02_6Lecciones.docx` (79.976 bytes).
- **TXT Prompts Work (84 láminas):** `LECCIONES/110-7/Historia_Geografia/OA02/Prompts_Work_Historia_7B_OA02.txt` (206.847 bytes).
- **Manifiesto:** `LECCIONES/110-7/Historia_Geografia/OA02/manifest.json` (`estado: "REQUIERE_AJUSTES"`).
- **Compilación TypeScript / Vite:** `npm run build` en Web Studio Simple con código de salida 0.
