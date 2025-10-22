import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🚀 PAGO SIMULADO - Monto fijo aplicado');
    
    const { product, customer, quantity = 1 } = req.body;

    if (!product?.price || !customer?.email) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const totalAmount = product.price * quantity;
    const orderId = `ORDER-${Date.now()}-${product.id}`;
    
    // URL simulada de MercadoPago (para desarrollo)
    const checkoutUrl = `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=simulado-${orderId}`;

    console.log(`✅ PAGO SIMULADO CREADO:`);
    console.log(`💰 Producto: ${product.title || product.visible_title}`);
    console.log(`💵 Precio: $${product.price} COP`);
    console.log(`🔢 Cantidad: ${quantity}`);
    console.log(`💸 Total: $${totalAmount} COP`);
    console.log(`🔗 URL simulada: ${checkoutUrl}`);

    return res.status(200).json({
      success: true,
      preferenceId: `sim-${orderId}`,
      checkoutUrl: checkoutUrl,
      amount: totalAmount,
      orderId: orderId,
      message: 'Pago simulado - Monto fijo aplicado'
    });

  } catch (error) {
    console.error('❌ ERROR:', error);
    return res.status(500).json({ 
      error: 'Error interno',
      details: String(error)
    });
  }
}