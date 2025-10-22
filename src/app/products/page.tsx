import { Metadata } from 'next';
import ProductCatalogContent from '@/components/product/ProductCatalogContent';

export const metadata: Metadata = {
  title: 'Productos - SEVÁN PERFUM | 213 Fragancias de Lujo',
  description: 'Explora nuestra colección completa de 213 fragancias de lujo inspiradas. Encuentra tu perfume ideal con nuestros filtros avanzados.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-soft mb-6">
            Nuestra Colección
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            213 fragancias únicas esperan por ti. Encuentra tu aroma perfecto.
          </p>
        </div>
      </div>

      <ProductCatalogContent />
    </div>
  );
}