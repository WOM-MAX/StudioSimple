# Constitución del Proyecto: Nuevo Proyecto

## 🎯 Misión del Producto
- **Contexto Operativo:** Actúa como un **Ingeniero de Software (A-SDLC)**.
Tu **Objetivo** es: Desarrollar una solución determinista para "Actúa como un **Ingeniero de Software (A-SDLC)**.
Tu **Objetivo** es: Desarrollar una solución determinista para "Actúa como un **Ingeniero de Software (A-SDLC)**.
Tu **Objetivo** es: Desarrollar una solución determinista para "Pilar 1: Segmentación Estratégica (Nicho de Adopción Temprana)
Para asegurar una adopción rápida y tracción inicial, EstudioSimple no debe apuntar a "todos los estudiantes". El éxito radica en dominar un nicho específico antes de escalar.

Segmento Principal (Early Adopters): Familias en la Región Metropolitana (Santiago) con hijos entre 3° y 8° básico que han optado por el homeschooling de forma reciente (1 a 2 años).

Perfil del Apoderado: Padres y madres que trabajan, que buscan estructurar el estudio de sus hijos pero carecen de tiempo o formación pedagógica formal para crear material desde cero. Valoran profundamente lo análogo (cuadernos) pero necesitan la validación y guía de lo digital.

Casos de Uso Estratégicos: * Estudiantes que salieron del sistema tradicional por problemas de convivencia escolar o desajuste con el Sistema de Admisión Escolar (SAE).

Familias neurodivergentes que buscan un ritmo de aprendizaje libre de la presión del aula tradicional.

Propuesta de Valor para Inversionistas: Al captar a estudiantes de 3° básico, la plataforma asegura un Lifetime Value (LTV) extendido, reteniendo al usuario por hasta 6 años dentro del ecosistema de la app.

Pilar 2: Flujo Pedagógico (Diseño Esencial y Directo)
La sobrecarga cognitiva es el mayor enemigo de las plataformas EdTech. EstudioSimple se diferenciará por un diseño estructural esencial, sin distracciones, dividido estrictamente en dos etapas:

Fase 1: Aprendizaje Didáctico y Ejemplificación. * El usuario accede directamente a cápsulas de contenido diseñadas para ser consumidas de forma amena.

Cada concepto se explica de manera didáctica y se acompaña inmediatamente de un ejemplo práctico y resolutivo. El estudiante utiliza su cuaderno físico para replicar el ejemplo, creando un puente entre la pantalla y el papel.

Fase 2: Práctica y Ensayos (Tipo Evaluación).

Una vez asimilado el contenido, se habilita el módulo de práctica.

Los estudiantes se enfrentan a ensayos estructurados con el rigor y la claridad de un instrumento formal, utilizando formatos de pregunta con estándares comparables a los de la evaluación docente chilena, asegurando que el estudiante esté genuinamente preparado para el rigor del examen libre del MINEDUC.

Pilar 3: Arquitectura Tecnológica (Robusta y Escalable)
Para garantizar agilidad en el desarrollo y un mantenimiento costo-eficiente, se recomienda una arquitectura basada en tecnologías web modernas, priorizando el enfoque Mobile-First (Progressive Web App) antes de invertir en desarrollo nativo complejo.

Frontend (Interfaz de Usuario): Desarrollo ágil utilizando HTML, CSS y JavaScript puro o mediante frameworks ligeros, estilizado completamente con Tailwind CSS. Esto garantiza una interfaz limpia, de carga ultra rápida y adaptable a cualquier dispositivo (computadores de escuelas, tablets o celulares de gama media).

Backend y Base de Datos: Implementación de Neon PostgreSQL. Su naturaleza serverless permite escalar la base de datos automáticamente según la demanda (ideal para los picos de uso en las semanas previas a los exámenes libres) y reduce los costos operativos iniciales.

Despliegue y Hosting: Uso de Railway para el despliegue continuo de la aplicación. Es una infraestructura robusta que automatiza el proceso desde el repositorio hasta la producción, liberando al equipo técnico para enfocarse en el código y no en la configuración de servidores.

Ecosistema de Marketing: Para la cara pública del negocio (Landing Pages, blog SEO y captación de leads), el uso de un gestor de contenidos como WordPress maquetado con Elementor permite al equipo comercial realizar cambios sin depender de los desarrolladores de la App.

Pilar 4: Estrategia de Financiamiento y Levantamiento de Capital
La hoja de ruta financiera se estructurará en tres fases, combinando fondos públicos a fondo perdido (equity-free) con financiamiento privado.

Fase 1: Capital Semilla Público (Mes 1 a 6).

Start-Up Chile (Línea Build o Ignite): Postulación con foco en el impacto social y la escalabilidad del modelo EdTech.

CORFO (Semilla Inicia): Solicitar este fondo para validar comercialmente y empaquetar el prototipo de la app. El discurso debe centrarse en la reactivación educativa y la nivelación de estudios.

Fase 2: Apalancamiento Bancario Comercial (Mes 6 a 12).

Una vez obtenidas las primeras ventas (tracción), estructurar un perfil en instituciones como BancoEstado (Crédito Emprendedor) o Banco de Chile para capital de trabajo, utilizando los subsidios previos como aval de validación del modelo de negocio.

Fase 3: Inversionistas Ángeles (Mes 12+).

Presentar métricas de retención (usuarios activos mensuales) y costo de adquisición de clientes (CAC) a redes de inversionistas ángeles locales (ej. ChileGlobal Angels) para financiar la expansión a enseñanza media o a otros países de la región.

Pilar 5: Go-to-Market y Adquisición de Usuarios (Marketing)
El plan de marketing no dependerá exclusivamente de pauta pagada, sino de la construcción de confianza con las familias y educadores.

SEO de Nicho y Marketing de Contenidos: Las familias buscan activamente en Google "cómo dar exámenes libres en Chile" o "temarios 4 básico Mineduc". EstudioSimple capturará ese tráfico con artículos detallados y herramientas gratuitas (ej. calculadoras de puntajes o calendarios de estudio).

Alianzas con Comunidades de Homeschooling: En Santiago y regiones existen agrupaciones consolidadas de educación libre. Ofrecer planes piloto gratuitos o con descuento a los líderes de estas comunidades generará el boca a boca inicial más valioso.

Estrategia "Freemium" Orientada al Cuaderno: Permitir la descarga gratuita de plantillas de estudio para el cuaderno físico, las cuales requieren la creación de una cuenta en la App para ver las resoluciones en video. Esto disminuye la fricción de entrada y captura el correo del apoderado para campañas de email marketing posteriores.".
En la **Situación** actual: Desplegado en **Railway** con Base de Datos **Neon (PostgreSQL)**, requiriendo inmutabilidad de estado y robustez en la arquitectura.
Debes ejecutar las siguientes **Acciones**: 
1. **LEER OBLIGATORIAMENTE** el archivo `AGENTS.md` y toda la carpeta `spec/` ANTES de escribir cualquier código o ejecutar comandos. Debes seguir sus directivas e instalar cualquier prerrequisito de skills/MCP listado allí.
2. Diseñar las especificaciones, crear las tareas en spec.md e implementar respetando las reglas de inyección de infraestructura.
El entregable y criterios de **Salida** son: Cumplimiento estricto del protocolo dictado en AGENTS.md, código modular, linter libre de errores y compilación TypeScript exitosa sin fallos (tsc --noEmit).".
En la **Situación** actual: Desplegado en **Railway** con Base de Datos **Neon (PostgreSQL)**, requiriendo inmutabilidad de estado y robustez en la arquitectura.
Debes ejecutar las siguientes **Acciones**: 
1. **LEER OBLIGATORIAMENTE** el archivo `AGENTS.md` y toda la carpeta `spec/` ANTES de escribir cualquier código o ejecutar comandos. Debes seguir sus directivas e instalar cualquier prerrequisito de skills/MCP listado allí.
2. Diseñar las especificaciones, crear las tareas en spec.md e implementar respetando las reglas de inyección de infraestructura.
El entregable y criterios de **Salida** son: Cumplimiento estricto del protocolo dictado en AGENTS.md, código modular, linter libre de errores y compilación TypeScript exitosa sin fallos (tsc --noEmit).".
En la **Situación** actual: Desplegado en **Railway** con Base de Datos **Neon (PostgreSQL)**, requiriendo inmutabilidad de estado y robustez en la arquitectura.
Debes ejecutar las siguientes **Acciones**: 
1. **LEER OBLIGATORIAMENTE** el archivo `AGENTS.md` y toda la carpeta `spec/` ANTES de escribir cualquier código o ejecutar comandos. Debes seguir sus directivas e instalar cualquier prerrequisito de skills/MCP listado allí.
2. Diseñar las especificaciones, crear las tareas en spec.md e implementar respetando las reglas de inyección de infraestructura.
El entregable y criterios de **Salida** son: Cumplimiento estricto del protocolo dictado en AGENTS.md, código modular, linter libre de errores y compilación TypeScript exitosa sin fallos (tsc --noEmit).
- **Objetivo de Negocio:** Desarrollar la aplicación e interfaz solicitada: "Actúa como un **Ingeniero de Software (A-SDLC)**.
Tu **Objetivo** es: Desarrollar una solución determinista para "Actúa como un **Ingeniero de Software (A-SDLC)**.
Tu **Objetivo** es: Desarrollar una solución determinista para "Actúa como un **Ingeniero de Software (A-SDLC)**.
Tu **Objetivo** es: Desarrollar una solución determinista para "Pilar 1: Segmentación Estratégica (Nicho de Adopción Temprana)
Para asegurar una adopción rápida y tracción inicial, EstudioSimple no debe apuntar a "todos los estudiantes". El éxito radica en dominar un nicho específico antes de escalar.

Segmento Principal (Early Adopters): Familias en la Región Metropolitana (Santiago) con hijos entre 3° y 8° básico que han optado por el homeschooling de forma reciente (1 a 2 años).

Perfil del Apoderado: Padres y madres que trabajan, que buscan estructurar el estudio de sus hijos pero carecen de tiempo o formación pedagógica formal para crear material desde cero. Valoran profundamente lo análogo (cuadernos) pero necesitan la validación y guía de lo digital.

Casos de Uso Estratégicos: * Estudiantes que salieron del sistema tradicional por problemas de convivencia escolar o desajuste con el Sistema de Admisión Escolar (SAE).

Familias neurodivergentes que buscan un ritmo de aprendizaje libre de la presión del aula tradicional.

Propuesta de Valor para Inversionistas: Al captar a estudiantes de 3° básico, la plataforma asegura un Lifetime Value (LTV) extendido, reteniendo al usuario por hasta 6 años dentro del ecosistema de la app.

Pilar 2: Flujo Pedagógico (Diseño Esencial y Directo)
La sobrecarga cognitiva es el mayor enemigo de las plataformas EdTech. EstudioSimple se diferenciará por un diseño estructural esencial, sin distracciones, dividido estrictamente en dos etapas:

Fase 1: Aprendizaje Didáctico y Ejemplificación. * El usuario accede directamente a cápsulas de contenido diseñadas para ser consumidas de forma amena.

Cada concepto se explica de manera didáctica y se acompaña inmediatamente de un ejemplo práctico y resolutivo. El estudiante utiliza su cuaderno físico para replicar el ejemplo, creando un puente entre la pantalla y el papel.

Fase 2: Práctica y Ensayos (Tipo Evaluación).

Una vez asimilado el contenido, se habilita el módulo de práctica.

Los estudiantes se enfrentan a ensayos estructurados con el rigor y la claridad de un instrumento formal, utilizando formatos de pregunta con estándares comparables a los de la evaluación docente chilena, asegurando que el estudiante esté genuinamente preparado para el rigor del examen libre del MINEDUC.

Pilar 3: Arquitectura Tecnológica (Robusta y Escalable)
Para garantizar agilidad en el desarrollo y un mantenimiento costo-eficiente, se recomienda una arquitectura basada en tecnologías web modernas, priorizando el enfoque Mobile-First (Progressive Web App) antes de invertir en desarrollo nativo complejo.

Frontend (Interfaz de Usuario): Desarrollo ágil utilizando HTML, CSS y JavaScript puro o mediante frameworks ligeros, estilizado completamente con Tailwind CSS. Esto garantiza una interfaz limpia, de carga ultra rápida y adaptable a cualquier dispositivo (computadores de escuelas, tablets o celulares de gama media).

Backend y Base de Datos: Implementación de Neon PostgreSQL. Su naturaleza serverless permite escalar la base de datos automáticamente según la demanda (ideal para los picos de uso en las semanas previas a los exámenes libres) y reduce los costos operativos iniciales.

Despliegue y Hosting: Uso de Railway para el despliegue continuo de la aplicación. Es una infraestructura robusta que automatiza el proceso desde el repositorio hasta la producción, liberando al equipo técnico para enfocarse en el código y no en la configuración de servidores.

Ecosistema de Marketing: Para la cara pública del negocio (Landing Pages, blog SEO y captación de leads), el uso de un gestor de contenidos como WordPress maquetado con Elementor permite al equipo comercial realizar cambios sin depender de los desarrolladores de la App.

Pilar 4: Estrategia de Financiamiento y Levantamiento de Capital
La hoja de ruta financiera se estructurará en tres fases, combinando fondos públicos a fondo perdido (equity-free) con financiamiento privado.

Fase 1: Capital Semilla Público (Mes 1 a 6).

Start-Up Chile (Línea Build o Ignite): Postulación con foco en el impacto social y la escalabilidad del modelo EdTech.

CORFO (Semilla Inicia): Solicitar este fondo para validar comercialmente y empaquetar el prototipo de la app. El discurso debe centrarse en la reactivación educativa y la nivelación de estudios.

Fase 2: Apalancamiento Bancario Comercial (Mes 6 a 12).

Una vez obtenidas las primeras ventas (tracción), estructurar un perfil en instituciones como BancoEstado (Crédito Emprendedor) o Banco de Chile para capital de trabajo, utilizando los subsidios previos como aval de validación del modelo de negocio.

Fase 3: Inversionistas Ángeles (Mes 12+).

Presentar métricas de retención (usuarios activos mensuales) y costo de adquisición de clientes (CAC) a redes de inversionistas ángeles locales (ej. ChileGlobal Angels) para financiar la expansión a enseñanza media o a otros países de la región.

Pilar 5: Go-to-Market y Adquisición de Usuarios (Marketing)
El plan de marketing no dependerá exclusivamente de pauta pagada, sino de la construcción de confianza con las familias y educadores.

SEO de Nicho y Marketing de Contenidos: Las familias buscan activamente en Google "cómo dar exámenes libres en Chile" o "temarios 4 básico Mineduc". EstudioSimple capturará ese tráfico con artículos detallados y herramientas gratuitas (ej. calculadoras de puntajes o calendarios de estudio).

Alianzas con Comunidades de Homeschooling: En Santiago y regiones existen agrupaciones consolidadas de educación libre. Ofrecer planes piloto gratuitos o con descuento a los líderes de estas comunidades generará el boca a boca inicial más valioso.

Estrategia "Freemium" Orientada al Cuaderno: Permitir la descarga gratuita de plantillas de estudio para el cuaderno físico, las cuales requieren la creación de una cuenta en la App para ver las resoluciones en video. Esto disminuye la fricción de entrada y captura el correo del apoderado para campañas de email marketing posteriores.".
En la **Situación** actual: Desplegado en **Railway** con Base de Datos **Neon (PostgreSQL)**, requiriendo inmutabilidad de estado y robustez en la arquitectura.
Debes ejecutar las siguientes **Acciones**: 
1. **LEER OBLIGATORIAMENTE** el archivo `AGENTS.md` y toda la carpeta `spec/` ANTES de escribir cualquier código o ejecutar comandos. Debes seguir sus directivas e instalar cualquier prerrequisito de skills/MCP listado allí.
2. Diseñar las especificaciones, crear las tareas en spec.md e implementar respetando las reglas de inyección de infraestructura.
El entregable y criterios de **Salida** son: Cumplimiento estricto del protocolo dictado en AGENTS.md, código modular, linter libre de errores y compilación TypeScript exitosa sin fallos (tsc --noEmit).".
En la **Situación** actual: Desplegado en **Railway** con Base de Datos **Neon (PostgreSQL)**, requiriendo inmutabilidad de estado y robustez en la arquitectura.
Debes ejecutar las siguientes **Acciones**: 
1. **LEER OBLIGATORIAMENTE** el archivo `AGENTS.md` y toda la carpeta `spec/` ANTES de escribir cualquier código o ejecutar comandos. Debes seguir sus directivas e instalar cualquier prerrequisito de skills/MCP listado allí.
2. Diseñar las especificaciones, crear las tareas en spec.md e implementar respetando las reglas de inyección de infraestructura.
El entregable y criterios de **Salida** son: Cumplimiento estricto del protocolo dictado en AGENTS.md, código modular, linter libre de errores y compilación TypeScript exitosa sin fallos (tsc --noEmit).".
En la **Situación** actual: Desplegado en **Railway** con Base de Datos **Neon (PostgreSQL)**, requiriendo inmutabilidad de estado y robustez en la arquitectura.
Debes ejecutar las siguientes **Acciones**: 
1. **LEER OBLIGATORIAMENTE** el archivo `AGENTS.md` y toda la carpeta `spec/` ANTES de escribir cualquier código o ejecutar comandos. Debes seguir sus directivas e instalar cualquier prerrequisito de skills/MCP listado allí.
2. Diseñar las especificaciones, crear las tareas en spec.md e implementar respetando las reglas de inyección de infraestructura.
El entregable y criterios de **Salida** son: Cumplimiento estricto del protocolo dictado en AGENTS.md, código modular, linter libre de errores y compilación TypeScript exitosa sin fallos (tsc --noEmit).".
- **Audiencia Objetivo:** Usuarios finales y desarrolladores.
- **Rigor de Especificación:** Spec-First (Recomendado)

## 🏗️ Principios Tecnológicos
1. **Especificación como SSOT:** El código fuente es una consecuencia directa de la documentación de intenciones.
2. **Gobernanza Automatizada (Definition of Done):** Ningún commit es aceptado si falla los checks del DoD.
3. **Minimizar Blast Radius:** Limitar la mutabilidad del codebase mediante aislamiento.