# Control de Versiones e Idempotencia por Estampa Temporal Interna

## 1. Principio Rector
Para evitar trabajo redundante, reprocesamiento de clases y sobreescrituras innecesarias en la aplicación, todo archivo de lección pedagógica (tanto en `LECCIONES_POR_REVISAR/` como en `LECCIONES/`) cuenta con su **fecha y hora exacta en el contenido**:

```markdown
**Fecha y hora de versión:** YYYY-MM-DD HH:mm [America/Santiago]
```

## 2. Protocolo de Inyección y Deduplicación (Gatekeeper Obligatorio)
Antes de ejecutar cualquier tarea de auditoría, transformación a TypeScript o inyección en la base de datos o en `Web Studio Simple/src/data/lessons/`:

1. **Lectura de la Estampa Interna:** Antigravity debe extraer obligatoriamente la fecha y hora declarada en la cabecera del archivo en `LECCIONES_POR_REVISAR/`.
2. **Cotejo contra Versión Canónica:** Comparar dicha estampa temporal contra:
   - El `manifest.json` oficial de la asignatura y OA correspondiente.
   - El archivo TypeScript exportado en `Web Studio Simple/src/data/lessons/`.
3. **Regla de Idempotencia:**
   - **Si la estampa es idéntica o anterior:** Queda **ESTRICTAMENTE PROHIBIDO** reprocesar la clase. Se omite de inmediato notificando que la clase ya se encuentra integrada y vigente en la versión actual.
   - **Si la estampa es estrictamente posterior:** Se reconoce como una **nueva versión autorizada** y se procede a su validación, actualización de TypeScript, regeneración de DOCX oficial, actualización del `manifest.json` y retiro del archivo procesado de `LECCIONES_POR_REVISAR/`.

## 3. Separación de Carpetas
- `LECCIONES_POR_REVISAR/`: Buzón temporal de entrada (staging).
- `LECCIONES/`: Repositorio canónico oficial (inmutable, con versiones fechadas en su nombre `..._YYYY-MM-DD_HH-mm.docx` y en su contenido). **Prohibido borrar.**
