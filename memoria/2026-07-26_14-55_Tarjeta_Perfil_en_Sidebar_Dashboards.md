# Memoria de Sesión: Reemplazo de Conmutador Genérico por Tarjeta de Perfil en Dashboards

- Fecha y Hora: 2026-07-26 14:55
- Tema: Reemplazo del widget genérico "Estudiante / Apoderado" en la barra lateral por la tarjeta de perfil con el nombre del usuario autenticado.

## Resoluciones Aplicadas

1. **StudentDashboard.tsx**:
   - Eliminado el widget de conmutación de rol.
   - Insertada tarjeta de perfil personalizada que despliega el avatar (`🦊`), el nombre del estudiante (`Mateo`) y su curso inscrito (`4° Básico`).

2. **ParentDashboard.tsx**:
   - Eliminado el widget de conmutación de rol.
   - Insertada tarjeta de perfil personalizada que despliega la insignia de apoderado (`🛡️`), el nombre del apoderado (`Carolina M.`) y su correo electrónico registrado.
