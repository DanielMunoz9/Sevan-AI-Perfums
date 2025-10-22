'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { favoritesService } from '@/lib/user-interactions';

interface FavoritesContextType {
  favorites: string[];
  isLoading: boolean;
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar favoritos al inicializar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const userFavorites = await favoritesService.getFavorites();
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    try {
      const success = await favoritesService.addToFavorites(productId);
      if (success) {
        setFavorites(prev => [...prev, productId]);
        
        // Mostrar notificación
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: { 
            message: 'Agregado a favoritos', 
            type: 'success' 
          }
        }));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: { 
          message: 'Error al agregar a favoritos', 
          type: 'error' 
        }
      }));
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const success = await favoritesService.removeFromFavorites(productId);
      if (success) {
        setFavorites(prev => prev.filter(id => id !== productId));
        
        // Mostrar notificación
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: { 
            message: 'Removido de favoritos', 
            type: 'info' 
          }
        }));
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: { 
          message: 'Error al remover de favoritos', 
          type: 'error' 
        }
      }));
    }
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const contextValue: FavoritesContextType = {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}