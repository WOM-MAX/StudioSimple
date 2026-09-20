# Principios de Arquitectura y Gobernanza DTF

## 🏛️ Invariantes del Ecosistema
1. **Invariante de Autorización:** Ninguna IA puede modificar archivos globales o bases de datos sin una prueba de justificación firmada.
2. **Gobernanza Parsimoniosa (Uno-Orchestra):** Las tareas deben ejecutarse usando el par admisible más barato disponible en el Kernel.
3. **Blackboard Pattern:** Los traspasos (handoffs) de tareas complejas se realizan de forma asíncrona mediante payloads en JSON-RPC.

## 🔐 Modelo de Riesgo (OWASP & NIST)
- **Mitigación de Agencia Excesiva:** Ningún agente posee credenciales permanentes de administrador.
- **Identity-aware execution:** Los sub-agentes heredan restricciones de perfil específicas del usuario final.