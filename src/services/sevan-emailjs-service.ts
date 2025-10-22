// 🚀 SERVICIO REAL DE CORREOS CON EMAILJS - CONFIGURACIÓN SEVAN
// Usa EmailJS SDK oficial - FUNCIONAMIENTO GARANTIZADO

import emailjs from '@emailjs/browser';

// 🏗️ Tipos TypeScript para EmailJS
declare global {
  interface Window {
    sevanEmailJS?: SevanEmailJSService;
    configurarEmailJSSevan?: (publicKey: string, templateId?: string) => SevanEmailJSService;
    probarEmailJSAhora?: () => Promise<boolean>;
  }
}

class SevanEmailJSService {
  
  private config = {
    // 🔑 CONFIGURACIÓN REAL DE SEVAN CON EMAILJS
    serviceId: 'service_9vua9zf',  // Tu Service ID real
    templateId: 'template_kvz9ab9', // Contact Us template (por defecto)
    publicKey: '_JMzGyt6e8bFodIvJ', // Tu Public Key real
    
    // 📧 TEMPLATES DISPONIBLES
    templates: {
      contact: 'template_kvz9ab9',      // Contact Us template
      passwordReset: 'template_jco0gnl', // Password Reset template
      notifications: 'template_kvz9ab9'  // Notificaciones generales
    },
    
    // 📧 CONFIGURACIÓN DE CORREO
    fromEmail: 'sevan7625@gmail.com',
    fromName: 'SEVAN Perfumes',
    replyTo: 'sevan7625@gmail.com'
  };

  // 🔧 CONFIGURAR CREDENCIALES PÚBLICAS
  setCredentials(publicKey: string, templateId: string = 'template_kvz9ab9') {
    this.config.publicKey = publicKey;
    this.config.templateId = templateId;
    console.log('✅ EmailJS configurado con template:', templateId);
  }

  // 📧 MÉTODO PARA ENVIAR CON TEMPLATE ESPECÍFICO
  async sendWithTemplate(templateType: 'contact' | 'passwordReset' | 'notifications', to: string, subject: string, message: string, extraParams: any = {}): Promise<boolean> {
    const templateId = this.config.templates[templateType];
    if (!templateId) {
      console.error('❌ Template no encontrado:', templateType);
      return false;
    }
    
    const originalTemplate = this.config.templateId;
    this.config.templateId = templateId;
    
    const result = await this.sendEmailJS(to, subject, message, extraParams);
    
    this.config.templateId = originalTemplate;
    return result;
  }

  // 📤 ENVÍO REAL CON EMAILJS (Navegador)
  async sendEmailJS(to: string, subject: string, message: string, extraParams: any = {}): Promise<boolean> {
    try {
      if (!this.config.publicKey || !this.config.templateId) {
        throw new Error('⚠️ Credenciales de EmailJS no configuradas. Usar setCredentials() primero.');
      }

      // Enviando correo...

      // Preparar datos para EmailJS
      const templateParams = {
        to_email: to,
        from_name: this.config.fromName,
        from_email: this.config.fromEmail,
        reply_to: this.config.replyTo,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString('es-ES'),
        ...extraParams // Incluir parámetros extra
      };

      // 🌐 Usar EmailJS SDK oficial
      if (typeof window !== 'undefined') {
        // Método 1: SDK oficial de EmailJS
        const result = await emailjs.send(
          this.config.serviceId,
          this.config.templateId,
          templateParams,
          this.config.publicKey
        );

        return result.status === 200;

      } else {
        // Método 2: API REST directa
        const emailData = {
          service_id: this.config.serviceId,
          template_id: this.config.templateId,
          user_id: this.config.publicKey,
          template_params: templateParams
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });

        if (response.ok) {
          const result = await response.text();
          return true;
        } else {
          return false;
        }
      }

    } catch (error) {
      return false;
    }
  }

  // 🧪 PRUEBA RÁPIDA DE EMAILJS
  async testEmailJS(): Promise<boolean> {
    try {
      if (!this.config.publicKey) {
        return false;
      }

      return await this.sendEmailJS(
        'sevan7625@gmail.com',
        '🧪 Prueba EmailJS - Sistema SEVAN',
        `¡Hola!

Esta es una prueba del sistema EmailJS de SEVAN.

✅ Service ID: ${this.config.serviceId}
✅ Template ID: ${this.config.templateId}
✅ Public Key: ${this.config.publicKey.substring(0, 8)}...

Si recibes este correo, ¡EmailJS está funcionando perfectamente!

Fecha: ${new Date().toLocaleString()}
Sistema: SEVAN EmailJS Service

¡Éxito total! 🎉

Saludos,
Sistema SEVAN`
      );

    } catch (error) {
      return false;
    }
  }

  // 📋 OBTENER ESTADO DEL SERVICIO
  getStatus() {
    return {
      configured: !!(this.config.publicKey && this.config.templateId),
      serviceId: this.config.serviceId,
      templateId: this.config.templateId,
      hasPublicKey: !!this.config.publicKey,
      fromEmail: this.config.fromEmail
    };
  }

  // 📝 INSTRUCCIONES PARA COMPLETAR CONFIGURACIÓN
  getSetupInstructions() {
    return {
      title: '🔧 COMPLETAR CONFIGURACIÓN EMAILJS',
      steps: [
        '1. Ve a https://dashboard.emailjs.com/admin',
        '2. Crea un template de correo (o usa el por defecto)',
        '3. Ve a "Account" → "General" y copia tu "Public Key"',
        '4. En la consola ejecuta: sevanEmailJS.setCredentials("TU_PUBLIC_KEY", "template_id")',
        '5. Prueba con: sevanEmailJS.testEmailJS()'
      ],
      currentStatus: this.getStatus(),
      templateExample: `
Template básico para EmailJS:
------------------------------
Para: {{to_email}}
De: {{from_name}} <{{from_email}}>
Asunto: {{subject}}

{{message}}

--
Enviado por Sistema SEVAN
{{timestamp}}
      `
    };
  }
}

// 🌟 INSTANCIA GLOBAL PARA SEVAN
export const sevanEmailJS = new SevanEmailJSService();

// 🌐 HACER DISPONIBLE EN WINDOW PARA CONSOLA
if (typeof window !== 'undefined') {
  window.sevanEmailJS = sevanEmailJS;
  window.configurarEmailJSSevan = configurarEmailJSSevan;
  window.probarEmailJSAhora = probarEmailJSAhora;
}

// 🚀 FUNCIÓN DE CONFIGURACIÓN RÁPIDA
export function configurarEmailJSSevan(publicKey: string, templateId: string = 'template_kvz9ab9') {
  sevanEmailJS.setCredentials(publicKey, templateId);
  
  console.log('🎉 EmailJS configurado para SEVAN');
  console.log('📧 Service ID:', 'service_9vua9zf');
  console.log('🔑 Public Key:', publicKey.substring(0, 8) + '...');
  console.log('📄 Template ID:', templateId);
  console.log('✅ Listo para enviar correos reales');
  
  return sevanEmailJS;
}

// 🧪 FUNCIÓN DE PRUEBA INMEDIATA
export async function probarEmailJSAhora() {
  console.log('🧪 PROBANDO EMAILJS SEVAN...');
  
  const status = sevanEmailJS.getStatus();
  
  if (!status.configured) {
    console.log('⚠️ EmailJS no está completamente configurado');
    console.log(sevanEmailJS.getSetupInstructions());
    return false;
  }
  
  const resultado = await sevanEmailJS.testEmailJS();
  
  if (resultado) {
    console.log('🎉 ¡EmailJS funcionando perfectamente!');
    console.log('📧 Revisa sevan7625@gmail.com');

  } else {
    console.log('❌ Error en EmailJS. Revisa la configuración.');

  }
  
  return resultado;
}

// Servicio listo para producción