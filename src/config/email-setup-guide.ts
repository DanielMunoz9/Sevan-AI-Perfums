// 📖 GUÍA DE CONFIGURACIÓN DEL SERVICIO DE CORREOS SEVAN

export const EMAIL_SETUP_GUIDE = {
  
  title: "🔧 Configuración del Servicio de Correos SEVAN",
  
  description: "Sigue estos pasos para configurar correctamente el envío de correos electrónicos en tu sistema SEVAN.",
  
  steps: [
    {
      id: 1,
      title: "📧 Elegir Proveedor de Correo",
      description: "Selecciona uno de estos proveedores recomendados:",
      options: [
        {
          name: "EmailJS (Recomendado para iniciar)",
          pros: ["✅ Gratis hasta 200 correos/mes", "✅ Fácil configuración", "✅ No requiere backend"],
          cons: ["❌ Límite de envíos", "❌ Menos profesional"],
          setup: "Registrarse en emailjs.com, crear servicio y template"
        },
        {
          name: "SendGrid (Profesional)",
          pros: ["✅ Alta entregabilidad", "✅ 100 correos gratis/día", "✅ Analíticas detalladas"],
          cons: ["❌ Configuración más compleja", "❌ Requiere API key"],
          setup: "Crear cuenta en SendGrid, obtener API key"
        },
        {
          name: "Mailgun (Alternativa)",
          pros: ["✅ Confiable", "✅ Buena documentación", "✅ Pay-as-you-go"],
          cons: ["❌ No tan conocido", "❌ Configuración DNS"],
          setup: "Registrarse en Mailgun, configurar dominio"
        }
      ]
    },
    
    {
      id: 2,
      title: "🔑 Obtener Credenciales",
      description: "Una vez elegido el proveedor, obtén las credenciales necesarias:",
      instructions: {
        emailjs: [
          "1. Ve a https://dashboard.emailjs.com",
          "2. Crea una nueva cuenta o inicia sesión",
          "3. Crea un nuevo servicio de correo",
          "4. Configura un template de correo",
          "5. Obtén tu Service ID, Template ID y Public Key"
        ],
        sendgrid: [
          "1. Registrarse en https://sendgrid.com",
          "2. Verificar tu correo electrónico",
          "3. Ir a Settings > API Keys",
          "4. Crear nuevo API Key con permisos de Mail Send",
          "5. Guardar el API Key (no lo perderás)"
        ]
      }
    },
    
    {
      id: 3,
      title: "⚙️ Configurar Credenciales",
      description: "Actualiza el archivo de configuración con tus credenciales:",
      file: "src/config/sevan-email-config.ts",
      code: `
// Ejemplo de configuración para EmailJS:
EMAILJS: {
  SERVICE_ID: 'service_xxxxxxx',     // Tu Service ID
  TEMPLATE_ID: 'template_xxxxxxx',   // Tu Template ID
  PUBLIC_KEY: 'xxxxxxxxxxxxxxx',     // Tu Public Key
  ENDPOINT: 'https://api.emailjs.com/api/v1.0/email/send'
},

// Ejemplo para SendGrid:
SENDGRID: {
  API_KEY: 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  ENDPOINT: 'https://api.sendgrid.com/v3/mail/send'
}
      `
    },
    
    {
      id: 4,
      title: "🧪 Probar Configuración",
      description: "Verifica que todo funcione correctamente:",
      tests: [
        "✅ Usar el botón 'Probar Correo' en el panel de notificaciones",
        "✅ Verificar que el indicador de estado muestre 'Servicio Listo'",
        "✅ Enviar un correo de prueba a tu email personal",
        "✅ Revisar la consola del navegador para logs de éxito/error"
      ]
    },
    
    {
      id: 5,
      title: "📋 Configurar Listas de Destinatarios",
      description: "Personaliza las listas predefinidas:",
      code: `
PREDEFINED_LISTS: {
  vips: [
    'cliente-vip-1@email.com',
    'cliente-vip-2@email.com'
  ],
  customers: [
    'cliente-general-1@email.com',
    'cliente-general-2@email.com'
  ],
  staff: [
    'admin@sevan-perfumes.com',
    'ventas@sevan-perfumes.com'
  ]
}
      `
    }
  ],
  
  troubleshooting: {
    title: "🔧 Solución de Problemas Comunes",
    issues: [
      {
        problem: "❌ Error: 'Servicio Sin Conexión'",
        solutions: [
          "Verificar credenciales en sevan-email-config.ts",
          "Comprobar conexión a internet",
          "Revisar límites del proveedor de correo",
          "Verificar que el API key sea válido"
        ]
      },
      {
        problem: "📧 Correos no llegan a destino",
        solutions: [
          "Verificar carpeta de spam/correo no deseado",
          "Confirmar que las direcciones sean válidas",
          "Revisar límites diarios del proveedor",
          "Verificar configuración de dominio (para SendGrid/Mailgun)"
        ]
      },
      {
        problem: "🐌 Envíos muy lentos",
        solutions: [
          "Reducir número de destinatarios por lote",
          "Aumentar RETRY_DELAY en configuración",
          "Verificar límites de tasa del proveedor",
          "Considerar upgrade de plan del proveedor"
        ]
      }
    ]
  },
  
  recommendations: {
    title: "💡 Recomendaciones de Seguridad",
    tips: [
      "🔐 Nunca expongas API keys en el código frontend",
      "🔄 Rota las credenciales periódicamente",
      "📊 Monitorea el uso y límites de tu proveedor",
      "🚫 Implementa listas de correos bloqueados",
      "✅ Usa autenticación de dos factores en tu proveedor",
      "📝 Mantén logs de todos los envíos para auditoría"
    ]
  },
  
  nextSteps: [
    "📈 Configurar analíticas detalladas de correos",
    "🎨 Personalizar plantillas HTML según tu marca",
    "🤖 Automatizar envíos basados en eventos del usuario",
    "📱 Implementar notificaciones push complementarias",
    "🔄 Configurar respuestas automáticas y auto-responder"
  ]
};

// 📊 FUNCIÓN PARA VERIFICAR ESTADO DE CONFIGURACIÓN
export function checkConfigurationStatus() {
  // Esta función podría hacer verificaciones reales
  return {
    provider: "No configurado",
    credentials: false,
    testConnection: false,
    lastTest: null,
    recommendations: [
      "Configura un proveedor de correo",
      "Añade credenciales válidas", 
      "Ejecuta prueba de conexión"
    ]
  };
}

console.log('📖 Guía de configuración de correos cargada');