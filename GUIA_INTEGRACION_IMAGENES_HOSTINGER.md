# 🖼️ GUÍA: Integrar Imágenes por URL en Hostinger

## 📍 Problema Actual
Tienes productos con imágenes que necesitan ser reemplazadas por URLs reales (como hicimos con las mujeres).

## ✅ SOLUCIÓN: Cómo Agregar URLs de Imágenes en Hostinger

### **Opción 1: Directamente en la BD (Más Rápido)**

1. **SSH a tu servidor Hostinger**
   ```bash
   ssh usuario@tu-dominio.com
   cd /ruta/a/proyecto
   ```

2. **Acceder a la BD SQLite**
   ```bash
   sqlite3 ./database.sqlite
   ```

3. **Actualizar imágenes de un producto**
   ```sql
   -- Buscar el producto
   SELECT id, title, slug, images FROM products WHERE title LIKE '%Sauvage%' LIMIT 1;
   
   -- Actualizar con nuevas URLs
   UPDATE products 
   SET images = '["https://fraganza.com/image1.jpg", "https://fraganza.com/image2.jpg"]'
   WHERE slug = 'inspirado-en-dior-sauvage';
   ```

### **Opción 2: Mediante el CMS Admin (Más Visual)**

1. **Ir a `/admin`** en tu aplicación
2. Click en **"Productos"**
3. Buscar el producto
4. Click en **"Editar"** (lápiz)
5. En la sección de imágenes:
   - Agregar URLs completas
   - Una URL por línea o separadas por comas
6. Click en **"Guardar"**

### **Opción 3: Batch Update (Para Muchos Productos)**

1. **Crear un archivo `actualizar-imagenes-hostinger.js`** en Hostinger:
   ```javascript
   const Database = require('better-sqlite3');
   const db = new Database('./database.sqlite');
   
   const imageUpdates = [
     { slug: 'inspirado-en-dior-sauvage', images: ['https://fraganza.com/sauvage1.jpg', 'https://fraganza.com/sauvage2.jpg'] },
     { slug: 'inspirado-en-bleu-de-chanel', images: ['https://notino.com/bleu1.jpg', 'https://notino.com/bleu2.jpg'] },
     // ... más productos
   ];
   
   imageUpdates.forEach(item => {
     db.prepare(`
       UPDATE products 
       SET images = ? 
       WHERE slug = ?
     `).run(JSON.stringify(item.images), item.slug);
   });
   
   console.log('✅ Imágenes actualizadas');
   db.close();
   ```

2. **Ejecutar en SSH**
   ```bash
   node actualizar-imagenes-hostinger.js
   ```

---

## 🌐 Dónde Obtener URLs de Imágenes

### **Sitios Recomendados:**
1. **Notino** - https://www.notino.com
2. **Fraganza** - https://www.fraganza.com
3. **Perfumes Colombia** - https://www.perfumescolombia.com
4. **Iris Fragancias** - https://www.irisfragancias.com

### **Cómo Extraer URLs:**
1. Abre el producto en el navegador
2. Click derecho en la imagen → "Copiar URL de la imagen"
3. Comprueba que la URL sea directa (termina en `.jpg`, `.png`, etc.)

### **Ejemplo de URLs válidas:**
```
https://fraganza.com/media/catalog/product/cache/1/image/900x900/9df78eab33525d08d6e5fb8d27136e95/d/i/dior-sauvage-edt-100ml-1.jpg
https://notino.com/images/product/m/dior-sauvage-eau-de-toilette-100ml_50262900.jpg
```

---

## 🔄 Flujo en Hostinger

### **Para agregar imágenes nuevas:**

1. **Buscar una imagen de alta calidad** en Google, Notino, Fraganza, etc.
2. **Copiar la URL directa** (click derecho → Copiar enlace de imagen)
3. **Actualizar en BD:**
   ```sql
   UPDATE products 
   SET images = '[
     "https://url-imagen-1.jpg",
     "https://url-imagen-2.jpg"
   ]'
   WHERE slug = 'nombre-producto';
   ```
4. **Recargar la página** y verificar que aparezcan

---

## ⚠️ Consideraciones Importantes

### **1. Formatos Soportados**
- ✅ JPG, PNG, WebP
- ❌ NO usar URLs de drive.google.com o imgur que expiran

### **2. URLs deben ser públicas**
```
❌ Mal: https://private.dropbox.com/...
✅ Bien: https://notino.com/images/product/...
```

### **3. HTTPS obligatorio**
```
❌ Mal: http://ejemplo.com/imagen.jpg
✅ Bien: https://ejemplo.com/imagen.jpg
```

### **4. Máximo 2 imágenes por producto**
El sistema está limitado a `MAX_GALLERY_IMAGES = 2`

---

## 🛠️ Script Rápido para Hostinger

Copia este script en tu terminal SSH:

```bash
sqlite3 /ruta/a/database.sqlite << EOF
-- Ejemplo: Actualizar un producto
UPDATE products 
SET images = '["https://fraganza.com/good-girl-1.jpg", "https://fraganza.com/good-girl-2.jpg"]'
WHERE slug = 'inspirado-en-good-girl-carolina-herrera';

-- Verificar
SELECT title, images FROM products WHERE slug LIKE '%good-girl%' LIMIT 1;
EOF
```

---

## 📊 Template SQL para Actualizar Múltiples

```sql
UPDATE products SET images = '[
  "https://fraganza.com/chanel-no5-1.jpg",
  "https://fraganza.com/chanel-no5-2.jpg"
]' WHERE slug LIKE '%chanel-no-5%';

UPDATE products SET images = '[
  "https://notino.com/dior-bleu-1.jpg",
  "https://notino.com/dior-bleu-2.jpg"
]' WHERE slug LIKE '%bleu-de-chanel%';

-- ... repetir para cada producto
```

---

## ✅ Verificación

Después de actualizar:

1. **En SSH:**
   ```bash
   sqlite3 database.sqlite "SELECT COUNT(*) FROM products WHERE images LIKE '%https%';"
   ```

2. **En la web:**
   - Busca el producto
   - Verifica que las imágenes carguen correctamente
   - Prueba en diferentes dispositivos (mobile, tablet, desktop)

---

## 🆘 Solución de Problemas

| Problema | Solución |
|----------|----------|
| Imágenes no cargan | Verifica que URL sea HTTPS y pública |
| URLs vacías | Usa `SELECT * FROM products WHERE images = '[]'` para encontrarlas |
| Imágenes borrosas | Cambia por URLs de mayor resolución |
| 404 en imágenes | Comprueba que el sitio no requiera autenticación |

---

## 📝 Checklist Final

- [ ] Identificaste dónde obtener URLs
- [ ] Copiaste URLs con HTTPS
- [ ] Actualizaste max 2 imágenes por producto
- [ ] Verificaste que las imágenes carguen
- [ ] Probaste en mobile/tablet/desktop
- [ ] Hiciste backup de la BD antes de actualizar

**¡Listo! Ya tienes imágenes reales en Hostinger.** 🎉
