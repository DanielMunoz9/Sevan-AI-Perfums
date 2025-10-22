import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Script para ejecutar desde el componente admin
export async function fixAllPrices() {
  try {
    console.log('🚀 ARREGLANDO TODOS LOS PRECIOS...');
    
    // PRODUCTOS ÁRABES - $190.000
    const arabesUpdates = [
      'Yum Yum - Armaf'
    ];
    
    // PRODUCTOS CLÁSICOS - $170.000 (por defecto todos los demás)
    const clasicosUpdates = [
      'The Scent - Hugo Boss',
      'In Motion - Hugo Boss', 
      'BOSS Bottled - Hugo Boss',
      'Hugo Red - Hugo Boss',
      'BOSS Bottled Night - Hugo Boss',
      '212 Men - Carolina Herrera',
      '212 Sexy Men - Carolina Herrera'
    ];
    
    const results: Array<{
      producto: string;
      precio: string;
      success: boolean;
      error: string | undefined;
    }> = [];
    
    // Actualizar árabes a $190.000
    for (const producto of arabesUpdates) {
      const { data, error } = await supabase
        .from('products')
        .update({ price: 190000 })
        .eq('visible_title', producto);
      
      results.push({
        producto,
        precio: '190.000',
        success: !error,
        error: error?.message
      });
    }
    
    // Actualizar clásicos a $170.000
    for (const producto of clasicosUpdates) {
      const { data, error } = await supabase
        .from('products')
        .update({ price: 170000 })
        .eq('visible_title', producto);
      
      results.push({
        producto,
        precio: '170.000',
        success: !error,
        error: error?.message
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('Error general:', error);
    throw error;
  }
}