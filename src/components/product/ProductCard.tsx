'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star, Sparkles } from 'lucide-react';

import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import getProductImageUrl from '@/utils/imageMapper';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'minimal';
  showQuickView?: boolean;
  showWishlist?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
}

const MOBILE_LEGAL_NOTE = 'Fragancia inspirada. No somos la marca original.';

export function ProductCard({
  product,
  variant = 'default',
  showQuickView = true,
  showWishlist = true,
  onAddToCart,
  onQuickView,
  onWishlist
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const displayImage = useMemo(() => {
    const source = getProductImageUrl(product);
    if (!source || source === '/images/placeholder-product.svg') {
      return '/images/placeholder-product.svg';
    }
    return source;
  }, [product]);

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.sale_price ?? product.price)) / product.price) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(product, 1);
      onAddToCart?.(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (size = 'w-4 h-4') => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${size} ${index < Math.floor(product.avg_rating || 4.5) ? 'fill-gold text-gold' : 'text-gold/30'}`}
        />
      ))}
    </div>
  );

  const cardClasses = [
    'group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/55 shadow-lg transition-all duration-300',
    variant === 'featured' ? 'lg:col-span-2 lg:row-span-2' : '',
    variant === 'minimal' ? 'border-white/5 bg-black/20' : 'hover:border-gold/40 hover:shadow-gold/10'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cardClasses}
    >
      <div className={`relative w-full overflow-hidden bg-black/10 ${variant === 'featured' ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <Link href={`/product/${product.slug || product.id}`} className="block h-full w-full">
          <Image
            src={imageError ? '/images/placeholder-product.svg' : displayImage}
            alt={product.visible_title || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            onError={() => setImageError(true)}
            priority={variant === 'featured'}
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.is_featured && (
            <Badge variant="bestseller" className="px-2 py-1 text-[11px]">
              <Sparkles className="mr-1 h-3 w-3" /> Destacado
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="limited" className="px-2 py-1 text-[11px]">-{discountPercent}%</Badge>
          )}
          {product.stock === 0 && <Badge variant="secondary" className="px-2 py-1 text-[11px]">Agotado</Badge>}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
          {showWishlist && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={isFavorite(product.id.toString()) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className={`h-8 w-8 rounded-full border border-white/20 bg-black/60 text-gold transition hover:border-gold/50 hover:bg-black/70 ${
                isFavorite(product.id.toString()) ? 'text-gold' : 'text-gold-soft'
              }`}
              onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (onWishlist) {
                  onWishlist(product);
                  return;
                }
                await toggleFavorite(product.id.toString());
              }}
            >
              <Heart className={`h-4 w-4 ${isFavorite(product.id.toString()) ? 'fill-gold' : ''}`} />
            </Button>
          )}

          {showQuickView && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-white/20 bg-black/60 text-white transition hover:border-gold/40 hover:text-gold"
              onClick={(event) => {
                event.preventDefault();
                onQuickView?.(product);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className={`flex flex-1 flex-col gap-4 ${variant === 'minimal' ? 'p-4' : 'p-5'}`}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-soft">Seván Perfum</span>

        <Link href={`/product/${product.slug || product.id}`} className="block">
          <h3 className="line-clamp-2 text-lg font-semibold text-white transition hover:text-gold">
            {product.visible_title}
          </h3>
        </Link>

        {product.short_description && variant !== 'minimal' && (
          <p className="line-clamp-2 text-sm text-gray-400">{product.short_description}</p>
        )}

        {variant !== 'minimal' && (
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2 text-gold-soft">
              {renderStars('w-4 h-4')}
            </div>
            <span>{(product.review_count || 0).toLocaleString()} reseñas</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`font-semibold text-gold ${variant === 'featured' ? 'text-2xl' : 'text-xl'}`}>
              {formatPrice(product.sale_price ?? product.price)}
            </span>
            {hasDiscount && <span className="text-xs text-gray-500 line-through">{formatPrice(product.price)}</span>}
          </div>
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
          </span>
        </div>

        {variant === 'featured' && typeof product.scent_notes === 'object' && !Array.isArray(product.scent_notes) && product.scent_notes?.top && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
            {product.scent_notes.top.slice(0, 4).map((note) => (
              <span key={note} className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-gold">
                {note}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2.5">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || product.stock === 0}
            loading={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-deep to-gold text-black transition hover:from-gold hover:to-gold-soft disabled:opacity-60"
          >
            <ShoppingCart className="h-4 w-4" />
            {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
          </Button>



          {variant !== 'minimal' && (
            <Link href={`/product/${product.slug || product.id}`}>
              <Button
                variant="outline"
                className="w-full rounded-2xl border-gold/30 text-gold-soft transition hover:border-gold hover:bg-gold hover:text-black"
              >
                Ver detalles
              </Button>
            </Link>
          )}
        </div>

        <p className="text-[9px] leading-relaxed text-gray-500 sm:text-[10px]">
          {product.legal_note || MOBILE_LEGAL_NOTE}
        </p>
      </div>
    </motion.article>
  );
}

export default ProductCard;