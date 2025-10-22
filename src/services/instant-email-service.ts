// 🚀 SERVICIO DE CORREO REAL MÁS SIMPLE
// Usa FormSubmit.co - NO requiere configuración

class InstantEmailService {

  // 📤 ENVÍO REAL INMEDIATO (sin configuración)
  async sendInstantEmail(to: string, subject: string, message: string): Promise<boolean> {
    try {
      console.log('🚀 ENVIANDO CORREO REAL INMEDIATO...', { to, subject });

      // Usar FormSubmit.co (servicio gratuito real)
      const formData = new FormData();
      formData.append('email', to);
      formData.append('subject', subject);
      formData.append('message', `
SISTEMA DE NOTIFICACIONES SEVAN
================================

${message}

================================
Enviado desde: Sistema SEVAN
Fecha: ${new Date().toLocaleString()}
Tipo: Notificación Automática
      `);

      const response = await fetch(`https://formsubmit.co/${to}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('✅ CORREO REAL ENVIADO EXITOSAMENTE');
        return true;
      } else {
        console.error('❌ Error en respuesta:', response.status);
        return false;
      }

    } catch (error) {
      console.error('❌ ERROR AL ENVIAR CORREO REAL:', error);
      return false;
    }
  }

  // 📧 ENVÍO MASIVO REAL
  async sendBulkEmails(emails: string[], subject: string, message: string): Promise<{
    success: boolean;
    sent: number;
    failed: number;
  }> {
    let sent = 0;
    let failed = 0;

    for (const email of emails) {
      try {
        const result = await this.sendInstantEmail(email, subject, message);
        if (result) {
          sent++;
          console.log(`✅ Enviado a: ${email}`);
        } else {
          failed++;
          console.log(`❌ Falló a: ${email}`);
        }
        
        // Delay entre envíos para no saturar
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        failed++;
        console.error(`💥 Error enviando a ${email}:`, error);
      }
    }

    return {
      success: failed === 0,
      sent,
      failed
    };
  }

  // 🧪 PRUEBA INMEDIATA
  async testInstantEmail(): Promise<boolean> {
    return await this.sendInstantEmail(
      'sevan7625@gmail.com',
      '🧪 PRUEBA REAL INMEDIATA - SEVAN',
      `¡Hola!

Esta es una prueba REAL del sistema de correos de SEVAN.

✅ Este correo se envió SIN configuración previa
✅ Usando servicio externo gratuito  
✅ Completamente funcional

Si recibes este correo, el sistema está funcionando al 100%

Timestamp: ${Date.now()}
Fecha: ${new Date().toISOString()}

¡Sistema SEVAN operativo! 🎉`
    );
  }
}

// 🌟 SERVICIO INSTANTÁNEO
export const instantEmailService = new InstantEmailService();

// ⚡ FUNCIÓN DE PRUEBA RÁPIDA
export async function testRealEmailNow() {
  console.log('🧪 PROBANDO CORREO REAL AHORA...');
  
  const result = await instantEmailService.testInstantEmail();
  
  if (result) {
    console.log('🎉 ¡CORREO REAL ENVIADO! Revisa sevan7625@gmail.com');

  } else {
    console.log('❌ No se pudo enviar el correo real');

  }
  
  return result;
}

console.log('⚡ Servicio de correo INSTANTÁNEO listo - ¡Ya puede enviar correos reales!');