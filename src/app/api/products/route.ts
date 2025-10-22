import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase-service-simple'

// GET /api/products - Obtener todos los productos
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 API: Obteniendo productos...')
    
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')?.trim()
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 50) : undefined
    
    let products
    if (search) {
      products = await supabaseService.searchProducts(search, limit)
    } else if (featured === 'true') {
      products = await supabaseService.getFeaturedProducts()
    } else {
      products = await supabaseService.getProducts()
    }
    
    console.log(`✅ API: ${products.length} productos obtenidos`)
    
    return NextResponse.json({
      success: true,
      products,
      count: products.length
    })
  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener productos',
        products: []
      },
      { status: 500 }
    )
  }
}

// POST /api/products - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    console.log('🔄 API: Creando producto:', productData.name)
    
    const created = await supabaseService.createProduct(productData)
    
    if (created) {
      console.log('✅ API: Producto creado exitosamente')
      return NextResponse.json({
        success: true,
        product: created
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'No se pudo crear el producto' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}