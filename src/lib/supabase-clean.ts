import { supabase } from './supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// TEST DE CONEXIÓN A SUPABASE
export async function testSupabaseConnection() {
  try {
    console.log('🔗 Probando conexión a Supabase...');
    console.log('📍 URL:', supabaseUrl);
    console.log('🔑 Key:', supabaseAnonKey ? 'Configurada' : 'No configurada');
    
    // Test simple de conexión
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Conexión exitosa a Supabase');
    return { success: true, data };
  } catch (error) {
    console.error('💥 Error crítico:', error);
    return { success: false, error: 'Error crítico de conexión' };
  }
}

// SERVICIO CMS LIMPIO - SIN DATOS QUEMADOS
export class RealCMSService {
  async getCoupons() {
    console.log('🎫 Obteniendo cupones REALES de Supabase...');
    
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error obteniendo cupones:', error);
        return { data: [], error: error.message };
      }
      
      console.log('✅ Cupones obtenidos:', data?.length || 0);
      return { data: data || [], error: null };
    } catch (error) {
      console.error('💥 Error crítico obteniendo cupones:', error);
      return { data: [], error: 'Error crítico' };
    }
  }
  
  async createCoupon(couponData: any) {
    console.log('➕ Creando cupón en Supabase:', couponData);
    
    try {
      const { data, error } = await supabase
        .from('coupons')
        .insert([couponData])
        .select();
      
      if (error) {
        console.error('❌ Error creando cupón:', error);
        throw new Error(error.message);
      }
      
      console.log('✅ Cupón creado:', data);
      return data;
    } catch (error) {
      console.error('💥 Error crítico creando cupón:', error);
      throw error;
    }
  }
  
  async updateCoupon(id: number, couponData: any) {
    console.log('🖊️ Actualizando cupón:', id, couponData);
    
    try {
      const { data, error } = await supabase
        .from('coupons')
        .update(couponData)
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('❌ Error actualizando cupón:', error);
        throw new Error(error.message);
      }
      
      console.log('✅ Cupón actualizado:', data);
      return data;
    } catch (error) {
      console.error('💥 Error crítico actualizando cupón:', error);
      throw error;
    }
  }
  
  async deleteCoupon(id: number) {
    console.log('🗑️ Eliminando cupón:', id);
    
    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('❌ Error eliminando cupón:', error);
        throw new Error(error.message);
      }
      
      console.log('✅ Cupón eliminado');
      return true;
    } catch (error) {
      console.error('💥 Error crítico eliminando cupón:', error);
      throw error;
    }
  }
}

export const realCMSService = new RealCMSService();