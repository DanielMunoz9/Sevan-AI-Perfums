// 🚀 CONFIGURADOR EMAILJS PARA SEVAN - PÁGINA SIMPLE
'use client';

import { useState, useEffect } from 'react';
import { sevanEmailJS, configurarEmailJSSevan, probarEmailJSAhora } from '../../services/sevan-emailjs-service';

export default function ConfiguradorEmailJS() {
  const [publicKey, setPublicKey] = useState('');
  const [templateId, setTemplateId] = useState('template_sevan');
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    setStatus(sevanEmailJS.getStatus());
  }, []);

  const configurar = () => {
    if (!publicKey.trim()) {
      alert('❌ Por favor ingresa tu Public Key de EmailJS');
      return;
    }

    try {
      configurarEmailJSSevan(publicKey, templateId);
      setStatus(sevanEmailJS.getStatus());
      setResultado('✅ Configuración guardada exitosamente');
      console.log('🎉 EmailJS configurado correctamente');
    } catch (error) {
      setResultado('❌ Error al configurar: ' + error);
    }
  };

  const probarEnvio = async () => {
    setIsLoading(true);
    setResultado('🧪 Probando envío de correo...');

    try {
      const resultado = await probarEmailJSAhora();
      
      if (resultado) {
        setResultado('🎉 ¡ÉXITO! Correo enviado correctamente. Revisa sevan7625@gmail.com');
      } else {
        setResultado('❌ Error: No se pudo enviar el correo. Revisa la configuración.');
      }
    } catch (error) {
      setResultado('❌ Error en prueba: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const abrirEmailJSDashboard = () => {
    window.open('https://dashboard.emailjs.com/admin', '_blank');
  };

  const copiarTemplate = () => {
    const templateHTML = `
Para: {{to_email}}
De: {{from_name}} <{{from_email}}>
Asunto: {{subject}}

{{message}}

--
Enviado por Sistema SEVAN
Fecha: {{timestamp}}
    `.trim();
    
    navigator.clipboard.writeText(templateHTML);
    alert('📋 Template copiado al portapapeles');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Configurador EmailJS - SEVAN
          </h1>
          <p className="text-blue-200 text-lg">
            Configura el envío real de correos en 3 pasos simples
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Panel de Estado */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              📊 Estado Actual
            </h2>
            
            {status && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Service ID:</span>
                  <span className="text-green-400 font-mono">{status.serviceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Template ID:</span>
                  <span className={`font-mono ${status.templateId ? 'text-green-400' : 'text-red-400'}`}>
                    {status.templateId || 'No configurado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Public Key:</span>
                  <span className={`font-mono ${status.hasPublicKey ? 'text-green-400' : 'text-red-400'}`}>
                    {status.hasPublicKey ? 'Configurado ✅' : 'Falta ❌'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estado General:</span>
                  <span className={`font-bold ${status.configured ? 'text-green-400' : 'text-yellow-400'}`}>
                    {status.configured ? 'LISTO ✅' : 'INCOMPLETO ⚠️'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Panel de Configuración */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">
              ⚙️ Configuración
            </h2>

            <div className="space-y-4">
              
              {/* Public Key */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🔑 Public Key de EmailJS *
                </label>
                <input
                  type="text"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  placeholder="Ej: user_abc123xyz456"
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Template ID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📄 Template ID (opcional)
                </label>
                <input
                  type="text"
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  placeholder="template_sevan"
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Botones */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={configurar}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  💾 Guardar Configuración
                </button>

                <button
                  onClick={probarEnvio}
                  disabled={!status?.configured || isLoading}
                  className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    status?.configured && !isLoading
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? '🔄 Enviando...' : '🧪 Probar Envío'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            📋 Instrucciones Paso a Paso
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Paso 1 */}
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-white font-bold mb-2">Abrir Dashboard</h3>
              <p className="text-gray-300 text-sm mb-3">
                Ve a tu dashboard de EmailJS para obtener las credenciales
              </p>
              <button
                onClick={abrirEmailJSDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                🌐 Abrir EmailJS
              </button>
            </div>

            {/* Paso 2 */}
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-white font-bold mb-2">Copiar Public Key</h3>
              <p className="text-gray-300 text-sm mb-3">
                En &quot;Account&quot; → &quot;General&quot;, copia tu Public Key y pégalo arriba
              </p>
              <button
                onClick={copiarTemplate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                📋 Copiar Template
              </button>
            </div>

            {/* Paso 3 */}
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-white font-bold mb-2">Probar Sistema</h3>
              <p className="text-gray-300 text-sm mb-3">
                Guarda la configuración y prueba el envío de correos
              </p>
              <div className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded text-sm">
                ¡Ya tienes todo listo!
              </div>
            </div>

          </div>
        </div>

        {/* Resultado */}
        {resultado && (
          <div className="mt-6 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">📄 Resultado</h3>
            <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-green-400 whitespace-pre-wrap">{resultado}</pre>
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 text-sm">
            💡 <strong>Nota:</strong> Ya tienes configurado el Service ID (service_9vua9zf) y tu Gmail (sevan7625@gmail.com).
            Solo necesitas el Public Key de EmailJS para empezar a enviar correos reales.
          </p>
        </div>

      </div>
    </div>
  );
}