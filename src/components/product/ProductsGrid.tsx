'use client';

import { useEffect, useMemo, useState } from 'react';
import { Grid, List, Search } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { supabaseService, normalizePriceValue } from '@/lib/supabase-service-simple';
import { getKitPriceForReference, getKitImagePath } from '@/utils/kitCatalog';
import { DEFAULT_FILTERS, PRICE_RANGES, ProductFiltersState } from '@/components/product/ProductFilters';

type SortOption = 'price-low' | 'price-high' | 'name' | 'newest';

type FeaturedCategory = 'coleccion' | 'mujer' | 'hombre' | 'arabe' | 'kit';

const FEATURED_CATEGORY_KEYWORDS: Record<FeaturedCategory, string[]> = {
  hombre: [
    "Inspirado en Blue Seduction For Men (Antonio Banderas)",
    "Inspirado en Caja (Jean Pascal)",
    "Inspirado en Cuero (Jean Pascal)",
    "Inspirado en BOSS Bottled (Hugo Boss)",
    "Inspirado en BOSS Bottled Night (Hugo Boss)",
    "Inspirado en BOSS Bottled Unlimited (Hugo Boss)",
    "Inspirado en In Motion (Hugo Boss)",
    "Inspirado en Hugo Red (Hugo Boss)",
    "Inspirado en Hugo Man (Hugo Boss)",
    "Inspirado en The Scent (Hugo Boss)",
    "Inspirado en 212 Men (Carolina Herrera)",
    "Inspirado en 212 Sexy Men (Carolina Herrera)",
    "Inspirado en Dark Blue (Hugo Boss)",
    "Inspirado en Aqva (Bvlgari)",
    "Inspirado en 212 VIP Men (Carolina Herrera)",
    "Inspirado en BLV Men (Bvlgari)",
    "Inspirado en 212 VIP Wild Party (Carolina Herrera)",
    "Inspirado en 212 Heroes (Carolina Herrera)",
    "Inspirado en Bad Boy (Carolina Herrera)",
    "Inspirado en 212 VIP Black Red (Carolina Herrera)",
    "Inspirado en 212 VIP Wins (Carolina Herrera)",
    "Inspirado en Ck One (Calvin Klein)",
    "Inspirado en Ck In 2U (Calvin Klein)",
    "Inspirado en Euphoria Men (Calvin Klein)",
    "Inspirado en Eternity (Calvin Klein)",
    "Inspirado en Blue Label (Givenchy)",
    "Inspirado en Silver Mountain (Creed)",
    "Inspirado en Sauvage (Dior)",
    "Inspirado en Aventus (Creed)",
    "Inspirado en Fahrenheit (Dior)",
    "Inspirado en Sauvage Elixir (Dior)",
    "Inspirado en The One (Dolce & Gabbana)",
    "Inspirado en Light Blue (Dolce & Gabbana)",
    "Inspirado en K (Dolce & Gabbana)",
    "Inspirado en Scandal (Jean Paul Gaultier)",
    "Inspirado en Le Male (Jean Paul Gaultier)",
    "Inspirado en Ultra Male (Jean Paul Gaultier)",
    "Inspirado en Elixir (Jean Paul Gaultier)",
    "Inspirado en L12 12 Noir (Lacoste)",
    "Inspirado en L12 12 Vert (Lacoste)",
    "Inspirado en L12 12 Rouge (Lacoste)",
    "Inspirado en Le Beau Parfum (Jean Paul Gaultier)",
    "Inspirado en Le Beau (Jean Paul Gaultier)",
    "Inspirado en L12 12 Blue (Lacoste)",
    "Inspirado en L12 12 Blanc (Lacoste)",
    "Inspirado en One Million (Paco Rabanne)",
    "Inspirado en Essential (Lacoste)",
    "Inspirado en Red (Lacoste)",
    "Inspirado en One Million Lucky (Paco Rabanne)",
    "Inspirado en One Million Prive (Paco Rabanne)",
    "Inspirado en Invictus (Paco Rabanne)",
    "Inspirado en Invictus Legend (Paco Rabanne)",
    "Inspirado en Invictus Victory (Paco Rabanne)",
    "Inspirado en Invictus Victory Elixir (Paco Rabanne)",
    "Inspirado en Invictus Onix (Paco Rabanne)",
    "Inspirado en Invictus Parfum (Paco Rabanne)",
    "Inspirado en Phantom (Paco Rabanne)",
    "Inspirado en Black XS (Paco Rabanne)",
    "Inspirado en Black XS L'Excess (Paco Rabanne)",
    "Inspirado en Bleu De Chanel (Chanel)",
    "Inspirado en Allure Homme Sport (Chanel)",
    "Inspirado en Polo Red (Ralph Lauren)",
    "Inspirado en Emblem (Mont Blanc)",
    "Inspirado en Issey Miyake Men (Issey Miyake)",
    "Inspirado en 360 Men (Perry Ellis)",
    "Inspirado en 360 Red Men (Perry Ellis)",
    "Inspirado en Swiss Army (Victorinox)",
    "Inspirado en Polo Blue (Ralph Lauren)",
    "Inspirado en Polo Black (Ralph Lauren)",
    "Inspirado en Legend (Mont Blanc)",
    "Inspirado en Acqua Di Gio (Giorgio Armani)",
    "Inspirado en Happy (Clinique)",
    "Inspirado en Toy Boy (Moschino)",
    "Inspirado en Paris Men (Paris Hilton)",
    "Inspirado en Voyage (Nautica)",
    "Inspirado en Acqua Di Gio Profumo (Giorgio Armani)",
    "Inspirado en Acqua Di Gio Profondo (Giorgio Armani)",
    "Inspirado en Stronger With You (Emporio Armani)",
    "Inspirado en Uomo (Valentino)",
    "Inspirado en Born In Roma Men (Valentino)",
    "Inspirado en Tommy Men (Tommy Hilfiger)",
    "Inspirado en Only The Brave Tattoo (Diesel)",
    "Inspirado en Santal 33 (Le Labo)",
    "Inspirado en Only The Brave (Diesel)",
    "Inspirado en Uomo Intense (Valentino)",
    "Inspirado en Eros Energy (Versace)",
    "Inspirado en Eros (Versace)",
    "Inspirado en Eros Flame (Versace)"
  ],
  mujer: [
    "Inspirado en Burberry Her Elixir (Burberry)",
    "Inspirado en Sweet Like Candy (Ariana Grande)",
    "Inspirado en Burberry Women (Burberry)",
    "Inspirado en Thank U Next (Ariana Grande)",
    "Inspirado en Cloud (Ariana Grande)",
    "Inspirado en Cloud Pink (Ariana Grande)",
    "Inspirado en Burberry Her (Burberry)",
    "Inspirado en Omnia Crystaline 65ML (Bvlgari)",
    "Inspirado en Omnia Amethyste 65ML (Bvlgari)",
    "Inspirado en Omnia Coral 65ML (Bvlgari)",
    "Inspirado en Omnia Paraiba 65ML (Bvlgari)",
    "Inspirado en Omnia Coral 100ML (Bvlgari)",
    "Inspirado en Omnia Crystaline 100ML (Bvlgari)",
    "Inspirado en Omnia Amethyste 100ML (Bvlgari)",
    "Inspirado en Good Girl Fantastic Pink (Carolina Herrera)",
    "Inspirado en Good Girl (Carolina Herrera)",
    "Inspirado en Very Good Girl (Carolina Herrera)",
    "Inspirado en Good Girl Blush (Carolina Herrera)",
    "Inspirado en 212 Heroes (Carolina Herrera)",
    "Inspirado en 212 VIP Rosé (Carolina Herrera)",
    "Inspirado en 212 Sexy (Carolina Herrera)",
    "Inspirado en 212 Wild Party (Carolina Herrera)",
    "Inspirado en 212 VIP Wins (Carolina Herrera)",
    "Inspirado en 212 NYC (Carolina Herrera)",
    "Inspirado en CH (Carolina Herrera)",
    "Inspirado en Coco Mademoiselle (Chanel)",
    "Inspirado en Coco Nº5 (Chanel)",
    "Inspirado en Ck IN2U (Calvin Klein)",
    "Inspirado en J'Adore (Dior)",
    "Inspirado en Pony 2 (Ralph Lauren)",
    "Inspirado en Escape (Calvin Klein)",
    "Inspirado en Euphoria (Calvin Klein)",
    "Inspirado en Miss Dior (Dior)",
    "Inspirado en The One (Dolce & Gabbana)",
    "Inspirado en Light Blue (Dolce & Gabbana)",
    "Inspirado en Chance (Chanel)",
    "Inspirado en Baccarat 540 (Baccarat)",
    "Inspirado en Touch Of Pink (Lacoste)",
    "Inspirado en Meow (Katy Perry)",
    "Inspirado en Ralph (Ralph Lauren)",
    "Inspirado en Baccarat Rouge 540 (Baccarat)",
    "Inspirado en Si (Giorgio Armani)",
    "Inspirado en Sparkling (Lacoste)",
    "Inspirado en Natural (Lacoste)",
    "Inspirado en Elegant (Lacoste)",
    "Inspirado en Bright Crystal (Versace)",
    "Inspirado en Olympea (Paco Rabanne)",
    "Inspirado en Can Can (Paris Hilton)",
    "Inspirado en Dazzle (Paris Hilton)",
    "Inspirado en Heiress (Paris Hilton)",
    "Inspirado en Paris Hilton (Paris Hilton)",
    "Inspirado en Lady Million (Paco Rabanne)",
    "Inspirado en Fame (Paco Rabanne)",
    "Inspirado en Pure XS (Paco Rabanne)",
    "Inspirado en Yellow Diamond (Versace)",
    "Inspirado en Dylan Blue (Versace)",
    "Inspirado en Ange Ou Demon (Givenchy)",
    "Inspirado en Halloween (Jesus Del Pozo)",
    "Inspirado en Clinique Happy (Clinique)",
    "Inspirado en Born In Roma (Valentino)",
    "Inspirado en Donna (Valentino)",
    "Inspirado en 360 Red (Perry Ellis)",
    "Inspirado en 360 Coral (Perry Ellis)",
    "Inspirado en Jlo Live (Jennifer Lopez)",
    "Inspirado en Tommy Girl (Tommy Hilfiger)",
    "Inspirado en Flower (Kenzo)",
    "Inspirado en The Scent (Hugo Boss)",
    "Inspirado en La Vie Est Belle (Lancome)",
    "Inspirado en Scandal Caja (Jean Paul Gaultier)",
    "Inspirado en Issey Miyake Women (Issey Miyake)",
    "Inspirado en Fantasy (Britney Spears)",
    "Inspirado en Scandal Lata (Jean Paul Gaultier)",
    "Inspirado en 360 (Perry Ellis)",
    "Inspirado en Toy 2 (Moschino)",
    "Inspirado en Bubble Gum (Moschino)",
    "Inspirado en Toy 2 Pearl (Moschino)",
    "Inspirado en Fresh (Moschino)",
    "Inspirado en Funny (Moschino)"
  ],
  arabe: [
    "Inspirado en Amber Rouge (Orientica)",
    "Inspirado en Bade'e Al Oud For Glory (Lattafa)",
    "Inspirado en Royal Amber (Orientica)",
    "Inspirado en Oud Saffron (Orientica)",
    "Inspirado en Amber Noir (Orientica)",
    "Inspirado en Velvet Gold (Orientica)",
    "Inspirado en Bade'e Al Oud Sublime (Lattafa)",
    "Inspirado en Honor & Glory (Lattafa)",
    "Inspirado en Bade'e Al Oud Amethyst (Lattafa)",
    "Inspirado en Maahir (Lattafa)",
    "Inspirado en 9PM (Afnan)",
    "Inspirado en 9AM Rebel (Afnan)",
    "Inspirado en Yara (Lattafa)",
    "Inspirado en Yara Tous (Lattafa)",
    "Inspirado en Yara Candy (Lattafa)",
    "Inspirado en Asad (Lattafa)",
    "Inspirado en Khamrah (Lattafa)",
    "Inspirado en Khamrah Qahwa (Lattafa)",
    "Inspirado en Shaheen (Lattafa)",
    "Inspirado en Love Affection (Lattafa)",
    "Inspirado en Art Of Universe (Lattafa)",
    "Inspirado en Mayar (Lattafa)",
    "Inspirado en Amber Oud Dubai Night (Al Haramain)",
    "Inspirado en Amber Oud Rouge (Al Haramain)",
    "Inspirado en Amber Oud Gold (Al Haramain)",
    "Inspirado en Club De Nuit Mujer (Armaf)",
    "Inspirado en Club De Nuit Intense Hombre (Armaf)",
    "Inspirado en King Hombre (Bharara)",
    "Inspirado en Rosé Mujer (Bharara)",
    "Inspirado en King Parfum Hombre (Bharara)",
    "Inspirado en Viking Dubai Hombre (Bharara)",
    "Inspirado en Viking Cairo Hombre (Bharara)"
  ],
  coleccion: [
    "Inspirado en Ombre Nomade (Louis Vuitton)",
    "Inspirado en Starry Night (Montale Paris)",
    "Inspirado en IL Kakuno (Ilmin)",
    "Inspirado en IL Roso (Ilmin)",
    "Inspirado en IL Femme (Ilmin)",
    "Inspirado en Bombshell (Victoria's Secret)",
    "Inspirado en Delina (Parfums De Marly)",
    "Inspirado en Blecker (Bond NYC No.9)",
    "Inspirado en Odyssey Mega (Armaf)",
    "Inspirado en Yum Yum (Armaf)",
    "Inspirado en Montale Paris (Montale)"
  ],
  kit: []
};

interface ProductsGridProps {
  filters?: ProductFiltersState;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  activeCategory?: FeaturedCategory;
}

export default function ProductsGrid({ filters, searchQuery, onSearchQueryChange, activeCategory = 'coleccion' }: ProductsGridProps) {
  const safeSearchQuery = searchQuery ?? '';
  const resolvedFilters = filters ?? DEFAULT_FILTERS;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('price-high');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Cargando productos desde Supabase...');
      
      const productsFromDB = await supabaseService.getProducts();
      
          if (productsFromDB.length > 0) {
        setProducts(productsFromDB);
        console.log(`✅ ${productsFromDB.length} productos cargados desde Supabase`);
      } else {
        console.log('ℹ️ No hay productos en Supabase, cargando desde catálogo oficial');
        // Cargar productos del catálogo oficial como respaldo
        try {
          const response = await fetch('/productos-completos.json');
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const catalogoOficial = await response.json();          // Convertir productos del catálogo oficial al formato esperado
          const productosFormateados = catalogoOficial.map((p: any) => {
            const overridePrice = getKitPriceForReference(p.visible_title, p.title);
            const normalizedOverride = overridePrice != null ? normalizePriceValue(overridePrice) : undefined;
            const basePrice = normalizedOverride ?? normalizePriceValue(p.price);
            const salePrice = normalizedOverride
              ? undefined
              : (() => {
                  const value = normalizePriceValue(p.sale_price);
                  return value > 0 ? value : undefined;
                })();
            const kitImage = getKitImagePath(p.visible_title || p.title);

            return {
              id: p.id,
              name: p.title,
              visible_title: p.visible_title || p.title,
              title: p.title,
              description: p.description,
              short_description: p.description?.substring(0, 50) + '...',
              price: basePrice,
              sale_price: salePrice,
              image_url: kitImage || p.image_url || '/images/default-perfume.jpg',
              images: (() => {
              const fallbackImage = p.image_url || '/images/default-perfume.jpg';
                if (kitImage) {
                  const existing = new Set(p.images || []);
                  existing.delete(kitImage);
                  const rest = existing.size ? Array.from(existing) : [fallbackImage];
                  return [kitImage, ...rest];
                }
                return p.images || [fallbackImage];
              })(),
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
            is_featured: p.is_featured || false,
            is_active: p.is_active || true,
            avg_rating: 4.8,
            review_count: Math.floor(Math.random() * 100) + 20,
            sales: Math.floor(Math.random() * 200) + 50,
            legal_note: 'Fragancia inspirada artesanal. No somos afiliados ni revendedores oficiales de la marca original.'
            };
          });

          setProducts(productosFormateados);
          console.log(`✅ ${productosFormateados.length} productos cargados desde catálogo oficial`);
        } catch (catalogError) {
          console.error('❌ Error cargando catálogo oficial:', catalogError);
          // Mostrar productos de ejemplo mínimos si todo falla
          setProducts([{
            id: 'fallback-1',
            name: 'Fragancia de Ejemplo',
            visible_title: 'Fragancia de Ejemplo',
            description: 'Producto de prueba mientras se cargan los datos',
            price: 89900,
            image_url: '/images/default-perfume.jpg',
            images: ['/images/default-perfume.jpg'],
            brand: 'SEVÁN PERFUM',
            category: 'General',
            created_at: new Date().toISOString(),
            scent_family: 'Oriental',
            scent_notes: { top: [], middle: [], base: [] },
            genre: 'Unisex',
            concentration: '18%',
            stock: 0,
            slug: 'fragancia-ejemplo',
            is_featured: false,
            is_active: true,
            avg_rating: 4.5,
            review_count: 0,
            sales: 0,
            title: 'Fragancia de Ejemplo',
            short_description: 'Producto de prueba',
            sku: 'DEMO-001'
          }]);
        }
      }
    } catch (error) {
      console.error('❌ Error cargando productos:', error);
      // Mostrar mensaje de error amigable
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: { message: 'Error al cargar productos. Intenta recargar la página.', type: 'error' }
      }));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: Product) => {
    console.log('Adding to cart:', product.name);
  };

  const priceRange = useMemo(
    () =>
      resolvedFilters.priceRangeId
        ? PRICE_RANGES.find((range) => range.id === resolvedFilters.priceRangeId) ?? null
        : null,
    [resolvedFilters.priceRangeId]
  );

  const normalize = (value?: string | null) =>
    (value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const categoryOrder = useMemo(
    () =>
      (FEATURED_CATEGORY_KEYWORDS[activeCategory] ?? []).map((keyword) => ({
        raw: keyword,
        normalized: normalize(keyword)
      })),
    [activeCategory]
  );

  const matchesFeaturedCategory = (product: Product): boolean => {
    if (activeCategory === 'coleccion') {
      return true;
    }

    const normalizedValues = [
      normalize(product.visible_title || product.title),
      normalize(product.name),
      normalize(product.inspiration),
      normalize(product.inspiration_brand),
      normalize(product.category),
      normalize(product.genre),
      normalize(String(product.slug ?? '')),
      ...((product.tags ?? []).map((tag) => normalize(tag)))
    ].filter(Boolean);

    if (categoryOrder.length > 0) {
      const matchesCuratedList = categoryOrder.some(({ normalized }) =>
        normalizedValues.some((value) => value.includes(normalized))
      );

      if (matchesCuratedList) {
        return true;
      }
    }

    switch (activeCategory) {
      case 'mujer':
        return normalizedValues.some((value) =>
          value.includes('mujer') || value.includes('femenin') || value.includes('dama')
        );
      case 'hombre':
        return normalizedValues.some((value) =>
          value.includes('hombre') || value.includes('masculin') || value.includes('caballer')
        );
      case 'arabe':
        return normalizedValues.some((value) =>
          value.includes('arab') || value.includes('oud') || value.includes('oriental')
        );
      case 'kit':
        return normalizedValues.some((value) =>
          value.includes('kit') || value.includes('emprend') || value.includes('coleccion')
        );
      default:
        return true;
    }
  };

  const getCategoryRank = (product: Product): number => {
    if (categoryOrder.length === 0) {
      return Number.POSITIVE_INFINITY;
    }

    const comparisonValues = [
      normalize(product.visible_title || product.title),
      normalize(product.name),
      normalize(product.inspiration),
      normalize(product.inspiration_brand),
      normalize(product.category),
      normalize(product.genre),
      normalize(String(product.slug ?? '')),
      ...((product.tags ?? []).map((tag) => normalize(tag)))
    ].filter(Boolean);

    for (let index = 0; index < categoryOrder.length; index += 1) {
      const keyword = categoryOrder[index].normalized;
      if (comparisonValues.some((value) => value.includes(keyword))) {
        return index;
      }
    }

    return Number.POSITIVE_INFINITY;
  };

  const filteredProducts = products.filter((product) => {
    const normalizedQuery = normalize(safeSearchQuery.trim());
    if (normalizedQuery) {
      const searchFields: Array<string | undefined | null> = [
        product.visible_title,
        product.name,
        product.title,
        product.description,
        product.short_description,
        product.brand,
        product.inspiration,
        product.inspiration_brand,
        product.genre,
        product.category,
        typeof product.slug === 'string' ? product.slug : undefined,
      ];

      if (Array.isArray(product.tags)) {
        searchFields.push(...product.tags);
      }

      if (product.scent_notes) {
        if (Array.isArray(product.scent_notes)) {
          searchFields.push(...product.scent_notes);
        } else {
          searchFields.push(...Object.values(product.scent_notes).flat());
        }
      }

      const matchesQuery = searchFields
        .filter(Boolean)
        .map((value) => normalize(String(value)))
        .some((value) => value.includes(normalizedQuery));

      if (!matchesQuery) {
        return false;
      }
    }

    if (resolvedFilters.category !== 'Todos') {
      const genre = (product.genre || product.category || '').toLowerCase();
      const matchesCategory =
        resolvedFilters.category === 'Masculino'
          ? genre.includes('mas') || genre.includes('hom')
          : resolvedFilters.category === 'Femenino'
            ? genre.includes('fem') || genre.includes('muj')
            : resolvedFilters.category === 'Unisex'
              ? genre.includes('uni')
              : true;

      if (!matchesCategory) {
        return false;
      }
    }

    if (resolvedFilters.brands.length > 0) {
      const brandHaystack = [(product.brand || ''), (product.inspiration_brand || ''), (product.inspiration || '')]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesBrand = resolvedFilters.brands.some((brand) => brandHaystack.includes(brand.toLowerCase()));

      if (!matchesBrand) {
        return false;
      }
    }

    if (resolvedFilters.scentFamilies.length > 0) {
      const notes = (() => {
        if (!product.scent_notes) return [] as string[];
        if (Array.isArray(product.scent_notes)) return product.scent_notes as string[];
        return Object.values(product.scent_notes)
          .flat()
          .filter(Boolean) as string[];
      })()
        .map((note) => (note || '').toLowerCase());

      const scentFamilyHaystack = [product.scent_family || '', ...notes].map((item) => item.toLowerCase());
      const matchesScent = resolvedFilters.scentFamilies.some((family) =>
        scentFamilyHaystack.some((item) => item.includes(family.toLowerCase()))
      );

      if (!matchesScent) {
        return false;
      }
    }

  if (priceRange) {
      const finalPrice = typeof product.sale_price === 'number' ? product.sale_price : product.price;

      if (typeof finalPrice !== 'number') {
        return false;
      }

      if (finalPrice < priceRange.min) {
        return false;
      }

      if (priceRange.max && finalPrice > priceRange.max) {
        return false;
      }
    }

    return matchesFeaturedCategory(product);
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (categoryOrder.length > 0) {
      const rankA = getCategoryRank(a);
      const rankB = getCategoryRank(b);

      if (rankA !== rankB) {
        return rankA - rankB;
      }
    }

    switch (sortBy) {
      case 'price-low':
        return (a.sale_price || a.price) - (b.sale_price || b.price);
      case 'price-high':
        return (b.sale_price || b.price) - (a.sale_price || a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-700 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">
            {sortedProducts.length} Productos Encontrados
          </h2>
          <p className="text-gray-400">
            Descubre nuestra colección completa de fragancias inspiradas
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={safeSearchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900/70 pl-10 pr-4 py-2 text-white placeholder-gray-400 shadow-sm transition focus:border-gold focus:bg-black/60 focus:outline-none sm:w-72"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-gray-700 bg-gray-900/70 px-4 py-2 text-white shadow-sm transition focus:border-gold focus:bg-black/60 focus:outline-none"
          >
            <option value="newest">Más recientes</option>
            <option value="name">Nombre A-Z</option>
            <option value="price-low">Precio menor</option>
            <option value="price-high">Precio mayor</option>
          </select>

          <div className="flex overflow-hidden rounded-lg border border-gray-700 bg-gray-900/70">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition ${
                viewMode === 'grid'
                  ? 'bg-gold text-black'
                  : 'text-gray-400 hover:bg-black/40 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition ${
                viewMode === 'list'
                  ? 'bg-gold text-black'
                  : 'text-gray-400 hover:bg-black/40 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid w-full gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col gap-6'
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={viewMode === 'list' ? 'minimal' : 'default'}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-800/50 rounded-lg p-8 max-w-md mx-auto">
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-400 mb-6">
              Intenta con diferentes términos de búsqueda
            </p>
            <Button
              onClick={() => onSearchQueryChange('')}
              variant="outline"
              className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
            >
              Limpiar búsqueda
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
