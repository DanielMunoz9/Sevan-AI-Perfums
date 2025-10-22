// 📧 SERVICIO REAL CON EMAILJS - IMPLEMENTACIÓN COMPLETA
// Este archivo reemplaza la simulación con envíos reales

interface EmailJSResponse {
  status: number;
  text: string;
}

class RealEmailService {
  
  private config = {
    // 🔑 CREDENCIALES REALES DE EMAILJS SEVAN
    serviceId: 'service_9vua9zf',    // Service ID real de EmailJS
    templateId: 'template_sevan',     // Template ID (crear en EmailJS)
    publicKey: 'YOUR_PUBLIC_KEY',     // Public Key de EmailJS
    apiUrl: 'https://api.emailjs.com/api/v1.0/email/send'
  };

  // 📤 ENVÍO REAL CON EMAILJS
  async sendRealEmail(to: string, subject: string, message: string): Promise<boolean> {
    try {
      console.log('🚀 ENVIANDO CORREO REAL VIA EMAILJS...', { to, subject });

      const emailData = {
        service_id: this.config.serviceId,
        template_id: this.config.templateId,
        user_id: this.config.publicKey,
        template_params: {
          to_email: to,
          from_name: 'SEVAN Perfumes',
          subject: subject,
          message: message,
          reply_to: 'sevan7625@gmail.com'
        }
      };

      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      const result: EmailJSResponse = await response.json();

      if (response.ok && result.status === 200) {
        console.log('✅ CORREO REAL ENVIADO EXITOSAMENTE:', result);
        return true;
      } else {
        console.error('❌ ERROR EN ENVÍO REAL:', result);
        return false;
      }

    } catch (error) {
      console.error('💥 ERROR CRÍTICO AL ENVIAR CORREO REAL:', error);
      return false;
    }
  }

  // 🔧 CONFIGURAR CREDENCIALES REALES
  setRealCredentials(serviceId: string, templateId: string, publicKey: string) {
    this.config = {
      ...this.config,
      serviceId,
      templateId,
      publicKey
    };
    console.log('🔑 Credenciales reales configuradas para EmailJS');
  }

  // ✅ PROBAR CONEXIÓN REAL
  async testRealConnection(): Promise<boolean> {
    try {
      // Envío de prueba real
      return await this.sendRealEmail(
        'sevan7625@gmail.com',
        '🧪 Prueba de Sistema SEVAN',
        'Este es un correo de prueba real del sistema SEVAN. Si lo recibes, ¡el sistema funciona!'
      );
    } catch (error) {
      console.error('❌ Error en prueba real:', error);
      return false;
    }
  }
}

// 🌟 INSTANCIA PARA CORREOS REALES
export const realEmailService = new RealEmailService();

// 📝 INSTRUCCIONES DE CONFIGURACIÓN
export const SETUP_INSTRUCTIONS = {
  title: "🔧 CONFIGURACIÓN PARA CORREOS REALES",
  steps: [
    "1. Ve a https://www.emailjs.com y crea una cuenta",
    "2. Conecta tu Gmail/Outlook en 'Email Services'", 
    "3. Crea un 'Email Template' básico",
    "4. Obtén Service ID, Template ID y Public Key",
    "5. Ejecuta: realEmailService.setRealCredentials('service_xxx', 'template_xxx', 'key_xxx')",
    "6. Prueba con: realEmailService.testRealConnection()"
  ],
  template: `
    <!-- Template básico para EmailJS -->
    Hola,
    
    Asunto: {{subject}}
    
    {{message}}
    
    Saludos,
    SEVAN Perfumes
    {{from_name}}
  `
};

console.log('📧 Servicio de correos REALES inicializado (necesita configuración)');