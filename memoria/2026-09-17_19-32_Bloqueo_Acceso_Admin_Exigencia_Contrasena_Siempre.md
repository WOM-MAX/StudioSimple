# Registro de Memoria: Bloqueo de Acceso a Administracion y Exigencia Obligatoria de Contrasena

Fecha: 2026-09-17 19:32 CLST
Modulo: AdminDashboard.tsx

## 1. Contexto y Diagnostico
El usuario reporto que al hacer clic en el acceso al Panel de Administracion (icono de candado), el sistema entraba directamente al panel sin solicitar contrasena.
Causas identificadas:
1. `AdminDashboard.tsx` mantenia un `useEffect` que leia `sessionStorage.getItem('estudiosimple_admin_auth')`. Si la clave tenia valor `'true'` de una sesion anterior en esa pestana del navegador, autenticaba automaticamente sin pedir credenciales.
2. El boton "Volver a la Landing Oficial" solo cambiaba `viewMode` a `'landing'`, sin limpiar `sessionStorage` ni revocar el estado de autenticacion del administrador.

## 2. Acciones Implementadas
- **Eliminacion de Bypass de Autenticacion**: Se elimino la lectura automatica de `sessionStorage` que saltaba el login.
- **Purga de Sesion al Montar**: Al ingresar a `AdminDashboard`, se purga cualquier valor residual de `sessionStorage` y se fija `isAdminAuthenticated = false`.
- **Cierre de Sesion al Retornar**: El boton "Volver a la Landing Oficial" ahora invoca `handleAdminLogout()`, revocando la sesion activa.
- **Acceso Exclusivo con Clave**: Cada vez que se accede al panel de administracion, el usuario debe ingresar obligatoriamente su clave (`admin123` o `estudiosimple`) para acceder a las herramientas de gestion curricular y generacion de planes.

## 3. Verificacion Tecnica
- Compilacion validada mediante `npx tsc --noEmit` con codigo de salida 0 (cero errores).
