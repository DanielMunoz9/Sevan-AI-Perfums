export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center py-20 text-gold">
        🎉 SEVÁN PERFUM - TU PROYECTO FUNCIONA!
      </h1>
      <div className="text-center">
        <p className="text-xl mb-4">Tu tienda de perfumes está funcionando correctamente</p>
        <div className="space-y-4">
          <a href="/products" className="block text-blue-400 hover:text-blue-300">
            Ver Productos
          </a>
          <a href="/admin" className="block text-green-400 hover:text-green-300">
            Panel Admin
          </a>
          <a href="/login" className="block text-purple-400 hover:text-purple-300">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}