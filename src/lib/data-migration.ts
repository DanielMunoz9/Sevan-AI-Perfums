import { supabaseService } from './supabase-service-simple'
import LocalDatabase from './database'

export class DataMigration {
  
  async migrateFromLocalStorage(): Promise<{ success: boolean; message: string }> {
    try {
      const localDb = LocalDatabase.getInstance()
      
      // 1. Migrar productos
      console.log('🔄 Migrando productos...')
      const products = localDb.getProducts()
      
      for (const product of products) {
        await supabaseService.createProduct({
          name: product.name,
          visible_title: product.visible_title,
          description: product.description,
          short_description: product.short_description,
          price: product.price,
          sale_price: product.sale_price,
          image_url: product.image_url,
          images: product.images,
          stock: product.stock,
          slug: product.slug,
          is_featured: product.is_featured,
          scent_notes: product.scent_notes
        })
        
        console.log(`✅ Producto migrado: ${product.name}`)
      }
      
      // 2. Limpiar localStorage después de la migración exitosa
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sevan_products')
        localStorage.removeItem('sevan_cart')
        localStorage.removeItem('sevan_orders')
        console.log('🧹 LocalStorage limpiado')
      }
      
      return {
        success: true,
        message: `✅ Migración completada: ${products.length} productos migrados a Supabase`
      }
      
    } catch (error) {
      console.error('❌ Error en migración:', error)
      return {
        success: false,
        message: `❌ Error en migración: ${error}`
      }
    }
  }
  
  async seedInitialData(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🌱 Sembrando datos iniciales...')
      
      const initialProducts = [
        {
          name: 'Elegancia Nocturna',
          visible_title: 'Elegancia Nocturna',
          description: 'Una fragancia seductora y misteriosa perfecta para la noche. Inspirada en Black Opium de Yves Saint Laurent.',
          short_description: 'Seductora y misteriosa para la noche',
          price: 89000,
          sale_price: 69000,
          image_url: '/images/products/elegancia-nocturna.svg',
          images: ['/images/products/elegancia-nocturna.svg'],
          stock: 45,
          slug: 'elegancia-nocturna',
          is_featured: true,
          scent_notes: {
            top: ['Café', 'Pimienta Rosa'],
            heart: ['Jazmín', 'Azahar'],
            base: ['Vainilla', 'Pachulí', 'Cedro']
          }
        },
        {
          name: 'Caballero Imperial',
          visible_title: 'Caballero Imperial',
          description: 'Elegancia masculina con notas frescas y amaderadas. Inspirada en Bleu de Chanel.',
          short_description: 'Elegancia masculina fresca',
          price: 95000,
          image_url: '/images/products/caballero-imperial.svg',
          images: ['/images/products/caballero-imperial.svg'],
          stock: 32,
          slug: 'caballero-imperial',
          is_featured: true,
          scent_notes: {
            top: ['Limón', 'Menta', 'Pimienta Rosa'],
            heart: ['Jengibre', 'Jazmín', 'Iso E Super'],
            base: ['Incienso', 'Vetiver', 'Cedro', 'Sándalo']
          }
        },
        {
          name: 'Oud Supremo',
          visible_title: 'Oud Supremo',
          description: 'Una experiencia olfativa única con oud premium. Inspirada en Tom Ford Oud Wood.',
          short_description: 'Experiencia olfativa con oud premium',
          price: 120000,
          image_url: '/images/products/oud-supremo.svg',
          images: ['/images/products/oud-supremo.svg'],
          stock: 18,
          slug: 'oud-supremo',
          is_featured: false,
          scent_notes: {
            top: ['Oud', 'Bergamota'],
            heart: ['Rosa', 'Sándalo'],
            base: ['Ámbar', 'Vainilla', 'Patchouli']
          }
        },
        {
          name: 'Rosa Eterna',
          visible_title: 'Rosa Eterna',
          description: 'Feminidad elegante con notas florales sofisticadas. Inspirada en Miss Dior.',
          short_description: 'Feminidad elegante floral',
          price: 92000,
          image_url: '/images/products/rosa-eterna.svg',
          images: ['/images/products/rosa-eterna.svg'],
          stock: 28,
          slug: 'rosa-eterna',
          is_featured: false,
          scent_notes: {
            top: ['Bergamota', 'Mandarina'],
            heart: ['Rosa de Grasse', 'Peonía'],
            base: ['Almizcle', 'Patchouli']
          }
        },
        {
          name: 'Pasión Divina',
          visible_title: 'Pasión Divina',
          description: 'Fragancia sensual y envolvente. Inspirada en Good Girl de Carolina Herrera.',
          short_description: 'Sensual y envolvente',
          price: 87000,
          image_url: '/images/products/pasion-divina.svg',
          images: ['/images/products/pasion-divina.svg'],
          stock: 35,
          slug: 'pasion-divina',
          is_featured: true,
          scent_notes: {
            top: ['Almendra', 'Café'],
            heart: ['Jazmín Sambac', 'Tuberosa'],
            base: ['Cacao', 'Vainilla', 'Sándalo']
          }
        },
        {
          name: 'Fuerza Magnética',
          visible_title: 'Fuerza Magnética',
          description: 'Poder masculino con intensidad magnética. Inspirada en Sauvage de Dior.',
          short_description: 'Poder masculino intenso',
          price: 98000,
          image_url: '/images/products/fuerza-magnetica.svg',
          images: ['/images/products/fuerza-magnetica.svg'],
          stock: 25,
          slug: 'fuerza-magnetica',
          is_featured: true,
          scent_notes: {
            top: ['Bergamota', 'Pimienta Rosa'],
            heart: ['Sichuan', 'Lavanda', 'Geranio'],
            base: ['Ambroxan', 'Cedro', 'Labdanum']
          }
        }
      ]
      
      for (const product of initialProducts) {
        await supabaseService.createProduct(product)
        console.log(`✅ Producto sembrado: ${product.name}`)
      }
      
      return {
        success: true,
        message: `🌱 Datos iniciales sembrados: ${initialProducts.length} productos creados`
      }
      
    } catch (error) {
      console.error('❌ Error sembrando datos:', error)
      return {
        success: false,
        message: `❌ Error sembrando datos: ${error}`
      }
    }
  }
}

export const dataMigration = new DataMigration()