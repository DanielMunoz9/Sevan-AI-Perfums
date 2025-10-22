// 🚀 SERVICIO DE EMAIL SIMPLE PARA NAVEGADOR - SIN NODEMAILER
// Solo EmailJS para evitar conflictos con Next.js

import { sevanEmailJS } from './sevan-emailjs-service';

interface EmailData {
  to: string | string[];
  subject: string;
  message: string;
}

interface EmailResult {
  success: boolean;
  delivered: number;
  failed: number;
  messageId: string;
  errors?: string[];
}

class SimpleEmailService {
  
  // 🔧 AUTO-CONFIGURACIÓN AL INICIALIZAR
  constructor() {
    this.init();
  }

  private init() {
    // Configurar EmailJS automáticamente con credenciales SEVAN
    sevanEmailJS.setCredentials('_JMzGyt6e8bFodIvJ', 'template_sevan');
  }

  // 🧪 PROBAR CONEXIÓN
  async testConnection(): Promise<boolean> {
    try {
      const status = sevanEmailJS.getStatus();
      return status.configured;
    } catch (error) {
      return false;
    }
  }

  // 📧 ENVIAR EMAIL
  async sendEmail(data: EmailData): Promise<EmailResult> {
    try {
      console.log('📤 Enviando email simple...', data);

      // Convertir destinatarios a array
      const recipients = Array.isArray(data.to) ? data.to : [data.to];
      
      let delivered = 0;
      let failed = 0;
      const errors: string[] = [];

      // Enviar a cada destinatario
      for (const recipient of recipients) {
        try {
          const success = await sevanEmailJS.sendEmailJS(
            recipient,
            data.subject,
            data.message
          );

          if (success) {
            delivered++;
          } else {
            failed++;
            errors.push(`Error enviando a ${recipient}`);
          }

        } catch (error) {
          failed++;
          errors.push(`Error enviando a ${recipient}: ${error}`);
        }
      }

      const result: EmailResult = {
        success: delivered > 0,
        delivered,
        failed,
        messageId: `sevan_simple_${Date.now()}`,
        errors: errors.length > 0 ? errors : undefined
      };

      console.log('📊 Resultado envío simple:', result);
      return result;

    } catch (error) {
      console.error('❌ Error general en envío simple:', error);
      
      return {
        success: false,
        delivered: 0,
        failed: Array.isArray(data.to) ? data.to.length : 1,
        messageId: `sevan_error_${Date.now()}`,
        errors: [`Error general: ${error}`]
      };
    }
  }

  // 📋 OBTENER ESTADO
  getStatus() {
    return {
      service: 'EmailJS Simple',
      ready: sevanEmailJS.getStatus().configured,
      provider: 'EmailJS + Gmail',
      account: 'sevan7625@gmail.com'
    };
  }

}

// 🌟 INSTANCIA GLOBAL
export const simpleEmailService = new SimpleEmailService();

// Servicio listo