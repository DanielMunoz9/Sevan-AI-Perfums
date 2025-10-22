'use client';

/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { useState } from 'react';

export default function TestImagenes() {
  const [errores, setErrores] = useState<string[]>([]);
  
  const imagenesReales = [
    '/images/products/blue-seduction-for-men-antonio-banderas.jpg',
    '/images/products/cuero-jean-pascal.jpg',
    '/images/products/boss-bottled-hugo-boss.jpg'
  ];

  const manejarError = (url: string) => {
    setErrores(prev => [...prev, url]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gold">Test de Imágenes - SEVÁN PERFUM</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {imagenesReales.map((url, index) => (
          <div key={index} className="border border-gold/30 p-4 rounded-lg bg-gray-900">
            <h3 className="font-semibold mb-2 text-gold">Producto {index + 1}</h3>
            <p className="text-sm text-gray-400 mb-4">{url}</p>
            
            <div className="relative w-full h-64 bg-gray-800 rounded overflow-hidden">
              <Image
                src={url}
                alt={`Producto ${index + 1}`}
                fill
                className="object-cover"
                onError={() => manejarError(url)}
                unoptimized={true}
              />
            </div>
            
            {/* Prueba con img tag normal */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Prueba con &lt;img&gt; tag:</p>
              <img 
                src={url} 
                alt={`Test ${index + 1}`}
                className="w-full h-32 object-cover rounded"
                onError={(e) => {
                  console.error('Error cargando imagen:', url);
                  manejarError(url + ' (img tag)');
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {errores.length > 0 && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
          <h3 className="font-bold mb-2">❌ Errores de carga:</h3>
          <ul className="list-disc list-inside space-y-1">
            {errores.map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {errores.length === 0 && (
        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded">
          <h3 className="font-bold">✅ ¡Todas las imágenes se cargaron correctamente!</h3>
        </div>
      )}
      
      <div className="bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-3 rounded">
        <h3 className="font-bold mb-2">📊 Información del Test:</h3>
        <ul className="text-sm space-y-1">
          <li>• Imágenes probadas: {imagenesReales.length}</li>
          <li>• Errores encontrados: {errores.length}</li>
          <li>• Servidor: http://localhost:3000</li>
          <li>• Ruta de imágenes: /public/images/products/</li>
        </ul>
      </div>
    </div>
  );
}