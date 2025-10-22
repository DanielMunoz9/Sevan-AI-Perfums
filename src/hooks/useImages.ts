'use client';

import { useState, useEffect } from 'react';

interface ImageConfig {
  totalProductos: number;
  productosConImagen: number;
  imagenesDisponibles: number;
  ultimaActualizacion: string;
  rutaImagenes: string;
}

export function useImageConfig() {
  const [config, setConfig] = useState<ImageConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/config-imagenes.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading image config:', err);
        setLoading(false);
      });
  }, []);

  return { config, loading };
}

/**
 * Hook para gestionar rutas de imágenes de productos
 */
export function useProductImage(imageUrl?: string | null) {
  const [imageSrc, setImageSrc] = useState<string>('/images/default-perfume.jpg');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setImageSrc('/images/default-perfume.jpg');
      setIsValid(false);
      return;
    }

    // Si es una URL externa, usarla directamente
    if (imageUrl.startsWith('http')) {
      setImageSrc(imageUrl);
      setIsValid(true);
      return;
    }

    // Si es una ruta local, validar que esté en la carpeta correcta
    if (imageUrl.startsWith('/images/')) {
      setImageSrc(imageUrl);
      setIsValid(true);
      return;
    }

    // Si es una ruta antigua o incorrecta, convertir
    if (imageUrl.includes('Img-Sevan') || imageUrl.includes('img-sevan')) {
      const fileName = imageUrl.split('/').pop();
      const newPath = `/images/products/perfumes/${fileName}`;
      setImageSrc(newPath);
      setIsValid(true);
      return;
    }

    // Fallback
    setImageSrc('/images/default-perfume.jpg');
    setIsValid(false);
  }, [imageUrl]);

  return { imageSrc, isValid };
}

/**
 * Utilidad para validar si una imagen existe
 */
export function validateImagePath(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
  });
}