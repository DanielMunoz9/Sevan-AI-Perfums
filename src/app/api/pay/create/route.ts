import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Configuración de ePayco
const EPAYCO_CONFIG = {
  publicKey: process.env.EPAYCO_PUBLIC_KEY!,
  privateKey: process.env.EPAYCO_PRIVATE_KEY!,
  customerId: process.env.EPAYCO_CUSTOMER_ID!,
  pKey: process.env.EPAYCO_P_KEY!,
  testMode: process.env.EPAYCO_TEST_MODE === 'true',
  apiUrl: process.env.EPAYCO_TEST_MODE === 'true' 
    ? 'https://secure.epayco.co/validation/v1/reference/'
    : 'https://secure.epayco.co/validation/v1/reference/'
};

interface CreatePaymentRequest {
  order_id: string;
  amount: number;
  currency: string;
  description: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    doc_type: string;
    doc_number: string;
  };
  billing_address: {
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  return_url: string;
  cancel_url: string;
  notify_url: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verificar configuración de ePayco
    if (!EPAYCO_CONFIG.publicKey || !EPAYCO_CONFIG.privateKey) {
      return NextResponse.json(
        { error: 'Configuración de ePayco incompleta' },
        { status: 500 }
      );
    }

    // Crear cliente Supabase con service key para operaciones server-side
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Obtener token de autenticación del header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Token de autenticación requerido' },
        { status: 401 }
      );
    }

    // Verificar usuario autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    const paymentData: CreatePaymentRequest = await request.json();

    // Validar datos requeridos
    if (!paymentData.order_id || !paymentData.amount || !paymentData.customer) {
      return NextResponse.json(
        { error: 'Datos de pago incompletos' },
        { status: 400 }
      );
    }

    // Obtener orden de la base de datos
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          sku,
          title,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq('id', paymentData.order_id)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que la orden esté en estado pendiente
    if (order.status !== 'pending') {
      return NextResponse.json(
        { error: 'La orden no está disponible para pago' },
        { status: 400 }
      );
    }

    // Generar referencia única para ePayco
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const paymentReference = `${order.order_number}_${timestamp}_${randomStr}`;

    // Crear firma para ePayco
    const signature = generateEpaycoSignature({
      reference: paymentReference,
      amount: paymentData.amount,
      currency: paymentData.currency || 'COP'
    });

    // Preparar datos para ePayco
    const epaycoData = {
      // Datos del comercio
      p_cust_id_cliente: EPAYCO_CONFIG.customerId,
      p_key: EPAYCO_CONFIG.publicKey,
      
      // Datos de la transacción
      p_id_invoice: paymentReference,
      p_description: paymentData.description || `Compra SEVÁN PERFUM - ${order.order_number}`,
      p_amount: paymentData.amount.toString(),
      p_amount_base: (paymentData.amount / 1.19).toFixed(2), // Base sin IVA (19%)
      p_tax: (paymentData.amount - (paymentData.amount / 1.19)).toFixed(2), // IVA
      p_currency_code: paymentData.currency || 'COP',
      
      // Datos del cliente
      p_cust_name: paymentData.customer.name,
      p_cust_email: paymentData.customer.email,
      p_cust_phone: paymentData.customer.phone,
      p_cust_doc_type: paymentData.customer.doc_type || 'CC',
      p_cust_doc_number: paymentData.customer.doc_number,
      
      // Datos de facturación
      p_cust_address: paymentData.billing_address.address,
      p_cust_city: paymentData.billing_address.city,
      p_cust_state: paymentData.billing_address.state,
      p_cust_zip: paymentData.billing_address.postal_code,
      p_cust_country: paymentData.billing_address.country || 'CO',
      
      // URLs de respuesta
      p_url_response: paymentData.return_url,
      p_url_confirmation: paymentData.notify_url,
      p_url_cancel: paymentData.cancel_url,
      
      // Configuración
      p_test_request: EPAYCO_CONFIG.testMode ? 'TRUE' : 'FALSE',
      p_split_payco: 'FALSE',
      p_split_type: '',
      p_split_primary_receiver: '',
      p_split_primary_receiver_fee: '',
      
      // Firma
      p_signature: signature,
      
      // Método de pago
      p_method_payment: 'ALL', // Todos los métodos disponibles
      
      // Extras
      p_extra1: order.id, // ID interno de la orden
      p_extra2: user.id, // ID del usuario
      p_extra3: 'SEVAN_PERFUM',
      
      // Idioma
      p_language: 'es'
    };

    // Actualizar orden con referencia de pago
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_reference: paymentReference,
        payment_method: 'epayco',
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error actualizando orden:', updateError);
      return NextResponse.json(
        { error: 'Error procesando pago' },
        { status: 500 }
      );
    }

    // Registrar intento de pago
    await supabase
      .from('payment_attempts')
      .insert({
        order_id: order.id,
        payment_reference: paymentReference,
        payment_method: 'epayco',
        amount: paymentData.amount,
        currency: paymentData.currency || 'COP',
        status: 'pending',
        epayco_data: epaycoData,
        created_at: new Date().toISOString()
      });

    return NextResponse.json({
      success: true,
      payment_reference: paymentReference,
      epayco_data: epaycoData,
      payment_url: EPAYCO_CONFIG.testMode 
        ? 'https://checkout.epayco.co/payments'
        : 'https://checkout.epayco.co/payments',
      message: 'Datos de pago generados correctamente'
    });

  } catch (error) {
    console.error('Error creando pago ePayco:', error);
    return NextResponse.json(
      { 
        error: 'Error interno procesando pago',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Función para generar firma de ePayco
function generateEpaycoSignature(data: {
  reference: string;
  amount: number;
  currency: string;
}): string {
  try {
    // Formato requerido por ePayco
    const signatureString = `${EPAYCO_CONFIG.customerId}^${EPAYCO_CONFIG.pKey}^${data.reference}^${data.amount}^${data.currency}`;
    
    // Generar hash SHA256
    const signature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');
    
    return signature;
  } catch (error) {
    console.error('Error generando firma ePayco:', error);
    throw new Error('Error generando firma de seguridad');
  }
}

// Función para validar firma de respuesta de ePayco
function validateEpaycoResponse(responseData: any): boolean {
  try {
    const {
      x_cust_id_cliente,
      x_ref_payco,
      x_transaction_id,
      x_amount,
      x_currency_code,
      x_signature
    } = responseData;

    // Reconstruir firma
    const signatureString = `${x_cust_id_cliente}^${EPAYCO_CONFIG.pKey}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`;
    
    const expectedSignature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

    return expectedSignature === x_signature;
  } catch (error) {
    console.error('Error validando firma ePayco:', error);
    return false;
  }
}

// Endpoint GET para consultar estado de pago
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentReference = searchParams.get('reference');
    
    if (!paymentReference) {
      return NextResponse.json(
        { error: 'Referencia de pago requerida' },
        { status: 400 }
      );
    }

    // Crear cliente Supabase con service key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Buscar el pago en nuestra base de datos
    const { data: payment, error } = await supabase
      .from('payment_attempts')
      .select(`
        *,
        orders (
          order_number,
          status,
          total_amount
        )
      `)
      .eq('payment_reference', paymentReference)
      .single();

    if (error || !payment) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      );
    }

    // Consultar estado en ePayco
    const epaycoStatus = await queryEpaycoStatus(paymentReference);

    return NextResponse.json({
      payment_reference: paymentReference,
      status: payment.status,
      epayco_status: epaycoStatus,
      order: payment.orders,
      amount: payment.amount,
      currency: payment.currency,
      created_at: payment.created_at
    });

  } catch (error) {
    console.error('Error consultando pago:', error);
    return NextResponse.json(
      { error: 'Error consultando estado del pago' },
      { status: 500 }
    );
  }
}

// Función para consultar estado en ePayco
async function queryEpaycoStatus(reference: string) {
  try {
    const response = await fetch(`${EPAYCO_CONFIG.apiUrl}${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EPAYCO_CONFIG.privateKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error consultando ePayco:', error);
    return { error: 'No se pudo consultar el estado en ePayco' };
  }
}