import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('🔄 POST /api/chat - Solicitud recibida');
  
  try {
    const { message, context } = await req.json();
    console.log('📝 Mensaje del usuario:', message);
    console.log('🎯 Contexto enviado:', context.substring(0, 100) + '...');

    // Verificar que tenemos la clave de OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      console.error('❌ OPENAI_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Configuración de API no disponible' },
        { status: 500 }
      );
    }

    console.log('✅ OPENAI_API_KEY encontrada, longitud:', openaiApiKey.length);
    console.log('🔗 Enviando solicitud a OpenAI...');

    // Llamada a OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: context
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.8,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    console.log('📊 Respuesta de OpenAI - Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de OpenAI:', response.status, response.statusText, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Datos de OpenAI recibidos:', JSON.stringify(data, null, 2));
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Respuesta inválida de OpenAI:', data);
      throw new Error('Respuesta inválida de OpenAI');
    }

    const aiResponse = data.choices[0].message.content.trim();
    console.log('🤖 Respuesta final de AI:', aiResponse);

    return NextResponse.json({
      response: aiResponse
    });

  } catch (error) {
    console.error('❌ Error en /api/chat:', error);
    
    // Respuesta de fallback elegante
    return NextResponse.json({
      response: `✨ **¡Hola! Soy Amelie** ✨

Como tu **experta en fragancias de lujo**, estoy aquí para ayudarte a descubrir el aroma perfecto que refleje tu esencia única.

🌟 **¿En qué puedo asistirte hoy?**
• Análisis de personalidad olfativa
• Recomendaciones personalizadas  
• Educación sobre fragancias
• Combinaciones aromáticas

¡Cuéntame sobre tus preferencias y creemos juntos tu **signature scent**! 💫`
    });
  }
}