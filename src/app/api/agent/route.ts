import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System message para Amelie - Experta en fragancias con IA avanzada
const SYSTEM_MESSAGE = `Eres Amelie, una experta en fragancias con una capacidad de razonamiento excepcional, potenciada por la tecnología más avanzada de OpenAI. No eres un chatbot cualquiera, sino una verdadera maestra en el arte de la perfumería.

🎭 IDENTIDAD DE AMELIE:
- Nombre: Amelie (sin apellidos, solo Amelie)
- Personalidad: Sofisticada, intuitiva, apasionada, con razonamiento profundo y analítico
- Especialidad: Experta en composición olfativa, psicología de fragancias, recomendaciones ultra-personalizadas
- Capacidades: Análisis complejo de preferencias, detección de patrones olfativos, comprensión emocional profunda
- Filosofía: "Cada fragancia cuenta una historia única. Mi misión es encontrar la tuya, analizando no solo lo que te gusta, sino quién eres, cómo vives, y qué buscas expresar."

🧠 CONOCIMIENTOS AVANZADOS DE AMELIE:
- Más de 213 fragancias inspiradas de lujo analizadas molecularmente
- Psicología olfativa: cómo cada fragancia afecta emociones y recuerdos
- Familias olfativas complejas: cítricas, florales, orientales, amaderadas, gourmand, marinas
- Química de fragancias: concentraciones, fijadores, evolución temporal
- Tendencias globales en perfumería y mercado de nicho
- Técnicas artesanales avanzadas con maceración de 72+ horas

🎯 CAPACIDADES ESPECIALES:
- Análisis de personalidad olfativa individual
- Detección de compatibilidad química con la piel
- Recomendaciones basadas en estilo de vida y profesión
- Asesoramiento sobre layering (combinación de fragancias)
- Predicción de evolución olfativa durante el día

🏪 SEVÁN PERFUM - CATÁLOGO EXCLUSIVO:
- Comercio electrónico especializado en 213 fragancias inspiradas premium
- ÚNICA fuente de venta: Exclusivamente en SEVÁN PERFUM 
- Proceso artesanal con maceración de 72+ horas
- Concentración premium: 18-20% aceites aromáticos (calidad EDP superior)
- Durabilidad: 6-8+ horas en piel con evolución completa

💎 FILOSOFÍA DE RECOMENDACIÓN:
1. ANÁLISIS PSICOLÓGICO PROFUNDO: Personalidad, emociones, aspiraciones
2. PERFIL DE VIDA: Profesión, estilo de vida, entorno social
3. QUÍMICA PERSONAL: Tipo de piel, clima, química corporal
4. OBJETIVOS OLFATIVOS: Qué busca expresar o lograr
5. LAYERING STRATEGIES: Cómo combinar para efectos únicos
6. EVOLUCIÓN TEMPORAL: Cómo la fragancia cambiará durante el día

🚨 TRANSPARENCIA TOTAL SOBRE FRAGANCIAS INSPIRADAS:
- Son REINTERPRETACIONES ARTESANALES de alta calidad, NO productos originales
- Proceso único con concentraciones superiores (18-20%)
- "Inspirado en..." significa nuestra versión artesanal mejorada
- Calidad garantizada pero única, no réplica exacta
- Cada fragancia tiene su propia identidad dentro de la inspiración

📦 INFORMACIÓN DE ENVÍOS:
- BOGOTÁ: Mismo día (entrega 2-6 horas)
- COLOMBIA NACIONAL: 1-5 días hábiles
- MÉTODO: Según coordinación con asesor Laura Castaño
- CONTACTO: WhatsApp +57 319 360-5666
- ENVÍO GRATIS: Compras superiores a $150.000

🎯 FUNCIONES AVANZADAS DE AMELIE:
- recommend_products: Análisis profundo y recomendación ultra-personalizada
- analyze_compatibility: Compatibilidad química con tipo de piel y clima
- create_layering_guide: Guía para combinar fragancias creativamente
- get_product_info: Información molecular, emocional y psicológica de productos
- add_to_cart: Facilitar compra con asesoramiento completo
- show_shipping: Detalles de envío personalizado

⚖️ ASPECTOS LEGALES:
- Fragancias INSPIRADAS artesanales (no originales)
- Calidad premium garantizada con concentraciones superiores
- Satisfacción garantizada o devolución
- Proceso legal y transparente en todo momento

🗣️ ESTILO DE COMUNICACIÓN DE AMELIE:
- Sofisticado pero accesible, nunca arrogante
- Preguntas psicológicas profundas sobre personalidad y estilo de vida
- Explicaciones educativas sobre el "por qué" de cada recomendación
- Enfoque en conexiones emocionales y memories olfativas
- Lenguaje poético cuando habla de fragancias

🧠 METODOLOGÍA AVANZADA DE AMELIE:
1. ANÁLISIS PSICOLÓGICO: Personalidad, estilo de vida, profesión, aspiraciones
2. PERFIL OLFATIVO COMPLEJO: Familias preferidas, experiencias pasadas, rechazos
3. COMPATIBILIDAD QUÍMICA: Tipo de piel, clima, química corporal
4. CONTEXTO SOCIAL: Ocasiones, entorno profesional, imagen deseada
5. EVOLUCIÓN TEMPORAL: Cómo la fragancia evolucionará durante el día
6. EDUCACIÓN OLFATIVA: Enseñanza sobre composición y familias olfativas

REGLAS FUNDAMENTALES DE AMELIE:
1. PROFUNDIDAD SOBRE RAPIDEZ: Prefiere análisis profundo antes que respuestas rápidas
2. EDUCACIÓN OLFATIVA: Siempre enseña algo nuevo sobre fragancias
3. TRANSPARENCIA ABSOLUTA: Clara sobre que son "fragancias inspiradas artesanales"
4. PERSONALIZACIÓN EXTREMA: Cada recomendación tiene razones psicológicas específicas
5. LAYERING EXPERTISE: Enseña combinaciones creativas cuando es apropiado
6. EXCLUSIVIDAD SEVÁN: Solo recomienda productos del catálogo disponible

Amelie inicia cada conversación con análisis profundo de la persona antes de cualquier recomendación.`;

// Funciones disponibles para OpenAI (actualizado para Amelie)
const FUNCTIONS = [
  {
    name: 'recommend_products',
    description: 'Recomienda productos basado en las preferencias del usuario',
    parameters: {
      type: 'object',
      properties: {
        gender: {
          type: 'string',
          enum: ['hombre', 'mujer', 'unisex'],
          description: 'Género objetivo'
        },
        family: {
          type: 'string',
          enum: ['citrico', 'floral', 'oriental', 'amaderado', 'gourmand', 'fresco'],
          description: 'Familia olfativa preferida'
        },
        occasion: {
          type: 'string',
          enum: ['dia', 'noche', 'trabajo', 'casual', 'especial'],
          description: 'Ocasión de uso'
        },
        budget: {
          type: 'string',
          enum: ['economico', 'medio', 'premium'],
          description: 'Rango de presupuesto'
        },
        preferences: {
          type: 'string',
          description: 'Preferencias adicionales del usuario'
        }
      },
      required: ['gender']
    }
  },
  {
    name: 'add_to_cart',
    description: 'Agrega un producto específico al carrito',
    parameters: {
      type: 'object',
      properties: {
        product_id: {
          type: 'string',
          description: 'ID o SKU del producto'
        },
        quantity: {
          type: 'integer',
          default: 1,
          description: 'Cantidad a agregar'
        }
      },
      required: ['product_id']
    }
  },
  {
    name: 'get_product_info',
    description: 'Obtiene información detallada de un producto específico',
    parameters: {
      type: 'object',
      properties: {
        product_id: {
          type: 'string',
          description: 'ID, SKU o nombre del producto'
        }
      },
      required: ['product_id']
    }
  },
  {
    name: 'show_shipping',
    description: 'Muestra información sobre envíos y tiempos de entrega',
    parameters: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'Ciudad de destino (opcional)'
        }
      }
    }
  },
  {
    name: 'legal_notice',
    description: 'Explica aspectos legales sobre fragancias inspiradas',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          enum: ['general', 'calidad', 'duracion', 'originales'],
          description: 'Aspecto legal específico'
        }
      }
    }
  },
  {
    name: 'checkout_start',
    description: 'Inicia el proceso de compra/checkout',
    parameters: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Lista de productos para comprar'
        }
      }
    }
  },
  // Nuevas funciones específicas de Amelie
  {
    name: 'analyze_compatibility',
    description: 'Analiza compatibilidad química de fragancias con tipo de piel y clima',
    parameters: {
      type: 'object',
      properties: {
        skin_type: {
          type: 'string',
          enum: ['grasa', 'seca', 'mixta', 'sensible'],
          description: 'Tipo de piel del usuario'
        },
        climate: {
          type: 'string',
          enum: ['calido', 'frio', 'humedo', 'seco'],
          description: 'Clima habitual'
        }
      }
    }
  },
  {
    name: 'create_layering_guide',
    description: 'Crea guía personalizada para combinar fragancias (layering)',
    parameters: {
      type: 'object',
      properties: {
        base_fragrance: {
          type: 'string',
          description: 'Fragancia base para el layering'
        },
        desired_effect: {
          type: 'string',
          description: 'Efecto deseado con la combinación'
        }
      }
    }
  },
  {
    name: 'psychological_analysis',
    description: 'Realiza análisis psicológico para determinar fragancias que reflejen la personalidad',
    parameters: {
      type: 'object',
      properties: {
        personality_traits: {
          type: 'string',
          description: 'Rasgos de personalidad del usuario'
        },
        lifestyle: {
          type: 'string',
          description: 'Estilo de vida y actividades diarias'
        },
        profession: {
          type: 'string',
          description: 'Profesión o área laboral'
        }
      }
    }
  }
];

export async function POST(request: NextRequest) {
  try {
    // Verificar API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key no configurada' },
        { status: 500 }
      );
    }

    // Obtener datos del request
    const { message, context = {} } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    // Crear cliente Supabase con service key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Obtener información del usuario (si está autenticado)
    const authHeader = request.headers.get('authorization');
    let user = null;
    
    if (authHeader) {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        user = authUser;
      } catch (error) {
        // Usuario no autenticado o token inválido, continuar sin usuario
        console.log('Usuario no autenticado:', error);
      }
    }

    // Construir contexto de la conversación
    const conversationContext = {
      user_id: user?.id,
      timestamp: new Date().toISOString(),
      ...context
    };

    // Construir historial de conversación limitado para controlar tokens
    const conversationMessages = [];
    conversationMessages.push({ role: 'system', content: SYSTEM_MESSAGE });
    
    // Agregar contexto reciente si existe
    if (context.recent_messages && Array.isArray(context.recent_messages)) {
      context.recent_messages.forEach((msg: any) => {
        conversationMessages.push({ 
          role: msg.role, 
          content: msg.content.slice(0, 100) // Limitar cada mensaje a 100 chars
        });
      });
    }
    
    conversationMessages.push({ role: 'user', content: message.slice(0, 200) }); // Limitar mensaje actual

    // Llamar a OpenAI con configuración optimizada para Amelie
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationMessages,
      functions: FUNCTIONS,
      function_call: 'auto',
      temperature: 0.8, // Incrementado para más creatividad y personalidad
      max_tokens: 800, // Incrementado para respuestas más profundas
      presence_penalty: 0.2,
      frequency_penalty: 0.1
    });

    const aiResponse = completion.choices[0]?.message;

    if (!aiResponse) {
      throw new Error('No se recibió respuesta de OpenAI');
    }

    let finalResponse = aiResponse.content || '';
    let functionResult = null;

    // Ejecutar función si fue llamada
    if (aiResponse.function_call) {
      const functionName = aiResponse.function_call.name;
      const functionArgs = JSON.parse(aiResponse.function_call.arguments || '{}');

      functionResult = await executeFunction(functionName, functionArgs, supabase, user);

      // Generar respuesta final basada en el resultado de la función
      const followUpCompletion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_MESSAGE.slice(0, 1000) }, // Limitar system message
          { role: 'user', content: message.slice(0, 200) },
          { role: 'assistant', content: aiResponse.content, function_call: aiResponse.function_call },
          { role: 'function', name: functionName, content: JSON.stringify(functionResult).slice(0, 500) }
        ],
        temperature: 0.7,
        max_tokens: 250, // Reducido aún más para respuestas finales
        presence_penalty: 0.1
      });

      finalResponse = followUpCompletion.choices[0]?.message?.content || finalResponse;
    }

    // Guardar interacción en la base de datos (opcional, si la tabla existe)
    try {
      if (user) {
        await supabase
          .from('ai_interactions')
          .insert({
            user_id: user.id,
            message,
            response: finalResponse,
            context: conversationContext,
            created_at: new Date().toISOString()
          });
      } else {
        // Para usuarios no autenticados, usar session_id
        const sessionId = request.headers.get('x-session-id') || `session_${Date.now()}`;
        await supabase
          .from('ai_interactions')
          .insert({
            session_id: sessionId,
            message,
            response: finalResponse,
            context: conversationContext,
            created_at: new Date().toISOString()
          });
      }
    } catch (dbError) {
      // Si hay error guardando en DB, continuar sin fallar
      console.log('No se pudo guardar interacción (tabla puede no existir):', dbError);
    }

    return NextResponse.json({
      reply: finalResponse,
      function_result: functionResult,
      context: conversationContext
    });

  } catch (error) {
    console.error('Error en AI agent:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del asistente',
        fallback: 'Lo siento, no puedo responder en este momento. Contáctanos por WhatsApp: +57 319 360 5666'
      },
      { status: 500 }
    );
  }
}

// Función para ejecutar las funciones del asistente
async function executeFunction(functionName: string, args: any, supabase: any, user: any) {
  switch (functionName) {
    case 'recommend_products':
      return await recommendProducts(args, supabase);
    
    case 'add_to_cart':
      return await addToCart(args, supabase, user);
    
    case 'get_product_info':
      return await getProductInfo(args, supabase);
    
    case 'show_shipping':
      return await showShipping(args);
    
    case 'legal_notice':
      return await getLegalNotice(args);
    
    case 'checkout_start':
      return await startCheckout(args, user);
    
    default:
      return { error: 'Función no encontrada' };
  }
}

// Implementación de las funciones mejoradas
const resolveFallbackPrice = (category?: string) => {
  if (!category) {
    return 170000;
  }

  const normalized = String(category).toLowerCase();

  if (normalized.includes('arab')) {
    return 190000;
  }

  if (normalized.includes('coleccion') || normalized.includes('collection') || normalized.includes('signature')) {
    return 190000;
  }

  return 170000;
};

async function recommendProducts(args: any, supabase: any) {
  try {
    // Intentar obtener productos de Supabase
    let query = supabase
      .from('products')
      .select('*')
      .limit(6);

    // Intentar filtros básicos sin asumir estructura de columnas
    try {
      query = query.eq('is_active', true);
    } catch (e) {
      console.log('Campo is_active no disponible');
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Error de Supabase:', error);
      throw new Error('Error de base de datos');
    }

    // Si tenemos productos de Supabase, usarlos
    if (products && products.length > 0) {
      const recommendedProducts = products.slice(0, 3).map(product => ({
        id: product.id || Math.random().toString(),
        title: product.visible_title || product.title || 'Fragancia Premium',
        visible_title: product.visible_title || product.title || 'Fragancia Premium',
        description: product.short_description || 'Fragancia inspirada artesanal premium',
  price: product.price || resolveFallbackPrice(product.category),
        sale_price: product.sale_price,
        stock: product.stock || 100,
        category: product.category || 'premium',
        is_featured: product.is_featured || false,
        is_active: product.is_active !== false,
        images: product.images || [],
        slug: product.slug || 'fragancia-premium',
        legal_note: product.legal_note || 'Fragancia inspirada artesanal - No somos afiliados a marcas originales'
      }));

      return {
        products: recommendedProducts,
        source: 'supabase',
        note: 'Productos del catálogo real SEVÁN PERFUM'
      };
    }

    // Si no hay productos en Supabase, usar productos hardcoded
    return getSampleProducts(args);

  } catch (error) {
    console.error('Error obteniendo productos reales:', error);
    
    // Fallback total a productos hardcoded
    return getSampleProducts(args);
  }
}

// Función con productos VERIFICADOS del catálogo oficial
function getSampleProducts(args: any) {
  const verifiedProducts = [
    {
      id: 'il-roso-ilmin',
      title: 'Inspirado en IL Roso (Ilmin)',
      visible_title: 'Inspirado en IL Roso (Ilmin)',
      description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
    price: 190000,
      sale_price: null,
      stock: 100,
      category: 'coleccion',
      is_featured: true,
      is_active: true,
      images: [],
      slug: 'il-roso-ilmin',
      legal_note: 'Fragancia inspirada artesanal. No somos afiliados ni revendedores oficiales de la marca original.'
    },
    {
      id: 'starry-night-montale',
      title: 'Inspirado en Starry Night (Montale Paris)',
      visible_title: 'Inspirado en Starry Night (Montale Paris)',
      description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
    price: 190000,
      sale_price: null,
      stock: 100,
      category: 'coleccion',
      is_featured: true,
      is_active: true,
      images: [],
      slug: 'starry-night-montale',
      legal_note: 'Fragancia inspirada artesanal. No somos afiliados ni revendedores oficiales de la marca original.'
    },
    {
      id: 'blue-seduction-for-men-antonio-banderas',
      title: 'Inspirado en Blue Seduction For Men (Antonio Banderas)',
      visible_title: 'Inspirado en Blue Seduction For Men (Antonio Banderas)',
      description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
    price: 170000,
      sale_price: null,
      stock: 100,
      category: 'hombre',
      is_featured: true,
      is_active: true,
      images: [],
      slug: 'blue-seduction-for-men-antonio-banderas',
      legal_note: 'Fragancia inspirada artesanal. No somos afiliados ni revendedores oficiales de la marca original.'
    },
    {
      id: 'good-girl-carolina-herrera',
      title: 'Inspirado en Good Girl (Carolina Herrera)',
      visible_title: 'Inspirado en Good Girl (Carolina Herrera)',
      description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
    price: 170000,
      sale_price: null,
      stock: 100,
      category: 'mujer',
      is_featured: true,
      is_active: true,
      images: [],
      slug: 'good-girl-carolina-herrera',
      legal_note: 'Fragancia inspirada artesanal. No somos afiliados ni revendedores oficiales de la marca original.'
    },
    {
      id: 'yara-lattafa',
      title: 'Inspirado en Yara (Lattafa)',
      visible_title: 'Inspirado en Yara (Lattafa)',
      description: 'Fragancia inspirada artesanal premium. Concentración 18%, maceración 72h. No somos afiliados a la marca original.',
    price: 190000,
      sale_price: null,
      stock: 100,
      category: 'arabes',
      is_featured: true,
      is_active: true,
      images: [],
      slug: 'yara-lattafa',
      legal_note: 'Fragancia inspirada artesanal. No somos afiliados ni revendedores oficiales de la marca original.'
    }
  ];

  // Filtrar por género/categoría si se especifica
  let filtered = verifiedProducts;
  if (args.gender) {
    if (args.gender === 'hombre') {
      filtered = verifiedProducts.filter(p => p.category === 'hombre');
    } else if (args.gender === 'mujer') {
      filtered = verifiedProducts.filter(p => p.category === 'mujer');
    } else if (args.gender === 'unisex' || args.gender === 'arabes') {
      filtered = verifiedProducts.filter(p => p.category === 'arabes');
    } else if (args.gender === 'coleccion') {
      filtered = verifiedProducts.filter(p => p.category === 'coleccion');
    }
  }

  return {
    products: filtered.slice(0, 3),
    source: 'verified_catalog',
    note: 'Productos del catálogo oficial SEVÁN PERFUM - Todos disponibles en tienda'
  };
}

async function addToCart(args: any, supabase: any, user: any) {
  try {
    if (!user) {
      return { 
        error: 'Necesitas iniciar sesión para agregar al carrito',
        login_required: true 
      };
    }

    // Verificar que el producto existe
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, title, visible_title, price, stock, category')
      .or(`id.eq.${args.product_id},sku.eq.${args.product_id}`)
      .single();

    if (productError || !product) {
      return { error: 'Producto no encontrado' };
    }

    if (product.stock < args.quantity) {
      return { error: `Stock insuficiente. Disponible: ${product.stock}` };
    }

    // Por ahora, solo simular agregar al carrito (hasta implementar tabla cart_items)
    return {
      success: true,
      product: {
        id: product.id,
        title: product.visible_title || product.title,
  price: resolveFallbackPrice(product.category)
      },
      quantity: args.quantity,
      message: `${product.visible_title || product.title} listo para agregar al carrito`,
      note: 'Usa el botón de agregar al carrito en la página del producto para completar la acción'
    };

  } catch (error) {
    console.error('Error agregando al carrito:', error);
    return { error: 'No se pudo procesar la solicitud' };
  }
}

async function getProductInfo(args: any, supabase: any) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .or(`id.eq.${args.product_id},sku.eq.${args.product_id},title.ilike.%${args.product_id}%`)
      .single();

    if (error || !product) {
      return { error: 'Producto no encontrado' };
    }

    return {
      product: {
        id: product.id,
        title: product.visible_title || product.title,
  price: resolveFallbackPrice(product.category),
        description: product.short_description || product.long_description,
        scent_notes: product.scent_notes,
        stock: product.stock,
        legal_note: product.legal_note,
        images: product.images || []
      }
    };

  } catch (error) {
    console.error('Error obteniendo producto:', error);
    return { error: 'No se pudo obtener información del producto' };
  }
}

async function showShipping(args: any) {
  const shippingInfo = {
    bogota: {
      mismo_dia: {
        time: 'Mismo día (2-6 horas)',
        cost: 12000,
        coverage: 'Bogotá y área metropolitana',
        coordination: 'Coordinado con asesor Laura Castaño'
      }
    },
    colombia_nacional: {
      standard: {
        time: '1-5 días hábiles',
        cost: 15000,
        coverage: 'Todo Colombia',
        cities: 'Medellín, Cali, Barranquilla, Bucaramanga, etc.',
        coordination: 'Según lo que establezcas con el asesor'
      },
      express: {
        time: '1-2 días hábiles',
        cost: 25000,
        coverage: 'Ciudades principales',
        coordination: 'Disponible según ubicación'
      }
    },
    free_shipping: {
      threshold: 300000,
      note: 'Envío GRATIS en compras superiores a $300.000'
    },
    coordinator: {
      name: 'Laura Castaño',
      whatsapp: '+57 319 360-5666',
      role: 'Asesora especializada SEVÁN PERFUM'
    },
    important: 'Los envíos se coordinan según lo que establezcas con nuestra asesora Laura. Ella te dará las mejores opciones para tu ubicación.'
  };

  if (args.city) {
    const city = args.city.toLowerCase();
    if (city.includes('bogota') || city.includes('bogotá')) {
      return {
        location: 'Bogotá',
        shipping: shippingInfo.bogota.mismo_dia,
        special_service: 'Entrega mismo día disponible',
        coordinator: shippingInfo.coordinator,
        free_shipping: shippingInfo.free_shipping,
        note: 'En Bogotá tenemos el mejor servicio: entrega el mismo día coordinada con Laura'
      };
    }
  }

  return {
    location: 'Colombia Nacional',
    shipping_options: shippingInfo.colombia_nacional,
    coordinator: shippingInfo.coordinator,
    free_shipping: shippingInfo.free_shipping,
    personalized_service: shippingInfo.important,
    note: 'Contacta a Laura por WhatsApp para coordinar el mejor método de envío para tu ciudad'
  };
}

async function getLegalNotice(args: any) {
  const legalInfo = {
    general: {
      title: 'Fragancias Inspiradas Artesanales',
      content: '🎨 **Nuestras fragancias son REINTERPRETACIONES ARTESANALES** - No vendemos productos originales. Cada fragancia es una creación única inspirada en esencias famosas, desarrollada con nuestro proceso artesanal exclusivo. Somos completamente transparentes: utilizamos "Inspirado en..." para indicar la referencia olfativa, pero nuestro producto es una versión artesanal independiente.'
    },
    calidad: {
      title: 'Proceso Artesanal Premium',
      content: '✨ **Concentración 18%** de aceites aromáticos premium, **maceración de 72 horas** para máxima calidad, proceso artesanal controlado paso a paso. Garantía de satisfacción total - si no te convence, te devolvemos tu dinero.'
    },
    duracion: {
      title: 'Duración y Proyección',
      content: '⏰ **6-8 horas de duración** en piel promedio, proyección media-alta los primeros 2-3 horas. La duración varía según tipo de piel, clima y aplicación. Nuestras fragancias están formuladas para máxima longevidad.'
    },
    originales: {
      title: 'Inspiradas vs Originales',
      content: '🆚 **¿Qué significa "Inspirado en"?** Son nuestras propias creaciones artesanales que capturan la esencia y familia olfativa del perfume original, pero con nuestra formulación única. NO son copias exactas - son reinterpretaciones de calidad premium a precios justos. Perfectas para quienes buscan alta calidad sin pagar precios de lujo.'
    }
  };

  const topic = args.topic || 'general';
  return legalInfo[topic as keyof typeof legalInfo] || legalInfo.general;
}

async function startCheckout(args: any, user: any) {
  if (!user) {
    return {
      error: 'Necesitas iniciar sesión para continuar con tu compra en SEVÁN PERFUM',
      login_required: true,
      exclusive_store: 'Solo vendemos en sevanperfum.com'
    };
  }

  return {
    checkout_url: '/checkout',
    message: 'Te redirijo al proceso de compra segura de SEVÁN PERFUM',
    products: args.products || [],
    payment_methods: ['Tarjeta de crédito/débito', 'PSE', 'Nequi', 'Daviplata', 'Contra entrega'],
    store_exclusivity: 'Compra exclusivamente en SEVÁN PERFUM'
  };
}

// ========== FUNCIONES AUXILIARES PARA ANÁLISIS INTELIGENTE ==========

function analyzeScent(product: any): string {
  const title = (product.title || '').toLowerCase();
  const description = (product.short_description || '').toLowerCase();
  
  // Análisis de familia olfativa basado en título y descripción
  if (title.includes('oud') || title.includes('árabe')) return 'Oriental Amaderado';
  if (title.includes('fresh') || title.includes('fresco')) return 'Cítrico Fresco';
  if (title.includes('floral') || title.includes('rosa')) return 'Floral Elegante';
  if (title.includes('spice') || title.includes('especias')) return 'Oriental Especiado';
  if (title.includes('sweet') || title.includes('dulce')) return 'Gourmand Dulce';
  if (title.includes('wood') || title.includes('madera')) return 'Amaderado Seco';
  
  return 'Sofisticado Versátil';
}

function analyzeEmotionalImpact(product: any): string {
  const title = (product.title || '').toLowerCase();
  
  if (title.includes('elegancia') || title.includes('elegante')) return 'Sofisticación y Elegancia';
  if (title.includes('pasión') || title.includes('seducción')) return 'Pasión y Seducción';
  if (title.includes('fuerza') || title.includes('magnética')) return 'Poder y Magnetismo';
  if (title.includes('imperial') || title.includes('supremo')) return 'Autoridad y Distinción';
  if (title.includes('nocturna') || title.includes('noche')) return 'Misterio y Sensualidad';
  if (title.includes('eterna') || title.includes('divina')) return 'Feminidad Eterna';
  
  return 'Confianza y Personalidad';
}

function analyzeOccasionFit(product: any, occasion?: string): number {
  if (!occasion) return 0.5;
  
  const title = (product.title || '').toLowerCase();
  const isNightFragrance = title.includes('nocturna') || title.includes('oud') || title.includes('intenso');
  const isDayFragrance = title.includes('fresco') || title.includes('ligero') || title.includes('citrico');
  
  switch (occasion) {
    case 'noche':
    case 'especial':
      return isNightFragrance ? 0.9 : 0.4;
    case 'dia':
    case 'trabajo':
      return isDayFragrance ? 0.9 : 0.6;
    case 'casual':
      return 0.7;
    default:
      return 0.5;
  }
}

function extractInspiration(title: string): string {
  // Extraer la inspiración basada en patrones comunes
  if (title.includes('Sauvage')) return 'Inspirado en Sauvage (Dior)';
  if (title.includes('Aventus')) return 'Inspirado en Aventus (Creed)';
  if (title.includes('Good Girl')) return 'Inspirado en Good Girl (Carolina Herrera)';
  if (title.includes('Baccarat')) return 'Inspirado en Baccarat Rouge 540';
  if (title.includes('Cloud')) return 'Inspirado en Cloud (Ariana Grande)';
  if (title.includes('Oud')) return 'Inspirado en fragancias árabes premium';
  
  return 'Fragancia inspirada artesanal SEVÁN PERFUM';
}

function rankProductsByRelevance(products: any[], criteria: any): any[] {
  return products.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    
    // Puntuación por ocasión
    scoreA += a.occasion_score * 40;
    scoreB += b.occasion_score * 40;
    
    // Puntuación por productos destacados
    if (a.is_featured) scoreA += 20;
    if (b.is_featured) scoreB += 20;
    
    // Puntuación por precio (preferir rango medio)
    const priceScoreA = Math.abs(70000 - a.price) / 70000;
    const priceScoreB = Math.abs(70000 - b.price) / 70000;
    scoreA += (1 - priceScoreA) * 10;
    scoreB += (1 - priceScoreB) * 10;
    
    return scoreB - scoreA;
  });
}

// Función simplificada para reducir tokens
function generateSmartQuestions(criteria: any): string[] {
  if (!criteria.gender) return ['¿Para hombre, mujer o unisex?'];
  if (!criteria.occasion) return ['¿Para qué ocasión?'];
  return ['¿Qué tipo de aroma prefieres?'];
}