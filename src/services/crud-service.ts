/**
 * SEVAN AI PERFUMES - CRUD SERVICE
 * ====================================
 * Servicio completo para operaciones CRUD en Supabase
 * Maneja productos, usuarios, cupones, pedidos y configuraciones
 * 
 * Características:
 * - Operaciones CRUD completas (Create, Read, Update, Delete)
 * - Validación de datos
 * - Manejo de errores
 * - Tipos TypeScript
 * - Logging detallado
 * 
 * @author SEVAN AI Assistant
 * @version 1.0.0
 * @date 2024
 */

import { supabase } from '@/lib/supabase';

// ==========================================
// TIPOS E INTERFACES
// ==========================================

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  image_url?: string;
  stock: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id?: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  status?: 'active' | 'banned' | 'pending';
  created_at?: string;
  updated_at?: string;
}

export interface Coupon {
  id?: string;
  code: string;
  name?: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_amount: number;
  max_uses: number;
  current_uses: number;
  expires_at: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id?: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: any;
  items: any[];
  created_at?: string;
  updated_at?: string;
}

export interface Configuration {
  id?: string;
  key: string;
  value: any;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface CrudResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ==========================================
// PRODUCTOS CRUD
// ==========================================

class ProductService {
  private table = 'products';

  async getAll(): Promise<CrudResponse<Product[]>> {
    try {
      console.log('🛍️ [ProductService] Obteniendo todos los productos...');
      
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [ProductService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [ProductService] ${data?.length || 0} productos obtenidos`);
      return { success: true, data: data || [] };

    } catch (err: any) {
      console.error('💥 [ProductService] Error inesperado:', err);
      return { success: false, error: 'Error inesperado obteniendo productos' };
    }
  }

  async getById(id: string): Promise<CrudResponse<Product>> {
    try {
      console.log(`🔍 [ProductService] Obteniendo producto ID: ${id}`);
      
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ [ProductService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [ProductService] Producto obtenido:`, data);
      return { success: true, data };

    } catch (err: any) {
      console.error('💥 [ProductService] Error inesperado:', err);
      return { success: false, error: 'Error obteniendo producto' };
    }
  }

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<CrudResponse<Product>> {
    try {
      console.log('➕ [ProductService] Creando producto:', product);
      
      // Validación básica
      if (!product.name || !product.price) {
        return { success: false, error: 'Nombre y precio son requeridos' };
      }

      const { data, error } = await supabase
        .from(this.table)
        .insert([product])
        .select()
        .single();

      if (error) {
        console.error('❌ [ProductService] Error creando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [ProductService] Producto creado:', data);
      return { success: true, data, message: 'Producto creado exitosamente' };

    } catch (err: any) {
      console.error('💥 [ProductService] Error inesperado:', err);
      return { success: false, error: 'Error creando producto' };
    }
  }

  async update(id: string, updates: Partial<Product>): Promise<CrudResponse<Product>> {
    try {
      console.log(`🔄 [ProductService] Actualizando producto ID: ${id}`, updates);
      
      const { data, error } = await supabase
        .from(this.table)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ [ProductService] Error actualizando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [ProductService] Producto actualizado:', data);
      return { success: true, data, message: 'Producto actualizado exitosamente' };

    } catch (err: any) {
      console.error('💥 [ProductService] Error inesperado:', err);
      return { success: false, error: 'Error actualizando producto' };
    }
  }

  async delete(id: string): Promise<CrudResponse<void>> {
    try {
      console.log(`🗑️ [ProductService] Eliminando producto ID: ${id}`);
      
      const { error } = await supabase
        .from(this.table)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ [ProductService] Error eliminando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [ProductService] Producto eliminado exitosamente');
      return { success: true, message: 'Producto eliminado exitosamente' };

    } catch (err: any) {
      console.error('💥 [ProductService] Error inesperado:', err);
      return { success: false, error: 'Error eliminando producto' };
    }
  }
}

// ==========================================
// CUPONES CRUD
// ==========================================

class CouponService {
  private table = 'coupons';

  async getAll(): Promise<CrudResponse<Coupon[]>> {
    try {
      console.log('🎫 [CouponService] Obteniendo todos los cupones...');
      
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [CouponService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [CouponService] ${data?.length || 0} cupones obtenidos`);
      return { success: true, data: data || [] };

    } catch (err: any) {
      console.error('💥 [CouponService] Error inesperado:', err);
      return { success: false, error: 'Error inesperado obteniendo cupones' };
    }
  }

  async getById(id: string): Promise<CrudResponse<Coupon>> {
    try {
      console.log(`🔍 [CouponService] Obteniendo cupón ID: ${id}`);
      
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ [CouponService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [CouponService] Cupón obtenido:`, data);
      return { success: true, data };

    } catch (err: any) {
      console.error('💥 [CouponService] Error inesperado:', err);
      return { success: false, error: 'Error obteniendo cupón' };
    }
  }

  async create(coupon: Omit<Coupon, 'id' | 'created_at' | 'updated_at'>): Promise<CrudResponse<Coupon>> {
    try {
      console.log('➕ [CouponService] Creando cupón:', coupon);
      
      // Validación básica
      if (!coupon.code || !coupon.discount_value) {
        return { success: false, error: 'Código y valor de descuento son requeridos' };
      }

      const { data, error } = await supabase
        .from(this.table)
        .insert([coupon])
        .select()
        .single();

      if (error) {
        console.error('❌ [CouponService] Error creando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [CouponService] Cupón creado:', data);
      return { success: true, data, message: 'Cupón creado exitosamente' };

    } catch (err: any) {
      console.error('💥 [CouponService] Error inesperado:', err);
      return { success: false, error: 'Error creando cupón' };
    }
  }

  async update(id: string, updates: Partial<Coupon>): Promise<CrudResponse<Coupon>> {
    try {
      console.log(`🔄 [CouponService] Actualizando cupón ID: ${id}`, updates);
      
      const { data, error } = await supabase
        .from(this.table)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ [CouponService] Error actualizando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [CouponService] Cupón actualizado:', data);
      return { success: true, data, message: 'Cupón actualizado exitosamente' };

    } catch (err: any) {
      console.error('💥 [CouponService] Error inesperado:', err);
      return { success: false, error: 'Error actualizando cupón' };
    }
  }

  async delete(id: string): Promise<CrudResponse<void>> {
    try {
      console.log(`🗑️ [CouponService] Eliminando cupón ID: ${id}`);
      
      const { error } = await supabase
        .from(this.table)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ [CouponService] Error eliminando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [CouponService] Cupón eliminado exitosamente');
      return { success: true, message: 'Cupón eliminado exitosamente' };

    } catch (err: any) {
      console.error('💥 [CouponService] Error inesperado:', err);
      return { success: false, error: 'Error eliminando cupón' };
    }
  }
}

// ==========================================
// USUARIOS CRUD
// ==========================================

class UserService {
  private table = 'auth.users'; // Tabla de usuarios de Supabase Auth
  private profilesTable = 'profiles'; // Tabla de perfiles personalizados

  async getAll(): Promise<CrudResponse<User[]>> {
    try {
      console.log('👥 [UserService] Obteniendo todos los usuarios...');
      
      // Obtener desde la tabla profiles que tiene información adicional
      const { data, error } = await supabase
        .from(this.profilesTable)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [UserService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [UserService] ${data?.length || 0} usuarios obtenidos`);
      return { success: true, data: data || [] };

    } catch (err: any) {
      console.error('💥 [UserService] Error inesperado:', err);
      return { success: false, error: 'Error inesperado obteniendo usuarios' };
    }
  }

  async getById(id: string): Promise<CrudResponse<User>> {
    try {
      console.log(`🔍 [UserService] Obteniendo usuario ID: ${id}`);
      
      const { data, error } = await supabase
        .from(this.profilesTable)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ [UserService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [UserService] Usuario obtenido:`, data);
      return { success: true, data };

    } catch (err: any) {
      console.error('💥 [UserService] Error inesperado:', err);
      return { success: false, error: 'Error obteniendo usuario' };
    }
  }

  async update(id: string, updates: Partial<User>): Promise<CrudResponse<User>> {
    try {
      console.log(`🔄 [UserService] Actualizando usuario ID: ${id}`, updates);
      
      const { data, error } = await supabase
        .from(this.profilesTable)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ [UserService] Error actualizando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [UserService] Usuario actualizado:', data);
      return { success: true, data, message: 'Usuario actualizado exitosamente' };

    } catch (err: any) {
      console.error('💥 [UserService] Error inesperado:', err);
      return { success: false, error: 'Error actualizando usuario' };
    }
  }

  async changeStatus(id: string, status: 'active' | 'banned' | 'pending'): Promise<CrudResponse<User>> {
    try {
      console.log(`🔄 [UserService] Cambiando status de usuario ID: ${id} a ${status}`);
      
      const { data, error } = await supabase
        .from(this.profilesTable)
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ [UserService] Error cambiando status:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [UserService] Status de usuario actualizado:', data);
      return { success: true, data, message: `Usuario ${status === 'banned' ? 'baneado' : 'activado'} exitosamente` };

    } catch (err: any) {
      console.error('💥 [UserService] Error inesperado:', err);
      return { success: false, error: 'Error cambiando status del usuario' };
    }
  }
}

// ==========================================
// CONFIGURACIONES CRUD
// ==========================================

class ConfigurationService {
  private table = 'configurations';

  async getAll(): Promise<CrudResponse<Configuration[]>> {
    try {
      console.log('⚙️ [ConfigService] Obteniendo todas las configuraciones...');
      
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .order('key');

      if (error) {
        console.error('❌ [ConfigService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [ConfigService] ${data?.length || 0} configuraciones obtenidas`);
      return { success: true, data: data || [] };

    } catch (err: any) {
      console.error('💥 [ConfigService] Error inesperado:', err);
      return { success: false, error: 'Error inesperado obteniendo configuraciones' };
    }
  }

  async getByKey(key: string): Promise<CrudResponse<Configuration>> {
    try {
      console.log(`🔍 [ConfigService] Obteniendo configuración: ${key}`);
      
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('key', key)
        .single();

      if (error) {
        console.error('❌ [ConfigService] Error:', error);
        return { success: false, error: error.message };
      }

      console.log(`✅ [ConfigService] Configuración obtenida:`, data);
      return { success: true, data };

    } catch (err: any) {
      console.error('💥 [ConfigService] Error inesperado:', err);
      return { success: false, error: 'Error obteniendo configuración' };
    }
  }

  async update(key: string, value: any, description?: string): Promise<CrudResponse<Configuration>> {
    try {
      console.log(`🔄 [ConfigService] Actualizando configuración: ${key}`, value);
      
      const { data, error } = await supabase
        .from(this.table)
        .upsert({ 
          key, 
          value, 
          description, 
          updated_at: new Date().toISOString() 
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [ConfigService] Error actualizando:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [ConfigService] Configuración actualizada:', data);
      return { success: true, data, message: 'Configuración actualizada exitosamente' };

    } catch (err: any) {
      console.error('💥 [ConfigService] Error inesperado:', err);
      return { success: false, error: 'Error actualizando configuración' };
    }
  }
}

// ==========================================
// INSTANCIAS EXPORTADAS
// ==========================================

export const productService = new ProductService();
export const couponService = new CouponService();
export const userService = new UserService();
export const configurationService = new ConfigurationService();

// ==========================================
// SERVICIO PRINCIPAL UNIFICADO
// ==========================================

export class CrudService {
  products = productService;
  coupons = couponService;
  users = userService;
  configurations = configurationService;

  // Método para validar conexión
  async testConnection(): Promise<CrudResponse<boolean>> {
    try {
      console.log('🔗 [CrudService] Probando conexión a Supabase...');
      
      const { data, error } = await supabase.from('products').select('count').limit(1);
      
      if (error) {
        console.error('❌ [CrudService] Error de conexión:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ [CrudService] Conexión exitosa');
      return { success: true, data: true, message: 'Conexión a Supabase exitosa' };

    } catch (err: any) {
      console.error('💥 [CrudService] Error inesperado:', err);
      return { success: false, error: 'Error de conexión' };
    }
  }

  // Método para obtener estadísticas generales
  async getStats(): Promise<CrudResponse<any>> {
    try {
      console.log('📊 [CrudService] Obteniendo estadísticas...');
      
      const [productsResult, couponsResult, usersResult] = await Promise.all([
        this.products.getAll(),
        this.coupons.getAll(),
        this.users.getAll()
      ]);

      const stats = {
        products: productsResult.data?.length || 0,
        coupons: couponsResult.data?.length || 0,
        users: usersResult.data?.length || 0,
        timestamp: new Date().toISOString()
      };

      console.log('✅ [CrudService] Estadísticas obtenidas:', stats);
      return { success: true, data: stats };

    } catch (err: any) {
      console.error('💥 [CrudService] Error obteniendo estadísticas:', err);
      return { success: false, error: 'Error obteniendo estadísticas' };
    }
  }
}

// Instancia principal exportada
export const crudService = new CrudService();

// Exponer servicios en window para debugging
if (typeof window !== 'undefined') {
  (window as any).crudService = crudService;
  (window as any).productService = productService;
  (window as any).couponService = couponService;
  (window as any).userService = userService;
  (window as any).configurationService = configurationService;
}

console.log('🎯 [CRUD Service] Servicio inicializado correctamente');