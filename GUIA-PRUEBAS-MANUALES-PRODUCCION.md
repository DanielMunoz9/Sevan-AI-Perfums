# 🧪 GUÍA DE PRUEBAS MANUALES PARA PRODUCCIÓN

## 🎯 **OBJETIVO:**
Verificar que todas las correcciones funcionen correctamente antes de subir a Hostinger

## 📋 **CHECKLIST DE PRUEBAS:**

### ✅ **YA COMPLETADO:**
- [x] SQL ejecutado en Supabase ✅
- [x] Selector ML eliminado del código ✅  
- [x] Variables de entorno configuradas ✅
- [x] Errores de TypeScript corregidos ✅

### 🧪 **PRUEBAS PENDIENTES (Manual en Hostinger):**

#### **1. PROBAR SELECTOR ML ELIMINADO**
📍 **Ubicación:** Cualquier página de producto individual
🔗 **URL:** `/product/[cualquier-id]`
✅ **Esperado:** NO debe aparecer selector de 50ml/100ml/150ml
❌ **Falla si:** Aparece selector de tamaños

#### **2. PROBAR PAGOS CON MONTO FIJO**  
📍 **Ubicación:** Página de producto individual
🔗 **URL:** `/product/[cualquier-id]`
🎯 **Pasos:**
   1. Hacer clic en "Pagar con MercadoPago"
   2. Verificar que solo aparece el precio FIJO del producto
   3. NO debe permitir cambiar el monto
✅ **Esperado:** Solo acepta precio fijo del producto
❌ **Falla si:** Permite escribir montos libres ($35.355)

#### **3. VERIFICAR LOGOS BANCARIOS**
📍 **Ubicación:** Página de producto individual (al final)
🔗 **URL:** `/product/[cualquier-id]`
✅ **Esperado:** Se ven logos de Visa, MasterCard, PSE, Bancolombia, etc.
❌ **Falla si:** No aparecen logos de métodos de pago

#### **4. PROBAR CMS ADMIN**
📍 **Ubicación:** Panel administrativo
🔗 **URL:** `/admin`
🎯 **Pasos:**
   1. Ir a /admin
   2. Loguearse con credenciales admin
   3. Verificar que cargan productos, órdenes, clientes
✅ **Esperado:** CMS funciona correctamente
❌ **Falla si:** Errores al cargar datos o interfaz rota

#### **5. PROBAR EXPERIENCIA CLIENTE**
📍 **Ubicación:** Homepage y productos
🔗 **URL:** `/` y `/products`
🎯 **Pasos:**
   1. Navegación fluida entre páginas
   2. Carrito de compras funciona
   3. Búsqueda de productos
   4. Filtros por categoría
✅ **Esperado:** Todo funciona sin errores
❌ **Falla si:** Errores de carga o funcionalidad rota

## 🔧 **CAMBIOS NECESARIOS ANTES DE HOSTINGER:**

### **URLs DE PRODUCCIÓN:**
Cambiar en `.env.local`:
```bash
# DE:
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# A:
NEXT_PUBLIC_SITE_URL=https://TU_DOMINIO_HOSTINGER.com
```

### **MERCADOPAGO WEBHOOK:**
En tu aplicación MercadoPago configurar:
- URL: `https://TU_DOMINIO_HOSTINGER.com/api/mercadopago/webhook`

## 🚀 **INSTRUCCIONES PARA SUBIR A HOSTINGER:**

1. **Comprimir proyecto** (sin node_modules)
2. **Subir archivos** al hosting
3. **Instalar dependencias** con `npm install`  
4. **Configurar variables de entorno** en hosting
5. **Ejecutar build** con `npm run build`
6. **Iniciar aplicación** con `npm start`

## 🎯 **RESULTADO ESPERADO:**

Con estos cambios aplicados, tienes:
- ✅ E-commerce auténtico con pagos fijos
- ✅ Sin selector ML problemático  
- ✅ Logos bancarios visibles
- ✅ CMS Admin funcional
- ✅ Sistema seguro listo para producción

## 📞 **¿PROBLEMAS?**
Si algo no funciona, revisar:
1. Variables de entorno correctas
2. SQL ejecutado en Supabase
3. URLs actualizadas para producción
4. Credenciales MercadoPago válidas