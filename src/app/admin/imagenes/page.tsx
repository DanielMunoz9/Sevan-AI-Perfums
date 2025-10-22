'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface Producto {
  id: string;
  title: string;
  visible_title: string;
  slug: string;
  image_url: string;
}

const imagenesDisponibles = [
  {
    nombre: 'Blue Seduction For Men',
    archivo: 'blue-seduction-for-men-antonio-banderas.jpg',
    slug: 'blue-seduction-for-men--sp001'
  },
  {
    nombre: 'BOSS Bottled',
    archivo: 'boss-bottled-hugo-boss.jpg',
    slug: 'boss-bottled--sp004'
  },
  {
    nombre: 'Cuero Jean Pascal',
    archivo: 'cuero-jean-pascal.jpg',
    slug: 'cuero--sp003'
  }
];

export default function AdminImagenes() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actualizando, setActualizando] = useState<string | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      // Simular carga de productos (en producción cargarías desde Supabase)
      const productosEjemplo: Producto[] = [
        {
          id: '1',
          title: 'Inspirado en Blue Seduction For Men (Antonio Banderas)',
          visible_title: 'Blue Seduction For Men',
          slug: 'blue-seduction-for-men--sp001',
          image_url: '/images/products/placeholder-product.svg'
        },
        {
          id: '2', 
          title: 'Inspirado en BOSS Bottled (Hugo Boss)',
          visible_title: 'BOSS Bottled',
          slug: 'boss-bottled--sp004',
          image_url: '/images/products/placeholder-product.svg'
        },
        {
          id: '3',
          title: 'Inspirado en Cuero (Jean Pascal)',
          visible_title: 'Cuero',
          slug: 'cuero--sp003', 
          image_url: '/images/products/placeholder-product.svg'
        }
      ];
      
      setProductos(productosEjemplo);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setLoading(false);
    }
  };

  const actualizarImagen = async (slug: string, imagenArchivo: string) => {
    setActualizando(slug);
    
    try {
      const response = await fetch('/api/products/update-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          image_url: `/images/products/${imagenArchivo}`,
          images: [`/images/products/${imagenArchivo}`]
        })
      });

      if (response.ok) {
        // Actualizar el estado local
        setProductos(prev => prev.map(p => 
          p.slug === slug 
            ? { ...p, image_url: `/images/products/${imagenArchivo}` }
            : p
        ));
        
        alert('✅ Imagen actualizada correctamente');
      } else {
        const error = await response.text();
        alert(`❌ Error: ${error}`);
      }
    } catch (error) {
      console.error('Error actualizando imagen:', error);
      alert('❌ Error de conexión');
    } finally {
      setActualizando(null);
    }
  };

  const actualizarTodos = async () => {
    for (const imagen of imagenesDisponibles) {
      await actualizarImagen(imagen.slug, imagen.archivo);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa entre actualizaciones
    }
    
    alert('🎉 Todas las imágenes han sido actualizadas');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gold mb-8">Administrador de Imágenes</h1>
          
          <div className="mb-8">
            <Button 
              onClick={actualizarTodos}
              className="bg-gold text-black hover:bg-gold/80"
              disabled={actualizando !== null}
            >
              {actualizando ? 'Actualizando...' : 'Actualizar Todas las Imágenes'}
            </Button>
          </div>

          <div className="grid gap-6">
            {productos.map((producto) => {
              const imagenDisponible = imagenesDisponibles.find(img => img.slug === producto.slug);
              
              return (
                <div key={producto.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {producto.visible_title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Slug: {producto.slug}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Imagen actual: {producto.image_url}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Vista previa de imagen actual */}
                      <div className="relative w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                        <Image 
                          src={producto.image_url}
                          alt={producto.visible_title}
                          fill
                          className="object-cover"
                          sizes="80px"
                          onError={(event) => {
                            event.currentTarget.src = '/images/products/placeholder-product.svg';
                          }}
                        />
                      </div>
                      
                      {imagenDisponible && (
                        <>
                          {/* Vista previa de imagen nueva */}
                          <div className="relative w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                            <Image 
                              src={`/images/products/${imagenDisponible.archivo}`}
                              alt={`Nueva imagen - ${imagenDisponible.nombre}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          
                          <Button
                            onClick={() => actualizarImagen(producto.slug, imagenDisponible.archivo)}
                            disabled={actualizando === producto.slug}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {actualizando === producto.slug ? 'Actualizando...' : 'Actualizar'}
                          </Button>
                        </>
                      )}
                      
                      {!imagenDisponible && (
                        <span className="text-gray-500 text-sm">Sin imagen disponible</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}