// Estilos CSS profesionales para alertas y notificaciones
// Este archivo contiene estilos personalizados que complementan a Tailwind CSS

export const alertStyles = {
  // Alertas de éxito mejoradas
  success: `
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.2) 100%);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: rgb(34, 197, 94);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.1);
    border-radius: 12px;
    padding: 16px 20px;
    animation: slideInFromTop 0.3s ease-out;
    position: relative;
    overflow: hidden;
  `,
  
  // Alertas de error profesionales
  error: `
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.2) 100%);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: rgb(239, 68, 68);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(239, 68, 68, 0.1);
    border-radius: 12px;
    padding: 16px 20px;
    animation: slideInFromTop 0.3s ease-out;
    position: relative;
    overflow: hidden;
  `,
  
  // Alertas de advertencia doradas (brand colors)
  warning: `
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.2) 100%);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: rgb(245, 158, 11);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(245, 158, 11, 0.1);
    border-radius: 12px;
    padding: 16px 20px;
    animation: slideInFromTop 0.3s ease-out;
    position: relative;
    overflow: hidden;
  `,
  
  // Alertas de información
  info: `
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.2) 100%);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: rgb(59, 130, 246);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1);
    border-radius: 12px;
    padding: 16px 20px;
    animation: slideInFromTop 0.3s ease-out;
    position: relative;
    overflow: hidden;
  `,
  
  // Alertas de carga/loading doradas
  loading: `
    background: linear-gradient(135deg, rgba(75, 85, 99, 0.8) 0%, rgba(31, 41, 55, 0.9) 100%);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: rgb(245, 158, 11);
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 20px;
    animation: pulseGlow 2s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  `
};

export const modalStyles = {
  // Modal backdrop profesional
  backdrop: `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 9999;
    animation: fadeIn 0.2s ease-out;
  `,
  
  // Modal container con diseño premium
  container: `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, rgb(31, 41, 55) 0%, rgb(17, 24, 39) 100%);
    border: 1px solid rgba(245, 158, 11, 0.2);
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    animation: slideInFromCenter 0.3s ease-out;
    z-index: 10000;
  `
};

export const buttonStyles = {
  // Botón principal dorado (brand)
  primary: `
    background: linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(217, 119, 6) 100%);
    color: rgb(0, 0, 0);
    font-weight: 700;
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    position: relative;
    overflow: hidden;
  `,
  
  // Botón secundario
  secondary: `
    background: linear-gradient(135deg, rgb(75, 85, 99) 0%, rgb(55, 65, 81) 100%);
    color: rgb(255, 255, 255);
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 10px;
    border: 1px solid rgba(156, 163, 175, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `,
  
  // Botón de peligro/eliminar
  danger: `
    background: linear-gradient(135deg, rgb(239, 68, 68) 0%, rgb(220, 38, 38) 100%);
    color: rgb(255, 255, 255);
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  `,
  
  // Botón de éxito
  success: `
    background: linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(22, 163, 74) 100%);
    color: rgb(255, 255, 255);
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  `
};

// Animaciones CSS personalizadas
export const animations = `
  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInFromCenter {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.2);
    }
    50% {
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.4);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  .shimmer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(245, 158, 11, 0.1),
      transparent
    );
    background-size: 200px 100%;
    animation: shimmer 2s infinite;
  }
`;

// Utilidad para aplicar estilos de alerta
export const applyAlertStyle = (type: 'success' | 'error' | 'warning' | 'info' | 'loading') => {
  return alertStyles[type];
};

// Utilidad para crear alertas personalizadas
export const createCustomAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  // Crear elemento de alerta
  const alertElement = document.createElement('div');
  alertElement.innerHTML = `
    <div style="${applyAlertStyle(type)}" class="custom-alert">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 20px;">
          ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
        </div>
        <div style="flex: 1; font-weight: 600;">
          ${message}
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px; opacity: 0.7; hover: opacity: 1;">
          ×
        </button>
      </div>
    </div>
  `;
  
  // Agregar al DOM
  document.body.appendChild(alertElement);
  
  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (alertElement.parentNode) {
      alertElement.remove();
    }
  }, 5000);
  
  return alertElement;
};

// Utilidad para reemplazar alerts del navegador
export const enhancedAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  // En lugar de usar alert() del navegador, usar nuestro sistema personalizado
  return createCustomAlert(message, type);
};

// Utilidad para confirmar acciones con modal personalizado
export const enhancedConfirm = (message: string, onConfirm: () => void, onCancel?: () => void) => {
  const modalElement = document.createElement('div');
  modalElement.innerHTML = `
    <div style="${modalStyles.backdrop}" class="modal-backdrop">
      <div style="${modalStyles.container}" class="modal-container">
        <div style="padding: 24px;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
            <div style="font-size: 32px;">⚠️</div>
            <div>
              <h3 style="color: rgb(245, 158, 11); font-size: 20px; font-weight: 700; margin-bottom: 8px;">
                Confirmar Acción
              </h3>
              <p style="color: rgb(156, 163, 175); margin: 0;">
                ${message}
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button class="cancel-btn" style="${buttonStyles.secondary}">
              Cancelar
            </button>
            <button class="confirm-btn" style="${buttonStyles.danger}">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners
  const cancelBtn = modalElement.querySelector('.cancel-btn');
  const confirmBtn = modalElement.querySelector('.confirm-btn');
  
  cancelBtn?.addEventListener('click', () => {
    modalElement.remove();
    if (onCancel) onCancel();
  });
  
  confirmBtn?.addEventListener('click', () => {
    modalElement.remove();
    onConfirm();
  });
  
  // Cerrar con ESC o click fuera
  modalElement.addEventListener('click', (e) => {
    if (e.target === modalElement) {
      modalElement.remove();
      if (onCancel) onCancel();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalElement.remove();
      if (onCancel) onCancel();
    }
  });
  
  document.body.appendChild(modalElement);
};