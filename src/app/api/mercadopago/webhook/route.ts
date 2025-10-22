import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

const payment = new Payment(client);

export async function POST(req: NextRequest) {
  try {
    console.log('🔔 Webhook de MercadoPago recibido');
    
    const body = await req.json();
    console.log('📦 Datos del webhook:', body);

    // Validar que es una notificación de pago
    if (body.type !== 'payment') {
      console.log('ℹ️ Notificación no es de pago, ignorando');
      return NextResponse.json({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      console.log('❌ ID de pago no encontrado');
      return NextResponse.json({ error: 'Payment ID not found' }, { status: 400 });
    }

    // Obtener información detallada del pago
    const paymentInfo = await payment.get({ id: paymentId });
    console.log('💳 Información del pago:', {
      id: paymentInfo.id,
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail,
      external_reference: paymentInfo.external_reference,
      transaction_amount: paymentInfo.transaction_amount,
      currency_id: paymentInfo.currency_id,
      date_created: paymentInfo.date_created,
      date_approved: paymentInfo.date_approved,
    });

    // Actualizar la orden en la base de datos
    if (paymentInfo.external_reference) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const orderUpdate: any = {
        payment_id: paymentInfo.id?.toString(),
        payment_status: paymentInfo.status,
        payment_status_detail: paymentInfo.status_detail,
        payment_amount: paymentInfo.transaction_amount,
        payment_currency: paymentInfo.currency_id,
        payment_date: paymentInfo.date_approved || paymentInfo.date_created,
        updated_at: new Date().toISOString(),
      };

      // Si el pago fue aprobado, marcar la orden como pagada
      if (paymentInfo.status === 'approved') {
        orderUpdate.status = 'paid';
        orderUpdate.paid_at = paymentInfo.date_approved;
      } else if (paymentInfo.status === 'rejected') {
        orderUpdate.status = 'payment_failed';
      } else if (paymentInfo.status === 'pending') {
        orderUpdate.status = 'pending_payment';
      }

      const { error } = await supabase
        .from('orders')
        .update(orderUpdate)
        .eq('id', paymentInfo.external_reference);

      if (error) {
        console.error('❌ Error actualizando orden:', error);
      } else {
        console.log('✅ Orden actualizada exitosamente');
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// También manejar GET para verificación de MercadoPago
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}