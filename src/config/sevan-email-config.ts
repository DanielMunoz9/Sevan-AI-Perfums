// 🔧 CONFIGURACIÓN DEL SERVICIO DE CORREOS SEVAN
// Personaliza aquí las credenciales y configuraciones de tu servicio de correo

export const SEVAN_EMAIL_CONFIG = {
  
  // 📧 CONFIGURACIÓN BÁSICA
  FROM_EMAIL: 'noreply@sevan-perfumes.com',
  FROM_NAME: 'SEVAN Perfumes - Sistema de Notificaciones',
  
  // 🏢 INFORMACIÓN DE LA EMPRESA
  COMPANY_NAME: 'SEVAN Perfumes',
  COMPANY_WEBSITE: 'https://sevan-perfumes.com',
  SUPPORT_EMAIL: 'sevan7625@gmail.com',
  
  // 🎨 CONFIGURACIÓN DE PLANTILLAS
  BRAND_COLORS: {
    primary: '#f59e0b',      // Amarillo dorado
    secondary: '#1f2937',    // Gris oscuro
    success: '#10b981',      // Verde
    warning: '#f59e0b',      // Amarillo
    error: '#ef4444'         // Rojo
  },
  
  // 📤 CONFIGURACIÓN DEL PROVEEDOR DE CORREO
  // Opción 1: EmailJS (Gratis, fácil configuración)
  EMAILJS: {
    SERVICE_ID: 'service_sevan',
    TEMPLATE_ID: 'template_sevan',
    PUBLIC_KEY: 'tu_clave_publica_emailjs',
    ENDPOINT: 'https://api.emailjs.com/api/v1.0/email/send'
  },
  
  // Opción 2: SendGrid (Profesional, alta entregabilidad)
  SENDGRID: {
    API_KEY: 'SG.tu_api_key_sendgrid',
    ENDPOINT: 'https://api.sendgrid.com/v3/mail/send'
  },
  
  // Opción 3: Mailgun (Alternativa profesional)
  MAILGUN: {
    API_KEY: 'tu_api_key_mailgun',
    DOMAIN: 'mg.sevan-perfumes.com',
    ENDPOINT: 'https://api.mailgun.net/v3'
  },
  
  // Opción 4: Nodemailer con SMTP (Para servidores propios)
  SMTP: {
    HOST: 'smtp.sevan-perfumes.com',
    PORT: 587,
    SECURE: false, // true para 465, false para otros puertos
    USER: 'noreply@sevan-perfumes.com',
    PASS: 'tu_password_smtp'
  },
  
  // 🎯 CONFIGURACIÓN DE DESTINATARIOS PREDEFINIDOS
  PREDEFINED_LISTS: {
    vips: [
      'sevan7625@gmail.com',
      'vip1@example.com',
      'vip2@example.com'
    ],
    customers: [
      'cliente1@example.com',
      'cliente2@example.com',
      'cliente3@example.com'
    ],
    staff: [
      'admin@sevan-perfumes.com',
      'ventas@sevan-perfumes.com',
      'marketing@sevan-perfumes.com'
    ]
  },
  
  // 📋 PLANTILLAS DE CORREO HTML
  EMAIL_TEMPLATES: {
    
    // 🎉 Plantilla de Bienvenida
    WELCOME: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
            🌟 ¡Bienvenido a SEVAN Perfumes!
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">
            Descubre el mundo de las fragancias exclusivas
          </p>
        </div>
        <div style="padding: 40px 20px;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Estimado cliente,</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Gracias por unirte a nuestra exclusiva comunidad de amantes de las fragancias premium.
            En SEVAN, cada perfume cuenta una historia única.
          </p>
          <div style="background: #f3f4f6; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
            <h3 style="color: #f59e0b; margin: 0 0 10px 0;">🎁 Regalo de Bienvenida</h3>
            <p style="color: #374151; margin: 0;">
              Disfruta de un <strong>15% de descuento</strong> en tu primera compra con el código: <code style="background: #e5e7eb; padding: 2px 8px; border-radius: 4px;">BIENVENIDO15</code>
            </p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Con cariño,<br>
            <strong>El equipo de SEVAN Perfumes</strong>
          </p>
        </div>
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © 2024 SEVAN Perfumes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `,
    
    // 🎊 Plantilla de Promoción
    PROMOTION: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">
            🎉 ¡OFERTA ESPECIAL!
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">
            Solo por tiempo limitado
          </p>
        </div>
        <div style="padding: 40px 20px; text-align: center;">
          <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); border-radius: 12px; padding: 30px; margin: 20px 0;">
            <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 24px;">{{OFFER_TITLE}}</h2>
            <p style="color: #374151; font-size: 18px; margin: 0;">{{OFFER_DESCRIPTION}}</p>
            <div style="margin: 20px 0;">
              <span style="background: #dc2626; color: white; padding: 12px 24px; border-radius: 8px; font-size: 20px; font-weight: bold;">
                {{DISCOUNT_CODE}}
              </span>
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            * Oferta válida hasta {{EXPIRY_DATE}} o hasta agotar existencias
          </p>
        </div>
      </div>
    `,
    
    // 📰 Plantilla de Newsletter
    NEWSLETTER: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">
            📬 Newsletter SEVAN
          </h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">
            Tu dosis mensual de elegancia
          </p>
        </div>
        <div style="padding: 40px 20px;">
          <div style="margin-bottom: 30px;">
            {{NEWSLETTER_CONTENT}}
          </div>
          <div style="border-top: 2px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0; text-align: center;">
              ¿No deseas recibir más correos? 
              <a href="#" style="color: #3b82f6;">Cancelar suscripción</a>
            </p>
          </div>
        </div>
      </div>
    `
  },
  
  // ⚙️ CONFIGURACIÓN AVANZADA
  ADVANCED: {
    MAX_RECIPIENTS_PER_EMAIL: 50,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 2000, // ms
    RATE_LIMIT: 100, // correos por minuto
    ENABLE_TRACKING: true,
    ENABLE_ANALYTICS: true
  }
};

// 🔒 VALIDAR CONFIGURACIÓN
export function validateEmailConfig(): boolean {
  const required = [
    SEVAN_EMAIL_CONFIG.FROM_EMAIL,
    SEVAN_EMAIL_CONFIG.FROM_NAME,
    SEVAN_EMAIL_CONFIG.SUPPORT_EMAIL
  ];
  
  return required.every(field => field && field.trim().length > 0);
}

// 📊 OBTENER ESTADÍSTICAS DE CONFIGURACIÓN
export function getConfigStatus() {
  return {
    configured: validateEmailConfig(),
    hasTemplates: Object.keys(SEVAN_EMAIL_CONFIG.EMAIL_TEMPLATES).length > 0,
    hasLists: Object.keys(SEVAN_EMAIL_CONFIG.PREDEFINED_LISTS).length > 0,
    lastUpdated: new Date().toISOString()
  };
}

console.log('🔧 Configuración de correos SEVAN cargada:', getConfigStatus());