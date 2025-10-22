'use client';

export default function TestPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#d4af37', fontSize: '3rem', marginBottom: '20px' }}>
        ✅ SERVIDOR FUNCIONANDO
      </h1>
      
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '100%',
        border: '2px solid #d4af37'
      }}>
        <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '20px' }}>
          🎯 ACCESOS RÁPIDOS
        </h2>
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <a 
            href="/admin" 
            style={{
              display: 'block',
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
          >
            🔧 CMS ADMIN
          </a>
          
          <a 
            href="/login" 
            style={{
              display: 'block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
          >
            🔐 LOGIN
          </a>
          
          <a 
            href="/perfumes" 
            style={{
              display: 'block',
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
          >
            🌟 PERFUMES
          </a>
          
          <a 
            href="/" 
            style={{
              display: 'block',
              backgroundColor: '#059669',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
          >
            🏠 HOME ORIGINAL
          </a>
        </div>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>📊 Estado del Servidor:</h3>
        <div style={{ fontSize: '14px', color: '#94a3b8' }}>
          <p>✅ Next.js 14.0.3 ejecutándose</p>
          <p>✅ Puerto 3000 activo</p>
          <p>✅ Página de prueba cargada correctamente</p>
          <p>🔄 Hora actual: {new Date().toLocaleString()}</p>
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        fontSize: '14px',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        <p>Si puedes ver esta página, el servidor está funcionando correctamente.</p>
        <p>Usa los botones de arriba para navegar a diferentes secciones.</p>
      </div>
    </div>
  );
}
