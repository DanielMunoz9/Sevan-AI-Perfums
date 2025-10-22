'use client';

export default function PanelesAcceso() {
  const handleAdminAccess = () => {
    console.log('🔑 Accediendo a panel admin...');
    window.location.href = '/admin';
  };

  const handleClientAccess = () => {
    console.log('🏠 Accediendo a home cliente...');
    window.location.href = '/';
  };

  const handleLoginAccess = () => {
    console.log('🔐 Accediendo a login...');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          🎯 ACCESO DIRECTO
        </h1>
        <p className="text-white/80 text-center mb-8">
          Selecciona a dónde quieres ir:
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleAdminAccess}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔧 PANEL ADMIN
          </button>
          
          <button
            onClick={handleClientAccess}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🏠 HOME CLIENTE
          </button>
          
          <button
            onClick={handleLoginAccess}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔐 LOGIN
          </button>
        </div>

        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-white font-semibold mb-2">📋 URLs Directas:</h3>
          <div className="text-sm text-white/70 space-y-1">
            <div>Admin: localhost:3000/admin</div>
            <div>Home: localhost:3000/</div>
            <div>Login: localhost:3000/login</div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            🚀 Servidor corriendo en puerto 3000
          </p>
        </div>
      </div>
    </div>
  );
}