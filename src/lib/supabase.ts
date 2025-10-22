// Centralizamos un único cliente de Supabase para el navegador para evitar
// el warning: "Multiple GoTrueClient instances detected". En desarrollo
// React StrictMode monta dos veces los componentes, así que debemos asegurar
// que sólo instanciamos una vez.
import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Usamos una propiedad global para evitar múltiples instancias en desarrollo (StrictMode)
declare global {
  // eslint-disable-next-line no-var
  var __supabaseClient: SupabaseClient<any> | undefined
}

export const supabase: SupabaseClient<any> = (() => {
  if (typeof window === 'undefined') {
    // En server (route handlers) se recomienda crear clientes ad-hoc, pero devolvemos uno simple.
    return createBrowserClient<any>(supabaseUrl, supabaseAnonKey)
  }
  if (!globalThis.__supabaseClient) {
    globalThis.__supabaseClient = createBrowserClient<any>(supabaseUrl, supabaseAnonKey)
  }
  return globalThis.__supabaseClient
})()

// Compatibilidad con código anterior que usaba createSupabaseClient()
export function createSupabaseClient() {
  return supabase;
}

// Tipos básicos de la base de datos
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          sku: string
          title: string
          visible_title: string
          slug: string
          short_description: string | null
          long_description: string | null
          price: number
          sale_price: number | null
          currency: string
          category_id: string | null
          stock: number
          weight: number | null
          images: string[]
          scent_notes: {
            top: string[]
            heart: string[]
            base: string[]
          }
          tags: string[]
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          title: string
          visible_title: string
          slug: string
          short_description?: string | null
          long_description?: string | null
          price: number
          sale_price?: number | null
          currency?: string
          category_id?: string | null
          stock?: number
          weight?: number | null
          images?: string[]
          scent_notes?: {
            top: string[]
            heart: string[]
            base: string[]
          }
          tags?: string[]
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          title?: string
          visible_title?: string
          slug?: string
          short_description?: string | null
          long_description?: string | null
          price?: number
          sale_price?: number | null
          currency?: string
          category_id?: string | null
          stock?: number
          weight?: number | null
          images?: string[]
          scent_notes?: {
            top: string[]
            heart: string[]
            base: string[]
          }
          tags?: string[]
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          status: string
          payment_status: string
          payment_method: string | null
          payment_reference: string | null
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total_amount: number
          currency: string
          billing_address: any
          shipping_address: any
          tracking_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_reference?: string | null
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount: number
          currency?: string
          billing_address: any
          shipping_address: any
          tracking_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_reference?: string | null
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount?: number
          currency?: string
          billing_address?: any
          shipping_address?: any
          tracking_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}