# Regla Obligatoria de Inicio de Trabajo: Verificacion de Paridad GitHub vs PC

## 1. Principio Fundamental
Al comenzar cualquier sesion de trabajo, o cuando el usuario solicite contexto, revision de pendientes o plan de trabajo, el agente DEBE verificar de forma autonoma que la version local del PC coincida exactamente con la version alojada en GitHub en la rama activa.

Esta verificacion previene discrepancias entre diferentes estaciones de trabajo (colegio, hogar, otros PCs) y evita sobreescrituras accidentales o trabajo sobre bases desactualizadas.

## 2. Procedimiento de Ejecucion
El agente debe ejecutar el verificador de paridad:
```bash
npx tsx scripts/verify_git_version.ts
```

## 3. Protocolo Segun Resultado

### Caso A: Paridad Confirmada (Codigo de salida 0)
- Hashes identicos, sin commits por subir ni bajar, y arbol de trabajo limpio.
- El agente informa brevemente que la version de GitHub y la del PC estan alineadas y continua con la sesion.

### Caso B: Desalineacion Detectada (Codigo de salida 1)
El agente debe:
1. Reportar de inmediato el estado exacto:
   - Rama activa y rama remota de rastreo.
   - Hash local (PC) y Hash remoto (GitHub).
   - Cantidad de commits por subir (ahead) o por bajar (behind).
   - Lista de archivos modificados o sin commit en el PC.
2. Presentar los prompts autonomos listos para ejecutar segun la direccion requerida:
   - **Opcion 1: Actualizar PC desde GitHub (Pull):** Para cuando GitHub tiene cambios mas recientes (por ejemplo, realizados en otro computador).
   - **Opcion 2: Actualizar GitHub desde PC (Push):** Para cuando el PC local tiene trabajo confirmado o no subido que debe publicarse en GitHub.
   - **Opcion 3: Reconciliacion Bidireccional:** Si ambas ramas poseen commits divergentes.

### Caso C: Error de Red o Git (Codigo de salida 2)
- Reportar el mensaje de error de conexion sin intentar forzar operaciones remotas destructivas.

## 4. Prohibiciones Estrictas
- Prohibido asumir que el repositorio esta al dia sin haber ejecutado la verificacion.
- Prohibido utilizar `git push --force` o `git reset --hard` no autorizado.
- Prohibido eliminar trabajo local sin previo respaldo o stash seguro.

