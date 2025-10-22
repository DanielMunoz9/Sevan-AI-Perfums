/**
 * 🎟️ SERVICIO DE VALIDACIÓN DE CUPONES
 * Valida cupones y calcula descuentos/beneficios
 */

import { supabase } from '@/lib/supabase';

export interface Coupon {
  id: number;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping' | 'buy_x_get_y';
  value: number;
  minimum_amount: number;
  maximum_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  user_limit: number;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  starts_at: string | null;
  expires_at: string | null;
}

export interface CouponValidation {
  valid: boolean;
  coupon?: Coupon;
  error?: string;
  discount?: number;
  isFreeShipping?: boolean;
}

/**
 * Valida un código de cupón
 */
export async function validateCoupon(code: string, cartSubtotal: number): Promise<CouponValidation> {
  try {
    // 1. Buscar el cupón en la base de datos
    const { data: couponData, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (couponError || !couponData) {
      return {
        valid: false,
        error: 'Cupón no encontrado o inactivo'
      };
    }

    const coupon = couponData as Coupon;

    // 2. Validar que el cupón esté activo y dentro de las fechas
    const now = new Date();
    const startDate = coupon.start_date ? new Date(coupon.start_date) : null;
    const endDate = coupon.end_date ? new Date(coupon.end_date) : null;

    if (startDate && now < startDate) {
      return {
        valid: false,
        error: `Cupón válido desde ${startDate.toLocaleDateString('es-CO')}`
      };
    }

    if (endDate && now > endDate) {
      return {
        valid: false,
        error: `Cupón expirado desde ${endDate.toLocaleDateString('es-CO')}`
      };
    }

    // 3. Validar monto mínimo
    if (coupon.minimum_amount && cartSubtotal < coupon.minimum_amount) {
      return {
        valid: false,
        error: `Monto mínimo de compra: $${coupon.minimum_amount.toLocaleString('es-CO')} COP`
      };
    }

    // 4. Validar límite de usos
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return {
        valid: false,
        error: 'Cupón agotado - límite de usos alcanzado'
      };
    }

    // 5. Calcular descuento según el tipo
    let discount = 0;
    let isFreeShipping = false;

    switch (coupon.type) {
      case 'percentage':
        // Descuento porcentual
        discount = Math.round(cartSubtotal * (coupon.value / 100));
        // Aplicar límite máximo de descuento si existe
        if (coupon.maximum_discount && discount > coupon.maximum_discount) {
          discount = coupon.maximum_discount;
        }
        break;

      case 'fixed_amount':
        // Descuento fijo
        discount = coupon.value;
        if (coupon.maximum_discount && discount > coupon.maximum_discount) {
          discount = coupon.maximum_discount;
        }
        break;

      case 'free_shipping':
        // Envío gratis (solo en compras nacionales)
        isFreeShipping = true;
        discount = 0; // El descuento se aplica en el cálculo del envío
        break;

      case 'buy_x_get_y':
        // Lógica especial para Buy X Get Y
        discount = coupon.value;
        break;
    }

    // 6. Retornar cupón válido
    return {
      valid: true,
      coupon,
      discount,
      isFreeShipping
    };

  } catch (error) {
    console.error('Error validando cupón:', error);
    return {
      valid: false,
      error: 'Error al validar el cupón'
    };
  }
}

/**
 * Aplica un cupón registrando su uso
 */
export async function applyCoupon(couponCode: string, orderId: string): Promise<void> {
  try {
    // Obtener el cupón
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase())
      .single();

    if (couponError || !coupon) {
      throw new Error('Cupón no encontrado');
    }

    // Incrementar uso
    const newUsedCount = (coupon.used_count || 0) + 1;
    const { error: updateError } = await supabase
      .from('coupons')
      .update({ used_count: newUsedCount })
      .eq('id', coupon.id);

    if (updateError) {
      throw updateError;
    }

    console.log(`✅ Cupón ${couponCode} aplicado exitosamente`);

  } catch (error) {
    console.error('Error aplicando cupón:', error);
    throw error;
  }
}

/**
 * Obtiene información del cupón sin validar
 */
export async function getCouponInfo(code: string): Promise<Coupon | null> {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !data) return null;
    return data as Coupon;
  } catch (error) {
    console.error('Error obteniendo información del cupón:', error);
    return null;
  }
}
