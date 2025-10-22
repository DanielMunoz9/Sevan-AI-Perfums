'use client';

/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import getProductImageUrl from '@/utils/imageMapper';

export const dynamic = 'force-dynamic';

// Productos de prueba
const testProducts = [
  {
    id: '1',
    title: "Inspirado en Hugo Man (Hugo Boss)",
    visible_title: "Hugo Man - Hugo Boss",
    image_url: "/images/products/HUGHUG009/image1.jpg",
    price: 50000
  },
  {
    id: '2', 
    title: "Inspirado en Blue Seduction For Men (Antonio Banderas)",
    visible_title: "Blue Seduction For Men - Antonio Banderas",
    image_url: "/images/products/ANTBLU001/image1.jpg",
    price: 60000
  },
  {
    id: '3',
    title: "Inspirado en Sauvage (Dior)", 
    visible_title: "Sauvage - Dior",
    image_url: "/images/products/DIOR001/image1.jpg",
    price: 80000
  }
];

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          🧪 Test de Imágenes - Sevan AI Perfumes
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testProducts.map((product) => {
            const correctImageUrl = getProductImageUrl(product);
            
            return (
              <div key={product.id} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {product.visible_title}
                </h3>
                
                {/* URL Original */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">URL Original:</p>
                  <p className="text-xs text-red-400 break-all">{product.image_url}</p>
                </div>
                
                {/* URL Mapeada */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">URL Mapeada:</p>
                  <p className="text-xs text-green-400 break-all">{correctImageUrl}</p>
                </div>
                
                {/* Test con Next.js Image */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Next.js Image:</p>
                  <div className="relative w-full h-48 bg-gray-700 rounded">
                    <Image
                      src={correctImageUrl}
                      alt={product.visible_title}
                      fill
                      className="object-cover rounded"
                      onError={(e) => {
                        console.error('Error con Next Image:', correctImageUrl);
                        console.error('Event:', e);
                      }}
                      onLoad={() => {
                        console.log('✅ Imagen cargada:', correctImageUrl);
                      }}
                    />
                  </div>
                </div>
                
                {/* Test con img normal */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">IMG Tag:</p>
                  <img
                    src={correctImageUrl}
                    alt={product.visible_title}
                    className="w-full h-48 object-cover rounded bg-gray-700"
                    onError={(e) => {
                      console.error('Error con IMG tag:', correctImageUrl);
                      (e.target as HTMLImageElement).style.border = '2px solid red';
                    }}
                    onLoad={() => {
                      console.log('✅ IMG cargada:', correctImageUrl);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Test directo de rutas */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">🔗 Test Directo de Rutas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded">
              <p className="text-white mb-2">Imagen que debe existir:</p>
              <img 
                src="/images/products/perfumes/hugobosshugoman.jpg" 
                alt="Test Hugo Man"
                className="w-full h-32 object-cover rounded"
                onError={() => console.error('❌ No existe: hugobosshugoman.jpg')}
                onLoad={() => console.log('✅ Existe: hugobosshugoman.jpg')}
              />
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <p className="text-white mb-2">Imagen por defecto:</p>
              <img 
                src="/images/default-perfume.svg" 
                alt="Default"
                className="w-full h-32 object-cover rounded"
                onError={() => console.error('❌ No existe: default-perfume.svg')}
                onLoad={() => console.log('✅ Existe: default-perfume.svg')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}