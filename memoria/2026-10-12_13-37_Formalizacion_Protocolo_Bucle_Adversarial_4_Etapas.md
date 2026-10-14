# Formalización del Protocolo de Trabajo en 4 Etapas: Bucle Adversarial y Criterio de Parada

**Fecha y hora:** 2026-10-12 13:37 [America/Santiago]  
**Estado:** Formalizado e Integrado  
**Alcance:** Universal (Desarrollo, Pedagogía, Arquitectura, Documentación)

---

## 1. Contexto y Justificación
Para erradicar el sesgo del primer intento (*First-Draft Bias*), la superficialidad en respuestas técnicas y los entregables inconclusos con placeholders, se incorpora un estándar riguroso de auto-auditoría interna previo a la entrega al usuario.

---

## 2. Acciones Implementadas

1. **Creación de Regla Canónica:**
   - Archivo: `.agents/rules/protocolo_bucle_adversarial_4_etapas.md`
   - Define detalladamente:
     * **Etapa 1 (La Tarea - Qué quiero):** Desglose de objetivos y público; resolución autónoma fundamentada de ambigüedades menores sin pausas pasivas.
     * **Etapa 2 (El Método - Bucle Adversarial):** Ciclo iterativo de borrador y refutación activa por parte de un Árbitro Adversarial interno (red-teaming).
     * **Etapa 3 (El Listón - Criterio de Parada):** Criterio formal de parada basado en solidez lógica, valor profundo y cero explicaciones superficiales.
     * **Etapa 4 (Restricciones y Formato - Entregable Final):** Tolerancia cero a placeholders (`[insertar aquí]`, `TODO`, `...`), entrega 100% terminada y lista para uso directo.

2. **Actualización de la Política Maestra (`AGENTS.md`):**
   - Incorporación del numeral 4 bajo *Norma de Interacción, Autonomía y Ejecución Directa*.
   - Vinculación con los límites de gobernanza, sin conflicto con las reglas Spec-First ni el protocolo de aprobación humana exclusiva.

3. **Validación Técnica:**
   - Verificación de compilación TypeScript (`npx tsc --noEmit` en `Web Studio Simple`) con código de salida 0.
   - Inspección de sintaxis y consistencia de gobernanza.
