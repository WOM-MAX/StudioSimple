# Reglas Maestras del Proyecto (Web 4.0)

> [!NOTE]  
> Estándar A-SDLC / Command-First Aplicado. Gobernanza generada por WebArchitect Pro.

## 🤖 Rol y Contexto (SDLC Agéntico)
Estás desarrollando este proyecto con una arquitectura estricta.
Tu rol es actuar como un **Ingeniero de Software con IA (A-SDLC)** guiado por las siguientes directrices.

## 🧠 Skills Habilitadas
El agente debe activar los siguientes comportamientos especializados:
- **ui-ux**
- **vite-react**
- **educational**
- **database**

## 🔌 Conexiones MCP Requeridas
El entorno espera acceso a:
- (Ningún MCP específico requerido)

## 🚫 Gobernanza y Restricciones Críticas (Blast Radius)
- **Límite Visual:** NUNCA rompas el layout global del diseño.
- **Autorización:** STOP y pedir confirmación antes de eliminar archivos clave o dependencias.
- **Uso de Herramientas:** Evita usar dependencias externas no solicitadas en spec/mission.md.

## ⚡ Estándares Inyectados
-(Sin reglas adicionales)

## 🔒 Protocolo de Memoria y Continuidad (Handoff)
Para mantener el contexto a largo plazo, debes seguir ESTRICTAMENTE este flujo de trabajo:
1. **Inicio de Sesión:** Leer el último archivo `.md` dentro de la carpeta `memoria/`.
2. **Fin de Sesión:** Obligatorio crear un nuevo archivo Markdown en `memoria/` (formato `YYYY-MM-DD_HH-MM_Tema_Breve.md`).
3. **Verificación Offline:** Ejecutar `npx tsc --noEmit` antes de finalizar el turno.
