# Registro de Memoria: Unificación de Escala de Títulos de Sección, 4 Testimonios y Bento Panel FAQ

Fecha: 2026-09-17 18:50 (Hora Local)
Workspace: d:\StudioSimple - Antigravity\Web Studio Simple
Archivo modificado: src/components/landing/LandingPage.tsx, src/index.css

## 1. Diagnóstico del Problema

1. Inconsistencia de jerarquía en títulos de sección:
   - Sección 3: text-4xl md:text-5xl font-bold (sin badge superior).
   - Sección 4: text-3xl md:text-5xl font-black (peso extra pesado y badge desproporcionado).
   - Sección 5: text-3xl md:text-4xl font-bold (visiblemente más pequeño que las secciones previas, evidenciado en la captura del usuario).
   - Sección 6: text-3xl md:text-4xl font-bold.
2. Formato de testimonios:
   - El slider de 1 sola tarjeta no permitía visualizar los 4 testimonios simultáneamente, mientras que el formato previo 2x2 generaba invasión vertical excesiva.
3. Tipografía con peso excesivo (chubby / redondeada pesada):
   - En index.css existía una regla global @layer base con !important que forzaba Arial Rounded MT Bold en todas las etiquetas HTML (html, body, p, span, div, h1-h6). Debido a que Arial Rounded carece de variantes light o regular, todo el texto se dibujaba en negrita gruesa sin importar las clases font-normal.

## 2. Soluciones Implementadas

1. Normalización de index.css:
   - Se removió la directiva forzada con !important sobre todas las etiquetas HTML.
   - Se configuró Google Font Inter como tipografía base institucional del body y de la aplicación: font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
   - Esto permite que font-normal, font-medium y font-bold rindan con nitidez y pesos tipográficos reales.

2. Unificación absoluta de la escala de títulos de sección en LandingPage.tsx:
   - Sección 3 (¿Cómo logramos el éxito académico?): Eyebrow pill estándar con icono de colegio, H2 con text-3xl md:text-5xl font-bold text-white tracking-tight y subtítulo en text-slate-300 font-normal.
   - Sección 4 (Nuestro Método): Eyebrow pill estándar con icono de psicología, H2 con text-3xl md:text-5xl font-bold text-white tracking-tight y subtítulo en text-slate-300 font-normal.
   - Sección 5 (Lo que dicen las familias): Eyebrow pill estándar con icono familiar, H2 con text-3xl md:text-5xl font-bold text-white tracking-tight y subtítulo en text-slate-300 font-normal.
   - Sección 6 (Preguntas Frecuentes): Eyebrow pill estándar con icono de ayuda, H2 con text-3xl md:text-5xl font-bold text-white tracking-tight y subtítulo en text-slate-300 font-normal.

3. Despliegue de los 4 Testimonios en fila horizontal no invasiva:
   - Disposición en 4 columnas de escritorio: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5.
   - Tarjetas esbeltas individuales con badge de caso estratégico (SAE, TDAH, Padres Trabajadores, MINEDUC), 5 estrellas doradas, cita en Inter regular de alta legibilidad, y pie de autor con iniciales y check de verificación oficial.

4. Diferenciación arquitectónica de la sección FAQ:
   - En lugar de tarjetas flotantes desconectadas que imitaban a los testimonios, se agrupó el acordeón dentro de un Panel Bento Unificado institucional (max-w-4xl, bg-[#12284D]/60, border border-white/10, rounded-3xl, shadow-2xl, backdrop-blur-md) con líneas divisorias finas (divide-y divide-white/10).
   - Tipografía Inter fina y elegante, con iconos temáticos por pregunta y flechas de despliegue suaves.

## 3. Verificación Técnica

- Compilación TypeScript: npx tsc --noEmit finalizado con código de salida 0 (cero errores).
- Servidor de desarrollo Vite activo y sincronizado.
