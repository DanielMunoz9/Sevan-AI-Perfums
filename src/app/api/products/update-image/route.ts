import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { slug, image_url, images } = await request.json();

    console.log('🔄 Actualizando imagen del producto:', slug);

    // Actualizar el producto en Supabase
    const { data, error } = await supabase
      .from('products')
      .update({
        image_url,
        images: images || [image_url]
      })
      .eq('slug', slug)
      .select();

    if (error) {
      console.error('❌ Error actualizando producto:', error);
      return NextResponse.json(
        { error: 'Error actualizando producto', details: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    console.log('✅ Producto actualizado exitosamente:', data[0].title);

    return NextResponse.json({
      success: true,
      message: 'Producto actualizado correctamente',
      product: data[0]
    });

  } catch (error) {
    console.error('❌ Error en API update-image:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}