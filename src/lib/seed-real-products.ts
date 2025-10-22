import { supabase } from './supabase';

// Datos reales de productos SEVÁN PERFUM
const realProducts = [
  // HOMBRE
  {
    sku: 'SEV-001',
    title: 'Inspirado en Blue Seduction For Men',
    visible_title: 'Seducción Azul Masculina',
    slug: 'seduccion-azul-masculina',
    short_description: 'Fragancia seductora y fresca inspirada en el clásico de Antonio Banderas',
    long_description: 'Una interpretación sofisticada y seductora que combina notas frescas y amaderadas. Perfecto para el hombre moderno que busca destacar con elegancia y carisma.',
    price: 85000,
    sale_price: 65000,
    category_id: null, // Se asignará después
    stock: 50,
    images: ['/images/external/blue-seduction-1.jpg', '/images/external/blue-seduction-2.jpg'],
    scent_notes: {
      top: ['Bergamota', 'Limón', 'Menta'],
      heart: ['Jengibre', 'Cardamomo', 'Nuez moscada'],
      base: ['Sándalo', 'Cedro', 'Almizcle']
    },
    tags: ['masculino', 'fresco', 'seductor', 'día'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Blue Seduction For Men de Antonio Banderas. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-002',
    title: 'Inspirado en BOSS Bottled',
    visible_title: 'Jefe Embotellado',
    slug: 'jefe-embotellado',
    short_description: 'Elegancia masculina clásica inspirada en Hugo Boss',
    long_description: 'Una fragancia atemporal que representa la sofisticación y el éxito. Ideal para reuniones importantes y ocasiones especiales.',
    price: 95000,
    sale_price: 75000,
    category_id: null,
    stock: 40,
    images: ['/images/products/jefe-embotellado.svg'],
    scent_notes: {
      top: ['Manzana', 'Ciruela', 'Bergamota'],
      heart: ['Geranio', 'Canela', 'Mahonesa'],
      base: ['Sándalo', 'Vetiver', 'Cedro']
    },
    tags: ['masculino', 'elegante', 'clásico', 'oficina'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en BOSS Bottled de Hugo Boss. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-003',
    title: 'Inspirado en Sauvage',
    visible_title: 'Salvaje',
    slug: 'salvaje',
    short_description: 'Frescura salvaje inspirada en el icónico Dior',
    long_description: 'Una explosión de frescura que evoca la libertad y la naturaleza salvaje. Una fragancia magnética que no pasa desapercibida.',
    price: 120000,
    sale_price: 95000,
    category_id: null,
    stock: 35,
    images: ['/images/products/salvaje.svg'],
    scent_notes: {
      top: ['Bergamota', 'Pimienta', 'Elemi'],
      heart: ['Lavanda', 'Pimienta de Sichuan', 'Geranio'],
      base: ['Ambroxan', 'Cedro', 'Pachulí']
    },
    tags: ['masculino', 'fresco', 'intenso', 'moderno'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Sauvage de Dior. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-004',
    title: 'Inspirado en Aventus',
    visible_title: 'Aventura',
    slug: 'aventura',
    short_description: 'Fragancia de aventura inspirada en el legendario Creed',
    long_description: 'Una composición épica que simboliza fuerza, poder y éxito. Para hombres que conquistan cada desafío.',
    price: 150000,
    sale_price: 120000,
    category_id: null,
    stock: 25,
    images: ['/images/products/aventura.svg'],
    scent_notes: {
      top: ['Piña', 'Grosella negra', 'Manzana', 'Bergamota'],
      heart: ['Abedul', 'Pachulí', 'Rosa', 'Jazmín'],
      base: ['Almizcle', 'Roble', 'Ambergris', 'Vainilla']
    },
    tags: ['masculino', 'premium', 'poderoso', 'único'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Aventus de Creed. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },

  // MUJER
  {
    sku: 'SEV-005',
    title: 'Inspirado en Good Girl',
    visible_title: 'Chica Buena',
    slug: 'chica-buena',
    short_description: 'Elegancia femenina inspirada en Carolina Herrera',
    long_description: 'Una fragancia que captura la dualidad de la mujer moderna: dulce y rebelde, inocente y seductora.',
    price: 95000,
    sale_price: 75000,
    category_id: null,
    stock: 45,
    images: ['/images/products/chica-buena.svg'],
    scent_notes: {
      top: ['Limón', 'Almendra', 'Café'],
      heart: ['Jazmín sambac', 'Tuberosa', 'Orris'],
      base: ['Tonka', 'Cacao', 'Sándalo']
    },
    tags: ['femenino', 'elegante', 'seductor', 'moderno'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Good Girl de Carolina Herrera. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-006',
    title: 'Inspirado en Coco Mademoiselle',
    visible_title: 'Coco Señorita',
    slug: 'coco-seniorita',
    short_description: 'Sofisticación parisina inspirada en Chanel',
    long_description: 'Un homenaje a la elegancia francesa. Una fragancia que define la feminidad moderna con un toque de rebeldía.',
    price: 110000,
    sale_price: 85000,
    category_id: null,
    stock: 30,
    images: ['/images/products/coco-seniorita.svg'],
    scent_notes: {
      top: ['Naranja', 'Bergamota', 'Pomelo'],
      heart: ['Rosa', 'Jazmín', 'Lichi'],
      base: ['Pachulí', 'Vetiver', 'Vainilla']
    },
    tags: ['femenino', 'elegante', 'clásico', 'sofisticado'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Coco Mademoiselle de Chanel. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-007',
    title: 'Inspirado en J\'Adore',
    visible_title: 'Yo Adoro',
    slug: 'yo-adoro',
    short_description: 'Feminidad radiante inspirada en Dior',
    long_description: 'Una oda a las flores más preciosas del mundo. Una fragancia luminosa que celebra la feminidad en su máxima expresión.',
    price: 105000,
    sale_price: 80000,
    category_id: null,
    stock: 35,
    images: ['/images/products/yo-adoro.svg'],
    scent_notes: {
      top: ['Pera', 'Melón', 'Melocotón'],
      heart: ['Freesia', 'Rosa', 'Violeta'],
      base: ['Almizcle', 'Madera de cedro', 'Pachulí']
    },
    tags: ['femenino', 'floral', 'luminoso', 'elegante'],
    is_featured: false,
    is_active: true,
    legal_note: 'Fragancia inspirada en J\'Adore de Dior. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-008',
    title: 'Inspirado en Miss Dior',
    visible_title: 'Señorita Dior',
    slug: 'seniorita-dior',
    short_description: 'Romance floral inspirado en Dior',
    long_description: 'Una declaración de amor a la vida. Una fragancia que captura la esencia de la juventud y la alegría de vivir.',
    price: 100000,
    sale_price: 78000,
    category_id: null,
    stock: 40,
    images: ['/images/products/seniorita-dior.svg'],
    scent_notes: {
      top: ['Mandarina', 'Bergamota'],
      heart: ['Rosa de Grasse', 'Peonía'],
      base: ['Almizcle', 'Pachulí']
    },
    tags: ['femenino', 'romántico', 'juvenil', 'floral'],
    is_featured: false,
    is_active: true,
    legal_note: 'Fragancia inspirada en Miss Dior de Dior. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },

  // ÁRABES
  {
    sku: 'SEV-009',
    title: 'Inspirado en Bade\'e Al Oud For Glory',
    visible_title: 'Gloria del Oud',
    slug: 'gloria-del-oud',
    short_description: 'Oud premium inspirado en Lattafa',
    long_description: 'Una experiencia olfativa oriental que transporta a los palacios árabes. Un oud de alta calidad que simboliza poder y distinción.',
    price: 130000,
    sale_price: 105000,
    category_id: null,
    stock: 20,
    images: ['/images/products/gloria-del-oud.svg'],
    scent_notes: {
      top: ['Azafrán', 'Nuez moscada'],
      heart: ['Oud', 'Rosa búlgara'],
      base: ['Ámbar', 'Almizcle', 'Sándalo']
    },
    tags: ['unisex', 'árabe', 'oud', 'premium'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Bade\'e Al Oud For Glory de Lattafa. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-010',
    title: 'Inspirado en Khamrah',
    visible_title: 'Vino Especiado',
    slug: 'vino-especiado',
    short_description: 'Fragancia especiada inspirada en Lattafa',
    long_description: 'Una composición embriagadora que evoca las noches árabes. Una mezcla exótica de especias y maderas preciosas.',
    price: 115000,
    sale_price: 90000,
    category_id: null,
    stock: 25,
    images: ['/images/products/vino-especiado.svg'],
    scent_notes: {
      top: ['Canela', 'Nuez moscada', 'Cardamomo'],
      heart: ['Dátiles', 'Praliné', 'Tuberosa'],
      base: ['Vainilla', 'Tonka', 'Benjuí']
    },
    tags: ['unisex', 'árabe', 'especiado', 'gourmand'],
    is_featured: false,
    is_active: true,
    legal_note: 'Fragancia inspirada en Khamrah de Lattafa. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },

  // COLECCIÓN
  {
    sku: 'SEV-011',
    title: 'Inspirado en Ombre Nomade',
    visible_title: 'Sombra Nómada',
    slug: 'sombra-nomada',
    short_description: 'Lujo nómada inspirado en Louis Vuitton',
    long_description: 'Una fragancia de lujo que evoca los viajes por el desierto. Una composición única que combina tradición y modernidad.',
    price: 180000,
    sale_price: 150000,
    category_id: null,
    stock: 15,
    images: ['/images/products/sombra-nomada.svg'],
    scent_notes: {
      top: ['Incienso', 'Rosa'],
      heart: ['Oud', 'Azafrán'],
      base: ['Benzoin', 'Raspberry']
    },
    tags: ['unisex', 'lujo', 'oriental', 'exclusivo'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Ombre Nomade de Louis Vuitton. No somos fabricantes ni distribuidores oficiales de la marca original.'
  },
  {
    sku: 'SEV-012',
    title: 'Inspirado en Delina',
    visible_title: 'Delina Rosa',
    slug: 'delina-rosa',
    short_description: 'Rosa de lujo inspirada en Parfums de Marly',
    long_description: 'Una interpretación moderna de la rosa clásica. Una fragancia que celebra la feminidad con un toque contemporáneo.',
    price: 160000,
    sale_price: 130000,
    category_id: null,
    stock: 18,
    images: ['/images/products/delina-rosa.svg'],
    scent_notes: {
      top: ['Lichi', 'Ruibarbo', 'Bergamota'],
      heart: ['Rosa turca', 'Peonía', 'Vainilla'],
      base: ['Almizcle', 'Cashmeran', 'Cedro']
    },
    tags: ['femenino', 'lujo', 'rosa', 'moderno'],
    is_featured: true,
    is_active: true,
    legal_note: 'Fragancia inspirada en Delina de Parfums de Marly. No somos fabricantes ni distribuidores oficiales de la marca original.'
  }
];

// Función para obtener categorías
async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error obteniendo categorías:', error);
    return null;
  }
  
  return data;
}

// Función para insertar productos
export async function seedRealProducts() {
  try {
    console.log('🌱 Iniciando inserción de productos reales...');
    
    // Obtener categorías existentes
    const categories = await getCategories();
    if (!categories) {
      throw new Error('No se pudieron obtener las categorías');
    }
    
    console.log('📂 Categorías encontradas:', categories.map(c => c.name));
    
    // Mapear categorías
    const hombreCategory = categories.find(c => c.slug === 'hombre');
    const mujerCategory = categories.find(c => c.slug === 'mujer');
    const arabesCategory = categories.find(c => c.slug === 'arabes');
    const coleccionCategory = categories.find(c => c.slug === 'coleccion');
    
    // Asignar categorías a productos
    const productsWithCategories = realProducts.map(product => {
      let category_id = null;
      
      if (product.sku.includes('SEV-001') || product.sku.includes('SEV-002') || 
          product.sku.includes('SEV-003') || product.sku.includes('SEV-004')) {
        category_id = hombreCategory?.id || null;
      } else if (product.sku.includes('SEV-005') || product.sku.includes('SEV-006') || 
                 product.sku.includes('SEV-007') || product.sku.includes('SEV-008')) {
        category_id = mujerCategory?.id || null;
      } else if (product.sku.includes('SEV-009') || product.sku.includes('SEV-010')) {
        category_id = arabesCategory?.id || null;
      } else if (product.sku.includes('SEV-011') || product.sku.includes('SEV-012')) {
        category_id = coleccionCategory?.id || null;
      }
      
      return { ...product, category_id };
    });
    
    // Insertar productos uno por uno para mejor control
    let insertedCount = 0;
    let errorCount = 0;
    
    for (const product of productsWithCategories) {
      try {
        console.log(`📦 Insertando: ${product.visible_title}...`);
        
        const { data, error } = await supabase
          .from('products')
          .insert(product)
          .select();
        
        if (error) {
          console.error(`❌ Error en ${product.visible_title}:`, error.message);
          errorCount++;
        } else {
          console.log(`✅ ${product.visible_title} insertado correctamente`);
          insertedCount++;
        }
      } catch (err) {
        console.error(`❌ Error insertando ${product.visible_title}:`, err);
        errorCount++;
      }
    }
    
    console.log('\n📊 RESUMEN:');
    console.log(`✅ Productos insertados: ${insertedCount}`);
    console.log(`❌ Errores: ${errorCount}`);
    console.log(`📝 Total procesados: ${insertedCount + errorCount}`);
    
    return {
      success: true,
      inserted: insertedCount,
      errors: errorCount,
      total: insertedCount + errorCount
    };
    
  } catch (error) {
    console.error('❌ Error general en seedRealProducts:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Función para limpiar productos existentes (usar con cuidado)
export async function clearAllProducts() {
  try {
    console.log('🗑️ Eliminando todos los productos...');
    
    const { error } = await supabase
      .from('products')
      .delete()
      .neq('id', ''); // Eliminar todos
    
    if (error) {
      console.error('❌ Error eliminando productos:', error);
      return false;
    }
    
    console.log('✅ Todos los productos eliminados');
    return true;
  } catch (error) {
    console.error('❌ Error en clearAllProducts:', error);
    return false;
  }
}

const seedRealProductsService = { seedRealProducts, clearAllProducts };

export default seedRealProductsService;