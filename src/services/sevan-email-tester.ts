// 🧪 PROBADOR DE EMAIL SEVAN - VERSIÓN SIMPLIFICADA SIN NODEMAILER

import { sevanEmailJS } from './sevan-emailjs-service';

class SevanEmailTester {
  
  // 🧪 PRUEBA RÁPIDA
  async quickTest(): Promise<boolean> {
    try {

      
      // Auto-configurar
      sevanEmailJS.setCredentials('_JMzGyt6e8bFodIvJ', 'template_sevan');
      
      // Enviar correo de prueba
      const success = await sevanEmailJS.sendEmailJS(
        'sevan7625@gmail.com',
        '🧪 Prueba Rápida - Sistema SEVAN',
        `¡Hola!

Esta es una prueba rápida del sistema de correos SEVAN.

✅ EmailJS configurado correctamente
✅ Credenciales válidas
✅ Sistema funcionando

Fecha: ${new Date().toLocaleString()}

¡Todo perfecto! 🎉

Saludos,
Sistema SEVAN`
      );

      if (success) {

      } else {

      }

      return success;

    } catch (error) {
      console.error('❌ Error en prueba:', error);
      return false;
    }
  }

  // 📊 ESTADO DEL SISTEMA
  getStatus() {
    return {
      emailJS: sevanEmailJS.getStatus(),
      testReady: true,
      provider: 'EmailJS + Gmail'
    };
  }

}

// 🌟 INSTANCIA GLOBAL
export const emailTester = new SevanEmailTester();

// 🚀 FUNCIÓN DIRECTA
export async function testEmailSevan() {
  return await emailTester.quickTest();
}

// Servicio listo