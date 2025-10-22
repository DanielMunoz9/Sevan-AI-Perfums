// =============================================
// 🎯 SERVICIO CMS COMPLETO - SEVAN AI PERFUMES
// Sistema de Gestión Avanzado para E-commerce
// =============================================

import { supabase } from './supabase';

// ============ INTERFACES ============
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
  lowStockProducts: number;
  pendingOrders: number;
  newCustomersToday: number;
  topSellingProduct: string;
}

export interface AdvancedOrder {
  id: number;
  user_id: string;
  customer_name: string;
  customer_email: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total: number;
  subtotal: number;
  tax_amount: number;
  shipping_cost: number;
  discount_amount: number;
  coupon_code?: string;
  items_count: number;
  shipping_address: any;
  billing_address: any;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  estimated_delivery?: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  total_spent: number;
  orders_count: number;
  loyalty_points: number;
  last_order_date: string;
  created_at: string;
  address: any;
  preferences: any;
  status: 'active' | 'inactive' | 'blocked';
}

export interface Coupon {
  id: number;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  minimum_amount: number;
  maximum_discount?: number;
  usage_limit?: number;
  used_count: number;
  user_limit: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

export interface SpecialOffer {
  id: number;
  title: string;
  description?: string;
  type: 'flash_sale' | 'buy_x_get_y' | 'bundle' | 'seasonal';
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  banner_image?: string;
  conditions: any;
  products: number[];
}

export interface Notification {
  id: number;
  type: 'order' | 'stock' | 'review' | 'system' | 'customer';
  title: string;
  message: string;
  data: any;
  recipient_id?: string;
  is_read: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  action_url?: string;
  created_at: string;
  expires_at?: string;
}

export interface AISuggestion {
  id: number;
  type: 'product_recommendation' | 'inventory' | 'pricing' | 'marketing' | 'customer_retention';
  title: string;
  description: string;
  suggestion_data: any;
  confidence_score: number;
  status: 'pending' | 'applied' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  applied_at?: string;
}

export interface InventoryMovement {
  id: number;
  product_id: number;
  product_name: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  reference_type: string;
  reference_id?: number;
  cost_price?: number;
  created_at: string;
  created_by?: string;
}

export interface SiteAnalytics {
  date: string;
  page_views: number;
  unique_visitors: number;
  sessions: number;
  bounce_rate: number;
  avg_session_duration: number;
  conversion_rate: number;
  revenue: number;
  orders_count: number;
  new_customers: number;
}

// ============ SERVICIO CMS ============
class CMSService {
  
  // ========== DASHBOARD Y ESTADÍSTICAS ==========
  
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Obtener estadísticas básicas
      const [
        revenueResult,
        ordersResult,
        customersResult,
        productsResult,
        lowStockResult,
        pendingOrdersResult
      ] = await Promise.all([
        // Ingresos totales (últimos 30 días)
        supabase
          .from('orders')
          .select('total')
          .eq('payment_status', 'paid')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        
        // Total órdenes
        supabase
          .from('orders')
          .select('id', { count: 'exact' }),
        
        // Total clientes
        supabase
          .from('user_profiles')
          .select('id', { count: 'exact' }),
        
        // Total productos
        supabase
          .from('products')
          .select('id', { count: 'exact' })
          .eq('is_active', true),
        
        // Productos con stock bajo
        supabase
          .from('products')
          .select('id', { count: 'exact' })
          .lt('stock', 5),
        
        // Órdenes pendientes
        supabase
          .from('orders')
          .select('id', { count: 'exact' })
          .eq('status', 'pending')
      ]);

      const totalRevenue = revenueResult.data?.reduce((sum: number, order: any) => sum + order.total, 0) || 0;
      
      return {
        totalRevenue,
        totalOrders: ordersResult.count || 0,
        totalCustomers: customersResult.count || 0,
        totalProducts: productsResult.count || 0,
        lowStockProducts: lowStockResult.count || 0,
        pendingOrders: pendingOrdersResult.count || 0,
        revenueGrowth: 12.5, // Calcular crecimiento real
        ordersGrowth: 8.3,
        customersGrowth: 15.2,
        productsGrowth: 5.1,
        newCustomersToday: 3,
        topSellingProduct: 'Blue Seduction'
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  }

  // ========== GESTIÓN DE ÓRDENES ==========
  
  async getOrders(limit = 50, offset = 0, status?: string): Promise<AdvancedOrder[]> {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          user_profiles:user_id (
            first_name,
            last_name,
            email
          ),
          order_items (
            id,
            product_id,
            quantity,
            price,
            products (
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      return data?.map((order: any) => ({
        id: order.id,
        user_id: order.user_id,
        customer_name: `${order.user_profiles?.first_name || ''} ${order.user_profiles?.last_name || ''}`.trim(),
        customer_email: order.user_profiles?.email || '',
        status: order.status,
        payment_status: order.payment_status || 'pending',
        payment_method: order.payment_method || '',
        total: order.total,
        subtotal: order.subtotal || order.total,
        tax_amount: order.tax_amount || 0,
        shipping_cost: order.shipping_cost || 0,
        discount_amount: order.discount_amount || 0,
        coupon_code: order.coupon_code,
        items_count: order.order_items?.length || 0,
        shipping_address: order.shipping_address || {},
        billing_address: order.billing_address || {},
        tracking_number: order.tracking_number,
        created_at: order.created_at,
        updated_at: order.updated_at,
        estimated_delivery: order.estimated_delivery,
        items: order.order_items?.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.products?.name || '',
          product_image: item.products?.image_url || '',
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price
        })) || []
      })) || [];
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: number, status: string, comment?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Agregar al historial
      await supabase
        .from('order_history')
        .insert({
          order_id: orderId,
          status,
          comment,
          created_at: new Date().toISOString()
        });

      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  }

  // ========== GESTIÓN DE CLIENTES ==========
  
  async getCustomers(limit = 50, offset = 0): Promise<Customer[]> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          orders:orders(count)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return data?.map((profile: any) => ({
        id: profile.id,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone,
        avatar_url: profile.avatar_url,
        total_spent: profile.total_spent || 0,
        orders_count: profile.orders?.[0]?.count || 0,
        loyalty_points: profile.loyalty_points || 0,
        last_order_date: profile.last_order_date || profile.created_at,
        created_at: profile.created_at,
        address: profile.address || {},
        preferences: profile.preferences || {},
        status: 'active'
      })) || [];
    } catch (error) {
      console.error('Error getting customers:', error);
      throw error;
    }
  }

  // ========== GESTIÓN DE CUPONES ==========
  
  async getCoupons(): Promise<Coupon[]> {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting coupons:', error);
      throw error;
    }
  }

  async createCoupon(couponData: Partial<Coupon>): Promise<Coupon | null> {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .insert(couponData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating coupon:', error);
      return null;
    }
  }

  async updateCoupon(id: number, updates: Partial<Coupon>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('coupons')
        .update(updates)
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error updating coupon:', error);
      return false;
    }
  }

  async deleteCoupon(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error deleting coupon:', error);
      return false;
    }
  }

  // ========== GESTIÓN DE OFERTAS ESPECIALES ==========
  
  async getSpecialOffers(): Promise<SpecialOffer[]> {
    try {
      const { data, error } = await supabase
        .from('special_offers')
        .select(`
          *,
          offer_products (
            product_id,
            special_price
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data?.map((offer: any) => ({
        ...offer,
        products: offer.offer_products?.map((op: any) => op.product_id) || []
      })) || [];
    } catch (error) {
      console.error('Error getting special offers:', error);
      throw error;
    }
  }

  // ========== NOTIFICACIONES ==========
  
  async getNotifications(userId?: string, limit = 20): Promise<Notification[]> {
    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (userId) {
        query = query.eq('recipient_id', userId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }

  async createNotification(notification: Partial<Notification>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert(notification);

      return !error;
    } catch (error) {
      console.error('Error creating notification:', error);
      return false;
    }
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // ========== SUGERENCIAS DE IA ==========
  
  async getAISuggestions(limit = 10): Promise<AISuggestion[]> {
    try {
      const { data, error } = await supabase
        .from('ai_suggestions')
        .select('*')
        .eq('status', 'pending')
        .order('confidence_score', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw error;
    }
  }

  async applyAISuggestion(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_suggestions')
        .update({ 
          status: 'applied',
          applied_at: new Date().toISOString()
        })
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error applying AI suggestion:', error);
      return false;
    }
  }

  async dismissAISuggestion(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_suggestions')
        .update({ status: 'dismissed' })
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error dismissing AI suggestion:', error);
      return false;
    }
  }

  // ========== INVENTARIO ==========
  
  async getInventoryMovements(productId?: number, limit = 50): Promise<InventoryMovement[]> {
    try {
      let query = supabase
        .from('inventory_movements')
        .select(`
          *,
          products (
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (productId) {
        query = query.eq('product_id', productId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data?.map((movement: any) => ({
        ...movement,
        product_name: movement.products?.name || ''
      })) || [];
    } catch (error) {
      console.error('Error getting inventory movements:', error);
      throw error;
    }
  }

  async createInventoryMovement(movement: Partial<InventoryMovement>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('inventory_movements')
        .insert(movement);

      return !error;
    } catch (error) {
      console.error('Error creating inventory movement:', error);
      return false;
    }
  }

  // ========== ANALYTICS ==========
  
  async getAnalytics(startDate: string, endDate: string): Promise<SiteAnalytics[]> {
    try {
      const { data, error } = await supabase
        .from('site_analytics')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  }

  // ========== CONFIGURACIÓN ==========
  
  async getSiteSettings(): Promise<Record<string, any>> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value, type');

      if (error) throw error;

      const settings: Record<string, any> = {};
      data?.forEach((setting: any) => {
        let value = setting.value;
        
        // Convertir tipos
        if (setting.type === 'number') {
          value = parseFloat(value);
        } else if (setting.type === 'boolean') {
          value = value === 'true';
        } else if (setting.type === 'json') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            value = {};
          }
        }
        
        settings[setting.key] = value;
      });

      return settings;
    } catch (error) {
      console.error('Error getting site settings:', error);
      throw error;
    }
  }

  async updateSiteSetting(key: string, value: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value: typeof value === 'object' ? JSON.stringify(value) : String(value),
          updated_at: new Date().toISOString()
        });

      return !error;
    } catch (error) {
      console.error('Error updating site setting:', error);
      return false;
    }
  }
}

// Exportar instancia única
export const cmsService = new CMSService();
export default cmsService;