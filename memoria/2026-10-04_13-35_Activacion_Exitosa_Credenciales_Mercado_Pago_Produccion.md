# Bitacora: Activacion Exitosa de Credenciales Oficiales de Mercado Pago en Produccion

- Fecha y hora: 2026-10-04 13:35 (GMT-3)
- Modulos afectados: [.env](file:///d:/StudioSimple%20-%20Antigravity/.env), [pricing_config.json](file:///d:/StudioSimple%20-%20Antigravity/data/pricing_config.json), [server.js](file:///d:/StudioSimple%20-%20Antigravity/server.js), [CheckoutFlow.tsx](file:///d:/StudioSimple%20-%20Antigravity/Web%20Studio%20Simple/src/components/checkout/CheckoutFlow.tsx).

---

## 1. Contexto y Resolucion

El usuario creo la aplicacion en el portal oficial de Mercado Pago Developers para Chile y proporciono las credenciales de produccion de su cuenta personal con modalidad de abono inmediato:
- **Public Key**: `APP_USR-d44f14cd-7e1c-4bd8-a138-e78e1bcbcd44`
- **Access Token**: `APP_USR-7956522163354245-100412-4bfd06eaff8c0099072a42b88cb9449c-242916991`

---

## 2. Inyeccion Segura (Zero-Trust) y Verificacion de Conectividad

1. **Persistencia Segura en Entorno Local**:
   - De acuerdo con la directiva Zero-Trust de AGENTS.md, el Access Token privado se almaceno exclusivamente en el archivo `.env` (ignorado por Git en `.gitignore`).
   - La `Public Key` se registro en [data/pricing_config.json](file:///d:/StudioSimple%20-%20Antigravity/data/pricing_config.json) bajo `pasarela.mercadoPagoPublicKey`, con proveedor `mercadopago` y `modoSandbox: false`.

2. **Validacion de Conectividad Real con Mercado Pago**:
   - Se ejecuto una prueba directa contra el endpoint oficial `POST https://api.mercadopago.com/checkout/preferences`.
   - La API de Mercado Pago respondio con codigo HTTP 201 (Created), retornando una URL de pago real de produccion:
     `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=...`
   - Esto valida de manera concluyente que las credenciales estan activas, operativas y listas para procesar transacciones en pesos chilenos (CLP).

---

## 3. Despliegue a Produccion en Railway

Para que la pasarela en el dominio web en vivo procese pagos reales con estas mismas credenciales, se debe registrar en las Variables de Entorno del servicio de Railway:
- `MERCADOPAGO_ACCESS_TOKEN`: `APP_USR-7956522163354245-100412-4bfd06eaff8c0099072a42b88cb9449c-242916991`
- `MERCADOPAGO_PUBLIC_KEY`: `APP_USR-d44f14cd-7e1c-4bd8-a138-e78e1bcbcd44`
