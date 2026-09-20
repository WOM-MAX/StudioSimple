# Memoria de Sesión: Corrección de Carga de Credenciales en AppContext

- Fecha y Hora: 2026-07-26 14:50
- Tema: Garantía de valores por defecto para `pin` y `password` al cargar del `localStorage`.

## Resoluciones Aplicadas

1. **Corrección en `AppContext.tsx`**:
   - Si el usuario tenía en su `localStorage` un estado guardado previamente antes de la Fase 1, `JSON.parse` devolvía un objeto sin la propiedad `pin` o `password`.
   - Se aplicó combinación inteligente `{ ...INITIAL_STUDENT, ...parsed, pin: parsed.pin || INITIAL_STUDENT.pin }` y para el apoderado `{ ...INITIAL_PARENT, ...parsed, password: parsed.password || INITIAL_PARENT.password }`.

2. **Botón de Rescate en Login (`LoginScreen.tsx`)**:
   - Agregado enlace opcional "Restaurar credenciales por defecto" que limpia las claves guardadas y refresca el navegador.
