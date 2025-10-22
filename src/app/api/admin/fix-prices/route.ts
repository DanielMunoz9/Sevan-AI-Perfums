import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Definición de precios por categoría
const PRECIOS_POR_CATEGORIA = {
  arabes: 190000,
  clasicos: 170000,
  coleccion: 190000
};

// Productos árabes
const PRODUCTOS_ARABES = [
  'Amber Rouge', 'Bade\'e Al Oud For Glory', 'Royal Amber', 'Oud Saffron',
  'Amber Noir', 'Velvet Gold', 'Bade\'e Al Oud Sublime', 'Honor & Glory',
  'Bade\'e Al Oud Amethyst', 'Maahir', '9PM', '9AM Rebel', 'Yara',
  'Yara Tous', 'Yara Candy', 'Asad', 'Khamrah', 'Khamrah Qahwa',
  'Shaheen', 'Love Affection', 'Art Of Universe', 'Mayar',
  'Amber Oud Dubai Night', 'Amber Oud Rouge', 'Amber Oud Gold',
  'Club De Nuit Mujer', 'Club De Nuit Intense Hombre', 'King Hombre',
  'Rosé Mujer', 'King Parfum Hombre', 'Viking Dubai Hombre', 'Viking Cairo Hombre'
];

// Productos colección
const PRODUCTOS_COLECCION = [
  'Ombre Nomade', 'Starry Night', 'IL Kakuno', 'IL Roso', 'IL Femme',
  'Bombshell', 'Delina', 'Blecker', 'Odyssey Mega', 'Yum Yum', 'Montale Paris'
];

export async function POST(request: NextRequest) {
  try {
    const { action = 'update_all' } = await request.json();
    
    console.log('🔄 Iniciando actualización masiva de precios...');
    
    // Usar SQL directo para bypasear triggers
    const { data: allProducts, error: fetchError } = await supabase
      .from('products')
      .select('id, visible_title, price');
    
    if (fetchError) {
      throw fetchError;
    }
    
    console.log(`📦 Productos encontrados: ${allProducts.length}`);
    
    // Arrays con tipos explícitos
    const updates: Array<{
      id: any;
      oldPrice: any;
      newPrice: number;
      title: any;
    }> = [];
    
    for (const product of allProducts) {
      let newPrice = PRECIOS_POR_CATEGORIA.clasicos; // Default: clásicos $170.000
      
      // Verificar si es árabe
      const isArabe = PRODUCTOS_ARABES.some(arabe => 
        product.visible_title.toLowerCase().includes(arabe.toLowerCase())
      );
      
      // Verificar si es colección
      const isColeccion = PRODUCTOS_COLECCION.some(coleccion => 
        product.visible_title.toLowerCase().includes(coleccion.toLowerCase())
      );
      
      if (isArabe) {
        newPrice = PRECIOS_POR_CATEGORIA.arabes; // $190.000
      } else if (isColeccion) {
        newPrice = PRECIOS_POR_CATEGORIA.coleccion; // $190.000
      }
      
      // Solo actualizar si el precio es diferente
      if (product.price !== newPrice) {
        updates.push({
          id: product.id,
          oldPrice: product.price,
          newPrice: newPrice,
          title: product.visible_title
        });
      }
    }
    
    console.log(`🔄 Productos a actualizar: ${updates.length}`);
    
    // Actualizar usando SQL directo con rpc
    let updatedCount = 0;
    const errors: Array<{
      product: any;
      error: string;
    }> = [];
    
    for (const update of updates) {
      try {
        // Intentar actualización directa
        const { data, error } = await supabase
          .rpc('update_product_price', {
            product_id: update.id,
            new_price: update.newPrice
          });
        
        if (error) {
          // Si falla el RPC, intentar UPDATE normal
          const { error: updateError } = await supabase
            .from('products')
            .update({ 
              price: update.newPrice,
              updated_at: new Date().toISOString() 
            })
            .eq('id', update.id);
          
          if (updateError) {
            errors.push({
              product: update.title,
              error: updateError.message
            });
          } else {
            updatedCount++;
            console.log(`✅ ${update.title}: $${update.oldPrice} → $${update.newPrice}`);
          }
        } else {
          updatedCount++;
          console.log(`✅ ${update.title}: $${update.oldPrice} → $${update.newPrice}`);
        }
        
      } catch (err) {
        errors.push({
          product: update.title,
          error: err.message
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Actualización completada: ${updatedCount} productos actualizados`,
      stats: {
        totalProducts: allProducts.length,
        updatedCount: updatedCount,
        errorCount: errors.length,
        errors: errors.slice(0, 10) // Solo mostrar primeros 10 errores
      }
    });
    
  } catch (error) {
    console.error('Error actualizando precios:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Error al actualizar precios'
    }, { status: 500 });
  }
}