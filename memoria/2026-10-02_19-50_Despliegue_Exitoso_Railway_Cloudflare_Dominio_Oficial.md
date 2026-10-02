# Bitacora de Sesion: Despliegue Exitoso en Railway y Vinculacion de Dominio en Cloudflare

- Fecha: 2026-10-02 19:50
- Proyecto: EstudioSimple
- Dominio en Produccion: https://estudiosimple.cl
- URL de Respaldo Railway: https://studiosimple-production.up.railway.app
- Infraestructura: Railway (Contenedor Docker Node 20 Alpine) + Cloudflare (DNS, SSL Full y Edge Cache) + Neon PostgreSQL (Scale-to-Zero).

## 1. Hitos Alcanzados

1. **Construccion y Despliegue en Railway:**
   - Dockerfile optimizado sin dependencias innecesarias, con soporte nativo para Prisma en Alpine Linux.
   - Servidor Node.js nativo en `server.js` sirviendo la SPA de Vite compilada (`dist/`) y endpoints API seguros.
   - Despliegue completado con estado `ACTIVE` / `Online` en Railway.

2. **Vinculacion de Dominio Oficial:**
   - Integracion automatizada Railway - Cloudflare mediante autorizacion directa.
   - Creacion de registro CNAME `@` apuntando al endpoint de Railway (`fnsefito.up.railway.app`) con proxy de Cloudflare.
   - Creacion de registro TXT `_railway-verify` para validacion de titularidad y certificados SSL.
   - Verificacion exitosa de navegacion y peticiones HTTPS en `https://estudiosimple.cl`.

3. **Optimizacion de Costos Validada:**
   - Healthcheck `/api/health` aislado sin consultas a base de datos.
   - Whitelist Cache Shield sirviendo los 628 OAs desde memoria RAM.
   - Desconexion inmediata `await prisma.$disconnect()` tras cada operacion de escritura para habilitar el Scale-to-Zero de Neon DB.
   - Flexibilizacion y correccion del acceso de administrador con redireccion automatica a `AdminDashboard`.
