'use client';

export default function TestSimple() {
  console.log('🧪 COMPONENTE TEST SIMPLE MONTADO');

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-gold">🧪 TEST ULTRA SIMPLE</h1>
      
      {/* Test 1: onClick directo */}
      <button
        onClick={() => alert('¡TEST 1 FUNCIONA!')}
        className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold mb-4 hover:bg-red-700"
      >
        🚨 TEST 1 - CLICK AQUÍ
      </button>

      {/* Test 2: función separada */}
      <button
        onClick={testFunction}
        className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold mb-4 hover:bg-green-700"
      >
        ✅ TEST 2 - CLICK AQUÍ
      </button>

      {/* Test 3: console.log */}
      <button
        onClick={() => {
          console.log('🎯 TEST 3 EJECUTADO');
          alert('🎯 TEST 3 - Console.log ejecutado');
        }}
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold mb-8 hover:bg-blue-700"
      >
        🎯 TEST 3 - CONSOLE LOG
      </button>

      <div className="text-center bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">📋 INSTRUCCIONES:</h2>
        <p className="mb-2">1. Abre consola del navegador (F12)</p>
        <p className="mb-2">2. HAZ CLICK (no Enter) en cada botón</p>
        <p className="mb-2">3. Si no aparecen alerts, JavaScript está roto</p>
        <p className="text-gold font-bold">4. Si aparecen alerts, el problema está en el CMS</p>
      </div>
    </div>
  );
}

function testFunction() {
  console.log('✅ FUNCIÓN SEPARADA EJECUTADA');
  alert('✅ FUNCIÓN SEPARADA FUNCIONA PERFECTAMENTE');
}