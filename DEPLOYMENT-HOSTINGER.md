# 🚀 GUÍA DEFINITIVA: DEPLOY A HOSTINGER

## ✨ PROYECTO LIMPIO Y LISTO

Tu proyecto ha sido limpiado completamente:

```
✅ 178 archivos de desarrollo eliminados
✅ 100+ scripts de debug removidos
✅ Todos los SQL de prueba eliminados
✅ Documentación innecesaria limpiada
✅ Solo código de producción + guías esenciales
```

---

## 📁 ESTRUCTURA FINAL DEL PROYECTO

```
sevan-ai-perfumes/
├── src/
│   ├── app/          ← Todas las páginas y rutas
│   ├── components/   ← Componentes React
│   ├── contexts/     ← Contexts (Cart, Auth, etc)
│   ├── config/       ← Configuraciones
│   ├── types/        ← TypeScript types
│   └── middleware.ts ← Middleware
│
├── public/
│   └── images/       ← Imágenes de productos
│
├── package.json      ← Dependencias
├── tsconfig.json     ← Config TypeScript
├── tailwind.config.js ← Tailwind CSS
├── postcss.config.js ← PostCSS
├── next.config.js    ← Next.js config
├── .env.local        ← Variables de entorno (NO commitar)
└── .gitignore
```

---

## 🔧 PASO 1: VERIFICAR VARIABLES DE ENTORNO

### Tu `.env.local` debe tener:

```bash
# Base de datos
DATABASE_URL=postgresql://user:password@host:5432/database

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Sitio
NEXT_PUBLIC_SITE_URL=https://tusitio.com

# EmailJS (si lo usas)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Supabase (si lo usas)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### ✅ Obtener credenciales:

1. **MercadoPago Token** → https://www.mercadopago.com.co/settings/credentials
2. **Supabase** → Supabase Dashboard → Project Settings → API Keys
3. **EmailJS** → https://dashboard.emailjs.com/admin

---

## 🏗️ PASO 2: BUILD LOCAL PARA PROBAR

Antes de subir a Hostinger, compila localmente:

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar para producción
npm run build

# 3. Probar versión de producción localmente
npm run start

# 4. Visitar http://localhost:3000
```

Si todo funciona localmente, está listo para Hostinger.

---

## 📤 PASO 3: SUBIR A HOSTINGER

### Opción A: Via Git (RECOMENDADO)

Si tu Hostinger soporta Git:

```bash
# 1. Crear repositorio en Hostinger
# 2. Agregar como remote
git remote add hostinger https://git.hostinger.com/tuuser/sevan-ai-perfumes.git

# 3. Push a Hostinger
git push hostinger main

# 4. En Hostinger, ejecutar:
npm install
npm run build
npm run start
```

### Opción B: Via FTP/SFTP

```bash
# 1. Compilar localmente
npm run build

# 2. Subir via FTP/SFTP:
   - Carpeta: /src
   - Carpeta: /public
   - Carpeta: /.next (opcional, se regenera)
   - Archivos: package.json, tsconfig.json, etc.

# 3. En Hostinger terminal/SSH:
npm install
npm run build
npm start
```

### Opción C: Via Hostinger Panel

Si Hostinger tiene panel de Node.js:

```
1. Hostinger Panel → Applications
2. New Application → Node.js
3. Nombre: sevan-ai-perfumes
4. Port: 3000
5. Repo: Tu GitHub/GitLab
6. Build command: npm run build
7. Start command: npm start
```

---

## 🔐 PASO 4: CONFIGURAR EN HOSTINGER

### En tu panel de Hostinger:

1. **Dominio**
   ```
   Hostinger → Dominios → sevanperfumes.com
   └─ Apuntar a IP de la aplicación Node.js
   ```

2. **Variables de Entorno**
   ```
   Hostinger → Aplicación → Env Variables
   
   Agregar todas las de .env.local
   ```

3. **SSL/HTTPS**
   ```
   Hostinger → SSL Certificate
   └─ Generar certificate Let's Encrypt (Gratuito)
   ```

4. **Node.js Version**
   ```
   Hostinger → Application Settings
   └─ Node.js 18+ (mínimo 18.x)
   ```

---

## ✅ PASO 5: VERIFICAR EN PRODUCCIÓN

Una vez en Hostinger, verifica:

### 1. Sitio Accesible
```
✅ https://tudominio.com
   └─ Debe cargar en <3 segundos
```

### 2. Base de datos Conectada
```
✅ /admin/panel
   └─ Debe mostrar productos
   └─ Si no: revisar DATABASE_URL
```

### 3. Imágenes Cargan
```
✅ Galería de productos
   └─ Deben verse todas las imágenes
   └─ Si no: revisar GUIA_INTEGRACION_IMAGENES_HOSTINGER.md
```

### 4. Búsqueda Funciona
```
✅ Buscar "Black Opium"
   └─ Debe encontrar productos
   └─ Si no: revisar conexión a BD
```

### 5. Pago Funciona (SANDBOX)
```
✅ Agregar producto al carrito
✅ Click "Pagar"
✅ Usar tarjeta de prueba:
   - Número: 4111111111111111
   - Fecha: 11/25
   - CVV: 123
✅ Debe mostrar éxito
```

### 6. Email Llega
```
✅ Registrarse con email real
✅ Debe llegar email de confirmación
✅ Si no: revisar GUIA-CONFIGURACION-EMAILJS.md
```

---

## 🐛 TROUBLESHOOTING

### Error: Cannot find module 'next'

```bash
# Solución
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: DATABASE_URL not set

```bash
# Verificar en Hostinger que esté:
HOSTINGER → Env Variables
└─ DATABASE_URL=postgresql://...
```

### Error: MERCADOPAGO_ACCESS_TOKEN missing

```bash
# Obtener token en:
https://www.mercadopago.com.co/settings/credentials
└─ Copiar "Access Token"
└─ Pegar en Hostinger Env Variables
```

### Imágenes no cargan

```bash
# Ver guía completa:
GUIA_INTEGRACION_IMAGENES_HOSTINGER.md
```

### Búsqueda lenta

```bash
# Optimizar en Supabase:
1. Agregar índices a tablas
2. Aumentar max_connections
3. Usar caché en Redis (opcional)
```

---

## 📊 MONITOREO EN PRODUCCIÓN

### Ver Logs en Hostinger

```
Hostinger → Aplicación → Logs
└─ Ver errores en tiempo real
```

### Monitorear Performance

```
Hostinger → Application Insights
└─ Ver CPU, Memoria, Requests
```

### Backups de Base de Datos

```
Supabase Dashboard → Backups
└─ Configurar backups automáticos
```

---

## 🎯 CHECKLIST FINAL ANTES DE PUBLICAR

```
□ Variables de entorno configuradas
□ Database URL probado localmente
□ MercadoPago Access Token válido
□ npm run build sin errores
□ npm run start funciona localmente
□ Dominio apunta a Hostinger
□ SSL/HTTPS activo
□ Todas las páginas cargan
□ Búsqueda funciona
□ Carrito funciona
□ Pago en sandbox funciona
□ Emails funcionan
□ Contacto/Formularios funcionan
□ Admin panel accesible
□ Logs monitoreados
□ Backups configurados
```

---

## 💰 CAMBIAR A PRODUCCIÓN (MercadoPago)

### Cuando estés 100% seguro:

1. **Ve a MercadoPago Dashboard**
   ```
   https://www.mercadopago.com.co
   → Settings → Credentials
   ```

2. **Obtén Access Token de PRODUCCIÓN**
   ```
   (No es el mismo de sandbox)
   ```

3. **Actualiza en Hostinger**
   ```
   Hostinger → Env Variables
   MERCADOPAGO_ACCESS_TOKEN=APP_USR_xxxxxxxx (el de PRODUCCIÓN)
   ```

4. **Reinicia la aplicación**
   ```
   Hostinger → Applications → Restart
   ```

5. **Prueba con pago real**
   ```
   Agregar producto
   Pagar con tarjeta real
   El dinero llegará a tu cuenta MercadoPago
   ```

---

## 📞 SOPORTE

Si algo falla:

1. **Ver logs**
   ```
   Hostinger → Applications → Logs
   ```

2. **Revisar guías**
   ```
   - GUIA-COMPLETAR-CMS-REAL.md
   - GUIA-CONFIGURACION-EMAILJS.md
   - FLUJO-PAGOS-COMPLETO.md
   - RESPUESTA-DONDE-LLEGAN-PAGOS.md
   ```

3. **Verificar .env.local**
   ```
   Todos los valores deben estar presentes
   ```

4. **Reconstruir**
   ```
   npm run build
   npm run start
   ```

---

## ✨ ¡ÉXITO!

Tu proyecto está **100% listo** para Hostinger.

```
🎉 Proyecto: SEVAN AI PERFUMES
📦 Estado: Limpio y Optimizado
🚀 Destino: Hostinger
💻 Stack: Next.js 14 + TypeScript + Tailwind
🗄️ Base: Supabase PostgreSQL
💳 Pagos: MercadoPago
✉️ Emails: EmailJS
```

**¡Mucho éxito con tu tienda de perfumes! 🌹**
