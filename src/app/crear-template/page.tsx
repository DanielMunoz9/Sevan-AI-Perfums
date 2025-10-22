'use client';

import { useState } from 'react';

export default function CrearTemplateEmailJS() {
  const [resultado, setResultado] = useState('');
  const [templateId, setTemplateId] = useState('template_sevan');
  const [probando, setProbando] = useState(false);

  const probarConTemplatePersonalizado = async () => {
    setProbando(true);
    setResultado('🔄 Probando con template personalizado...');

    try {
      // Importar EmailJS dinámicamente
      const emailjs = (await import('@emailjs/browser')).default;

      // Datos del template
      const templateParams = {
        to_email: 'sevan7625@gmail.com',
        from_name: 'SEVAN Perfumes',
        from_email: 'sevan7625@gmail.com',
        subject: '🧪 Prueba Directa - Template Personalizado',
        message: `¡Hola Daniel!

✅ PRUEBA EXITOSA desde el navegador con EmailJS

🔧 CONFIGURACIÓN:
- Service ID: service_9vua9zf
- Template ID: ${templateId}
- Public Key: _JMzGyt6e8bFodIvJ

📧 Si recibes este correo, ¡el template "${templateId}" funciona perfectamente!

🕒 Fecha: ${new Date().toLocaleString()}

¡Sistema SEVAN operativo! 🎉

Saludos,
Sistema SEVAN EmailJS`,
        timestamp: new Date().toLocaleString('es-ES')
      };

      console.log('📤 ENVIANDO CON EMAILJS SDK...', templateParams);

      const result = await emailjs.send(
        'service_9vua9zf',        // Service ID
        templateId,               // Template ID personalizable
        templateParams,
        '_JMzGyt6e8bFodIvJ'      // Public Key
      );

      console.log('✅ RESULTADO EMAILJS:', result);

      if (result.status === 200) {
        setResultado(`🎉 ¡ÉXITO TOTAL! 

✅ Correo enviado correctamente con template "${templateId}"
📧 Revisa tu bandeja: sevan7625@gmail.com
🆔 Message ID: ${result.text}
📊 Status: ${result.status}

¡El sistema SEVAN está funcionando perfectamente! 🚀`);
      } else {
        setResultado(`⚠️ Respuesta inesperada: ${result.status} - ${result.text}`);
      }

    } catch (error) {
      console.error('❌ ERROR:', error);

      let mensajeError = '❌ ERROR: ';
      const isTextError =
        typeof error === 'object' && error !== null && 'text' in error && typeof (error as any).text === 'string';

      if (isTextError) {
        const errorText = (error as { text: string }).text;
        mensajeError += errorText;

        if (errorText.includes('template')) {
          mensajeError += `\n\n💡 SOLUCIÓN:\n1. Ve a: https://dashboard.emailjs.com/admin/templates\n2. Crea un template con ID: "${templateId}"\n3. O cambia el Template ID abajo por uno que ya exista`;
        }
      } else if (error instanceof Error) {
        mensajeError += error.message;
      } else {
        mensajeError += String(error);
      }

      setResultado(mensajeError);
    } finally {
      setProbando(false);
    }
  };

  const abrirDashboard = () => {
    window.open('https://dashboard.emailjs.com/admin/templates', '_blank');
  };

  const probarSinTemplate = async () => {
    setResultado('⚠️ EmailJS siempre requiere un Template ID. No se puede enviar sin template.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔧 Crear Template EmailJS - SEVAN
          </h1>
          <p className="text-blue-200 text-lg">
            Soluciona el error 400 creando tu template personalizado
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Panel de Template */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">
              📄 Configurar Template
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Template ID
                </label>
                <input
                  type="text"
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white"
                  placeholder="template_sevan"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={probarConTemplatePersonalizado}
                  disabled={probando}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                    probando 
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105 transform'
                  }`}
                >
                  {probando ? '🔄 Probando...' : '🧪 Probar Template'}
                </button>

                <button
                  onClick={abrirDashboard}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  🌐 Abrir Dashboard EmailJS
                </button>
              </div>
            </div>
          </div>

          {/* Panel de Instrucciones */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">
              📋 Crear Template en EmailJS
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <div className="bg-blue-900/20 rounded-lg p-3">
                <h3 className="text-blue-300 font-bold mb-2">1. Ir al Dashboard</h3>
                <p className="text-sm">Haz clic en &quot;Abrir Dashboard EmailJS&quot; arriba</p>
              </div>

              <div className="bg-green-900/20 rounded-lg p-3">
                <h3 className="text-green-300 font-bold mb-2">2. Crear Template</h3>
                <p className="text-sm">• Template ID: <code className="bg-black/50 px-2 py-1 rounded">template_sevan</code></p>
                <p className="text-sm">• Subject: <code className="bg-black/50 px-2 py-1 rounded">{'{{subject}}'}</code></p>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-3">
                <h3 className="text-purple-300 font-bold mb-2">3. Variables Necesarias</h3>
                <div className="text-xs space-y-1">
                  <p>• <code>{'{{to_email}}'}</code> - Destinatario</p>
                  <p>• <code>{'{{from_name}}'}</code> - Remitente</p>
                  <p>• <code>{'{{subject}}'}</code> - Asunto</p>
                  <p>• <code>{'{{message}}'}</code> - Mensaje</p>
                  <p>• <code>{'{{timestamp}}'}</code> - Fecha</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-3">
                <h3 className="text-yellow-300 font-bold mb-2">4. Template HTML Básico</h3>
                <div className="bg-black/50 rounded p-2 text-xs font-mono">
                  {`<h1>SEVAN Perfumes</h1>
<p>Para: {{to_email}}</p>
<p>De: {{from_name}}</p>
<div>{{message}}</div>
<small>{{timestamp}}</small>`}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Resultado */}
        {resultado && (
          <div className="mt-8 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">📄 Resultado de la Prueba</h3>
            <div className="bg-black/50 rounded-lg p-4">
              <pre className="text-green-400 whitespace-pre-wrap text-sm">
                {resultado}
              </pre>
            </div>
          </div>
        )}

        {/* Info Adicional */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 text-sm">
            💡 <strong>Tip:</strong> Una vez creado el template, todas las páginas de SEVAN podrán enviar correos reales.
          </p>
        </div>

      </div>
    </div>
  );
}