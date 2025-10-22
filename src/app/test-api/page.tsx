'use client';

import { useState } from 'react';

export default function TestApiPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testMercadoPagoAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mercadopago/create-fixed-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: {
            id: 'test-product',
            title: 'Perfume de Prueba',
            visible_title: 'Perfume Test SEVAN',
            price: 100000,
            image_url: 'https://example.com/test.jpg'
          },
          customer: {
            email: 'test@test.com',
            name: 'Test User',
            phone: '3001234567',
            address: 'Calle Test 123'
          },
          quantity: 1
        })
      });

      const data = await response.json();
      setResult(JSON.stringify({ status: response.status, data }, null, 2));
    } catch (error) {
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-gold">Test API MercadoPago</h1>
      
      <button
        onClick={testMercadoPagoAPI}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg mb-4"
      >
        {loading ? 'Probando...' : 'Probar API'}
      </button>
      
      <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
        {result || 'Haz clic en "Probar API" para empezar...'}
      </pre>
    </div>
  );
}