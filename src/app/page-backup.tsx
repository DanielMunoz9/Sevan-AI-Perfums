export default function TestHomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            margin: '20px 0',
            background: 'linear-gradient(45deg, #d4af37, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            SEVÁN AI PERFUMES
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cccccc' }}>
            Sistema de E-commerce con MercadoPago - Funcionando ✅
          </p>
        </header>

        {/* Navigation */}
        <nav style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <a 
            href="/simple"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#1a1a1a',
              border: '2px solid #d4af37',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              fontSize: '18px',
              transition: 'all 0.3s ease'
            }}
          >
            🏠 Página Simple
          </a>
          
          <a 
            href="/cart-test"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#0066cc',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              fontSize: '18px'
            }}
          >
            🛒 Probar Carrito
          </a>
          
          <a 
            href="/test"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#00cc66',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              fontSize: '18px'
            }}
          >
            🧪 Pruebas Completas
          </a>
          
          <a 
            href="/admin"
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#cc6600',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              fontSize: '18px'
            }}
          >
            ⚙️ Admin Panel
          </a>
        </nav>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '25px',
            borderRadius: '10px',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>💳 MercadoPago</h3>
            <p>Sistema de pagos completo con SANDBOX para pruebas</p>
            <ul style={{ color: '#cccccc', marginTop: '10px' }}>
              <li>✅ Credenciales TEST configuradas</li>
              <li>✅ Checkout funcional</li>
              <li>✅ Webhooks implementados</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '25px',
            borderRadius: '10px',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🗄️ Base de Datos</h3>
            <p>Supabase configurado para órdenes y productos</p>
            <ul style={{ color: '#cccccc', marginTop: '10px' }}>
              <li>✅ Conexión establecida</li>
              <li>✅ Tablas creadas</li>
              <li>✅ RLS configurado</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '25px',
            borderRadius: '10px',
            border: '1px solid #333'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🛡️ Seguridad</h3>
            <p>Sistema de autenticación y protección</p>
            <ul style={{ color: '#cccccc', marginTop: '10px' }}>
              <li>✅ JWT para admin</li>
              <li>✅ reCAPTCHA listo</li>
              <li>✅ Validaciones implementadas</li>
            </ul>
          </div>
        </div>

        {/* Test Cards */}
        <div style={{
          backgroundColor: '#0a2a0a',
          padding: '25px',
          borderRadius: '10px',
          border: '2px solid #00cc66'
        }}>
          <h3 style={{ color: '#00cc66', marginBottom: '15px' }}>💳 Tarjetas de Prueba</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <strong style={{ color: '#00cc66' }}>VISA (Aprobada)</strong>
              <br />4013 5406 8274 6260
            </div>
            <div>
              <strong style={{ color: '#00cc66' }}>Mastercard (Aprobada)</strong>
              <br />5031 7557 3453 0604
            </div>
            <div>
              <strong style={{ color: '#cccccc' }}>CVV: 123</strong>
              <br />Vencimiento: 12/25
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
          <p>🚀 Sistema funcionando en localhost:3000</p>
          <p>Desarrollado con Next.js + MercadoPago + Supabase</p>
        </footer>
      </div>
    </div>
  );
}