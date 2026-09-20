# Memoria de Sesion: Actualizacion de Testimonios 2x2 y FAQ Acordeon segun Plan Maestro

Fecha: 2026-09-17 18:25
Modulo: Web Studio Simple (LandingPage.tsx)

## 1. Contexto y Objetivos
El usuario solicito actualizar las dos secciones pendientes de la Landing Page ("Lo que dicen las familias" y "Preguntas Frecuentes") segun los 5 pilares del Plan Maestro detallado en AGENTS.md, consultando especificamente por que usar 4 testimonios en vez de 3 y como optimizar el acordeon de preguntas frecuentes.

## 2. Decisiones Arquitectonicas y Pedagogicas

### A. Seccion "Lo que dicen las familias" (Cuadricula 2x2 con 4 Casos Estrategicos):
Se transiciono de 3 testimonios genericos a 4 casos de uso autenticos organizados en una cuadricula espaciosa de 2 columnas (2x2):
1. **Caso 1 (Caso SAE y Convivencia Escolar):** Claudia M., mama de Lucas (5° Basico, Santiago Centro). Badge: `Homeschooling 1er año · Caso SAE`. Transicion tras quedar sin cupo en el sistema tradicional y estres en aula masiva.
2. **Caso 2 (Neurodiversidad y Ritmo Propio):** Rodrigo T., papa de Sofia (7° Basico, Ñuñoa). Badge: `Neurodiversidad · TDAH & Ritmo Propio`. Aprendizaje a ritmo propio sin sobrecarga de pruebas de 40 preguntas ni fobia evaluativa.
3. **Caso 3 (Padres Trabajadores y Puente Pantalla-Papel):** Marcela V., mama trabajadora de Tomas (3° Basico, Maipu). Badge: `Padres Trabajadores · Puente Pantalla-Cuaderno`. Mediacion dual de 20 a 30 minutos diarios sin necesidad de armar material en la noche.
4. **Caso 4 (Acreditacion y Exito en Examen Libre MINEDUC):** Fernando S., papa de Matias (6° Basico, La Florida). Badge: `Aprobado MINEDUC · Promoción Escolar 2025`. Familiarizacion con el formato formal de preguntas y promocion de nivel.

Estilizado: Tarjetas glassmorphic con `bg-[#16325C]/85 hover:bg-[#1A3A6B]`, 5 estrellas doradas, bordes reactivos `hover:border-amber-400/40`, avatares con iniciales estilizadas en badges de color con tilde de verificacion.

### B. Seccion "Preguntas Frecuentes" (Acordeon Interactivo de 6 Temas):
Se supero la monotonia de 4 barras oscuras identicas, transformandolo en un acordeon de 6 preguntas con micro-iconos tematicos e iluminacion interactiva:
1. **Acreditacion Legal MINEDUC:** Icono `verified` (Ambar). Decreto Exento N° 2272 y Decreto 67, cobertura 100% de Bases Curriculares.
2. **Padres Trabajadores sin Formacion Docente:** Icono `work` (Naranja). Mediacion pedagogica dual con guias de 2 minutos y sesiones de 20 a 30 minutos al dia.
3. **El Cuaderno Fisico vs. Pantallas:** Icono `edit_note` (Turquesa). Fundamento pedagogico "Pantalla y Papel" para evitar fatiga visual y entrenar escritura presencial para el examen.
4. **Neurodiversidad (TDAH / TEA):** Icono `psychology` (Esmeralda). Diseno esencial sin distractores ni tiempo punitivo, enfoque CPA (Concreto-Pictorico-Abstracto).
5. **Fase 2 de Ensayos y Simulacros:** Icono `fact_check` (Ambar). Pruebas de 4 alternativas con estandares de evaluacion docente chilena.
6. **Cobertura de Cursos y Asignaturas:** Icono `school` (Azul cielo). 3° a 8° Basico y las 5 materias oficiales MINEDUC.

Estilizado: Componentes `<details>` con fondo `bg-[#16325C]/80`, transicion al abrir `open:bg-[#1A3B68] open:border-amber-400/40`, rotacion suave de chevron `group-open:rotate-180`, respuestas estructuradas con frases y decretos en negrita destacada.

## 3. Verificacion
- Compilacion TypeScript exitosa con `npx tsc --noEmit` (codigo 0, cero errores).
