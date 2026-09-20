# Registro de Memoria: Remocion de Caja de Credenciales Demo en LoginScreen

Fecha: 2026-09-17 19:29 CLST
Modulo: LoginScreen.tsx

## 1. Contexto y Diagnostico
El usuario solicito retirar la caja inferior de "Credenciales de Acceso & Demo" que se mostraba en la pantalla de inicio de sesion (`LoginScreen.tsx`). Dicha caja exponia publicamente los accesos de demostracion (Super-Administrador, Apoderado y Estudiante PIN). El usuario confirmo que tiene las credenciales respaldadas y las solicitara al agente si las requiere en el futuro.

## 2. Acciones Ejecutadas
- Se elimino el bloque JSX de credenciales demo (`mt-4 bg-[#F8AD22]/10 ...`) en [LoginScreen.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/auth/LoginScreen.tsx).
- La pantalla de login ahora pasa directamente de la tarjeta de autenticacion (PIN de estudiante o Correo/Contrasena de apoderado) al boton limpio de retorno a la landing: `← Volver al Inicio`.

## 3. Respaldo de Credenciales para Consulta Futura
- **Super-Administrador**: `admin@estudiosimple.cl` / `admin123`
- **Apoderado**: `carolina@estudiosimple.cl` / `demo2026`
- **Estudiante**: PIN `123456`

## 4. Verificacion Tecnica
- Compilacion TypeScript exitosa con `npx tsc --noEmit` (codigo de salida 0).
