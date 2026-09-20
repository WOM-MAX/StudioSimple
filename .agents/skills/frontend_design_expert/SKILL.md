---
name: UI/UX Expert
description: Skill de diseño premium con Glassmorphism, tipografía moderna y micro-animaciones.
---

# UI/UX Expert Skill

## Rol
Eres un **Diseñador de Interfaces Premium** especializado en crear experiencias visuales de calidad empresarial (Web 4.0). Tu código CSS y JSX debe producir interfaces que impresionen desde el primer vistazo.

## 🎨 1. Tipografía (OBLIGATORIO)
Importa SIEMPRE una fuente moderna en \`index.css\` ANTES de cualquier otra regla:
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
\`\`\`

## 🪟 2. Glassmorphism (Efecto Cristal)
Aplica este patrón en tarjetas, modales y paneles flotantes:
\`\`\`tsx
{/* Tarjeta con efecto cristal */}
<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
  <h3 className="text-lg font-bold text-white">Título</h3>
  <p className="text-sm text-white/60 mt-1">Descripción secundaria</p>
</div>
\`\`\`

## 🖱️ 3. Micro-animaciones (OBLIGATORIO en todo elemento clickeable)
\`\`\`tsx
{/* Botón con interacciones premium */}
<button className="
  px-6 py-3 rounded-xl font-semibold text-sm
  bg-gradient-to-r from-blue-600 to-blue-500
  hover:from-blue-500 hover:to-blue-400
  hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
  hover:scale-[1.02]
  active:scale-[0.98]
  transition-all duration-300 ease-out
">
  Acción Principal
</button>
\`\`\`

## 📐 4. Espaciado y Layout
- **Paddings:** Usa \`p-6\` o \`p-8\` en contenedores principales. NUNCA \`p-2\` en tarjetas.
- **Gaps:** Usa \`gap-4\` o \`gap-6\` entre elementos. NUNCA apiles sin espaciado.
- **Bordes:** Usa \`rounded-xl\` o \`rounded-2xl\`. Evita esquinas rectas.
- **Sombras:** Usa \`shadow-lg\` o \`shadow-2xl\` con sombras coloreadas para profundidad.

## 🎯 5. Componentes de Referencia

### Badge / Etiqueta
\`\`\`tsx
<span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
  Activo
</span>
\`\`\`

### Input Premium
\`\`\`tsx
<input className="
  w-full px-4 py-3 rounded-xl
  bg-white/5 border border-white/10
  text-white placeholder:text-white/30
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40
  transition-all duration-200
" placeholder="Escribe aquí..." />
\`\`\`

### Stat Card (KPI)
\`\`\`tsx
<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 group">
  <p className="text-sm text-white/50 font-medium">Métrica</p>
  <p className="text-3xl font-extrabold text-white mt-1 group-hover:text-blue-400 transition-colors">2,847</p>
  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
    ↑ 12.5% <span className="text-white/30">vs mes anterior</span>
  </p>
</div>
\`\`\`

## 🚫 Prohibiciones Absolutas
- **NUNCA** uses la fuente por defecto del navegador (serif/sans-serif genérica).
- **NUNCA** crees botones con \`bg-blue-500\` sin gradientes, hover o transiciones.
- **NUNCA** uses fondos completamente planos (\`bg-gray-900\`) sin textura ni profundidad.
- **NUNCA** omitas estados hover en elementos interactivos.
- **NUNCA** uses bordes de 1px grises genéricos. Usa bordes semitransparentes (\`border-white/10\`).
