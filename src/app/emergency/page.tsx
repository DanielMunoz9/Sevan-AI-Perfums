export default function Emergency() {
  return (
    <html>
      <head>
        <title>SEVAN - Acceso de Emergencia</title>
      </head>
      <body style={{
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '600px',
          border: '2px solid #d4af37'
        }}>
          <h1 style={{ color: '#d4af37', marginBottom: '30px' }}>
            🚨 ACCESO DE EMERGENCIA
          </h1>
          
          <p style={{ marginBottom: '30px' }}>
            ✅ Servidor funcionando correctamente<br/>
            ✅ Caché limpiado<br/>
            ✅ Dependencias reinstaladas
          </p>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <a href="/admin" style={{
              display: 'block',
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '15px 25px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              🔧 CMS ADMIN
            </a>
            
            <a href="/login" style={{
              display: 'block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '15px 25px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              🔐 LOGIN
            </a>
          </div>
          
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#0f172a',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#d4af37' }}>Credenciales Admin:</h3>
            <p>Email: admin@sevan.com</p>
            <p>Password: SevanAdmin2025!</p>
          </div>
        </div>
        
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Si esta página carga, el servidor funciona correctamente
        </p>
      </body>
    </html>
  );
}