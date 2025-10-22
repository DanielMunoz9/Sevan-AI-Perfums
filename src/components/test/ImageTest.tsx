/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

// Componente de prueba para verificar que las imágenes cargan
export default function ImageTest() {
  const imagenesTest = [
    {
      src: '/images/products/perfumes/Diorsauvage.jpg',
      title: 'Dior Sauvage',
      description: 'Imagen local - Next Image'
    },
    {
      src: '/images/products/perfumes/versace-eros.jpg',
      title: 'Versace Eros',
      description: 'Imagen local - img tag'
    },
    {
      src: '/images/default-perfume.jpg',
      title: 'Imagen por defecto',
      description: 'Fallback image'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🧪 Test de Imágenes - Sevan AI Perfumes
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {imagenesTest.map((imagen, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{imagen.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{imagen.description}</p>
            
            {/* Test con Next.js Image */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Next.js Image:</h4>
              <div className="relative w-full h-48 bg-gray-100 rounded">
                <Image
                  src={imagen.src}
                  alt={imagen.title}
                  fill
                  className="object-cover rounded"
                  onError={() => console.error('Error loading:', imagen.src)}
                />
              </div>
            </div>
            
            {/* Test con img normal */}
            <div>
              <h4 className="text-sm font-medium mb-2">IMG Tag:</h4>
              <img
                src={imagen.src}
                alt={imagen.title}
                className="w-full h-48 object-cover rounded bg-gray-100"
                onError={(e) => {
                  console.error('Error loading img:', imagen.src);
                  (e.target as HTMLImageElement).src = '/images/default-perfume.jpg';
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          ✅ Si ves las imágenes arriba, ¡la migración fue exitosa!
        </h3>
        <p className="text-green-700">
          Las imágenes ahora se cargan correctamente desde /public/images/products/perfumes/
        </p>
      </div>
    </div>
  );
}