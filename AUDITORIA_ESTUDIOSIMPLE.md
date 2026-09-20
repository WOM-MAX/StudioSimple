# Auditoría integral de EstudioSimple

**Fecha:** 25 de julio de 2026  
**Estado evaluado:** prototipo visual pre-MVP  
**Alcance:** landing, dashboard, checkout, sistema de diseño y contexto funcional entregado posteriormente.

## 1. Resumen ejecutivo

EstudioSimple presenta una propuesta de valor clara y una dirección de experiencia coherente con familias que necesitan preparar Exámenes Libres con estructura, calma y baja carga cognitiva. Los prototipos utilizan bloques modulares, espacios amplios, una jerarquía visual reconocible y un dashboard que intenta concentrar las decisiones importantes.

Sin embargo, el código actual no constituye todavía una aplicación funcional ni una base escalable. Está compuesto por tres documentos HTML independientes, sin componentes compartidos, rutas, persistencia, autenticación, backend, modelo curricular, integración de pagos, pruebas ni proceso de compilación.

También existen bloqueadores funcionales graves:

- El JavaScript del checkout termina incompleto.
- Los botones principales no ejecutan acciones.
- La navegación móvil del dashboard no funciona.
- Varios enlaces apuntan a destinos inexistentes.
- El checkout no contiene un formulario real ni integración de pago.
- La identidad tipográfica solicitada no está implementada.
- La paleta requerida se encuentra sustituida por múltiples valores alternativos.
- Hay controles inaccesibles mediante teclado y estados no comunicados a tecnologías asistivas.

La recomendación principal es considerar estos archivos como material de referencia visual y reconstruir el producto como una aplicación componentizada, orientada al dominio educativo y validada mediante una rebanada vertical completa.

## 2. Archivos revisados

- `landing_page_con_acentos_amarillo_estudio_simple/code.html`
- `landing_page_con_acentos_amarillo_estudio_simple/screen.png`
- `dashboard_acentos_amarillo_estudio_simple/code.html`
- `dashboard_acentos_amarillo_estudio_simple/screen.png`
- `checkout_con_acentos_amarillo_estudio_simple/code.html`
- `checkout_con_acentos_amarillo_estudio_simple/screen.png`
- `estudio_simple/DESIGN.md`
- Documento funcional posterior con las fases, stack, reglas de negocio y arquitectura pedagógica.

No se modificaron los prototipos durante la auditoría.

## 3. Veredicto de madurez

| Dimensión | Estado |
|---|---|
| Propuesta de valor | Bien encaminada |
| Dirección UX | Prometedora |
| Diseño modular | Parcialmente logrado |
| Identidad visual | Inconsistente |
| Accesibilidad | Insuficiente |
| Funcionalidad | Prototipo no operativo |
| Arquitectura | No escalable |
| Seguridad | No evaluable como aplicación |
| Pagos | No implementados |
| Preparación para producción | No apta |

## 4. Fortalezas

### 4.1 Propuesta y comunicación

- El mensaje principal responde directamente al problema del adulto: preparar Exámenes Libres con menos incertidumbre.
- El rango de 3.° a 8.° Básico aparece temprano.
- La landing cubre método, beneficios, testimonios, preguntas frecuentes y llamada a la acción.
- El tono intenta evitar una estética excesivamente infantil.
- La promesa de sesiones modulares y acompañamiento familiar encaja con usuarios adultos sin formación docente.
- El concepto “Aprender en familia, paso a paso” ofrece un criterio claro para evaluar decisiones futuras.

### 4.2 Organización UX

- El dashboard concentra lección actual, objetivo, concepto clave, progreso, evaluación y consejo para el adulto.
- El flujo del checkout se divide en plan, cuenta, pago y resumen.
- La lección utiliza una jerarquía comprensible:

  `contexto → concepto → acción principal → acción secundaria`

- La landing emplea `header`, `nav`, `main`, `section`, `footer` y `details/summary`.
- La agrupación por tarjetas reduce la sensación de contenido continuo.
- La separación posterior entre vista del estudiante y vista del apoderado corrige una de las principales ambigüedades del prototipo.

### 4.3 Base visual

- Existe una intención consistente de asignar funciones semánticas a los acentos.
- La configuración contiene escalas tipográficas, espaciado y tokens.
- El dashboard utiliza una cuadrícula de doce columnas en escritorio.
- El checkout elimina navegación secundaria, una decisión adecuada para reducir abandono.
- La separación visual de la acción principal es clara en landing y dashboard.

### 4.4 Dirección pedagógica posterior

El documento funcional posterior aporta decisiones valiosas:

- Relación individual entre suscripción y estudiante activo.
- Paneles separados para estudiante y apoderado.
- Arquitectura de lecciones de once componentes.
- Tratamiento no punitivo del error.
- Enfoque sensible al trauma escolar.
- Adaptación según ciclo.
- Trazabilidad hacia objetivos de aprendizaje.
- Uso diferenciado de FSRS y BKT.
- Revisión de contenidos apoyada en fuentes.

Estas decisiones permiten evolucionar desde páginas visuales hacia un sistema educativo coherente.

## 5. Debilidades críticas

### 5.1 Checkout roto

El script final del checkout termina en una llamada incompleta:

```text
opt.querySelector('span.text-tertiary:last-child')?.classList.replace
```

La validación local de sintaxis devuelve:

```text
Unexpected end of input
```

Consecuencias:

- El estado seleccionado no se actualiza correctamente.
- El resumen del pedido no cambia.
- El precio permanece fijo.
- Los indicadores visuales quedan desincronizados.

### 5.2 No existe una compra real

El checkout no contiene:

- `<form>`.
- Acción de envío.
- Proveedor de pago.
- Tokenización.
- Estados de carga.
- Validación.
- Manejo de rechazo.
- Confirmación.
- Recuperación ante interrupciones.

El botón “Completar Compra” es únicamente presentación.

### 5.3 Clases sin definición

En landing y checkout aparecen clases como:

- `btn-primary`
- `input-field`
- `plan-option`
- `bento-card`
- `glass-panel`
- `glass-nav`
- `cta-spring`
- `animate-on-scroll`
- `animate-hero-title`

Varias no tienen reglas CSS asociadas. Esto produce una diferencia entre la intención del código y el resultado efectivo.

### 5.4 Navegación móvil bloqueada

En móvil:

- La barra lateral del dashboard se oculta.
- El botón de menú no posee lógica.
- El botón no tiene nombre accesible.
- No existe panel emergente ni navegación alternativa.

Un estudiante que ingresa desde teléfono puede quedar sin acceso a lecciones, progreso, recursos o configuración.

### 5.5 CTA y enlaces ficticios

- Los botones de prueba gratuita no tienen enlace ni manejador.
- `#pricing` no existe.
- `#login` no existe.
- Los enlaces del pie utilizan `href="#"`.
- La mayoría de las acciones del dashboard no ejecutan nada.
- El selector de tema cambia una clase, pero no implementa un tema alternativo real.

## 6. Arquitectura y escalabilidad

### 6.1 Situación actual

El material consiste en documentos monolíticos con:

- Configuración duplicada.
- Estilos en línea.
- Datos incrustados.
- Estado local mínimo.
- Interacciones directas sobre el DOM.
- Dependencias cargadas desde CDN.

No existen:

- Componentes reutilizables.
- Enrutamiento.
- Tipado.
- API.
- Autenticación.
- Autorización.
- Persistencia.
- Modelo curricular.
- Gestión editorial.
- Pruebas.
- CI/CD.
- Observabilidad.

### 6.2 Problema de duplicación

Cada HTML contiene su propia configuración de:

- Tipografías.
- Paleta.
- Espaciado.
- radios.
- Tamaños.
- tokens semánticos.

Un cambio de marca o accesibilidad debe repetirse manualmente, con alto riesgo de divergencia.

### 6.3 Arquitectura recomendada

La aplicación debería separarse en dominios:

```text
marketing
auth
household
student
curriculum
lesson
assessment
progress
adaptation
billing
notifications
content-authoring
analytics
support
```

Capas recomendadas:

```text
UI y componentes
    ↓
casos de uso
    ↓
dominio
    ↓
persistencia e integraciones
```

El sistema de diseño debe existir como paquete o módulo compartido y no como configuración repetida en cada pantalla.

### 6.4 Regla comercial frente al modelo de datos

La regla “una suscripción permite un estudiante” no debería convertirse en una relación irreversible de base de datos.

Modelo recomendado:

```text
adult_account
    ↓
household
    ↓
students
    ↓
subscription_entitlement
```

La suscripción actual limitaría a un estudiante activo, pero el modelo admitiría:

- Historial.
- Cambio de estudiante.
- Renovación.
- Nuevos planes.
- Auditoría.

## 7. UX y carga cognitiva

### 7.1 Landing

Fortalezas:

- Mensaje comprensible.
- Rango educativo visible.
- Beneficios organizados.
- Preguntas frecuentes.
- CTA reiterado.

Problemas:

- Cabecera y hero excesivamente altos.
- Mucho desplazamiento antes de llegar a información concreta.
- No existe una sección real de precios.
- Falta una muestra funcional de la plataforma.
- Los testimonios no contienen mecanismos de verificación.
- Las afirmaciones normativas y de resultados son demasiado absolutas.
- En móvil no existe navegación completa.

### 7.2 Dashboard

Fortalezas:

- Una lección principal.
- Progreso visible.
- Acción primaria reconocible.
- Consejo contextual.

Problemas:

- Mezcla funciones del estudiante y del adulto.
- “Nueva Lección” sugiere un rol de creador.
- No presenta claramente qué hacer hoy.
- No muestra progreso por asignatura.
- No permite cambiar de vista de manera robusta.
- Las tarjetas escalan al pasar el cursor incluso cuando no son interactivas.
- Los breadcrumbs aparentan ser interactivos, pero son texto.

### 7.3 Checkout

Fortalezas:

- Flujo lineal.
- Agrupación por etapas.
- Resumen visible en escritorio.
- Reducción de navegación.

Problemas:

- Moneda ambigua.
- Total e impuestos fijos.
- Plan gratuito con solicitud de pago poco explicada.
- Sin aceptación de términos.
- Sin renovación claramente comunicada.
- Sin validación ni errores.
- Campos en inglés dentro de una interfaz en español.
- Sin accesibilidad de etiquetas.
- Sin integración segura para datos de tarjeta.

## 8. Accesibilidad

### 8.1 Hallazgos

- El acordeón del dashboard es un `<div onclick>`.
- No recibe foco mediante teclado.
- No expone `aria-expanded`.
- Las pestañas carecen de roles y relaciones ARIA.
- Las pestañas eliminan el indicador de foco.
- La barra de progreso no expone su valor.
- Falta un enlace para saltar al contenido.
- No se contempla reducción de movimiento.
- La landing declara `lang="en"` con contenido en español.
- Los inputs no están relacionados programáticamente con sus labels.
- Varios controles dependen solo de cambios visuales.

### 8.2 Requisitos mínimos recomendados

- WCAG 2.2 AA como criterio de aceptación.
- Operación completa mediante teclado.
- Foco visible.
- Objetivos táctiles adecuados.
- Lectura correcta con lector de pantalla.
- Reflujo a ampliación de texto.
- Respeto por `prefers-reduced-motion`.
- Estados de error comunicados por texto y semántica.
- Pruebas automáticas y manuales.

## 9. Rendimiento, SEO y mantenibilidad

### 9.1 Rendimiento

- Tailwind se ejecuta desde Play CDN.
- Las imágenes externas no definen dimensiones.
- No hay `srcset` ni `sizes`.
- No existe estrategia de carga.
- El dashboard solicita dos veces la fuente de iconos.
- Hay scripts y estilos en línea.
- Las imágenes dependen de URLs externas no controladas.

Tailwind Play CDN es adecuado para experimentación, no para producción.

### 9.2 SEO

- Landing y checkout no poseen título adecuado.
- No existe descripción.
- No hay canonical.
- No hay metadatos sociales.
- El título del dashboard está en inglés.
- El idioma de la landing está mal declarado.
- No hay datos estructurados.

### 9.3 Mantenibilidad

- Valores arbitrarios anulan tokens.
- Los componentes no están centralizados.
- La lógica se manipula directamente mediante selectores DOM.
- No hay separación entre presentación y reglas.
- No hay pruebas de regresión.

## 10. Auditoría de identidad

### 10.1 Tipografía

**Resultado: incumplimiento.**

Requisito actual:

```css
:root {
  --font-heading: "Nunito", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

Implementación encontrada:

- Nunito no aparece en ningún archivo.
- `DESIGN.md` declara Montserrat para títulos.
- La landing carga Montserrat e Inter, pero fuerza Arial Rounded en numerosos elementos.
- El dashboard carga Montserrat e Inter, pero fuerza Arial Rounded en el `body`.
- El checkout carga Quicksand y asigna todas las categorías a Arial Rounded o Quicksand.
- Inter no se utiliza de manera consistente.

Acción recomendada:

- Actualizar primero la especificación.
- Cargar Nunito e Inter una sola vez.
- Eliminar tipografía en línea.
- Utilizar variables CSS.
- Definir pesos y métricas por token.
- Autohospedar las fuentes cuando sea conveniente.

### 10.2 Paleta

**Resultado: cumplimiento parcial e inconsistente.**

| Rol | Valor requerido | Implementación encontrada |
|---|---:|---|
| Primario | `#123A72` | Presente, pero sustituido frecuentemente por `#1C3257` |
| Acción | `#F57C00` | Sustituido por `#F27A00` |
| Progreso | `#18AFCB` | Sustituido por `#57D6F3`, `#24B4D0` y `#12A1A4` |
| Éxito | `#4CAF50` | Sustituido por `#4ADE80` |
| Logro | `#FBC02D` | Sustituido por `#FFC107` y utilidades no tokenizadas |
| Cabecera y pie | Sin rol central | Se introduce `#F8AD22` |

Variables recomendadas:

```css
:root {
  --color-primary: #123A72;
  --color-action: #F57C00;
  --color-progress: #18AFCB;
  --color-success: #4CAF50;
  --color-achievement: #FBC02D;
  --color-on-dark: #FFFFFF;
  --color-on-accent: #0A192F;
}
```

### 10.3 Contraste

Combinaciones comprobadas:

| Combinación | Contraste aproximado |
|---|---:|
| `#FFFFFF` sobre `#F57C00` | `2.70:1` |
| `#0A192F` sobre `#F57C00` | `6.51:1` |
| `#FFFFFF` sobre `#18AFCB` | `2.61:1` |
| `#0A192F` sobre `#18AFCB` | `6.73:1` |
| `#FFFFFF` sobre `#4CAF50` | `2.78:1` |
| `#0A192F` sobre `#4CAF50` | `6.33:1` |
| `#123A72` sobre `#FBC02D` | `6.77:1` |
| `#FFFFFF` sobre `#123A72` | `11.21:1` |

El texto normal requiere al menos `4.5:1`. Por tanto, varios controles con `#FFFFFF` sobre acentos no cumplen.

### 10.4 Geometría

La especificación declara `24px` para tarjetas. La configuración efectiva genera principalmente `16px`.

Debe existir una única escala:

```css
:root {
  --radius-card: 24px;
  --radius-control: 16px;
  --radius-pill: 9999px;
}
```

## 11. Riesgos normativos y de contenido

La frase que atribuye a la plataforma cumplimiento estricto de los Decretos 2272 y 67 para certificar legalmente el año escolar es riesgosa.

Consideraciones:

- La plataforma prepara; no certifica.
- La certificación surge del proceso oficial de validación.
- La evaluación es aplicada por entidades examinadoras designadas.
- El Decreto 2272 regula la validación de estudios.
- El Decreto 67 se relaciona con evaluación, calificación y promoción escolar.
- “Simulacros idénticos a los oficiales” requiere evidencia que probablemente no puede garantizarse.
- No debe prometerse aprobación ni equivalencia exacta.

Recomendación:

- Revisión jurídica y pedagógica.
- Enlaces a fuentes oficiales.
- Fecha de actualización.
- Alcance preciso de la alineación.
- Separación entre información oficial y servicio comercial.
- Trazabilidad curricular verificable.

Fuentes:

- https://epja.mineduc.cl/validacion-de-estudios/examenes-libres-menores-de-18-anos/en-que-consiste/
- https://epja.mineduc.cl/validacion-de-estudios/examenes-libres-menores-de-18-anos/como-se-evalua/
- https://www.curriculumnacional.cl/portal/Evaluacion/Marco-legal/

## 12. Funcionalidades recomendadas

### 12.1 MVP esencial

1. Registro y autenticación.
2. Verificación del adulto.
3. Perfil del estudiante.
4. Onboarding.
5. Diagnóstico inicial.
6. Plan semanal.
7. Dashboard “Hoy”.
8. Reproductor de lecciones.
9. Actividades.
10. Mini quiz.
11. Retroalimentación.
12. Progreso por objetivo.
13. Vista del apoderado.
14. Suscripción y pago.
15. Administración editorial.

### 12.2 Conversión

- Diagnóstico gratuito breve.
- Lección de muestra sin registro.
- Comparador de planes.
- Simulador de planificación según fecha de examen.
- Explicación clara de renovación y cancelación.
- Evidencia de autores y metodología.
- Trazabilidad hacia fuentes oficiales.

### 12.3 Retención

- Continuar desde el último punto.
- Plan semanal reajustable.
- Resumen semanal para el adulto.
- Recordatorios optativos.
- Repaso espaciado.
- Banco de errores.
- Metas alcanzables.
- Reconocimientos no punitivos.
- Alertas tempranas.
- Baja conectividad.

### 12.4 Diferenciación

- Diagnóstico adaptativo.
- Ruta por brechas.
- Simulaciones para Ciencias.
- Evaluación oral para Inglés.
- Análisis de errores en Matemática.
- Tutor asistido limitado a fuentes aprobadas.
- Centro de acompañamiento familiar.
- Trazabilidad curricular por lección y pregunta.

### 12.5 Funciones que conviene posponer

- Red social.
- Foros abiertos.
- Marketplace.
- Aplicación móvil nativa.
- Gamificación compleja.
- Clases en vivo integradas.
- Publicación automática de contenido generado por IA.

## 13. Arquitectura pedagógica de las lecciones

Los once componentes propuestos son:

1. Objetivo.
2. Materiales.
3. Explicación.
4. Ejemplo guiado.
5. Actividad guiada.
6. Actividad independiente.
7. Mini quiz.
8. Consejo para quien enseña.
9. Video.
10. Ilustración.
11. Resumen.

Recomendación:

### Obligatorios

- Objetivo.
- Explicación.
- Ejemplo.
- Práctica.
- Evaluación.
- Retroalimentación.
- Resumen.
- Consejo para el adulto.

### Condicionales

- Materiales.
- Video.
- Ilustración.
- Simulación.

Forzar todos los componentes en todas las lecciones puede aumentar carga cognitiva y costo editorial.

## 14. XState y resiliencia

XState resulta apropiado para modelar el ciclo de una lección:

```text
idle
  ↓
loading
  ↓
active
  ↓
guided_activity
  ↓
independent_activity
  ↓
assessment
  ↓
feedback
  ↓
completed
  ↓
syncing
  ↓
synced
```

Estados adicionales:

- Offline.
- Reintento.
- Guardado parcial.
- Sesión expirada.
- Error recuperable.
- Error no recuperable.
- Conflicto.

No se recomienda utilizar una única máquina global para toda la aplicación.

## 15. Datos, RAG e IA

### 15.1 Fuente de verdad

El conocimiento canónico debe residir en:

- Documentos originales.
- Base relacional.
- Metadatos curriculares.
- Repositorio vectorial.
- Versiones editoriales.

NotebookLM puede ser una superficie de investigación, pero no debería ser la única fuente de verdad.

### 15.2 Pipeline recomendado

```text
fuente
  ↓
validación de derechos
  ↓
extracción
  ↓
normalización
  ↓
segmentación semántica
  ↓
metadatos curriculares
  ↓
embeddings
  ↓
pgvector
  ↓
recuperación
  ↓
generación estructurada
  ↓
validadores
  ↓
revisión humana
  ↓
publicación
```

### 15.3 Trazabilidad mínima

Cada fragmento debe registrar:

- Fuente.
- Página o posición.
- Curso.
- Asignatura.
- Unidad.
- Objetivo de aprendizaje.
- Habilidad.
- Versión curricular.
- Derechos de uso.
- Fecha de extracción.
- Método de extracción.

Cada contenido generado debe registrar:

- Modelo.
- Prompt.
- Fragmentos recuperados.
- Versión.
- Revisor.
- Estado editorial.
- Fecha de publicación.

### 15.4 NotebookLM

No se encontró una integración MCP oficial de Google para NotebookLM. Las alternativas comunitarias automatizan Chrome y almacenan una sesión local.

Para el trabajo inmediato, la opción más segura es:

- Exportar informes a Google Docs.
- Conservar las fuentes originales en Drive.
- Compartir una carpeta de conocimiento.
- Usar NotebookLM como herramienta de investigación.
- Ingerir las fuentes en el RAG propio.

## 16. Analítica educativa

No conviene implementar xAPI y Caliper de forma duplicada desde el MVP.

Se recomienda un evento interno canónico:

```text
learning_event
├── id
├── actor_id
├── action
├── object_type
├── object_id
├── context
├── result
├── occurred_at
└── metadata
```

Luego pueden existir adaptadores hacia estándares externos.

Eventos iniciales:

- Lección iniciada.
- Lección reanudada.
- Explicación completada.
- Actividad respondida.
- Pista solicitada.
- Error cometido.
- Retroalimentación leída.
- Mini quiz completado.
- Objetivo dominado.
- Repaso programado.
- Sesión abandonada.

## 17. FSRS, BKT y adaptación

- FSRS debe programar repasos.
- BKT debe estimar dominio.
- No deben confundirse.
- Ambos deben consumir eventos consistentes.
- Durante el inicio deben operar en modo observación.
- Las recomendaciones deben compararse con criterio pedagógico humano.
- No debe penalizarse al estudiante por falta de actividad.
- Las métricas no deben generar vergüenza ni presión familiar.

La definición de KASER debe documentarse antes de diseñar su implementación, ya que no quedó suficientemente especificada en el material recibido.

## 18. Privacidad y seguridad

Antes del desarrollo se deben definir:

- Datos indispensables.
- Consentimiento del adulto.
- Acceso del estudiante.
- Conservación.
- Eliminación.
- Exportación.
- Registro de acciones.
- Roles administrativos.
- Respaldo.
- Recuperación.
- Tratamiento de datos de menores.
- Uso de proveedores de IA.
- Derechos sobre libros y materiales.

Para pagos:

- Utilizar campos alojados por un proveedor.
- No procesar tarjetas directamente.
- Implementar webhooks idempotentes.
- Validar firmas.
- Registrar estados.
- Separar suscripción de acceso educativo.

## 19. Información pendiente

- Proveedor de autenticación.
- Forma de ingreso del estudiante.
- Pasarela de pago.
- Moneda y facturación.
- Esquema actual de Neon.
- Cantidad y formatos de fuentes.
- Derechos de transformación.
- Flujo editorial.
- Equipo revisor.
- Volumen esperado.
- Requisitos offline.
- Política de videos.
- Definición de KASER.
- Criterio de preparación.
- Métricas pedagógicas.
- Métricas comerciales.
- Política de privacidad.
- Soporte real.
- Condiciones de devolución.

## 20. Plan recomendado

### P0 — Bloqueadores

- Corregir contenido normativo.
- Definir roles.
- Definir autenticación.
- Definir pago.
- Crear modelo curricular.
- Resolver privacidad.
- Construir flujo funcional mínimo.

### P1 — Rebanada vertical

Construir:

`registro → onboarding → lección → actividad → quiz → progreso → vista apoderado`

Utilizar:

- Un curso.
- Una asignatura.
- Una unidad.
- Entre tres y cinco objetivos.
- Contenido real revisado.

### P2 — Plataforma base

- Componentes.
- Tokens.
- Rutas.
- API.
- Persistencia.
- XState.
- Paneles separados.
- Backoffice.
- Pruebas.
- Observabilidad.

### P3 — Calidad

- Accesibilidad.
- Rendimiento.
- SEO.
- Baja conectividad.
- Analítica.
- Seguridad.
- Revisión editorial.

### P4 — Adaptación

- FSRS.
- BKT.
- Diagnóstico.
- Banco de errores.
- Recomendaciones.
- Simuladores.
- Evaluación oral.

### P5 — Escalamiento

- Más cursos.
- Más asignaturas.
- Automatización editorial.
- Optimización de infraestructura.
- Evaluación de nuevos planes.

## 21. Conclusión

La visión de EstudioSimple es sólida: existe un problema real, una audiencia bien definida y un principio de diseño relevante. Los prototipos expresan parte de esa visión, pero no deben evolucionarse como HTML aislado.

El siguiente nivel de calidad requiere:

1. Arquitectura orientada al dominio.
2. Separación efectiva entre estudiante y apoderado.
3. Modelo curricular trazable.
4. Contenido revisado por humanos.
5. Accesibilidad desde el inicio.
6. Identidad centralizada.
7. Pago y autenticación reales.
8. Métricas pedagógicas responsables.
9. Uso de IA como asistente, no como autoridad automática.
10. Desarrollo mediante una rebanada vertical antes de escalar.

EstudioSimple debe construirse como un sistema de acompañamiento educativo confiable, no solamente como una colección de pantallas atractivas.

## 22. Referencias

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Tailwind Play CDN: https://tailwindcss.com/docs/installation/play-cdn
- MINEDUC, validación de estudios: https://epja.mineduc.cl/validacion-de-estudios/examenes-libres-menores-de-18-anos/en-que-consiste/
- MINEDUC, evaluación: https://epja.mineduc.cl/validacion-de-estudios/examenes-libres-menores-de-18-anos/como-se-evalua/
- MINEDUC, Decreto 67: https://www.curriculumnacional.cl/portal/Evaluacion/Marco-legal/
- NotebookLM: https://support.google.com/notebooklm/answer/16206563

