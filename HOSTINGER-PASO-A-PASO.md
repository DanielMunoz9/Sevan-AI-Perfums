# 🚀 GUÍA PASO A PASO: INTEGRAR TODO EN HOSTINGER

## 1️⃣ CORREO CORPORATIVO (@tudominio.com)

### En Hostinger Panel (lo que viste):

```
Hostinger → Email → Crear Correo
├─ Email: info@sevanperfumes.com
├─ Contraseña: [Genera fuerte]
└─ Cuota: 100GB
```

**Pasos:**
1. Click en "Crear correo"
2. Nombre: `info` (o `ventas`, `soporte`)
3. Dominio: `@sevanperfumes.com`
4. Click "Guardar"
5. **Anota la contraseña** (la necesitarás)

### Configurar EmailJS para usar este correo

**En tu archivo `.env.local`:**

```bash
# EmailJS actual (mantenerlo para notificaciones)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

# AGREGAR: Credenciales de correo corporativo
SMTP_HOST=mail.sevanperfumes.com
SMTP_PORT=465
SMTP_USER=info@sevanperfumes.com
SMTP_PASSWORD=[la_que_anotaste_arriba]
SMTP_FROM=info@sevanperfumes.com
```

---

## 2️⃣ HOSTING NODE.JS EN HOSTINGER

### Crear aplicación Node.js

```
Hostinger → Aplicaciones → Agregar Aplicación
```

**Configuración:**

```
Nombre:               sevan-ai-perfumes
Dominio:             sevanperfumes.com
Tipo:                Node.js
Versión Node:        18.x o 20.x
Puerto:              3000
Build command:       npm run build
Start command:       npm start
SSL/HTTPS:           ✅ Habilitado (Gratis)
Environment:         Production
```

---

## 3️⃣ SUBIR CÓDIGO A HOSTINGER

### OPCIÓN A: Via Git (RECOMENDADO)

**En Hostinger:**
```
Aplicación → Configuración → Git
├─ Mostrar URL del repositorio
├─ Usuario: [genera]
└─ Contraseña: [genera]
```

**En tu terminal local:**

```bash
cd c:\Users\Daniel\Desktop\SEVAN-AI-PERFUMES\SEVAN-AI-PERFUMES

# Agregar remote de Hostinger
git remote add hostinger [URL_que_te_dio_Hostinger]

# Subir código
git push hostinger master
```

### OPCIÓN B: Via FTP (si Git no funciona)

**En Hostinger:**
```
Hosting → FTP
├─ Usuario: [el que tienes]
├─ Contraseña: [la que tienes]
└─ Host: [tuhost.com]
```

**Usar FileZilla o similar:**
```
Conectar a FTP
Subir carpetas:
├─ src/
├─ public/
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ tailwind.config.js
├─ postcss.config.js
└─ .env.local
```

---

## 4️⃣ CONFIGURAR VARIABLES DE ENTORNO EN HOSTINGER

**En Hostinger → Aplicación → Variables de Entorno:**

Agregar TODAS estas:

```
DATABASE_URL=postgresql://[usuario]:[contraseña]@[host]:5432/[basedatos]

MERCADOPAGO_ACCESS_TOKEN=APP_USR_[tu_token_produccion]
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR_[tu_public_key]

NEXT_PUBLIC_SITE_URL=https://sevanperfumes.com

NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

SMTP_HOST=mail.sevanperfumes.com
SMTP_PORT=465
SMTP_USER=info@sevanperfumes.com
SMTP_PASSWORD=[contraseña_del_correo]
SMTP_FROM=info@sevanperfumes.com
```

---

## 5️⃣ CONECTAR DOMINIO

### En Hostinger → Dominios → sevanperfumes.com

**Configurar DNS:**

```
Hostinger → Dominios → sevanperfumes.com
├─ Registros DNS
└─ Debe apuntar a:
   ├─ IP de la aplicación (Hostinger la provee)
   ├─ O usar Name Servers de Hostinger
   └─ TTL: 3600
```

**Registros MX (para correo):**

```
Registro MX:
├─ Prioridad: 10
├─ Valor: mail.sevanperfumes.com
└─ TTL: 3600

CNAME de correo:
├─ @ → mail.sevanperfumes.com
```

### Si el dominio está en otro registro:

```
Cambiar name servers a:
├─ NS1.HOSTINGER.COM
├─ NS2.HOSTINGER.COM
└─ NS3.HOSTINGER.COM
```

---

## 6️⃣ EJECUTAR BUILD EN HOSTINGER

**En Hostinger → Aplicación:**

```
Opción 1: Click "Rebuild"
Opción 2: Terminal SSH
   $ npm install
   $ npm run build
   $ npm start
```

---

## 7️⃣ VERIFICAR QUE TODO FUNCIONE

### Checklist Final

```
□ Dominio carga:
  https://sevanperfumes.com ✅

□ Correo funciona:
  Registrarse → debe llegar email a info@sevanperfumes.com

□ Base de datos conectada:
  /admin/panel → deben verse productos

□ Imágenes cargan:
  Galería de productos → imagenes visibles

□ Búsqueda funciona:
  Buscar "Black Opium" → debe encontrar

□ Carrito funciona:
  Agregar producto → debe agregarse

□ Pago funciona (SANDBOX):
  Ir a checkout → debe abrirse MercadoPago

□ Emails llegan:
  Contacto → debe llegar mensaje a info@
```

---

## 📊 RESUMEN FINAL

```
✅ Correo corporativo:  info@sevanperfumes.com
✅ Hosting:              sevanperfumes.com
✅ Base de datos:        Conectada
✅ Dominio:              Apuntando a Hostinger
✅ SSL/HTTPS:            Activo
✅ Código:               Subido
✅ Variables de entorno: Configuradas
✅ Build:                Ejecutado
```

---

## 🆘 SI ALGO NO FUNCIONA

### Error 1: Dominio no carga
```
Verificar:
├─ DNS propagado (puede tardar 24h)
├─ IP correcta en registrador
├─ SSL generado en Hostinger
└─ Aplicación corriendo (click Start)
```

### Error 2: Correo no llega
```
Verificar:
├─ SMTP_HOST correcto
├─ Puerto 465 (SSL) correcto
├─ Credenciales exactas
└─ SPF/DKIM configurados
```

### Error 3: Base de datos no conecta
```
Verificar:
├─ DATABASE_URL en Env Variables
├─ Usuario/contraseña correctos
├─ IP en whitelist (Hostinger)
└─ Base de datos existe
```

### Error 4: Código no compila
```
Ejecutar en terminal SSH:
npm run build

Ver error exacto:
Hostinger → Logs → Application
```

---

## 📱 CLIENTE SMTP PARA ENVIAR DESDE CORREO

Si quieres acceder a tu correo corporativo:

```
En tu programa de correo (Outlook, Gmail, etc.):
├─ Email: info@sevanperfumes.com
├─ Contraseña: [la que creaste]
├─ IMAP: mail.sevanperfumes.com:993 (SSL)
├─ SMTP: mail.sevanperfumes.com:465 (SSL)
└─ Listo ✅
```

---

## 🎯 ORDEN RECOMENDADO

1. **Hoy**: Crear correo + crear aplicación Node.js
2. **Hoy**: Subir código vía Git
3. **Hoy**: Configurar variables de entorno
4. **Hoy**: Conectar dominio + DNS
5. **Esperar**: 24h para propagación DNS
6. **Probar**: Todo funcione

---

**¡Sigue estos pasos y tu sitio estará en producción! 🚀**
