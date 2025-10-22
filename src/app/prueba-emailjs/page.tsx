'use client';

import { useState } from 'react';
import { sevanEmailJS, probarEmailJSAhora } from '../../services/sevan-emailjs-service';

export default function PruebaEmailJS() {
  const [resultado, setResultado] = useState('');
  const [enviando, setEnviando] = useState(false);

  const probarAhora = async () => {
    setEnviando(true);
    setResultado('🚀 Enviando correo de prueba...');

    try {
      // Auto-configurar con las credenciales reales
      sevanEmailJS.setCredentials('_JMzGyt6e8bFodIvJ', 'template_sevan');
      
      const exito = await probarEmailJSAhora();
      
      if (exito) {
        setResultado('🎉 ¡ÉXITO! Correo enviado correctamente a sevan7625@gmail.com. Revisa tu bandeja de entrada.');
      } else {
        setResultado('❌ Error al enviar. Revisa la consola para más detalles.');
      }
    } catch (error) {
      setResultado('❌ Error: ' + error);
    } finally {
      setEnviando(false);
    }
  };

  const probarManual = async () => {
    setEnviando(true);
    setResultado('📧 Enviando correo manual...');

    try {
      // Configurar directamente
      sevanEmailJS.setCredentials('_JMzGyt6e8bFodIvJ', 'template_sevan');
      
      const exito = await sevanEmailJS.sendEmailJS(
        'sevan7625@gmail.com',
        '🧪 Prueba Manual - SEVAN EmailJS',
        `¡Hola Daniel!

Esta es una prueba manual del sistema EmailJS de SEVAN.

🎯 CONFIGURACIÓN ACTUAL:
- Service ID: service_9vua9zf
- Public Key: _JMzGyt6e8bFodIvJ
- Template: template_sevan

✅ Si recibes este correo, ¡el sistema funciona perfectamente!

Fecha: ${new Date().toLocaleString()}

¡Éxito total! 🎉

Saludos,
Sistema SEVAN EmailJS`
      );

      if (exito) {
        setResultado('🎉 ¡CORREO MANUAL ENVIADO! Revisa sevan7625@gmail.com');
      } else {
        setResultado('❌ Error en envío manual');
      }
      
    } catch (error) {
      setResultado('❌ Error manual: ' + error);
    } finally {
      setEnviando(false);
    }
  };

  const abrirNotificaciones = () => {
    window.open('/admin/notifications', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧪 Prueba EmailJS - SEVAN
          </h1>
          <p className="text-blue-200 text-lg">
            Sistema de correos reales configurado y listo
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-6">
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              🔧 Configuración Actual
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-900/30 rounded-lg p-4">
                <h3 className="text-green-300 font-bold mb-2">Service ID</h3>
                <p className="text-white font-mono">service_9vua9zf</p>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4">
                <h3 className="text-blue-300 font-bold mb-2">Public Key</h3>
                <p className="text-white font-mono">_JMzGyt6e8bFodIvJ</p>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4">
                <h3 className="text-purple-300 font-bold mb-2">Template</h3>
                <p className="text-white font-mono">template_sevan</p>
              </div>
              <div className="bg-yellow-900/30 rounded-lg p-4">
                <h3 className="text-yellow-300 font-bold mb-2">Correo</h3>
                <p className="text-white font-mono">sevan7625@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <button
                onClick={probarAhora}
                disabled={enviando}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 ${
                  enviando 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {enviando ? '🔄 Enviando...' : '🧪 Prueba Automática'}
              </button>

              <button
                onClick={probarManual}
                disabled={enviando}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 ${
                  enviando 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {enviando ? '🔄 Enviando...' : '📧 Prueba Manual'}
              </button>

              <button
                onClick={abrirNotificaciones}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
              >
                🚀 Ir a Notificaciones
              </button>

            </div>
          </div>

        </div>

        {/* Resultado */}
        {resultado && (
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">📄 Resultado de la Prueba</h3>
            <div className="bg-black/50 rounded-lg p-4">
              <p className="text-green-400 whitespace-pre-wrap font-mono text-sm">
                {resultado}
              </p>
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="mt-6 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">💡 Instrucciones</h3>
          <div className="text-gray-300 space-y-2">
            <p>• <strong>Prueba Automática:</strong> Usa la función predefinida de prueba</p>
            <p>• <strong>Prueba Manual:</strong> Envía un correo personalizado</p>
            <p>• <strong>Sistema Listo:</strong> Si cualquiera funciona, ya puedes usar el centro de notificaciones</p>
            <p>• <strong>Revisa:</strong> sevan7625@gmail.com para ver los correos enviados</p>
          </div>
        </div>

      </div>
    </div>
  );
}