# 💳 FLUJO COMPLETO DE PAGOS EN SEVÁN AI

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                    USUARIO EN EL NAVEGADOR                      │
├─────────────────────────────────────────────────────────────────┤
│ 1. Ve producto en galería                                       │
│ 2. Click "Comprar" → Se abre modal de pago                      │
│ 3. Completa datos (email, nombre)                               │
│ 4. Click "Pagar con MercadoPago"                                │
└─────────────────────────────────────────────────────────────────┘
                           ↓ HTTP POST
┌─────────────────────────────────────────────────────────────────┐
│            TU SERVIDOR (Next.js Backend)                        │
├─────────────────────────────────────────────────────────────────┤
│ /api/mercadopago/create-preference/route.ts                     │
│                                                                  │
│ 1. Recibe datos del cliente y producto                          │
│ 2. Valida información                                           │
│ 3. Crea preferencia en MercadoPago                              │
│ 4. Devuelve URL de checkout                                     │
└─────────────────────────────────────────────────────────────────┘
                           ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                  MERCADOPAGO (Pasarela)                         │
├─────────────────────────────────────────────────────────────────┤
│ 1. Muestra interfaz de pago segura                              │
│ 2. Usuario ingresa tarjeta/datos de pago                        │
│ 3. Procesa la transacción                                       │
│ 4. Devuelve resultado (aprobado/rechazado/pendiente)            │
└─────────────────────────────────────────────────────────────────┘
                           ↓ WEBHOOK + Redirección
┌─────────────────────────────────────────────────────────────────┐
│            TU SERVIDOR (Webhook Handler)                        │
├─────────────────────────────────────────────────────────────────┤
│ /api/mercadopago/webhook/route.ts                               │
│                                                                  │
│ 1. Recibe notificación de pago desde MercadoPago                │
│ 2. Obtiene detalles de la transacción                           │
│ 3. Actualiza orden en Supabase (BD)                             │
│ 4. Marca como pagada/rechazada/pendiente                        │
└─────────────────────────────────────────────────────────────────┘
                           ↓ Simultáneo
┌─────────────────────────────────────────────────────────────────┐
│         USUARIO REDIRIGIDO A PÁGINA DE RESULTADO                │
├─────────────────────────────────────────────────────────────────┤
│ /payment/success → Pago aprobado ✅                              │
│ /payment/failure → Pago rechazado ❌                             │
│ /payment/pending → Pago en revisión ⏳                           │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│            SUPABASE (Base de Datos)                             │
├─────────────────────────────────────────────────────────────────┤
│ Tabla: orders                                                    │
│ ├─ id                                                            │
│ ├─ payment_id → ID de MercadoPago                               │
│ ├─ payment_status → 'approved' | 'rejected' | 'pending'        │
│ ├─ payment_amount → Monto pagado                                │
│ ├─ status → 'paid' | 'payment_failed' | 'pending_payment'      │
│ └─ paid_at → Fecha de aprobación                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📍 PUNTOS CLAVE DEL SISTEMA

### 1️⃣ INICIO DEL PAGO

**Archivo**: `src/components/payment/PaymentModal.tsx`

```tsx
handleMercadoPagoPayment() → Envía POST a /api/mercadopago/create-preference

Datos enviados:
{
  product: {
    id: "123",
    title: "Dior Sauvage",
    price: 89900  // En COP
  },
  customer: {
    email: "cliente@mail.com",
    name: "Juan Pérez",
    phone: "3001234567"
  },
  quantity: 1
}
```

---

### 2️⃣ CREACIÓN DE PREFERENCIA (Tu Servidor)

**Archivo**: `src/app/api/mercadopago/create-preference/route.ts`

```typescript
POST /api/mercadopago/create-preference

1. ✅ Validar datos del cliente y producto
2. ✅ Calcular monto total: $89,900 COP
3. ✅ Crear preferencia en MercadoPago SDK
4. ✅ Incluir URLs de webhook y redirección:
   - Éxito: /payment/success
   - Fallo: /payment/failure
   - Pendiente: /payment/pending
5. ✅ Devolver URL de checkout

Respuesta:
{
  "success": true,
  "preferenceId": "mp-pref-123456",
  "checkoutUrl": "https://www.mercadopago.com.co/checkout/v1/...",
  "amount": 89900,
  "orderId": "ORDER-1697123456-123"
}
```

---

### 3️⃣ USUARIO VA A MERCADOPAGO

```
Usuario hace click en "Pagar"
         ↓
window.open(checkoutUrl, '_blank')
         ↓
Se abre: https://www.mercadopago.com.co/checkout/v1/...
         ↓
Interfaz segura de MercadoPago
- Usuario ingresa tarjeta
- Selecciona banco
- Aprueba la transacción
- O la rechaza
```

---

### 4️⃣ MERCADOPAGO PROCESA EL PAGO

```
🏦 Banca: Valida la tarjeta
         ↓
💰 Transferencia: Mueve dinero a tu cuenta
         ↓
📧 Notificación: Envía webhook a tu servidor
         ↓
🔄 Redirección: Envía usuario de vuelta a tu sitio
```

---

### 5️⃣ WEBHOOK (Recepción de Confirmación)

**Archivo**: `src/app/api/mercadopago/webhook/route.ts`

```typescript
POST /api/mercadopago/webhook

MercadoPago te envía:
{
  "type": "payment",
  "data": {
    "id": 999999999
  }
}

Tu servidor:
1. ✅ Obtiene detalles del pago
2. ✅ Verifica status: 'approved', 'rejected', 'pending'
3. ✅ Actualiza orden en Supabase:
   - payment_id: "999999999"
   - payment_status: "approved"
   - status: "paid"
   - paid_at: fecha actual
4. ✅ Devuelve confirmación a MercadoPago
```

---

### 6️⃣ ACTUALIZACIÓN EN BASE DE DATOS

**Tabla: `orders` en Supabase**

```sql
UPDATE orders SET
  payment_id = '999999999',
  payment_status = 'approved',
  payment_status_detail = 'accredited',
  payment_amount = 89900,
  payment_currency = 'COP',
  payment_date = '2024-10-21T14:30:00Z',
  status = 'paid',
  paid_at = '2024-10-21T14:30:00Z',
  updated_at = '2024-10-21T14:30:00Z'
WHERE id = 'ORDER-1697123456-123'
```

---

### 7️⃣ USUARIO VE CONFIRMACIÓN

**Archivos**:
- `src/app/payment/success/page.tsx` → Pago aprobado ✅
- `src/app/payment/failure/page.tsx` → Pago rechazado ❌
- `src/app/payment/pending/page.tsx` → En revisión ⏳

---

## 🔐 FLUJO DE SEGURIDAD

```
┌─────────────────────────────────────────┐
│ Usuario ingresa datos en MercadoPago    │
│ (NUNCA en tu servidor)                  │
├─────────────────────────────────────────┤
│ Encriptación TLS/SSL (HTTPS)            │
├─────────────────────────────────────────┤
│ Token de acceso (proceso.env)           │
├─────────────────────────────────────────┤
│ Validación de webhook (firma)           │
├─────────────────────────────────────────┤
│ BD segura en Supabase                   │
└─────────────────────────────────────────┘
```

---

## 💳 MÉTODOS DE PAGO SOPORTADOS

Según MercadoPago en Colombia:

```
✅ Tarjetas de crédito/débito:
   - Visa
   - Mastercard
   - American Express
   - Diners Club
   
✅ Billeteras digitales:
   - Nequi
   - Daviplata
   - Mercado Pago (billetera)
   
✅ Transferencias:
   - PSE (Pago Seguro Electrónico)
   
✅ Otros:
   - PayU
   - Efecty
```

---

## 📊 ESTADOS DE PAGO

```
┌──────────────┬──────────────────────────────────────┐
│ Estado       │ Significado                          │
├──────────────┼──────────────────────────────────────┤
│ approved     │ ✅ Pago aprobado y dinero acreditado │
│ rejected     │ ❌ Banco rechazó la transacción      │
│ pending      │ ⏳ En proceso de validación          │
│ cancelled    │ ⛔ Usuario canceló el pago          │
│ refunded     │ 🔄 Dinero devuelto al cliente       │
└──────────────┴──────────────────────────────────────┘
```

---

## 💰 DÓNDE VA EL DINERO

```
1. Usuario paga: $89,900 COP
              ↓
2. MercadoPago retiene comisión (~2.99% + IVA)
              ↓
3. Dinero neto llega a tu cuenta de MercadoPago
              ↓
4. Puedes transferir a tu cuenta bancaria
              ↓
5. O usar dinero disponible en tu billetera
```

**Ejemplo**:
```
Monto pagado: $89,900
Comisión MercadoPago: ~$2,800 (3% aproximado)
Dinero que recibes: ~$87,100
```

---

## 🔑 CREDENCIALES NECESARIAS

**Archivo**: `.env.local`

```
MERCADOPAGO_ACCESS_TOKEN=APP_USR_XXXXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://tusitio.com
```

**Token se obtiene de**:
1. Crear cuenta en: https://www.mercadopago.com.co
2. Ir a: Configuración → Credenciales
3. Copiar: Access Token (Producción o Sandbox)
4. Pegar en `.env.local`

---

## 📱 EN HOSTINGER

Cuando deploys en Hostinger:

```
1. Asegúrate de tener variables de entorno:
   - MERCADOPAGO_ACCESS_TOKEN
   - NEXT_PUBLIC_SITE_URL (tu dominio)

2. URLs de webhook deben ser accesibles:
   - https://tusitio.com/api/mercadopago/webhook

3. Certificado SSL debe estar activo (HTTPS)

4. Base de datos Supabase debe estar conectada
```

---

## 🧪 PRUEBAS (Sandbox)

Para probar en desarrollo:

```typescript
// En MercadoPago panel
1. Cambiar a modo SANDBOX
2. Obtener token de sandbox
3. Usar tarjeta de prueba:
   - Número: 4111 1111 1111 1111
   - Vencimiento: 12/25
   - CVV: 123
```

---

## ✅ CHECKLIST: ¿ESTÁ TODO CONFIGURADO?

```
□ Cuenta de MercadoPago creada
□ Access Token obtenido
□ Token guardado en .env.local
□ NEXT_PUBLIC_SITE_URL configurada
□ Base de datos Supabase lista
□ Tabla 'orders' con campos de pago
□ Webhook URL accesible (HTTPS)
□ SSL/HTTPS activo en Hostinger
□ Redirecciones configuradas:
  - /payment/success
  - /payment/failure
  - /payment/pending
```

---

## 🔍 CÓMO VERIFICAR QUE TODO FUNCIONA

### 1. Revisar logs en MercadoPago Dashboard
```
Panel MercadoPago → Actividad → Ver transacciones
```

### 2. Revisar logs en Supabase
```
Supabase Dashboard → Tabla 'orders' → Verificar campo 'payment_status'
```

### 3. Revisar logs en servidor (Hostinger)
```
Si tienes console.log() verás:
- 🚀 MERCADOPAGO: Creando preferencia de pago...
- ✅ PREFERENCIA CREADA EXITOSAMENTE
- 🔔 Webhook de MercadoPago recibido
- ✅ Orden actualizada exitosamente
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

| Problema | Causa | Solución |
|----------|-------|----------|
| "Token no configurado" | Falta .env.local | Agrega MERCADOPAGO_ACCESS_TOKEN |
| Webhook no funciona | URL incorrecta | Verifica /api/mercadopago/webhook esté en HTTPS |
| Orden no se actualiza | Supabase desconectado | Verifica credenciales de Supabase |
| Pago rechazado | Tarjeta inválida | Usa tarjeta de prueba de MercadoPago |
| Redirección lenta | Webhook lento | Optimiza query a BD |

---

## 📈 PRÓXIMOS PASOS

1. ✅ Sistema de pagos: **YA ESTÁ**
2. ⏳ Confirmación por email después de pago
3. ⏳ Panel del cliente para ver pedidos
4. ⏳ Devoluciones/Reembolsos
5. ⏳ Reportes de ventas

---

**¡Tu sistema de pagos está listo para producción!** 💰🚀
