'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent
} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Loader2, Search, Sparkles, Star, X } from 'lucide-react'

import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import getProductImageUrl from '@/utils/imageMapper'

interface ProductSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

type ProductListItem = Product & { image_url?: string | null; external_url?: string | null }

const PLACEHOLDER_IMAGE = '/images/placeholder-product.jpg'

const CURATED_PRODUCTS: ProductListItem[] = [
  {
    id: 'curated-blue-seduction',
    sku: 'BLUE-SEDUCTION-AB',
    title: 'Blue Seduction Antonio Banderas 100ml',
    visible_title: 'Blue Seduction · Antonio Banderas',
    name: 'Blue Seduction',
    slug: 'blue-seduction-antonio-banderas',
    description: 'Explosión fresca con acordes acuáticos, melón y bergamota, firmada por Antonio Banderas para cautivar de día y de noche.',
    price: 189000,
    sale_price: undefined,
    currency: 'COP',
    category: 'men',
    stock: 12,
  images: ['/images/external/blue-seduction-1.jpg', '/images/external/blue-seduction-2.jpg'],
  image_url: '/images/external/blue-seduction-1.jpg',
    scent_notes: {
      top: ['bergamota', 'melón'],
      heart: ['capuchino', 'cardamomo'],
      base: ['ámbar', 'almizcle']
    },
    tags: ['acuático', 'fresco', 'masculino'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    brand: 'Antonio Banderas',
    inspiration: 'Blue Seduction for Men',
    inspiration_brand: 'Antonio Banderas',
    genre: 'Hombre',
    concentration: 'Eau de Toilette',
    size: '100 ml',
    duration: '6-8 horas',
    scent_family: 'Acuático Aromático',
    external_url: null
  },
  {
    id: 'curated-aurora-dusk',
    sku: 'AURORA-DUSK',
    title: 'Aurora Dusk Extracto Nocturno',
    visible_title: 'Aurora Dusk · Extracto Nocturno',
    name: 'Aurora Dusk',
    slug: 'aurora-dusk-extracto',
    description: 'Frutos negros, pétalos orientales y oud ahumado en una estela de lujo magnético.',
    price: 245000,
    sale_price: undefined,
    currency: 'COP',
    category: 'unisex',
    stock: 18,
    images: [],
    image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
    tags: ['nocturno', 'oud', 'lujoso'],
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    brand: 'Sevan Atelier',
    genre: 'Unisex',
    concentration: 'Parfum',
    size: '50 ml',
    duration: '10-12 horas',
    scent_family: 'Oriental',
    external_url: null
  },
  {
    id: 'curated-selva-marina',
    sku: 'SELVA-MARINA',
    title: 'Selva Marina Bruma Costera',
    visible_title: 'Selva Marina · Bruma Costera',
    name: 'Selva Marina',
    slug: 'selva-marina-bruma-costera',
    description: 'Mandarina siciliana, sal marina cristalina y vetiver fresco para días vibrantes junto al mar.',
    price: 198000,
    sale_price: undefined,
    currency: 'COP',
    category: 'unisex',
    stock: 30,
    images: [],
    image_url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
    tags: ['marino', 'citrus', 'unisex'],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    brand: 'Sevan Atelier',
    genre: 'Unisex',
    concentration: 'Eau de Parfum',
    size: '100 ml',
    duration: '8-10 horas',
    scent_family: 'Aromático Marino',
    external_url: null
  }
]

export function ProductSearchModal({ isOpen, onClose }: ProductSearchModalProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ProductListItem[]>([])
  const [featured, setFeatured] = useState<ProductListItem[]>(CURATED_PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [loadingFeatured, setLoadingFeatured] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const latestQueryRef = useRef('')
  const hasLoadedFeatured = useRef(false)

  const closeModal = useCallback(() => {
    setQuery('')
    setResults([])
    setError(null)
    setHighlightedIndex(-1)
    onClose()
  }, [onClose])

  const loadFeaturedProducts = useCallback(async () => {
    if (hasLoadedFeatured.current) {
      return
    }

    setLoadingFeatured(true)

    try {
      const response = await fetch('/api/products?featured=true')
      if (!response.ok) {
        throw new Error('No se pudieron obtener los productos destacados')
      }

      const data = (await response.json()) as { products?: ProductListItem[] }
      const highlighted = (data.products ?? []).slice(0, 6)

      if (highlighted.length === 0) {
        setFeatured(CURATED_PRODUCTS)
      } else {
        const enriched = [...highlighted]
        CURATED_PRODUCTS.forEach(curated => {
          const exists = enriched.some(item => item.slug === curated.slug)
          if (!exists) {
            enriched.push(curated)
          }
        })
        setFeatured(enriched)
      }
      hasLoadedFeatured.current = true
    } catch (featuredError) {
      console.error('Error cargando productos destacados:', featuredError)
      setFeatured(CURATED_PRODUCTS)
    } finally {
      setLoadingFeatured(false)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    // Prevent body scroll when modal is open
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus()
    }, 50)

    if (!hasLoadedFeatured.current) {
      void loadFeaturedProducts()
    }

    const handleGlobalKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleGlobalKeydown)

    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown)
      document.body.style.overflow = previousOverflow
      clearTimeout(focusTimer)
    }
  }, [isOpen, closeModal, loadFeaturedProducts])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    latestQueryRef.current = query

    if (!query.trim()) {
      setResults([])
      setError(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const controller = new AbortController()
    const debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=12`, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('No se pudo completar la búsqueda')
        }

        const data = (await response.json()) as { products?: ProductListItem[] }

        if (latestQueryRef.current === query) {
          setResults(data.products ?? [])
          setHighlightedIndex(data.products && data.products.length > 0 ? 0 : -1)
        }
      } catch (fetchError) {
        if ((fetchError as DOMException).name === 'AbortError') {
          return
        }
        console.error('Error buscando productos:', fetchError)
        if (latestQueryRef.current === query) {
          setError('No pudimos completar la búsqueda. Intenta de nuevo.')
          setResults([])
        }
      } finally {
        if (latestQueryRef.current === query) {
          setLoading(false)
        }
      }
    }, 250)

    return () => {
      controller.abort()
      clearTimeout(debounceTimer)
    }
  }, [query, isOpen])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleResultNavigation = useCallback(
    (product: ProductListItem | undefined) => {
      if (!product) {
        return
      }

      // Never navigate to external URLs - only use internal product pages
      const destination = product.slug ? `/product/${product.slug}` : `/product/${product.id}`
      closeModal()
      router.push(destination)
    },
    [router, closeModal]
  )

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex(prev => {
        const nextIndex = prev + 1
        const maxIndex = results.length - 1
        return nextIndex > maxIndex ? maxIndex : nextIndex
      })
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex(prev => {
        const nextIndex = prev - 1
        return nextIndex < 0 ? 0 : nextIndex
      })
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const selected = results[highlightedIndex] ?? results[0]
      handleResultNavigation(selected)
    }
  }

  const visibleResults = useMemo(() => {
    if (!query.trim()) {
      return []
    }
    const normalized = query.trim().toLowerCase()
    const curatedMatches = CURATED_PRODUCTS.filter(product => {
      const haystack = [
        product.title,
        product.visible_title,
        product.name,
        product.brand,
        product.inspiration
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
    })

    const merged = [...results]
    curatedMatches.forEach(match => {
      const exists = merged.some(product => product.slug === match.slug || product.id === match.id)
      if (!exists) {
        merged.push(match)
      }
    })

    return merged
  }, [query, results])

  const resultItems = query.trim() ? visibleResults : featured

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/50 backdrop-blur-sm px-4 py-24 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 text-white shadow-2xl"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white transition hover:bg-white/10"
              aria-label="Cerrar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-3">
                {/* BARRA DE BÚSQUEDA MEJORADA Y MÁS LLAMATIVA */}
                <div className="relative group">
                  {/* Efecto de brillo de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition duration-300 pointer-events-none" />
                  
                  {/* Barra principal con bordes dorados */}
                  <div className="relative flex items-center gap-3 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-white/5 to-white/2 px-4 py-4 sm:py-5 shadow-lg hover:border-amber-500/60 transition-all duration-300">
                    {/* Icono de búsqueda animado en dorado */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Search className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                    </motion.div>
                    
                    {/* Input principal */}
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="🔍 Busca tu fragancia perfecta... (Ctrl+K)"
                      className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder:text-white/50 focus:outline-none font-medium"
                      aria-label="Buscar perfumes"
                      autoComplete="off"
                    />
                    
                    {/* Indicador de carga */}
                    {loading && (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Loader2 className="h-5 w-5 text-amber-400" />
                      </motion.div>
                    )}
                    
                    {/* Botón limpiar */}
                    {query && !loading && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setQuery('')
                          setResults([])
                          inputRef.current?.focus()
                        }}
                        className="p-1.5 rounded-full hover:bg-white/10 transition"
                      >
                        <X className="h-5 w-5 text-white/70 hover:text-white" />
                      </motion.button>
                    )}
                    
                    {/* Atajo de teclado */}
                    <span className="hidden lg:flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 ml-2">
                      <kbd>Ctrl</kbd>
                      <span className="text-amber-400">+</span>
                      <kbd>K</kbd>
                    </span>
                  </div>
                </div>
                
                {/* Texto descriptivo con estado dinámico */}
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="h-4 w-4 text-amber-400/70" />
                  <p className="text-sm text-white/70">
                    {loading ? (
                      <span>⏳ Buscando perfumes increíbles...</span>
                    ) : query ? (
                      <span>
                        ✨ <strong className="text-amber-300">{visibleResults.length}</strong> resultado{visibleResults.length !== 1 ? 's' : ''} - Presiona Enter o click para ver
                      </span>
                    ) : (
                      <span>💎 Descubre nuestro catálogo completo de 210+ perfumes artesanales de lujo</span>
                    )}
                  </p>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center gap-2 py-10 text-white/70">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Buscando perfumes...</span>
                </div>
              )}

              {!loading && resultItems.length === 0 && query.trim() && !error && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
                  <p className="text-lg font-medium">No encontramos coincidencias</p>
                  <p className="mt-2 text-sm text-white/60">
                    Verifica la ortografía o intenta con palabras clave diferentes, por ejemplo la marca o la inspiración.
                  </p>
                </div>
              )}

              {!query.trim() && featured.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/50">
                    <Sparkles className="h-4 w-4" />
                    Búsquedas populares
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {featured.map(product => (
                      <button
                        type="button"
                        key={product.id}
                        onClick={() => handleResultNavigation(product)}
                        className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 via-white/2 to-white/5 p-4 text-left shadow-lg transition hover:border-white/20 hover:bg-white/10"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                          <Image
                            src={getProductImageUrl(product)}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">
                            {product.title || product.visible_title || 'Perfume SEVAN'}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/50">
                            {product.brand && (
                              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5">{product.brand}</span>
                            )}
                            {product.inspiration && (
                              <span className="flex items-center gap-1 rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-blue-200">
                                <Star className="h-3 w-3" /> {product.inspiration}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                  {loadingFeatured && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Actualizando recomendaciones...
                    </div>
                  )}
                </div>
              )}

              {query.trim() && resultItems.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/50">
                    Resultados ({resultItems.length})
                  </div>
                  <ul className="flex max-h-[420px] flex-col gap-1 overflow-y-auto pr-1">
                    {resultItems.map((product, index) => {
                      const isActive = index === highlightedIndex
                      return (
                        <li key={`${product.id}-${product.slug ?? index}`}>
                          <button
                            type="button"
                            onClick={() => handleResultNavigation(product)}
                            className={[
                              'group flex w-full items-center gap-4 rounded-2xl border border-transparent p-4 text-left transition',
                              isActive ? 'border-white/30 bg-white/10' : 'hover:border-white/20 hover:bg-white/5'
                            ].join(' ')}
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                              <Image
                                src={getProductImageUrl(product)}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white">
                                {product.title || product.visible_title || 'Perfume SEVAN'}
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/50">
                                {product.brand && <span>{product.brand}</span>}
                                {product.inspiration && (
                                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/60">
                                    Inspirado en {product.inspiration}
                                  </span>
                                )}
                                {typeof product.price === 'number' && (
                                  <span className="font-semibold text-emerald-300">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductSearchModal
