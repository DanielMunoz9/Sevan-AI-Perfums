'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingCart, Sparkles, ShieldCheck, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import FloatingChat from "@/components/ui/FloatingChat";
import GenericPerfumeOffer from "@/components/product/GenericPerfumeOffer";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { supabaseService } from "@/lib/supabase-service-simple";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import getProductImageUrl, { getProductImageGallery } from "@/utils/imageMapper";

const FALLBACK_IMAGE = "/images/default-perfume.jpg";
const WHATSAPP_NUMBER = "573193605666";
const PAYMENT_PARTNERS = [
  { src: "/images/payments/nequi.svg", alt: "Nequi" },
  { src: "/images/payments/daviplata.svg", alt: "Daviplata" },
  { src: "/images/payments/mercadopago.svg", alt: "Mercado Pago" },
  { src: "/images/payments/visa.svg", alt: "Visa" },
  { src: "/images/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/images/payments/bbva.svg", alt: "BBVA" },
];

// Hook para scroll automático al top cuando se carga el producto
const useScrollToTop = () => {
  useEffect(() => {
    // Scroll inmediato al top con comportamiento suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // También desplazarse después de un pequeño delay para asegurar que el DOM esté listo
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    
    return () => clearTimeout(scrollTimer);
  }, []);
};

const ensureGallery = (product: Product | null): string[] => {
  if (!product) {
    return [FALLBACK_IMAGE];
  }

  const gallery = getProductImageGallery(product).filter(Boolean);
  if (gallery.length > 0) {
    return gallery;
  }

  const primary = getProductImageUrl(product);
  return primary ? [primary] : [FALLBACK_IMAGE];
};

const normalizeExternalProduct = (candidate: unknown, fallbackCategory: string): Product | null => {
  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const record = candidate as Record<string, unknown>;
  const baseTitle = (record.visible_title || record.title || record.name) as string | undefined;

  if (!baseTitle) {
    return null;
  }

  const priceValue = typeof record.price === "number" ? record.price : Number(record.price ?? 0);
  const slug = typeof record.slug === "string" ? record.slug : baseTitle.toLowerCase().replace(/\s+/g, "-");
  const gallery = Array.isArray(record.images) ? (record.images as string[]).filter(Boolean) : [];
  const imageUrl = typeof record.image_url === "string" ? record.image_url : gallery[0];

  const canonicalId =
    typeof record.id === "string" || typeof record.id === "number"
      ? record.id
      : slug;

  return {
    id: canonicalId,
    sku: typeof record.sku === "string" ? record.sku : `SKU-${slug}`,
    title: baseTitle,
    visible_title: baseTitle,
    name: baseTitle,
    slug,
    description: typeof record.description === "string"
      ? record.description
      : typeof record.short_description === "string"
        ? record.short_description
        : "",
    short_description: typeof record.short_description === "string" ? record.short_description : undefined,
    long_description: typeof record.long_description === "string" ? record.long_description : undefined,
    price: Number.isFinite(priceValue) ? Number(priceValue) : 0,
    sale_price: typeof record.sale_price === "number" ? record.sale_price : undefined,
    currency: typeof record.currency === "string" ? record.currency : undefined,
    category: typeof record.category === "string" ? record.category : fallbackCategory,
    stock: typeof record.stock === "number" ? record.stock : 0,
    images: gallery,
    image_url: imageUrl,
    scent_notes: (record.scent_notes ?? undefined) as Product["scent_notes"],
    tags: Array.isArray(record.tags) ? (record.tags as string[]) : undefined,
    meta_title: typeof record.meta_title === "string" ? record.meta_title : undefined,
    meta_description: typeof record.meta_description === "string" ? record.meta_description : undefined,
    legal_note: typeof record.legal_note === "string" ? record.legal_note : undefined,
    is_featured: Boolean(record.is_featured),
    is_active: record.is_active === false ? false : true,
    created_at: typeof record.created_at === "string" ? record.created_at : undefined,
    updated_at: typeof record.updated_at === "string" ? record.updated_at : undefined,
    brand: typeof record.brand === "string" ? record.brand : undefined,
    inspiration: typeof record.inspiration === "string" ? record.inspiration : undefined,
    inspiration_brand: typeof record.inspiration_brand === "string" ? record.inspiration_brand : undefined,
    inspiration_fragrance: typeof record.inspiration_fragrance === "string" ? record.inspiration_fragrance : undefined,
    genre: typeof record.genre === "string" ? record.genre : undefined,
    concentration: typeof record.concentration === "string" ? record.concentration : undefined,
    size: typeof record.size === "string" ? record.size : undefined,
    duration: typeof record.duration === "string" ? record.duration : undefined,
    scent_family: typeof record.scent_family === "string" ? record.scent_family : undefined,
    top_notes: Array.isArray(record.top_notes) ? (record.top_notes as string[]) : undefined,
    middle_notes: Array.isArray(record.middle_notes) ? (record.middle_notes as string[]) : undefined,
    base_notes: Array.isArray(record.base_notes) ? (record.base_notes as string[]) : undefined,
    avg_rating: typeof record.avg_rating === "number" ? record.avg_rating : 4.5,
    review_count: typeof record.review_count === "number" ? record.review_count : 0,
    sales: typeof record.sales === "number" ? record.sales : 0,
  };
};

const getDescriptionParagraphs = (rawDescription?: string): string[] => {
  if (!rawDescription) {
    return [];
  }

  return rawDescription
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((entry) =>
      entry
        .split("\n")
        .map((line) => line.replace(/^[\*\-•\u2022]+\s*/g, "").replace(/\*/g, " ").trim())
        .join(" ")
        .replace(/\s{2,}/g, " ")
        .trim()
    )
    .filter(Boolean);
};

export default function ProductPage() {
  const params = useParams();
  const productId = useMemo(() => {
    const value = params?.id;
    if (!value) {
      return "";
    }
    if (typeof value === "string") {
      return value;
    }
    return Array.isArray(value) ? value[0] ?? "" : "";
  }, [params]);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingFavorite, setTogglingFavorite] = useState(false);

  // 🎯 Scroll automático al top cuando carga el producto
  useScrollToTop();

  const galleryImages = useMemo(() => ensureGallery(product), [product]);
  const selectedImage = galleryImages[selectedImageIndex] ?? FALLBACK_IMAGE;

  const descriptionParagraphs = useMemo(
    () => getDescriptionParagraphs(product?.description),
    [product?.description]
  );

  const whatsappUrl = useMemo(() => {
    const title = product?.visible_title ?? "esta fragancia";
    const message = `Hola, estoy interesado en ${title} y quiero recibir asesoría personalizada.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [product?.visible_title]);

  const loadProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      let resolved = await supabaseService.getProductBySlug(productId);

      if (!resolved) {
        resolved = await supabaseService.getProductById(productId);
      }

      if (!resolved) {
        try {
          const response = await fetch("/productos-completos.json");
          if (response.ok) {
            const catalog = await response.json();
            if (Array.isArray(catalog)) {
              const candidate = catalog.find((entry) =>
                entry &&
                (entry.slug === productId || String(entry.id) === productId)
              );
              resolved = normalizeExternalProduct(candidate, "general");
            }
          }
        } catch (catalogError) {
          console.error("Error cargando catálogo oficial:", catalogError);
        }
      }

      if (resolved) {
        const gallery = ensureGallery(resolved);
        setProduct({
          ...resolved,
          image_url: gallery[0] ?? FALLBACK_IMAGE,
          images: gallery,
        });
        setSelectedImageIndex(0);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error cargando producto:", error);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  const handleAddToCart = useCallback(async () => {
    if (!product) {
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product, quantity);
      if (typeof window !== "undefined") {
        alert("Al finalizar tu compra, un asesor de SEVÁN se comunicará contigo para confirmar el precio, la guía de envío y el día estimado de llegada.");
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("No pudimos agregar el producto al carrito. Intenta nuevamente.");
    } finally {
      setAddingToCart(false);
    }
  }, [addToCart, product, quantity]);

  const handleToggleFavorite = useCallback(async () => {
    if (!product || togglingFavorite) {
      return;
    }

    try {
      setTogglingFavorite(true);
      await toggleFavorite(String(product.id));
    } catch (error) {
      console.error("Error al gestionar favorito:", error);
    } finally {
      setTogglingFavorite(false);
    }
  }, [product, toggleFavorite, togglingFavorite]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-24 flex flex-col items-center justify-center gap-6 text-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Sparkles className="w-10 h-10 text-gold" />
          <h1 className="text-3xl font-semibold">Producto no encontrado</h1>
          <p className="text-sm text-gray-400">
            No pudimos localizar la fragancia solicitada. Puede que haya sido retirada o todavía no esté publicada.
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="border-gold/60 text-gold hover:bg-gold/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const isProductFavorite = isFavorite(String(product.id));
  const displayPrice = formatPrice(product.price);
  const shortDescription = descriptionParagraphs[0] ??
    "Fragancia premium seleccionada por el atelier SEVÁN para complementar tu colección.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black pt-24 pb-16 text-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">Productos</Link>
          <span>/</span>
          <span className="text-gold line-clamp-1">{product.visible_title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/50 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" aria-hidden />
              <Image
                key={selectedImage}
                src={selectedImage}
                alt={`${product.visible_title} imagen principal`}
                width={720}
                height={900}
                priority
                className="mx-auto h-auto max-h-[520px] w-full object-contain"
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300">
              <p className="leading-relaxed">
                Envíos nacionales con tarifas variables según ciudad de destino y cantidad de unidades.
              </p>
              <p className="mt-2 font-semibold text-gold">
                Envío gratis en compras superiores a {formatPrice(300000)}.
              </p>
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {galleryImages.map((image, index) => {
                  const isActive = index === selectedImageIndex;
                  return (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border transition-all ${
                        isActive
                          ? "border-gold shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                          : "border-white/10 hover:border-gold/60"
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`${product.visible_title} vista ${index + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-gold">
                Selección SEVÁN
              </span>
              <h1 className="text-4xl font-serif font-bold leading-tight md:text-5xl">
                {product.visible_title}
              </h1>
              <p className="text-base text-gray-300 leading-relaxed">{shortDescription}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400">Precio oficial</p>
                  <p className="text-3xl font-semibold text-gold">{displayPrice}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-white/10 bg-black/40">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-2 text-lg text-gray-300 hover:text-white"
                      aria-label="Reducir cantidad"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-lg font-medium text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-2 text-lg text-gray-300 hover:text-white"
                      aria-label="Incrementar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="flex items-center gap-2 bg-gold text-black hover:bg-gold-light"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {addingToCart ? "Agregando..." : "Agregar al carrito"}
                  </Button>
                  <button
                    type="button"
                    onClick={handleToggleFavorite}
                    disabled={togglingFavorite}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                      isProductFavorite ? "border-red-400 text-red-400" : "border-white/20 text-gray-300 hover:text-white"
                    }`}
                    aria-label={isProductFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    <Heart className={isProductFavorite ? "fill-current" : ""} />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Pagos 100% seguros gestionados con Mercado Pago.</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {PAYMENT_PARTNERS.map(({ src, alt }) => (
                    <div
                      key={alt}
                      className="flex h-10 items-center justify-center rounded-2xl border border-white/10 bg-black/40 px-3"
                    >
                      <Image src={src} alt={`${alt} logo`} width={80} height={24} className="h-6 w-auto opacity-90" />
                    </div>
                  ))}
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  Prefiero hablar con un asesor
                </a>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Descripción</h2>
              <div className="space-y-3 text-gray-300">
                {descriptionParagraphs.length > 0 ? (
                  descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                ) : (
                  <p>Fragancia inspirada en colecciones exclusivas con proyección de 8 a 12 horas.</p>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Detalles rápidos</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 sm:grid-cols-3">
                <div>
                  <span className="block text-xs text-gray-500">Categoría</span>
                  <span className="font-medium">{product.category ?? "general"}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Disponibilidad</span>
                  <span className="font-medium">{product.stock > 0 ? "En inventario" : "Bajo pedido"}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">SKU</span>
                  <span className="font-medium">{product.sku ?? product.slug}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Opción de Envase Genérico - FUERA DEL GRID, CENTRADO */}
        <div className="mt-16">
          <GenericPerfumeOffer selectedProduct={{ id: product.id, title: product.visible_title, price: product.price }} />
        </div>
      </div>

      <FloatingChat productName={product.visible_title} productId={String(product.id)} />
    </div>
  );
}
