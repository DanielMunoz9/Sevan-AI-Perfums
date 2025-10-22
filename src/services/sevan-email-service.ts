// 📧 SERVICIO REAL DE CORREOS ELECTRÓNICOS SEVAN
// VERSIÓN SIMPLIFICADA SIN NODEMAILER - SOLO EMAILJS PARA NAVEGADOR

import { sevanEmailJS } from './sevan-emailjs-service';

interface EmailConfig {
  to: string[];
  subject: string;
  message: string;
  from?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  delivered: number;
  failed: number;
  errors?: string[];
}

class SevanEmailServiceBrowser {
  
  private config = {
    fromEmail: 'sevan7625@gmail.com',
    fromName: 'SEVAN Perfumes',
    supportEmail: 'sevan7625@gmail.com',
    maxRecipients: 100,
  };

  constructor() {
    // Auto-configurar EmailJS al inicializar
    this.init();
  }

  private init() {
    try {
      sevanEmailJS.setCredentials('_JMzGyt6e8bFodIvJ', 'template_sevan');
    } catch (error) {
      // Error silencioso en producción
    }
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

  // 📧 ENVIAR EMAIL PRINCIPAL
  async sendEmail(emailData: EmailConfig): Promise<EmailResponse> {
    try {
      console.log('📤 Enviando correo SEVAN...', emailData);

      let delivered = 0;
      let failed = 0;
      const errors: string[] = [];

      // Validar destinatarios
      if (!emailData.to || emailData.to.length === 0) {
        throw new Error('No hay destinatarios especificados');
      }

      // Limitar número de destinatarios
      const recipients = emailData.to.slice(0, this.config.maxRecipients);
      
      // Enviar a cada destinatario usando EmailJS
      for (const recipient of recipients) {
        try {
          if (!recipient || !recipient.includes('@')) {
            failed++;
            errors.push(`Email inválido: ${recipient}`);
            continue;
          }

          console.log(`📧 Enviando a: ${recipient}`);
          
          const success = await sevanEmailJS.sendEmailJS(
            recipient,
            emailData.subject,
            emailData.message
          );

          if (success) {
            delivered++;
            console.log(`✅ Enviado a: ${recipient}`);
          } else {
            failed++;
            errors.push(`Error enviando a ${recipient}`);
            console.log(`❌ Error enviando a: ${recipient}`);
          }

          // Pausa pequeña entre envíos
          await new Promise(resolve => setTimeout(resolve, 300));

        } catch (error) {
          failed++;
          const errorMsg = `Error enviando a ${recipient}: ${error}`;
          errors.push(errorMsg);
          console.error('❌', errorMsg);
        }
      }

      const response: EmailResponse = {
        success: delivered > 0,
        delivered,
        failed,
        messageId: `sevan_${Date.now()}_${delivered}`,
        errors: errors.length > 0 ? errors : undefined
      };

      console.log('📊 Resultado final del envío:', response);
      return response;

    } catch (error) {
      console.error('❌ Error general enviando email:', error);
      
      return {
        success: false,
        delivered: 0,
        failed: emailData.to?.length || 0,
        messageId: `sevan_error_${Date.now()}`,
        errors: [`Error general: ${error}`]
      };
    }
  }

  // 📋 OBTENER ESTADÍSTICAS
  async getStats() {
    return {
      service: 'SEVAN EmailJS Browser',
      provider: 'EmailJS + Gmail',
      account: this.config.fromEmail,
      ready: await this.testConnection(),
      maxRecipients: this.config.maxRecipients
    };
  }

  // 🔄 RECONFIGURAR
  reconfigure() {
    this.init();
  }

}

// 🌟 INSTANCIA GLOBAL
export const sevanEmailService = new SevanEmailServiceBrowser();

// 📧 FUNCIÓN DIRECTA DE ENVÍO
export async function sendSevanEmail(to: string | string[], subject: string, message: string) {
  return await sevanEmailService.sendEmail({
    to: Array.isArray(to) ? to : [to],
    subject,
    message
  });
}

// Servicio listo para producción