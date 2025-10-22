import { Metadata } from 'next';
import AIAssistantChat from '@/components/ai/AIAssistantChat';

export const metadata: Metadata = {
  title: 'Asistente IA - SEVÁN PERFUM | Encuentra Tu Fragancia Perfecta',
  description: 'Nuestro asistente de inteligencia artificial te ayuda a encontrar la fragancia perfecta según tus gustos y preferencias.',
};

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-soft mb-6">
            Asistente de IA
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre tu fragancia perfecta con ayuda de inteligencia artificial.
            Nuestro asistente especializado te guiará para encontrar el aroma ideal.
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-12">
        <AIAssistantChat />
      </div>
    </div>
  );
}