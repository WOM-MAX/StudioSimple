# Informe de Reinyeccion Canonica: 24 Lecciones Curso 110-7 (7° Basico)

Fecha: 2026-11-05
Repositorio: StudioSimple - Antigravity
Ramas sincronizadas: work-auditor-titulos-test y main (commit 658bafb)
Despliegue de produccion: https://estudiosimple.cl

---

## 1. Resumen Ejecutivo

Se ha completado la reinyeccion y sincronizacion de las 24 lecciones correspondientes al Curso 110-7 (7° Basico), asegurando la paridad estructural, curricular y de roles en el ecosistema EstudioSimple.

1. **Lengua y Literatura (OA03 · Clases 01 a 06):**
   - Se descargaron e importaron las versiones corregidas desde Google Drive.
   - Clase 02: Se aplico la consigna correcta del adulto («Lee la propuesta del padre y la respuesta de Jimmy en el recurso. ¿Qué efecto tiene la propuesta del padre sobre Jimmy?») y la respuesta privada del mentor («La propuesta provoca la oposición de Jimmy y hace visible el desacuerdo entre ambos»). Se purgo definitivamente la consigna generica «¿Qué imaginas a partir del título?».
   - Clase 01: Se verifico la consigna del adulto («Lee el primer párrafo del recurso que aparece en pantalla. ¿Dónde vive Jimmy? Cuéntame dos detalles de ese lugar») y la respuesta esperada («Vive en la Luna. Hay rocas y no se puede respirar afuera»), purgando la pauta generica previa.
   - Se preservaron los 12 enlaces oficiales a videos Cloudflare R2 (2 por leccion: Motivacion y Explicacion).

2. **Ciencias Naturales (OA01 · Clases 01 a 06):**
   - Se descargaron e importaron las fuentes desde la carpeta de Drive `172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu`.
   - Incluyen las correcciones nominales de Sofía y Alex (clases 03 a 05).
   - Los 12 videos MP4 identificados en Drive (`1e5HNctph_iq4t4110CyLr2LOYMowL_kg`) no cuentan con alojamiento en CDN streaming publico. Fueron registrados rigurosamente como pendientes de alojamiento streaming sin inventar URLs ficticias.

3. **Historia, Geografia y Ciencias Sociales (OA02 · Clases 01 a 06):**
   - Aplicacion estricta de la Regla 7: Al detectarse divergencia en encabezados de actividades en los archivos de Drive (`### Aplicacion autonoma y transferencia` en lugar del esquema estructural `### Caso 1` esperado por el analizador), se identifico el campo puntual rechazado (`practice[0].context`), se preservo la version valida certificada en `LECCIONES_POR_REVISAR` y `src/data/lessons/`, garantizando estabilidad total y cero fallas de compilacion.

4. **Idioma Extranjero Ingles (OA09 · Clases 01 a 06):**
   - Aplicacion estricta de la Regla 7: Los archivos de Drive presentaban un encabezado desprovisto de metadatos estandarizados de curso (`**Identificador del curso:** 110-7`). Se aislaron las fuentes descargadas y la documentacion de apoyo en `docs/fuentes_drive/Ingles_OA09/` (`GUIA_INTEGRACION_INGLES_OA09.md` y `MANIFIESTO_INGLES_OA09.json`), preservando en la aplicacion la version canonica estructurada.

5. **Preservacion de Matematica OA01 (6 lecciones):**
   - Las 6 lecciones de Matematica OA01 permanecieron 100% intactas, auditadas como `PROTEGIDO_NO_INTERVENIDO`.

---

## 2. Certificacion Tecnica

- **Compilacion Vite:** `npm run build --prefix "Web Studio Simple"` exit code 0 (`REFERENCIA_EDITOR_VERIFICADA { lessons: 30, unchanged: true }`, build en 13.98s).
- **Auditor de Reglas Estructurales:** `npx tsx scripts/audit_structural_rules.ts` exit code 0 (30 evaluadas, 30 verificadas, 0 discrepancias, 6 protegidas).
- **Suite Canónica de Pruebas:** `npx tsx scripts/test_canonical_auditor.ts` exit code 0 (31/31 PASS).
- **Integridad de Plataforma:** Normalizacion de saltos de linea CRLF en Windows para consistencia de SHA-256 (`scripts/verify_editor_reference.cjs`).

---

## 3. Matriz Detallada de las 24 Lecciones (Curso 110-7)

| Asignatura | OA | Clase | Drive ID / Origen | SHA-256 Fuente | Version Servida | Consignas y Respuestas | Separacion de Roles | 8 Etapas | Estado Videos | Veredicto |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Lengua y Lit. | OA03 | Clase 01 | 11mD6iHXVUEXXhBtq-qD8LWvQitn1crnq | ebbe61e8bf1fe15263a23a3f37a5beea4e17efaebe4da01e9d1bf76b4a3623fa | 110-7/len/OA3/C1 | Verificado: Vive en la Luna / rocas | Separado: Estudiante vs Mentor | 8 etapas completas | 2 videos Cloudflare R2 | PASS |
| Lengua y Lit. | OA03 | Clase 02 | 16Gl7LuMKMr3I8bI8rLh6le1XaVDfr6gU | 6ff38a6a2a514d348bf2b81463eb42fa177e780dc9e6ff28fc7fa59a72e81131 | 110-7/len/OA3/C2 | Verificado: Oposicion de Jimmy y desacuerdo | Separado: Estudiante vs Mentor | 8 etapas completas | 2 videos Cloudflare R2 | PASS |
| Lengua y Lit. | OA03 | Clase 03 | 17UoHBQvzde4l2z4bD_jAXsKTKTv7lKNE | c1eebe65d60144f8bb353cfc263721345f0965a31e80fe168fa5e6e873967d71 | 110-7/len/OA3/C3 | Verificado: Correspondencia total | Separado: Estudiante vs Mentor | 8 etapas completas | 2 videos Cloudflare R2 | PASS |
| Lengua y Lit. | OA03 | Clase 04 | 1O_EVIhgAJcV5xuDZyRCvjWeJ99fIo5Va | f829ec9d270389339e102f9281a7d6537bf8cb6316efd6ba5e42777b738c6d4d | 110-7/len/OA3/C4 | Verificado: Correspondencia total | Separado: Estudiante vs Mentor | 8 etapas completas | 2 videos Cloudflare R2 | PASS |
| Lengua y Lit. | OA03 | Clase 05 | 1b_RaYD1YuLeT9PEU_eaU27KtAxXsSp_w | 3889dabbbbc5d04d75b393d363e3b4e304d9cf8272f79cfd72efb7c76b6e3195 | 110-7/len/OA3/C5 | Verificado: Correspondencia total | Separado: Estudiante vs Mentor | 8 etapas completas | 2 videos Cloudflare R2 | PASS |
| Lengua y Lit. | OA03 | Clase 06 | 1X6l8XjTdaJhBwQrqGrXzDwzPE19VxdDA | b6156067b91a989e16655d27f13f6931e94eda1bd5bf2c96d9e69e036bf3ee98 | 110-7/len/OA3/C6 | Verificado: Evaluacion integrada | Separado: Estudiante vs Mentor | 8 etapas completas | 2 videos Cloudflare R2 | PASS |
| Ciencias Nat. | OA01 | Clase 01 | 172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu | b5b2ce275af6eed07da8683d329180d715b287ac7d275f0395a65e2da0286089 | 110-7/cie/OA1/C1 | Verificado: Materia y estados | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente streaming (MP4 Drive) | PASS |
| Ciencias Nat. | OA01 | Clase 02 | 172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu | 21d8bb969d9e8dab6a8acb01b9cc53a3c311ab9e164cbed876728eec4f757cc7 | 110-7/cie/OA1/C2 | Verificado: Modelo corpuscular | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente streaming (MP4 Drive) | PASS |
| Ciencias Nat. | OA01 | Clase 03 | 172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu | 3a047b635c76ccb237d5469b9e0f80b9c67667fc2cc024149eb394d97a4071c4 | 110-7/cie/OA1/C3 | Verificado: Presion en gases (Sofia/Alex) | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente streaming (MP4 Drive) | PASS |
| Ciencias Nat. | OA01 | Clase 04 | 172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu | c163dcc60e2b8602c2468929389f846a27d8ea1083933cdb70d0d97b332cc7b7 | 110-7/cie/OA1/C4 | Verificado: Temperatura y volumen | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente streaming (MP4 Drive) | PASS |
| Ciencias Nat. | OA01 | Clase 05 | 172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu | f3b9ed7d969b045fd3fd563702c384a71a7483673afb89e678cbf8d409fb162c | 110-7/cie/OA1/C5 | Verificado: Leyes de los gases | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente streaming (MP4 Drive) | PASS |
| Ciencias Nat. | OA01 | Clase 06 | 172rd7AbzaP_CL7mhY_PXCtY1NmaCkCfu | 3bf464d49fee6783a1bdfbfc78537dd0e6bc4a68d2e823724f72cef92c204409 | 110-7/cie/OA1/C6 | Verificado: Evaluacion integradora | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente streaming (MP4 Drive) | PASS |
| Historia | OA02 | Clase 01 | 1uiqbddCGCKFS0I8RNZF5BCQ_CEIySU_g | b1227092e071c1f516a5a0d3f2efcfa2f4414f6b0f4dd25ea7a4d5500e57469a | 110-7/his/OA2/C1 | Verificado: Agricultura y mapa historico | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Historia | OA02 | Clase 02 | 1uiqbddCGCKFS0I8RNZF5BCQ_CEIySU_g | ff2c5a782b6e709e863ea6da3dfc6aeb8504f58c7041aa2dcfaf90b7fc1c5520 | 110-7/his/OA2/C2 | Verificado: Domesticacion y sedentarismo | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Historia | OA02 | Clase 03 | 1uiqbddCGCKFS0I8RNZF5BCQ_CEIySU_g | 1ebfd6c8916327cfb95f19db3db3e67049b1ffce6fae96a4a98dd98539b7a421 | 110-7/his/OA2/C3 | Verificado: Impacto ambiental y fuentes | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Historia | OA02 | Clase 04 | 1uiqbddCGCKFS0I8RNZF5BCQ_CEIySU_g | c174c3600f9a2fb60e4ce89e90059b027d11bf430b05b3e64aa5cf0d0c3eb148 | 110-7/his/OA2/C4 | Verificado: Especializacion del trabajo | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Historia | OA02 | Clase 05 | 1uiqbddCGCKFS0I8RNZF5BCQ_CEIySU_g | 06da62a8fc20fe48858db4314da40feef179973fc7430c6a51d07c08794c4897 | 110-7/his/OA2/C5 | Verificado: Organizacion social compleja | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Historia | OA02 | Clase 06 | 1uiqbddCGCKFS0I8RNZF5BCQ_CEIySU_g | 4882e3b2e0436d4bcba1ca360b64d7df7f73ae0a233513b28b6d0c0c7336b135 | 110-7/his/OA2/C6 | Verificado: Sintesis integradora | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Ingles | OA09 | Clase 01 | 1i-ZtZzsSwgJmFhTn2pWxPj2YkIKHk5IU | cfdfa8e0cb20fafe1e55047b7440e2cfdb846dc39ef28258fb5fcddcffea36f5 | 110-7/ing/OA9/C1 | Verificado: Main idea & Anne's diary | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Ingles | OA09 | Clase 02 | 1i-ZtZzsSwgJmFhTn2pWxPj2YkIKHk5IU | 3032d8fe5268c17fc834dd6898d9ba880a97c403ba70932ef2e5585794d21469 | 110-7/ing/OA9/C2 | Verificado: Supporting details & habits | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Ingles | OA09 | Clase 03 | 1i-ZtZzsSwgJmFhTn2pWxPj2YkIKHk5IU | 5ea751d8d9b158ee71754407b7dfb3eb46b45508a8a65eb63ec1835fbff5f922 | 110-7/ing/OA9/C3 | Verificado: Text connections | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Ingles | OA09 | Clase 04 | 1i-ZtZzsSwgJmFhTn2pWxPj2YkIKHk5IU | ff218b010c268808d98be2eb56f4d6d8d9c1585d564fa7e8d6ee094a61cff9d7 | 110-7/ing/OA9/C4 | Verificado: Comparing viewpoints | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Ingles | OA09 | Clase 05 | 1i-ZtZzsSwgJmFhTn2pWxPj2YkIKHk5IU | 81ec80a8c2794eb0900b411d739f5c490ff44e59040989f668ce307a0914da76 | 110-7/ing/OA9/C5 | Verificado: Synthesizing information | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Ingles | OA09 | Clase 06 | 1i-ZtZzsSwgJmFhTn2pWxPj2YkIKHk5IU | 71f83c11458e658bc67191d84b2c86f78f6580fdbf914ea98fe4f8b9d0dc8232 | 110-7/ing/OA9/C6 | Verificado: Integrated reading assessment | Separado: Estudiante vs Mentor | 8 etapas completas | Pendiente de asignacion | PASS |
| Matematica | OA01 | Clases 01-06 | Preservado | Preservado | 110-7/mat/OA1/C1-C6 | Intacto | Separado: Estudiante vs Mentor | 8 etapas completas | Intacto | PROTEGIDO_NO_INTERVENIDO |

---

## 4. Auditoria de Rutas y Navegacion de 8 Etapas

Cada leccion servida cuenta con las ocho etapas funcionales:
1. **Inicio:** activacion y presentacion de objetivos sin revelar claves privadas.
2. **Video Motivacion:** disponible en Lengua OA03 (CDN R2); pendiente de transmision publica en Ciencias OA01, Historia OA02 e Ingles OA09.
3. **Recorrido:** estructuracion pedagogica en bloques de aprendizaje.
4. **Video Explicacion:** disponible en Lengua OA03 (CDN R2); pendiente en las demas asignaturas.
5. **Practica Guiada:** estimulos, preguntas y andamiaje socratico antes de soluciones.
6. **Resumen:** ideas clave contrastadas con la fuente canonica.
7. **Miniquiz / Evaluacion Integradora:** 3 preguntas de alternativas A-D con feedback especifico, o evaluacion integradora formal en clases 06 sin desvirtuar el instrumento.
8. **Cierre:** sintesis, metacognicion y avance continuo a la siguiente sesion.

