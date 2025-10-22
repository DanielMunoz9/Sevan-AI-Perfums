'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { supabaseService } from '@/lib/supabase-service-simple';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Cargando productos destacados desde Supabase...');

      // Usar Supabase para obtener productos destacados
      const featuredProducts = await supabaseService.getFeaturedProducts();
      
      if (featuredProducts.length > 0) {
        setProducts(featuredProducts.slice(0, 4)); // Máximo 4 productos destacados
        console.log(`✅ ${featuredProducts.length} productos destacados cargados desde Supabase`);
      } else {
        console.log('ℹ️ No hay productos destacados en Supabase, cargando desde archivo oficial');
        // Cargar productos del catálogo oficial como respaldo
        try {
          const response = await fetch('/productos-completos.json');
          const catalogoOficial = await response.json();
          
          // Filtrar solo productos destacados del catálogo oficial
          const productosDestacados = catalogoOficial
            .filter((p: any) => p.is_featured)
            .slice(0, 4)
            .map((p: any) => ({
              id: p.id,
              name: p.title,
              visible_title: p.visible_title || p.title,
              description: p.description,
              short_description: p.description?.substring(0, 50) + '...',
              price: p.price,
              sale_price: p.sale_price,
              image_url: p.image_url || '/images/default-perfume.jpg',
              images: p.images || [p.image_url || '/images/default-perfume.jpg'],
              brand: 'SEVÁN PERFUM',
              category: p.category,
              created_at: new Date().toISOString(),
              scent_family: 'Oriental',
              scent_notes: {
                top: ['Notas Cítricas'],
                middle: ['Corazón Floral'],
                base: ['Base Amaderada']
              },
              genre: p.category === 'hombre' ? 'Masculino' : p.category === 'mujer' ? 'Femenino' : 'Unisex',
              concentration: '18%',
              stock: p.stock || 100,
              slug: p.slug || p.id,
              is_featured: true,
              avg_rating: 4.8,
              review_count: Math.floor(Math.random() * 100) + 20,
              sales: Math.floor(Math.random() * 200) + 50
            }));

          if (productosDestacados.length > 0) {
            setProducts(productosDestacados);
            console.log(`✅ ${productosDestacados.length} productos destacados cargados desde catálogo oficial`);
          } else {
            // Si no hay productos destacados, usar los primeros 4 del catálogo
            const primerosCuatro = catalogoOficial.slice(0, 4).map((p: any) => ({
              id: p.id,
              name: p.title,
              visible_title: p.visible_title || p.title,
              description: p.description,
              short_description: p.description?.substring(0, 50) + '...',
              price: p.price,
              sale_price: p.sale_price,
              image_url: p.image_url || '/images/default-perfume.jpg',
              images: p.images || [p.image_url || '/images/default-perfume.jpg'],
              brand: 'SEVÁN PERFUM',
              category: p.category,
              created_at: new Date().toISOString(),
              scent_family: 'Oriental',
              scent_notes: {
                top: ['Notas Cítricas'],
                middle: ['Corazón Floral'],
                base: ['Base Amaderada']
              },
              genre: p.category === 'hombre' ? 'Masculino' : p.category === 'mujer' ? 'Femenino' : 'Unisex',
              concentration: '18%',
              stock: p.stock || 100,
              slug: p.slug || p.id,
              is_featured: false,
              avg_rating: 4.8,
              review_count: Math.floor(Math.random() * 100) + 20,
              sales: Math.floor(Math.random() * 200) + 50
            }));
            setProducts(primerosCuatro);
            console.log(`✅ ${primerosCuatro.length} primeros productos cargados desde catálogo oficial`);
          }
        } catch (catalogError) {
          console.error('❌ Error cargando catálogo oficial:', catalogError);
          setProducts([]);
        }
      }
    } catch (err) {
      console.error('❌ Error cargando productos:', err);
      setError('Error cargando productos desde Supabase');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/95 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando productos destacados...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/95 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={loadFeaturedProducts} variant="outline">
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(i) * 60}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-gold-soft text-sm font-semibold tracking-wide">
              PRODUCTOS DESTACADOS
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">
            <span className="bg-gradient-to-r from-gold-deep/90 via-gold/95 to-gold-light/90 bg-clip-text text-transparent">
              Fragancias Selectas
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra selección exclusiva de 
            <span className="text-gold font-medium"> fragancias inspiradas</span>, 
            creadas con la más alta calidad y concentración del mercado.
          </p>
        </motion.div>

        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No hay productos destacados disponibles</p>
            <Button onClick={loadFeaturedProducts} variant="outline">
              Recargar productos
            </Button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gold/5 to-transparent p-8 rounded-3xl border border-gold/20 backdrop-blur-sm">
            <h3 className="text-2xl font-serif font-light text-white mb-4">
              ¿Buscas algo específico?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explora toda nuestra colección de fragancias inspiradas en las mejores casas de perfumería del mundo.
            </p>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/products">
                <Button className="bg-gradient-to-r from-gold-deep to-gold text-black px-8 py-3 text-lg group">
                  Ver Toda la Colección
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}