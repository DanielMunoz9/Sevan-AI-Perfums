# SEVÁN PERFUM - E-commerce de Fragancias Inspiradas

E-commerce de gama alta para fragancias inspiradas con asistente IA integrado, panel administrativo completo y sistema de pagos con ePayco.

## 🚀 Características Principales

- ✨ **213+ Fragancias Inspiradas** de marcas premium
- 🤖 **Asistente IA Especializado** con OpenAI GPT-4
- 💳 **Pagos Seguros** con ePayco (tarjetas, PSE, Nequi, contra entrega)
- 📱 **Responsive Design** optimizado para móviles
- 🛡️ **Seguridad Avanzada** con autenticación y encriptación
- 📊 **Panel Admin** completo para gestión
- 🚚 **Sistema de Envíos** integrado nacional
- ⚡ **Performance Optimizado** con Next.js 14
- 🎨 **Diseño Premium** Black & Gold

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes (Serverless)
- **Base de Datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Pagos:** ePayco API REST
- **IA:** OpenAI GPT-4
- **Imágenes:** Next.js Image Optimization
- **Deployment:** Vercel
- **Email:** Nodemailer (opcional)

## 📋 Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn
- Cuenta de Supabase
- API Key de OpenAI
- Credenciales de ePayco
- Git

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/sevan-ai-perfumes.git
cd sevan-ai-perfumes
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio

# OpenAI
OPENAI_API_KEY=sk-tu_clave_openai

# ePayco
EPAYCO_PUBLIC_KEY=tu_clave_publica
EPAYCO_PRIVATE_KEY=tu_clave_privada
EPAYCO_CUSTOMER_ID=tu_customer_id
EPAYCO_P_KEY=tu_p_key
EPAYCO_TEST_MODE=true

# Sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_aleatorio_seguro
```

### 4. Configurar Base de Datos

#### Crear Tablas en Supabase

1. Ve a tu dashboard de Supabase
2. Ejecuta el script SQL completo que está en `supabase.sql`
3. Verifica que todas las tablas se crearon correctamente

#### Poblar con Datos Iniciales

```bash
npm run db:seed
```

Este comando creará:
- Usuario admin: `admin@sevanshop.test` / `admin1234`
- 5 productos de ejemplo
- Categorías básicas

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔧 Configuración de Servicios Externos

### Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Obtén tu URL y claves API
3. Ejecuta el script SQL para crear las tablas
4. Configura las políticas RLS (ya incluidas en el script)

### OpenAI

1. Crea una cuenta en [OpenAI](https://openai.com)
2. Genera una API Key
3. Asegúrate de tener créditos disponibles
4. El asistente usa el modelo GPT-4

### ePayco

1. Regístrate en [ePayco](https://epayco.com)
2. Obtén tus credenciales de prueba/producción
3. Configura webhooks apuntando a: `tu-dominio.com/api/pay/webhook`
4. Activa los métodos de pago que necesites

## 📱 Características del Sistema

### Panel de Usuario
- Registro e inicio de sesión
- Catálogo de productos con filtros
- Carrito de compras persistente
- Asistente IA para recomendaciones
- Historial de órdenes
- Gestión de direcciones

### Panel Administrativo
- Dashboard con métricas
- Gestión completa de productos
- Gestión de órdenes y estados
- Configuración de envíos
- Reportes de ventas
- Logs del sistema

### Asistente IA
- Recomendaciones personalizadas
- Análisis de preferencias
- Información de productos
- Proceso de compra guiado
- Soporte legal sobre fragancias inspiradas

### Sistema de Pagos
- Integración completa con ePayco
- Tarjetas de crédito/débito
- PSE (bancos colombianos)
- Billeteras digitales (Nequi, Daviplata)
- Contra entrega
- Webhooks para confirmación automática

## 🚚 Configuración de Envíos

Transportadoras soportadas:
- **Servientrega:** 1-3 días hábiles
- **Avianca Cargo:** 1-2 días (ciudades principales)
- **Coordinadora:** 2-5 días (cobertura nacional)
- **Domicilio Bogotá:** Mismo día

Configuración en `src/lib/shipping.ts`

## 🎨 Personalización del Diseño

### Colores (TailwindCSS)

```css
:root {
  --gold: #ebc869;
  --gold-soft: #f5e3b5;
  --gold-deep: #b88b26;
  --bg: #050505;
}
```

### Tipografías
- **Serif:** Cormorant Garamond (títulos)
- **Sans:** Inter (cuerpo)

### Componentes
Todos los componentes están en `src/components/` organizados por funcionalidad.

## 📊 Analytics y Métricas

El sistema incluye tracking de:
- Conversaciones con IA
- Productos más vistos
- Abandono de carrito
- Métricas de conversión
- Productos más vendidos

## 🔒 Seguridad

- Autenticación JWT con Supabase
- RLS (Row Level Security) en base de datos
- Validación de inputs con Zod
- Sanitización de datos
- Rate limiting en API routes
- HTTPS obligatorio en producción

## 🚀 Deploy a Producción

### Deploy en Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

```bash
# CLI de Vercel
npm i -g vercel
vercel --prod
```

### Variables de Entorno para Producción

Cambiar a valores de producción:
- `EPAYCO_TEST_MODE=false`
- `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com`
- URLs y claves de producción de ePayco

### Configurar Dominio Personalizado

1. En Vercel, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio
4. Configura DNS según las instrucciones

## 📝 Datos de Prueba

### Usuario Admin
- **Email:** admin@sevanshop.test
- **Password:** admin1234

### Tarjetas de Prueba ePayco
- **Visa:** 4575623182290326
- **MasterCard:** 5108756163073031
- **CVV:** 123
- **Fecha:** Cualquier fecha futura

### Productos de Ejemplo
El seed incluye los primeros 5 productos listados en los requisitos.

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build
npm run start

# Linting
npm run lint

# Type checking
npm run type-check

# Base de datos
npm run db:generate  # Generar tipos
npm run db:reset     # Reset completo
npm run db:seed      # Poblar datos
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── (auth)/            # Páginas de autenticación
│   ├── admin/             # Panel administrativo
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── layout/           # Layout components
│   └── product/          # Componentes de productos
├── lib/                  # Utilidades y configuración
├── types/                # Definiciones TypeScript
└── data/                 # Datos estáticos
```

## 🐛 Solución de Problemas

### Error de Conexión a Supabase
- Verifica URL y claves API
- Revisa las políticas RLS
- Confirma que las tablas existen

### Error en Pagos ePayco
- Verifica credenciales
- Confirma URL de webhook
- Revisa logs en dashboard ePayco

### Error del Asistente IA
- Verifica API key de OpenAI
- Confirma que tienes créditos
- Revisa logs de la consola

### Problemas de Performance
- Optimiza imágenes (usa Next.js Image)
- Habilita caché en API routes
- Usa lazy loading

## 📞 Soporte

### Documentación Adicional
- `docs/api-docs.md` - Documentación de API
- `docs/deployment.md` - Guía de deployment
- `docs/user-guide.md` - Manual de usuario

### Contacto
- **WhatsApp:** +57 319 360 5666
- **Email:** desarrollo@sevanperfum.com
- **Issues:** GitHub Issues del repositorio

## 📋 Checklist de Deploy

### Pre-Deploy
- [ ] Variables de entorno configuradas
- [ ] Base de datos poblada
- [ ] Imágenes de productos subidas
- [ ] SSL certificado configurado
- [ ] Webhook ePayco funcionando

### Post-Deploy
- [ ] Verificar login admin
- [ ] Probar flujo de compra completo
- [ ] Verificar asistente IA
- [ ] Confirmar envío de emails
- [ ] Revisar logs de errores

### SEO y Marketing
- [ ] Sitemap.xml generado
- [ ] Meta tags configurados
- [ ] Analytics configurado
- [ ] Redes sociales vinculadas
- [ ] WhatsApp Business conectado

## 🔄 Actualizaciones y Mantenimiento

### Actualización de Dependencias
```bash
npm update
npm audit fix
```

### Backup de Base de Datos
Configura backups automáticos en Supabase Dashboard.

### Monitoreo
- Vercel Analytics para performance
- Supabase Dashboard para DB metrics
- OpenAI Usage Dashboard para IA costs

## 📚 Recursos Adicionales

- [Documentación Next.js](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [ePayco API](https://docs.epayco.co/)
- [OpenAI API](https://platform.openai.com/docs)
- [TailwindCSS](https://tailwindcss.com/docs)

---

**Desarrollado con ❤️ para SEVÁN PERFUM**

*Fragancias inspiradas de alta calidad con tecnología IA*