import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000,
  }
});

const preference = new Preference(client);

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 MERCADOPAGO: Creando preferencia de pago...');
    
    const body = await req.json();
    console.log('📦 Datos recibidos:', JSON.stringify(body, null, 2));

    const { product, customer, quantity = 1 } = body;

    // Validaciones
    if (!product?.id || !product?.price) {
      console.log('❌ Producto inválido:', product);
      return NextResponse.json(
        { error: 'Producto requerido con id y precio' },
        { status: 400 }
      );
    }

    if (!customer?.email || !customer?.name) {
      console.log('❌ Cliente inválido:', customer);
      return NextResponse.json(
        { error: 'Datos del cliente requeridos (email, name)' },
        { status: 400 }
      );
    }

    // Validar token de MercadoPago
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.log('❌ Token de MercadoPago no configurado');
      return NextResponse.json(
        { error: 'Token de MercadoPago no configurado' },
        { status: 500 }
      );
    }

    // Calcular monto total
    const unitPrice = Number(product.price);
    const totalAmount = unitPrice * quantity;
    
    console.log(`💰 Precio unitario: $${unitPrice} COP`);
    console.log(`🔢 Cantidad: ${quantity}`);
    console.log(`💵 Total calculado: $${totalAmount} COP`);

    // Crear preferencia de MercadoPago
    const preferenceData = {
      items: [
        {
          id: String(product.id),
          title: product.visible_title || product.title || 'Perfume SEVAN',
          description: `Perfume ${product.visible_title || product.title}`,
          quantity: quantity,
          unit_price: unitPrice,
          currency_id: 'COP'
        }
      ],
      payer: {
        name: customer.name,
        email: customer.email,
        phone: {
          number: customer.phone || '3001234567'
        }
      },
      external_reference: `ORDER-${Date.now()}-${product.id}`,
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/pending`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      }
    };

    console.log('🎯 Enviando a MercadoPago:', JSON.stringify(preferenceData, null, 2));

    // Crear la preferencia
    const response = await preference.create({ body: preferenceData });
    
    console.log('✅ Respuesta de MercadoPago:', {
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });

    if (!response.id) {
      console.log('❌ MercadoPago no devolvió ID de preferencia');
      return NextResponse.json(
        { error: 'Error creando preferencia en MercadoPago' },
        { status: 500 }
      );
    }

    // Determinar URL de checkout
    const checkoutUrl = process.env.NODE_ENV === 'production' 
      ? response.init_point 
      : response.sandbox_init_point || response.init_point;

    console.log(`🔗 URL de checkout: ${checkoutUrl}`);
    console.log('✅ PREFERENCIA CREADA EXITOSAMENTE');

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
      checkoutUrl: checkoutUrl,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
      amount: totalAmount,
      orderId: preferenceData.external_reference,
      message: 'Preferencia creada exitosamente'
    });

  } catch (error) {
    console.error('🚨 ERROR EN MERCADOPAGO:', error);
    
    if (error instanceof Error) {
      console.error('Mensaje de error:', error.message);
      console.error('Stack trace:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

// GET para verificar que el endpoint funciona
export async function GET() {
  console.log('🔍 Verificando API de MercadoPago...');
  
  const hasToken = !!process.env.MERCADOPAGO_ACCESS_TOKEN;
  
  return NextResponse.json({
    status: 'API MercadoPago funcionando',
    timestamp: new Date().toISOString(),
    hasToken: hasToken,
    tokenLength: process.env.MERCADOPAGO_ACCESS_TOKEN?.length || 0,
    environment: process.env.NODE_ENV || 'development'
  });
}