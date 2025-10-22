'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

// Tipos específicos para Supabase
interface CartItem {
  id: string;
  user_id: string | null;
  session_id: string | null;
  product_id: string;
  quantity: number;
  created_at: string;
}

interface CartItemWithProduct extends CartItem {
  product: Product;
}

interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  status: string;
  payment_status: string;
  payment_method: string | null;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  billing_address: any;
  shipping_address: any;
  created_at: string;
}

// Tipos del contexto
interface CartState {
  items: CartItemWithProduct[];
  isLoading: boolean;
  total: number;
  subtotal: number;
  shipping: number;
  itemCount: number;
  couponCode: string | null;
  couponDiscount: number;
  isFreeShipping: boolean;
  couponError: string | null;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number | string) => Promise<void>;
  updateQuantity: (productId: number | string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  createOrder: (orderData: any) => Promise<Order>;
  refreshCart: () => void;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => void;
}

// Acciones del reducer
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItemWithProduct[] }
  | { type: 'CALCULATE_TOTALS' }
  | { type: 'SET_COUPON'; payload: { code: string; discount: number; isFreeShipping: boolean; error: string | null } }
  | { type: 'REMOVE_COUPON' };

// Reducer del carrito
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ITEMS':
      const items = action.payload;
      const subtotal = items.reduce((sum, item) => {
        const price = item.product.sale_price || item.product.price;
        return sum + (price * item.quantity);
      }, 0);
      
      // Calcular envío considerando cupón de envío gratis
      let shipping = 0;
      if (state.isFreeShipping) {
        shipping = 0; // Envío gratis si hay cupón de free_shipping
      } else {
        shipping = 0; // Por defecto sin cargo (coordinado con asesor)
      }
      
      // Calcular total considerando descuentos
      const discountedSubtotal = subtotal - state.couponDiscount;
      const total = Math.max(0, discountedSubtotal + shipping);
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items,
        subtotal,
        shipping,
        total,
        itemCount
      };
    
    case 'SET_COUPON':
      return {
        ...state,
        couponCode: action.payload.code,
        couponDiscount: action.payload.discount,
        isFreeShipping: action.payload.isFreeShipping,
        couponError: action.payload.error
      };
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        couponCode: null,
        couponDiscount: 0,
        isFreeShipping: false,
        couponError: null
      };
    
    default:
      return state;
  }
}

// Estado inicial
const initialState: CartState = {
  items: [],
  isLoading: false,
  total: 0,
  subtotal: 0,
  shipping: 0,
  itemCount: 0,
  couponCode: null,
  couponDiscount: 0,
  isFreeShipping: false,
  couponError: null
};

// Crear contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook para usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
}

// Provider del contexto
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Generar un session_id temporal para el carrito (guest)
  const getSessionId = useCallback(() => {
    let sessionId = localStorage.getItem('sevan_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sevan_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // Función para cargar el carrito desde Supabase
  const loadCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionId = getSessionId();
      
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (*)
        `)
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error loading cart:', error);
        dispatch({ type: 'SET_ITEMS', payload: [] });
        return;
      }

      // Transformar datos para que coincidan con nuestro tipo
      const transformedItems: CartItemWithProduct[] = (cartItems || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        session_id: item.session_id,
        product_id: item.product_id,
        quantity: item.quantity,
        created_at: item.created_at,
        product: {
          id: item.products.id,
          title: item.products.title,
          name: item.products.title,
          visible_title: item.products.visible_title,
          description: item.products.long_description || item.products.short_description || '',
          short_description: item.products.short_description || '',
          price: item.products.price,
          sale_price: item.products.sale_price,
          image_url: item.products.images?.[0] || '/images/default-perfume.jpg',
          images: item.products.images || [],
          brand: 'SEVÁN PERFUM',
          category: 'General',
          created_at: item.products.created_at,
          sku: item.products.sku,
          scent_family: 'Artesanal',
          scent_notes: item.products.scent_notes || { top: [], middle: [], base: [] },
          genre: 'Unisex',
          concentration: '18%',
          stock: item.products.stock || 0,
          slug: item.products.slug,
          is_featured: item.products.is_featured || false,
          is_active: item.products.is_active ?? true,
          avg_rating: 4.5,
          review_count: 0,
          sales: 0
        }
      }));

      dispatch({ type: 'SET_ITEMS', payload: transformedItems });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'SET_ITEMS', payload: [] });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [getSessionId]);

  // Cargar carrito al inicializar
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Añadir producto al carrito
  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Verificar stock
      if (!product.stock || product.stock < quantity) {
        throw new Error('Stock insuficiente');
      }
      
      const sessionId = getSessionId();
      
      // Verificar si el producto ya está en el carrito
      const productId = product.id.toString();

      const { data: existingItem } = await (supabase as any)
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Actualizar cantidad existente
        const { error } = await (supabase as any)
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Crear nuevo item en el carrito
        const { error } = await (supabase as any)
          .from('cart_items')
          .insert({
            session_id: sessionId,
            product_id: productId,
            quantity: quantity
          });

        if (error) throw error;
      }
      
      await loadCart();
      showNotification(`${product.visible_title} añadido al carrito`, 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Error al añadir al carrito', 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Remover producto del carrito con logging mejorado
  const removeFromCart = async (productId: number | string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionId = getSessionId();
      const cleanProductId = productId.toString().trim();
      
      console.log('🗑️ Removing from cart:', { sessionId, productId: cleanProductId });
      
      const { data, error, count } = await (supabase as any)
        .from('cart_items')
        .delete({ count: 'exact' })
        .eq('session_id', sessionId)
        .eq('product_id', cleanProductId);

      if (error) {
        console.error('❌ Database error removing from cart:', error);
        throw error;
      }
      
      console.log(`✅ Removed ${count || 0} items from cart`);
      
      if ((count || 0) === 0) {
        showNotification('El producto no estaba en el carrito', 'info');
      } else {
        showNotification('Producto removido del carrito', 'success');
      }
      
      await loadCart();
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      showNotification('Error al remover del carrito', 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Actualizar cantidad
  const updateQuantity = async (productId: number | string, newQuantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionId = getSessionId();
      
      if (newQuantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const { error } = await (supabase as any)
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('session_id', sessionId)
        .eq('product_id', productId.toString());

      if (error) throw error;
      
      await loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      showNotification('Error al actualizar cantidad', 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Limpiar carrito
  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionId = getSessionId();
      
      const { error } = await (supabase as any)
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;
      
      await loadCart();
      showNotification('Carrito vacío', 'info');
    } catch (error) {
      console.error('Error clearing cart:', error);
      showNotification('Error al vaciar carrito', 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Crear pedido
  const createOrder = async (orderData: any): Promise<Order> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (state.items.length === 0) {
        throw new Error('El carrito está vacío');
      }
      
      const sessionId = getSessionId();
      const orderNumber = `SEVAN-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      
      console.log('🛒 Creando orden automáticamente:', orderNumber);
      
      // Crear la orden en Supabase (SIN trigger problemático)
      const orderPayload = {
        order_number: orderNumber,
        user_id: null, // Para usuarios invitados
        status: 'pending',
        payment_status: 'pending',
        payment_method: orderData.paymentMethod || 'epayco',
        subtotal: parseFloat(state.subtotal.toString()),
        tax_amount: 0,
        shipping_amount: parseFloat(state.shipping.toString()),
        discount_amount: 0,
        total_amount: parseFloat(state.total.toString()),
        currency: 'COP',
        billing_address: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          address: orderData.shippingAddress,
          city: orderData.city || 'Bogotá'
        },
        shipping_address: {
          name: orderData.customerName,
          address: orderData.shippingAddress,
          city: orderData.city || 'Bogotá'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: newOrder, error: orderError } = await (supabase as any)
        .from('orders')
        .insert([orderPayload])
        .select()
        .single();

      if (orderError) {
        console.error('❌ Error Supabase creando orden:', orderError);
        throw orderError;
      }

      console.log('✅ Orden creada exitosamente en Supabase:', newOrder.order_number);

      // Crear los items de la orden
      const orderItems = state.items.map(item => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        sku: item.product.sku,
        title: item.product.visible_title,
        quantity: item.quantity,
        unit_price: item.product.sale_price || item.product.price,
        total_price: (item.product.sale_price || item.product.price) * item.quantity,
        product_data: {
          sku: item.product.sku,
          title: item.product.visible_title,
          image: item.product.images?.[0] || null
        }
      }));

      const { error: itemsError } = await (supabase as any)
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;
      
      // Limpiar el carrito después de crear la orden
      await clearCart();
      
      showNotification('Pedido creado exitosamente', 'success');
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      showNotification('Error al crear pedido', 'error');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Función para refrescar el carrito
  const refreshCart = () => {
    loadCart();
  };

  // Función para aplicar cupón
  const applyCoupon = async (code: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Importar la función de validación de cupones
      const { validateCoupon } = await import('@/lib/coupon-service');
      
      const validation = await validateCoupon(code, state.subtotal);
      
      if (!validation.valid) {
        dispatch({
          type: 'SET_COUPON',
          payload: {
            code: '',
            discount: 0,
            isFreeShipping: false,
            error: validation.error || 'Error al validar cupón'
          }
        });
        showNotification(validation.error || 'Cupón inválido', 'error');
        return;
      }

      // Cupón válido
      dispatch({
        type: 'SET_COUPON',
        payload: {
          code: validation.coupon?.code || code,
          discount: validation.discount || 0,
          isFreeShipping: validation.isFreeShipping || false,
          error: null
        }
      });

      showNotification(
        `✅ Cupón ${code} aplicado correctamente`,
        'success'
      );
    } catch (error) {
      console.error('Error applying coupon:', error);
      showNotification('Error al aplicar cupón', 'error');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Función para remover cupón
  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    showNotification('Cupón removido', 'info');
  };

  // Función para mostrar notificaciones
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    // Crear evento personalizado para notificaciones
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: { message, type }
    }));
  };

  const contextValue: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    createOrder,
    refreshCart,
    applyCoupon,
    removeCoupon
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;