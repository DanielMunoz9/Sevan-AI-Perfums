// Actualización directa de productos con imágenes reales
// Este script se puede ejecutar desde el navegador en la consola de desarrollador

console.log('🔄 Iniciando actualización de imágenes de productos...');

// Mapeo de productos conocidos con sus imágenes
const actualizacionesImagenes = [
  {
    slug: 'blue-seduction-for-men--sp001',
    imagen: '/images/products/blue-seduction-for-men-antonio-banderas.jpg',
    nombre: 'Blue Seduction For Men'
  },
  {
    slug: 'boss-bottled--sp004', 
    imagen: '/images/products/boss-bottled-hugo-boss.jpg',
    nombre: 'BOSS Bottled'
  },
  {
    slug: 'cuero--sp003',
    imagen: '/images/products/cuero-jean-pascal.jpg', 
    nombre: 'Cuero Jean Pascal'
  }
];

// Función para actualizar un producto
async function actualizarProducto(actualizacion) {
  try {
    const response = await fetch('/api/products/update-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: actualizacion.slug,
        image_url: actualizacion.imagen,
        images: [actualizacion.imagen]
      })
    });
    
    if (response.ok) {
      console.log(`✅ ${actualizacion.nombre} actualizado correctamente`);
      return true;
    } else {
      console.error(`❌ Error actualizando ${actualizacion.nombre}:`, await response.text());
      return false;
    }
  } catch (error) {
    console.error(`❌ Error de red actualizando ${actualizacion.nombre}:`, error);
    return false;
  }
}

// Ejecutar actualizaciones
async function ejecutarActualizaciones() {
  let exitosos = 0;
  
  for (const actualizacion of actualizacionesImagenes) {
    console.log(`🔄 Actualizando ${actualizacion.nombre}...`);
    const exito = await actualizarProducto(actualizacion);
    
    if (exito) {
      exitosos++;
    }
    
    // Pausa entre actualizaciones
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n🎉 Actualización completada: ${exitosos}/${actualizacionesImagenes.length} productos actualizados`);
  
  // Recargar la página para ver los cambios
  if (exitosos > 0) {
    console.log('🔄 Recargando página en 3 segundos...');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}

// Iniciar el proceso
ejecutarActualizaciones();