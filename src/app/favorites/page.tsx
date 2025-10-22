'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { supabaseService } from '@/lib/supabase-service-simple';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, isLoading: favoritesLoading } = useFavorites();
  const { addToCart } = useCart();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const loadFavoriteProducts = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const products = await supabaseService.getProducts();
      const favoriteItems = products.filter(product => 
        favorites.includes(product.id.toString())
      );
      setFavoriteProducts(favoriteItems);
    } catch (error) {
      console.error('Error loading favorite products:', error);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavoriteProducts();
  }, [loadFavoriteProducts]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFavorite = async (productId: string) => {
    await removeFromFavorites(productId);
  };

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  if (loading || favoritesLoading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/95 to-black pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/products">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a productos
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-gold-deep via-gold to-gold-light bg-clip-text text-transparent mb-4">
            Mis Favoritos
          </h1>
          <p className="text-gray-400 text-lg">
            {favoriteProducts.length > 0 
              ? `${favoriteProducts.length} ${favoriteProducts.length === 1 ? 'fragancia favorita' : 'fragancias favoritas'}`
              : 'Aún no tienes fragancias favoritas'
            }
          </p>
        </motion.div>

        {favoriteProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No tienes favoritos aún
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Explora nuestro catálogo y marca tus fragancias favoritas para encontrarlas fácilmente aquí.
            </p>
            <Link href="/products">
              <Button className="btn-premium">
                Explorar Fragancias
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group"
              >
                {/* Imagen del producto */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    {product.image_url && product.image_url !== '/images/placeholder-product.svg' && !imageErrors[product.id.toString()] ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={product.image_url}
                          alt={product.visible_title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          onError={() => handleImageError(product.id.toString())}
                        />
                      </div>
                    ) : (
                      <div className="text-center text-gold/60">
                        <div className="text-4xl font-serif mb-2">
                          {product.visible_title.charAt(0)}
                        </div>
                        <div className="text-xs opacity-75">SEVÁN PERFUM</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Botón remover favorito */}
                  <button
                    onClick={() => handleRemoveFavorite(product.id.toString())}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Información del producto */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {product.visible_title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gold">
                        {formatPrice(product.sale_price || product.price)}
                      </span>
                      {product.sale_price && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      Stock: {product.stock || 0}
                    </span>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2 pt-4">
                    <Link 
                      href={`/product/${product.slug || product.id}`}
                      className="flex-1"
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-gold/30 text-gold hover:bg-gold/10"
                      >
                        Ver Detalles
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-gold text-black hover:bg-gold-light"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}