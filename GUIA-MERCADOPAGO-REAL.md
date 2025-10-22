# 🚀 GUÍA COMPLETA: ACTIVAR MERCADOPAGO REAL

## ✅ PASO 1: OBTENER CREDENCIALES REALES

1. **Ve a**: https://www.mercadopago.com.co/developers/panel/app
2. **Inicia sesión** con tu cuenta: sevan7625@gmail.com
3. **Crea una aplicación** o usa la existente
4. **Copia las credenciales:**
   - Access Token (Producción)
   - Public Key (Producción)
   - Client ID
   - Client Secret

## 🔧 PASO 2: CONFIGURAR VARIABLES DE ENTORNO

En tu archivo `.env.local`, reemplaza:

```bash
# Mercado Pago - CREDENCIALES REALES
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN_REAL
MERCADOPAGO_PUBLIC_KEY=TU_PUBLIC_KEY_REAL
MERCADOPAGO_CLIENT_ID=TU_CLIENT_ID_REAL
MERCADOPAGO_CLIENT_SECRET=TU_CLIENT_SECRET_REAL
MERCADOPAGO_SANDBOX_MODE=false
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TU_PUBLIC_KEY_REAL
```

## 📝 PASO 3: ARCHIVOS YA CREADOS

✅ API de creación de preferencias: `/api/mercadopago/create-preference`
✅ Webhook para notificaciones: `/api/mercadopago/webhook`
✅ SDK de MercadoPago instalado

## 🚀 PASO 4: ACTIVAR EN PRODUCCIÓN

1. **Reemplaza las credenciales** con las reales
2. **Cambia a modo producción**: `MERCADOPAGO_SANDBOX_MODE=false`
3. **Reinicia el servidor**: `npm run dev`

## 🔗 PASO 5: CONFIGURAR WEBHOOK EN MERCADOPAGO

En el panel de MercadoPago:
1. Ve a **Configuración → Webhooks**
2. Agrega la URL: `https://tu-dominio.com/api/mercadopago/webhook`
3. Selecciona eventos: **Payments**

## 💳 CÓMO FUNCIONA

1. **Cliente hace checkout** → Se crea preferencia en MercadoPago
2. **Se abre ventana de pago** → Cliente paga con tarjeta/PSE/efectivo
3. **MercadoPago notifica** → Webhook actualiza orden en base de datos
4. **Pago confirmado** → Cliente recibe confirmación

## 🛠️ PARA PROBAR AHORA MISMO

1. **Ve al carrito** en tu tienda
2. **Agrega productos**
3. **Hacer checkout**
4. **El botón "Pagar con MercadoPago"** abrirá la ventana de pago

## 📧 SOPORTE

- **MercadoPago Developers**: https://www.mercadopago.com.co/developers
- **Documentación**: https://www.mercadopago.com.co/developers/es/docs
- **Tu cuenta**: sevan7625@gmail.com ya está registrada

## 🎯 ESTADO ACTUAL

✅ Código implementado
✅ SDK instalado  
✅ APIs creadas
🔄 PENDIENTE: Credenciales reales
🔄 PENDIENTE: Cambiar a modo producción

Una vez configures las credenciales reales, ¡los pagos funcionarán inmediatamente!