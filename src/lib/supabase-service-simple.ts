import { supabase } from './supabase'
import type { Product } from '@/types'
import { getKitPriceForReference, getKitImagePath } from '@/utils/kitCatalog'

export const normalizePriceValue = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.round(value))
  }

  if (typeof value !== 'string') {
    return 0
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return 0
  }

  const decimalMatch = trimmed.match(/([\.,])(\d{1,2})$/)

  let integerSection = trimmed
  let fractional = 0
  let fractionalDigits = 0

  if (decimalMatch && decimalMatch[2].length <= 2) {
    integerSection = trimmed.slice(0, decimalMatch.index)
    fractional = Number(decimalMatch[2])
    fractionalDigits = decimalMatch[2].length
  }

  const integerDigits = integerSection.replace(/[^0-9]/g, '')

  let result = integerDigits ? Number(integerDigits) : 0

  if (fractional && fractionalDigits > 0) {
    result += fractional / Math.pow(10, fractionalDigits)
  }

  return Math.max(0, Math.round(result))
}

const normalizeText = (value: unknown): string => {
  if (value == null) {
    return '';
  }

  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Servicio simplificado para trabajar con Supabase
export class SupabaseService {
  
  // =================== PRODUCTOS ===================
  
  async getProducts(): Promise<Product[]> {
    try {
      console.log('🔍 Obteniendo productos de Supabase...')
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Error obteniendo productos:', error)
        return []
      }
      
      console.log(`✅ ${data?.length || 0} productos obtenidos:`)
      data?.forEach(product => {
        console.log(`   - ${product.title} (ID: ${product.id}, Slug: ${product.slug})`)
      })
      
      return data?.map(this.transformProduct) || []
    } catch (error) {
      console.error('❌ Error:', error)
      return []
    }
  }

  async searchProducts(query: string, limit?: number): Promise<Product[]> {
    const sanitizedQuery = query.trim().replace(/[\%_]/g, '')

    if (!sanitizedQuery) {
      return []
    }

    const finalLimit = typeof limit === 'number' ? limit : 12
    const normalizedQuery = normalizeText(sanitizedQuery)
    const tokens = normalizedQuery.split(' ').filter(Boolean)

    const fuzzifiedPattern = `%${sanitizedQuery.split(/\s+/).join('%')}%`
    const basePattern = `%${sanitizedQuery}%`

    const orStatements = [
      `title.ilike.${basePattern}`,
      `title.ilike.${fuzzifiedPattern}`,
      `visible_title.ilike.${basePattern}`,
      `visible_title.ilike.${fuzzifiedPattern}`,
      `slug.ilike.${fuzzifiedPattern}`,
      `sku.ilike.${basePattern}`,
      `inspiration.ilike.${basePattern}`,
      `inspiration.ilike.${fuzzifiedPattern}`,
      `inspiration_fragrance.ilike.${basePattern}`,
      `inspiration_brand.ilike.${basePattern}`,
      `short_description.ilike.${basePattern}`
    ]

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(orStatements.join(','))
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(40)

      if (error) {
        console.error('❌ Error buscando productos:', error)
        return []
      }

      const mapped = data?.map(this.transformProduct) || []
      const scoredMap = new Map<string, { product: Product; score: number }>()

      const computeScore = (product: Product): number => {
        const fields = [
          product.title,
          product.visible_title,
          product.slug,
          product.sku,
          product.description,
          (product as any).inspiration,
          (product as any).inspiration_brand,
          (product as any).inspiration_fragrance
        ]
          .filter(Boolean)
          .map(normalizeText)
          .join(' ')

        if (!fields) {
          return 0
        }

        let score = 0

        if (fields.includes(normalizedQuery)) {
          score += 40
        }

        tokens.forEach(token => {
          if (!token) {
            return
          }
          if (fields.includes(token)) {
            score += 15
          }
          if (fields.startsWith(token)) {
            score += 10
          }
        })

        if (product.is_featured) {
          score += 5
        }

        return score
      }

      mapped.forEach(product => {
        const existing = scoredMap.get(String(product.id))
        const score = computeScore(product)
        if (!existing || score > existing.score) {
          scoredMap.set(String(product.id), { product, score })
        }
      })

      if (scoredMap.size < finalLimit) {
        const fallbackProducts = await this.getProducts()
        fallbackProducts.forEach(product => {
          if (scoredMap.has(String(product.id))) {
            return
          }

          const haystack = [
            product.title,
            product.visible_title,
            product.description,
            product.slug,
            product.sku,
            (product as any).inspiration,
            (product as any).inspiration_brand,
            (product as any).inspiration_fragrance
          ]
            .filter(Boolean)
            .map(normalizeText)
            .join(' ')

          const matchesAll = tokens.every(token => haystack.includes(token))

          if (matchesAll) {
            const score = tokens.length * 12 + (product.is_featured ? 5 : 0)
            scoredMap.set(String(product.id), { product, score })
          }
        })
      }

      const ranked = Array.from(scoredMap.values())
        .sort((a, b) => b.score - a.score)
        .map(entry => entry.product)

      return ranked.slice(0, finalLimit)
    } catch (error) {
      console.error('❌ Error buscando productos:', error)
      return []
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(8)

      if (error) {
        console.error('Error fetching featured products:', error)
        return []
      }
      
      return data?.map(this.transformProduct) || []
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) {
        console.error('Error fetching product:', error)
        return null
      }
      
      return data ? this.transformProduct(data) : null
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  async getProductById(id: string | number): Promise<Product | null> {
    try {
      console.log('🔍 Obteniendo producto por ID:', id)
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) {
        console.error('❌ Error obteniendo producto:', error)
        return null
      }
      
      console.log('✅ Producto obtenido:', data?.title)
      return data ? this.transformProduct(data) : null
    } catch (error) {
      console.error('❌ Error obteniendo producto:', error)
      return null
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product | null> {
    try {
      console.log('🔄 Creando producto en Supabase:', productData.name)
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          sku: productData.slug || `SKU-${Date.now()}`,
          title: productData.name!,
          visible_title: productData.visible_title || productData.name!,
          slug: productData.slug!,
          short_description: productData.short_description,
          long_description: productData.description,
          price: productData.price!,
          sale_price: productData.sale_price,
          stock: productData.stock || 0,
          images: productData.images || [],
          scent_notes: productData.scent_notes || { top: [], heart: [], base: [] },
          tags: [],
          is_featured: productData.is_featured || false,
          is_active: true,
          legal_note: `Fragancia inspirada en ${productData.name}`
        })
        .select()
        .single()

      if (error) {
        console.error('❌ Error creando producto:', error)
        return null
      }
      
      console.log('✅ Producto creado exitosamente')
      return data ? this.transformProduct(data) : null
    } catch (error) {
      console.error('❌ Error creando producto:', error)
      return null
    }
  }

  async deleteProduct(productId: number): Promise<boolean> {
    try {
      console.log('🗑️ Eliminando producto:', productId)
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) {
        console.error('❌ Error eliminando producto:', error)
        return false
      }
      
      console.log('✅ Producto eliminado exitosamente')
      return true
    } catch (error) {
      console.error('❌ Error eliminando producto:', error)
      return false
    }
  }

  // =================== CATEGORÍAS ===================
  
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) {
        console.error('Error fetching categories:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // =================== UTILIDADES ===================

  private transformProduct(data: any): Product {
    const overridePrice = getKitPriceForReference(
      data.visible_title,
      data.title,
      data.inspiration_fragrance,
      data.inspiration
    )

    const manifestImage = getKitImagePath(data.visible_title || data.title || '')
    const normalizedBasePrice = normalizePriceValue(data.price)
    const normalizedSalePrice = data.sale_price != null ? normalizePriceValue(data.sale_price) : undefined
    const price = (overridePrice ?? normalizedBasePrice) || normalizedSalePrice || 0
    const salePrice = overridePrice ? undefined : (normalizedSalePrice && normalizedSalePrice > 0 ? normalizedSalePrice : undefined)

    const primaryImage = manifestImage || data.images?.[0] || '/images/placeholder-product.svg'
    const imageGallery = manifestImage
      ? [manifestImage, ...(data.images || []).filter((img: string) => img !== manifestImage)]
      : data.images || []

    return {
      id: data.id, // Mantener como UUID string
      title: data.title || data.visible_title,
      name: data.title || data.visible_title,
      visible_title: data.visible_title || data.title,
      description: data.long_description || data.short_description || '',
      short_description: data.short_description || '',
      price,
      sale_price: salePrice,
      image_url: primaryImage,
      images: imageGallery,
      brand: 'SEVÁN PERFUM',
      category: 'General',
      created_at: data.created_at,
      sku: data.sku || `SKU-${data.id}`,
      scent_family: 'Artesanal',
      scent_notes: data.scent_notes || { top: [], middle: [], base: [] },
      genre: 'Unisex',
      concentration: '18%',
      stock: data.stock || 0,
      slug: data.slug || this.generateSlug(data.title || data.visible_title),
      is_featured: data.is_featured || false,
      is_active: data.is_active ?? true,
      avg_rating: 4.5,
      review_count: 0,
      sales: 0
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[áàäâã]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöôõ]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // =================== TEST CONNECTION ===================
  
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔍 Probando conexión a Supabase...')
      
      const { data, error } = await supabase
        .from('products')
        .select('id')
        .limit(1)

      if (error) {
        return {
          success: false,
          message: `Error de conexión: ${error.message}`
        }
      }

      return {
        success: true,
        message: '✅ Conexión a Supabase exitosa'
      }
    } catch (error) {
      return {
        success: false,
        message: `❌ Error: ${error}`
      }
    }
  }
}

// Instancia singleton
export const supabaseService = new SupabaseService()

// =================== TIPOS ===================

export interface CreateOrderRequest {
  userId?: string
  items: {
    productId: string
    sku: string
    title: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }[]
  subtotal: number
  taxAmount?: number
  shippingAmount?: number
  totalAmount: number
  billingAddress: any
  shippingAddress: any
  paymentMethod: string
}

export interface Order {
  id: number
  orderNumber: string
  status: string
  paymentStatus: string
  subtotal: number
  shipping: number
  total: number
  createdAt: string
  updatedAt: string
  items: any[]
  billingAddress: any
  shippingAddress: any
}