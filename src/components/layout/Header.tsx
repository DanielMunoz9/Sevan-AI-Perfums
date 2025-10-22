'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Bot,
  Heart,
  Sparkles,
  Bell,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import CartDrawer from '@/components/cart/CartDrawer';
import { ProductSearchModal } from '@/components/search/ProductSearchModal';
import realCMSService, { Announcement } from '@/lib/real-cms-service';

interface NavLink {
  name: string;
  href: string;
  icon?: LucideIcon;
}

const baseLinks: NavLink[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Perfumes', href: '/products' },
  { name: 'Kit Emprendedor', href: '/kit-emprendedor' },
  { name: 'Nosotros', href: '/about' },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  { name: 'Contacto', href: '/contact' },
];

const announcementIcon = (type: string): string => {
  switch (type) {
    case 'promotion':
      return '[promo]';
    case 'sale':
      return '[sale]';
    case 'warning':
      return '[alerta]';
    case 'success':
      return '[nuevo]';
    default:
      return '[info]';
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerOffset, setHeaderOffset] = useState(0);

  const { itemCount } = useCart();
  const { favorites } = useFavorites();
  const { user, signOut, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigationLinks = [...baseLinks];
  const currentAnnouncement = announcements[currentAnnouncementIndex];

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await realCMSService.getActiveAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error cargando anuncios:', error);
      }
    };

    loadAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [announcements.length]);

  useEffect(() => {
    const handleCommandPalette = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleCommandPalette);
    return () => window.removeEventListener('keydown', handleCommandPalette);
  }, []);

  useEffect(() => {
    const updateOffset = () => {
      if (isHeaderHidden || !headerRef.current) {
        const fallback = showAnnouncements && announcements.length > 0 ? 56 : 16;
        setHeaderOffset(fallback);
        return;
      }

      const element = headerRef.current;
      const computedStyle = window.getComputedStyle(element);
      const topOffset = parseFloat(computedStyle.top) || 0;
      const totalOffset = Math.ceil(element.offsetHeight + topOffset + 16);

      setHeaderOffset(totalOffset);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, [showAnnouncements, announcements.length, isOpen, isHeaderHidden]);

  const urlSearchValue = searchParams?.get('search') ?? '';

  useEffect(() => {
    if (!document.activeElement || document.activeElement.tagName !== 'INPUT') {
      setSearchValue(urlSearchValue);
    }
  }, [urlSearchValue]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchValue.trim();

    if (!trimmed) {
      router.push('/products');
      return;
    }

    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <AnimatePresence>
        {!showAnnouncements && announcements.length > 0 && (
          <motion.button
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            onClick={() => setShowAnnouncements(true)}
            className="fixed left-1/2 top-3 z-[70] -translate-x-1/2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-black shadow-md hover:bg-gold-light"
          >
            <span className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Ver anuncios
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {announcements.length > 0 && currentAnnouncement && showAnnouncements && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 right-0 top-0 z-[65] border-b border-gold/15 bg-black/90 backdrop-blur-sm"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-sm text-gray-200">
              <motion.div
                key={currentAnnouncementIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <span className="text-xs font-semibold tracking-wide text-gold">
                  {announcementIcon(currentAnnouncement.type)}
                </span>
                <p className="truncate">
                  <span className="mr-2 font-semibold text-gold-light">{currentAnnouncement.title}</span>
                  <span className="opacity-80">{currentAnnouncement.content}</span>
                </p>
              </motion.div>

              <div className="flex shrink-0 items-center gap-2">
                {announcements.length > 1 && (
                  <div className="hidden items-center gap-1 sm:flex">
                    {announcements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAnnouncementIndex(index)}
                        className={`h-1.5 w-4 rounded-full transition ${
                          index === currentAnnouncementIndex ? 'bg-gold' : 'bg-white/25 hover:bg-white/50'
                        }`}
                        aria-label={`Ver anuncio ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {currentAnnouncement.action_url && (
                  <Link href={currentAnnouncement.action_url} className="hidden text-xs font-medium text-gold-light hover:text-gold sm:block">
                    Ver más
                  </Link>
                )}

                <button
                  onClick={() => setShowAnnouncements(false)}
                  className="rounded-full p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Ocultar anuncios"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isHeaderHidden && (
          <motion.header
            ref={headerRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-x-0 z-[60] mx-auto w-full max-w-[1100px] rounded-3xl border border-white/10 bg-gradient-to-br from-black/95 via-black/90 to-black/70 shadow-xl backdrop-blur-lg ${
              showAnnouncements && announcements.length > 0 ? 'top-12' : 'top-4'
            }`}
          >
            <div className="flex flex-col gap-4 px-4 py-4">
              <div className="grid w-full gap-3 lg:grid-cols-[auto,1fr,auto] lg:items-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-light shadow-inner shadow-gold/40">
                    <Sparkles className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">SEVÁN PERFUM</p>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">Luxury Fragrances</p>
                  </div>
                </Link>

                <nav className="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-white/5 px-2 py-1.5">
                  {navigationLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                          isActive ? 'bg-gold text-black shadow-sm' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex items-center justify-end gap-2">
                  <Link href="/favorites" className="hidden sm:block">
                    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-gold/40 hover:text-gold">
                      <Heart className="h-4 w-4" />
                      {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-gold to-amber-300 text-[10px] font-semibold text-black">
                          {favorites.length > 9 ? '9+' : favorites.length}
                        </span>
                      )}
                    </button>
                  </Link>

                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-gold/40 hover:text-gold"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-black">
                        {itemCount > 9 ? '9+' : itemCount}
                      </span>
                    )}
                  </button>

                  {!user ? (
                    <Link href="/login">
                      <Button size="sm" className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-gold-light">
                        Entrar
                      </Button>
                    </Link>
                  ) : (
                    <div className="hidden items-center gap-2 sm:flex">
                      {/* Botón CMS Admin */}
                      {isAdmin && (
                        <Link href="/admin">
                          <button className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700">
                            🔧 CMS Admin
                          </button>
                        </Link>
                      )}
                      
                      {/* Info del usuario */}
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 flex items-center gap-2">
                        <span>{user.email?.split('@')[0]}</span>
                        <button
                          onClick={() => signOut && signOut()}
                          className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-gray-300 transition hover:bg-red-500/20 hover:text-red-200"
                        >
                          Salir
                        </button>
                      </div>
                    </div>
                  )}

                  <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition hover:border-gold/40 hover:text-gold lg:hidden"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Abrir menú"
                  >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.button>

                  <button
                    onClick={() => {
                      setIsHeaderHidden(true);
                      setIsOpen(false);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-gold/40 hover:text-gold"
                    aria-label="Ocultar header"
                  >
                    <EyeOff className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex w-full justify-center">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex w-full max-w-[760px] items-center gap-3 rounded-full border border-white/10 bg-white/95 px-5 py-2.5 text-base text-gray-700 shadow-lg transition focus-within:border-gold/40 focus-within:shadow-gold/25"
                >
                  <Search className="h-5 w-5 flex-shrink-0 text-gold" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Buscar perfumes, fragancias, kits..."
                    className="flex-1 bg-transparent text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    aria-label="Buscar perfumes"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(true)}
                      className="hidden rounded-full border border-gold/40 bg-gold/10 p-2 text-gold transition hover:bg-gold/20 hover:text-black sm:inline-flex"
                      aria-label="Búsqueda avanzada"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light px-4 py-2 text-sm font-semibold text-black transition hover:from-gold-light hover:to-gold"
                    >
                      <Search className="h-4 w-4" />
                      Buscar
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden"
                >
                  <div className="flex flex-col gap-4 px-4 py-4">
                    <button
                      onClick={() => {
                        setIsSearchOpen(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                    >
                      <Search className="h-4 w-4 text-gold" />
                      <span className="flex-1 text-left">Buscar fragancias...</span>
                    </button>

                    <nav className="flex flex-col gap-2">
                      {navigationLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                              isActive ? 'border border-gold/30 bg-gold/15 text-gold' : 'text-gray-200 hover:bg-white/5'
                            }`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            {link.name}
                          </Link>
                        );
                      })}
                    </nav>

                    <div className="flex items-center gap-3 pt-3 text-sm">
                      <button
                        onClick={() => {
                          setIsCartOpen(true);
                          setIsOpen(false);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-gray-200"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Carrito ({itemCount})
                      </button>

                      <Link href="/favorites" className="w-full" onClick={() => setIsOpen(false)}>
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-gray-200">
                          <Heart className="h-4 w-4" />
                          Favoritos ({favorites.length})
                        </button>
                      </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                      {!user ? (
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button className="w-full rounded-xl bg-gold text-black hover:bg-gold-light">Iniciar sesión</Button>
                        </Link>
                      ) : (
                        <>
                          <p className="text-center text-xs text-gray-400">{user.email}</p>
                          
                          {/* Botón CMS Admin para móvil */}
                          {isAdmin && (
                            <Link href="/admin" onClick={() => setIsOpen(false)}>
                              <Button className="w-full rounded-xl bg-red-600 text-white hover:bg-red-700">
                                🔧 Panel CMS Admin
                              </Button>
                            </Link>
                          )}
                          
                          <Button
                            onClick={() => {
                              signOut && signOut();
                              setIsOpen(false);
                            }}
                            variant="outline"
                            className="w-full rounded-xl border-red-400/40 text-red-300 hover:bg-red-500/20 hover:text-white"
                          >
                            Cerrar sesión
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHeaderHidden && (
          <motion.button
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            onClick={() => setIsHeaderHidden(false)}
            className={`fixed left-1/2 z-[55] -translate-x-1/2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-black shadow-md hover:bg-gold-light ${
              showAnnouncements && announcements.length > 0 ? 'top-12' : 'top-4'
            }`}
          >
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Mostrar menú
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <div aria-hidden="true" style={{ height: isHeaderHidden ? (showAnnouncements && announcements.length > 0 ? 56 : 16) : headerOffset }} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProductSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
