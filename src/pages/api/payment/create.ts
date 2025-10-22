import { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

const preference = new Preference(client);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🚀 MERCADOPAGO: Creando preferencia...');
    
    const { product, customer, quantity = 1 } = req.body;

    // Validaciones
    if (!product?.id || !product?.price) {
      console.log('❌ Producto inválido');
      return res.status(400).json({ error: 'Producto requerido' });
    }

    if (!customer?.email || !customer?.name) {
      console.log('❌ Cliente inválido');
      return res.status(400).json({ error: 'Datos del cliente requeridos' });
    }

    // Calcular monto
    const unitPrice = Number(product.price);
    const totalAmount = unitPrice * quantity;
    
    console.log(`💰 Total: $${totalAmount} COP`);

    // Crear preferencia
    const preferenceData = {
      items: [
        {
          id: String(product.id),
          title: product.visible_title || product.title || 'Perfume SEVAN',
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
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/pending`
      },
      auto_return: 'approved'
    };

    console.log('🎯 Enviando a MercadoPago...');
    const response = await preference.create({ body: preferenceData });
    
    if (!response.id) {
      console.log('❌ Error en MercadoPago');
      return res.status(500).json({ error: 'Error creando preferencia' });
    }

    const checkoutUrl = response.init_point;
    console.log(`✅ Preferencia creada: ${response.id}`);
    console.log(`🔗 URL: ${checkoutUrl}`);

    return res.status(200).json({
      success: true,
      preferenceId: response.id,
      checkoutUrl: checkoutUrl,
      amount: totalAmount,
      orderId: preferenceData.external_reference
    });

  } catch (error) {
    console.error('🚨 ERROR:', error);
    return res.status(500).json({ 
      error: 'Error interno',
      details: String(error)
    });
  }
}