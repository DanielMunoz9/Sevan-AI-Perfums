export default function NotFound() {
	return (
		<main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-24">
			<span className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">404</span>
			<h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Página no encontrada</h1>
			<p className="text-lg text-gray-400 max-w-xl text-center mb-10">
				No pudimos encontrar la página que buscas. Verifica la URL o vuelve al inicio para seguir explorando nuestra colección.
			</p>
			<a
				href="/"
				className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-black font-semibold hover:bg-gold/80 transition"
			>
				Volver al inicio
			</a>
		</main>
	);
}
