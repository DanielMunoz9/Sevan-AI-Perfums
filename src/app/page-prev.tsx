export default function HomePage() {
  return (
    <html>
      <head>
        <title>SEVAN AI PERFUMES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh'
      }}>
        <div style={{
          padding: '40px',
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '4rem',
            margin: '20px 0',
            background: 'linear-gradient(45deg, #d4af37, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SEVÁN AI PERFUMES
          </h1>

          <p style={{ fontSize: '1.5rem', color: '#ccc', marginBottom: '50px' }}>
            🎉 Sistema E-commerce con MercadoPago - ¡FUNCIONANDO!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '50px'
          }}>
            <a href="/working" style={{
              display: 'block',
              padding: '25px',
              backgroundColor: '#1a1a1a',
              border: '2px solid #d4af37',
              borderRadius: '10px',
              color: '#d4af37',
              textDecoration: 'none',
              fontSize: '18px'
            }}>
              ✅ /working<br/>
              <small style={{color: '#ccc'}}>Página de estado</small>
            </a>

            <a href="/test-mp" style={{
              display: 'block',
              padding: '25px',
              backgroundColor: '#0066cc',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '18px'
            }}>
              💳 /test-mp<br/>
              <small style={{color: '#ccc'}}>Prueba MercadoPago</small>
            </a>

            <a href="/cart-fixed" style={{
              display: 'block',
              padding: '25px',
              backgroundColor: '#cc6600',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '18px'
            }}>
              🛒 /cart-fixed<br/>
              <small style={{color: '#ccc'}}>Carrito Funcional</small>
            </a>
          </div>

          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px'
          }}>
            <h2 style={{ color: '#00cc66', marginBottom: '20px' }}>
              📊 Estado del Sistema
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              textAlign: 'left'
            }}>
              <div>✅ Next.js 14 Funcionando</div>
              <div>✅ MercadoPago SANDBOX</div>
              <div>✅ Supabase Conectado</div>
              <div>✅ Variables de Entorno</div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#0a2a0a',
            padding: '25px',
            borderRadius: '10px',
            border: '2px solid #00cc66'
          }}>
            <h3 style={{ color: '#00cc66' }}>💳 Tarjetas de Prueba</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              fontSize: '14px'
            }}>
              <div>
                <strong>VISA Aprobada</strong><br/>
                4013 5406 8274 6260
              </div>
              <div>
                <strong>Mastercard Aprobada</strong><br/>
                5031 7557 3453 0604
              </div>
              <div>
                <strong>Datos</strong><br/>
                CVV: 123 | Exp: 12/25
              </div>
            </div>
          </div>

          <footer style={{
            marginTop: '50px',
            padding: '20px',
            borderTop: '1px solid #333',
            color: '#666',
            fontSize: '14px'
          }}>
            <p>🚀 Sistema desarrollado con Next.js + MercadoPago + Supabase</p>
            <p>Servidor corriendo en localhost:3000</p>
          </footer>
        </div>
      </body>
    </html>
  );
}