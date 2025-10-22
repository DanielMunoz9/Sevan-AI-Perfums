# 🚀 QUICK START - Cómo Usar Todo Lo Nuevo

## ⚡ TL;DR (Muy Rápido)

```
✅ Alerts profesionales: YA ESTÁN EN EL SISTEMA
✅ Carrito: YA MUESTRA ALERTS AUTOMÁTICAMENTE
✅ Registro/Login: YA TIENEN ALERTS NUEVOS
✅ Imágenes: GUÍA DISPONIBLE PARA AGREGARLAS
```

**No necesitas hacer nada. Todo funciona automáticamente.** 🎉

---

## 📸 Lo Que Verás

### En Registro
```
1. Usuario se registra
2. ✅ Alert verde: "¡Registro Exitoso! 🎉"
3. Espera 2 segundos
4. Redirecciona a login
```

### En Login
```
1. Usuario entra con credenciales
2. ✅ Alert verde: "¡Login Exitoso! 👋"
3. Espera 500ms
4. Redirecciona a /admin o /account según rol
```

### En Carrito
```
1. Usuario hace click "Agregar al Carrito"
2. ✅ Alert verde automático: "Producto X añadido"
3. Se cierra sola en 4 segundos
```

---

## 🛠️ Si Quieres Agregar Más Alerts

### En Una Página Existente

```tsx
'use client';

import { useProfessionalAlert, AlertsContainer } from '@/components/ui/ProfessionalAlert';

export default function MyPage() {
  const { alerts, showAlert, removeAlert } = useProfessionalAlert();
  
  const handleClick = () => {
    showAlert({
      type: 'success',
      title: '✅ Éxito',
      message: 'Tu operación fue exitosa',
      duration: 4000
    });
  };

  return (
    <>
      <AlertsContainer alerts={alerts} onRemove={removeAlert} />
      
      <button onClick={handleClick}>
        Click para ver alert
      </button>
    </>
  );
}
```

### En Un Contexto

```tsx
// En cualquier contexto (CartContext, AuthContext, etc.)
window.dispatchEvent(new CustomEvent('showNotification', {
  detail: { 
    message: 'Tu mensaje aquí',
    type: 'success' // 'success' | 'error' | 'warning' | 'info'
  }
}));
```

---

## 🎨 Tipos de Alerts

### Success (Verde) ✅
```tsx
showAlert({
  type: 'success',
  title: '✅ Éxito',
  message: 'Operación completada correctamente',
  duration: 4000
});
```

### Error (Rojo) ❌
```tsx
showAlert({
  type: 'error',
  title: '⚠️ Error',
  message: 'Algo salió mal. Intenta de nuevo.',
  duration: 5000
});
```

### Warning (Ámbar) ⚡
```tsx
showAlert({
  type: 'warning',
  title: '⚡ Atención',
  message: 'Ten cuidado con esto',
  duration: 5000
});
```

### Info (Azul) ℹ️
```tsx
showAlert({
  type: 'info',
  title: 'ℹ️ Información',
  message: 'Aquí hay algo que deberías saber',
  duration: 4000
});
```

---

## 📸 Para Agregar Imágenes en Hostinger

### Opción 1: Vía SSH (Más Rápido)

```bash
# Conectarte al servidor
ssh usuario@tu-dominio.com

# Ir a tu proyecto
cd /ruta/a/proyecto

# Abrir SQLite
sqlite3 ./database.sqlite

# Actualizar imágenes
UPDATE products 
SET images = '["https://fraganza.com/imagen1.jpg", "https://fraganza.com/imagen2.jpg"]'
WHERE slug = 'nombre-del-producto';

# Verificar
SELECT title, images FROM products WHERE slug = 'nombre-del-producto';
```

### Opción 2: Vía CMS Admin (Más Visual)

```
1. Ir a /admin en tu aplicación
2. Click en "Productos"
3. Buscar el producto
4. Click en lápiz (editar)
5. Agregar URLs de imágenes
6. Click en "Guardar"
```

### Opción 3: Script Batch (Muchos Productos)

```javascript
// actualizar-imagenes.js
const Database = require('better-sqlite3');
const db = new Database('./database.sqlite');

const updates = [
  { slug: 'sauvage', images: ['https://...', 'https://...'] },
  { slug: 'bleu-chanel', images: ['https://...', 'https://...'] }
];

updates.forEach(item => {
  db.prepare(`UPDATE products SET images = ? WHERE slug = ?`)
    .run(JSON.stringify(item.images), item.slug);
});

db.close();
console.log('✅ Actualizado');
```

---

## 📚 Documentación Disponible

### Para Entender Cómo Funciona
→ `RESUMEN-SESION-MEJORAS.md`

### Para Ver Mockups
→ `VISTA-PREVIA-ALERTS.md`

### Para Agregar Imágenes
→ `GUIA_INTEGRACION_IMAGENES_HOSTINGER.md`

### Resumen Rápido
→ `RESUMEN-EJECUTIVO.md`

### Inventario de Cambios
→ `INVENTARIO-CAMBIOS.md`

---

## ✅ Checklist: ¿Está Todo Listo?

- [ ] Visitaste `/register` y viste alert nuevo
- [ ] Visitaste `/login` y viste alert nuevo
- [ ] Agregaste un producto al carrito y viste alert
- [ ] Leíste la guía de imágenes
- [ ] Entiendes los 3 tipos de alerts
- [ ] Sabes dónde modificar alertas (opcional)

---

## 🆘 Si Algo No Funciona

### Alert no aparece
```
1. Verifica que estés en una página con ClientLayout
2. Abre consola (F12)
3. Busca errores
4. Comprueba que el provider esté en layout.tsx
```

### Texto del alert se corta
```
- No es posible, el sistema ajusta automáticamente
- El alert está limitado a ancho máximo de 28rem
```

### Los colores no se ven bien
```
- Los colores están en Tailwind
- Si cambias tema, actualiza colores en ProfessionalAlert.tsx
```

---

## 🎬 Animaciones

### Entrada
```
- Duración: 0.3 segundos
- Tipo: Spring (suave)
- Efecto: Fade in + Slide up + Zoom in
```

### Salida
```
- Duración: 0.3 segundos
- Tipo: Spring (suave)
- Efecto: Fade out + Slide up + Zoom out
```

### Barra de Progreso
```
- Animación lineal
- Duración: según duration del alert
- Efecto: Barra que se encoge de izquierda a derecha
```

---

## 🚀 Deploy en Hostinger

```
1. Git push → Repositorio
2. Hostinger redeploy → npm install
3. npm run build → Compila ✅
4. Proyecto corre con alerts nuevos
5. Usuarios ven sistema mejorado
6. Puedes agregar imágenes con la guía
```

---

## 💡 Tips

### Para Debugging
```tsx
console.log('Alert mostrado:', { type, title, message });
```

### Para Personalizar
```tsx
// En ProfessionalAlert.tsx
const colorMap = {
  success: { ... },
  error: { ... },
  warning: { ... },
  info: { ... }
};
// Cambia los colores aquí
```

### Para Agregar Más Tipos
```tsx
// En ProfessionalAlert.tsx
type AlertType = 'success' | 'error' | 'warning' | 'info' | 'custom';

// Luego agrega en colorMap
```

---

## 🎓 Ejemplos de Uso Real

### Validar Formulario
```tsx
const handleSubmit = (data) => {
  if (!data.email) {
    showAlert({
      type: 'warning',
      title: '⚡ Falta Información',
      message: 'Por favor completa el email',
      duration: 4000
    });
    return;
  }
  
  // Enviar...
  showAlert({
    type: 'success',
    title: '✅ Enviado',
    message: 'Tu mensaje fue enviado correctamente',
    duration: 4000
  });
};
```

### Manejar Errores
```tsx
try {
  await fetchData();
} catch (error) {
  showAlert({
    type: 'error',
    title: '❌ Error',
    message: error.message || 'Algo salió mal',
    duration: 5000
  });
}
```

### Feedback de Operación
```tsx
const handleDelete = async (id) => {
  showAlert({
    type: 'info',
    title: 'ℹ️ Procesando',
    message: 'Eliminando producto...',
    duration: 0 // No se cierra automáticamente
  });
  
  try {
    await deleteProduct(id);
    showAlert({
      type: 'success',
      title: '✅ Eliminado',
      message: 'Producto eliminado correctamente'
    });
  } catch {
    showAlert({
      type: 'error',
      title: '❌ Error',
      message: 'No se pudo eliminar'
    });
  }
};
```

---

## 📞 Resumen Rápido

| Necesidad | Solución |
|-----------|----------|
| Ver alert de éxito | `showAlert({ type: 'success', ... })` |
| Ver alert de error | `showAlert({ type: 'error', ... })` |
| Agregar imagen | Usa guía `GUIA_INTEGRACION_IMAGENES_HOSTINGER.md` |
| Entender arquitectura | Lee `RESUMEN-SESION-MEJORAS.md` |
| Ver mockups | Revisa `VISTA-PREVIA-ALERTS.md` |
| Referencia rápida | Consulta `RESUMEN-EJECUTIVO.md` |

---

## ✨ Lo Mejor

```
✅ Todo funciona SIN CÓDIGO ADICIONAL
✅ Comparte con el usuario inmediatamente
✅ Sistema profesional y pulido
✅ Documentación completa
✅ Fácil de mantener
✅ Fácil de extender
```

---

**¡Disfruta tu nuevo sistema de alertas!** 🎉🚀
