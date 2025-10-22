/**
 * SEVAN AI PERFUMES - ALERT SYSTEM
 * ===================================
 * Sistema de alertas elegante y profesional con estilo SEVAN
 * 
 * Características:
 * - Colores oro y negro de la marca SEVAN
 * - Animaciones suaves y profesionales
 * - Posicionamiento inteligente
 * - Auto-dismiss configurable
 * - Diferentes tipos de alertas
 * - Stack de notificaciones
 * - Responsive design
 * - Sonidos opcionales
 * 
 * @author SEVAN AI Assistant
 * @version 1.0.0
 * @date 2024
 */

// ==========================================
// TIPOS E INTERFACES
// ==========================================

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type AlertPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface AlertConfig {
  type: AlertType;
  title: string;
  message?: string;
  duration?: number; // milliseconds, 0 = no auto dismiss
  position?: AlertPosition;
  showIcon?: boolean;
  showCloseButton?: boolean;
  playSound?: boolean;
  persistent?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

interface ActiveAlert extends AlertConfig {
  id: string;
  timestamp: number;
  element: HTMLElement;
}

// ==========================================
// CONFIGURACIÓN Y CONSTANTES
// ==========================================

const SEVAN_COLORS = {
  gold: '#F59E0B',
  goldLight: '#FCD34D',
  goldDark: '#D97706',
  black: '#000000',
  blackLight: '#1F2937',
  blackDark: '#0F0F0F',
  white: '#FFFFFF',
  gray: '#6B7280',
  grayLight: '#D1D5DB',
  grayDark: '#374151'
};

const ALERT_STYLES = {
  success: {
    background: `linear-gradient(135deg, ${SEVAN_COLORS.gold}, ${SEVAN_COLORS.goldDark})`,
    color: SEVAN_COLORS.black,
    border: `1px solid ${SEVAN_COLORS.goldLight}`,
    icon: '✅',
    shadow: `0 8px 32px rgba(245, 158, 11, 0.3)`
  },
  error: {
    background: `linear-gradient(135deg, #EF4444, #DC2626)`,
    color: SEVAN_COLORS.white,
    border: '1px solid #F87171',
    icon: '❌',
    shadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
  },
  warning: {
    background: `linear-gradient(135deg, #F59E0B, #D97706)`,
    color: SEVAN_COLORS.black,
    border: '1px solid #FCD34D',
    icon: '⚠️',
    shadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
  },
  info: {
    background: `linear-gradient(135deg, #3B82F6, #2563EB)`,
    color: SEVAN_COLORS.white,
    border: '1px solid #60A5FA',
    icon: 'ℹ️',
    shadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
  },
  loading: {
    background: `linear-gradient(135deg, ${SEVAN_COLORS.blackLight}, ${SEVAN_COLORS.black})`,
    color: SEVAN_COLORS.gold,
    border: `1px solid ${SEVAN_COLORS.gold}`,
    icon: '⏳',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
  }
};

const POSITION_STYLES = {
  'top-right': { top: '20px', right: '20px', transform: 'translateX(100%)' },
  'top-left': { top: '20px', left: '20px', transform: 'translateX(-100%)' },
  'bottom-right': { bottom: '20px', right: '20px', transform: 'translateX(100%)' },
  'bottom-left': { bottom: '20px', left: '20px', transform: 'translateX(-100%)' },
  'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%) translateY(-100%)' },
  'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%) translateY(100%)' }
};

// ==========================================
// CLASE PRINCIPAL DEL SISTEMA DE ALERTAS
// ==========================================

class SevanAlertSystem {
  private activeAlerts: Map<string, ActiveAlert> = new Map();
  private container: HTMLElement | null = null;
  private soundEnabled: boolean = true;
  private maxAlerts: number = 5;

  constructor() {
    this.initializeContainer();
    this.addStyles();
    console.log('🎨 [SevanAlerts] Sistema de alertas inicializado');
  }

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================

  private initializeContainer(): void {
    if (typeof window === 'undefined') return;

    // Crear contenedor si no existe
    this.container = document.getElementById('sevan-alerts-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'sevan-alerts-container';
      this.container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 999999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      `;
      document.body.appendChild(this.container);
    }
  }

  private addStyles(): void {
    if (typeof window === 'undefined') return;

    const styleId = 'sevan-alerts-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes sevanSlideInRight {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes sevanSlideInLeft {
        from {
          opacity: 0;
          transform: translateX(-100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes sevanSlideInUp {
        from {
          opacity: 0;
          transform: translateY(100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes sevanSlideInDown {
        from {
          opacity: 0;
          transform: translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes sevanFadeOut {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(0.9);
        }
      }

      @keyframes sevanPulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      @keyframes sevanSpinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .sevan-alert {
        pointer-events: auto;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px 20px;
        border-radius: 12px;
        font-weight: 600;
        min-width: 320px;
        max-width: 480px;
        margin-bottom: 12px;
        backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .sevan-alert:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2) !important;
      }

      .sevan-alert::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .sevan-alert:hover::before {
        left: 100%;
      }

      .sevan-alert-icon {
        font-size: 24px;
        flex-shrink: 0;
        animation: sevanPulse 2s infinite;
      }

      .sevan-alert-content {
        flex: 1;
        min-width: 0;
      }

      .sevan-alert-title {
        font-size: 16px;
        font-weight: 700;
        margin: 0 0 4px 0;
        line-height: 1.3;
      }

      .sevan-alert-message {
        font-size: 14px;
        font-weight: 400;
        margin: 0;
        opacity: 0.9;
        line-height: 1.4;
      }

      .sevan-alert-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        opacity: 0.7;
        transition: all 0.2s;
        flex-shrink: 0;
      }

      .sevan-alert-close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
      }

      .sevan-alert-spinner {
        width: 24px;
        height: 24px;
        border: 3px solid rgba(245, 158, 11, 0.3);
        border-top: 3px solid #F59E0B;
        border-radius: 50%;
        animation: sevanSpinner 1s linear infinite;
        flex-shrink: 0;
      }

      .sevan-alert-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.3);
        transition: width linear;
      }

      @media (max-width: 480px) {
        .sevan-alert {
          min-width: 280px;
          max-width: calc(100vw - 40px);
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // MÉTODOS PÚBLICOS
  // ==========================================

  success(title: string, message?: string, options?: Partial<AlertConfig>): string {
    return this.show({
      type: 'success',
      title,
      message,
      duration: 4000,
      position: 'top-right',
      showIcon: true,
      showCloseButton: true,
      ...options
    });
  }

  error(title: string, message?: string, options?: Partial<AlertConfig>): string {
    return this.show({
      type: 'error',
      title,
      message,
      duration: 6000,
      position: 'top-right',
      showIcon: true,
      showCloseButton: true,
      ...options
    });
  }

  warning(title: string, message?: string, options?: Partial<AlertConfig>): string {
    return this.show({
      type: 'warning',
      title,
      message,
      duration: 5000,
      position: 'top-right',
      showIcon: true,
      showCloseButton: true,
      ...options
    });
  }

  info(title: string, message?: string, options?: Partial<AlertConfig>): string {
    return this.show({
      type: 'info',
      title,
      message,
      duration: 4000,
      position: 'top-right',
      showIcon: true,
      showCloseButton: true,
      ...options
    });
  }

  loading(title: string, message?: string, options?: Partial<AlertConfig>): string {
    return this.show({
      type: 'loading',
      title,
      message,
      duration: 0, // No auto dismiss for loading
      position: 'top-right',
      showIcon: false,
      showCloseButton: false,
      persistent: true,
      ...options
    });
  }

  // ==========================================
  // MÉTODO PRINCIPAL PARA MOSTRAR ALERTAS
  // ==========================================

  show(config: AlertConfig): string {
    if (!this.container) {
      console.warn('🚨 [SevanAlerts] Contenedor no inicializado');
      return '';
    }

    // Generar ID único
    const id = `sevan-alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Verificar límite de alertas
    if (this.activeAlerts.size >= this.maxAlerts) {
      this.removeOldestAlert();
    }

    // Crear elemento de alerta
    const alertElement = this.createAlertElement(id, config);
    
    // Posicionar y agregar al DOM
    this.positionAlert(alertElement, config.position || 'top-right');
    this.container.appendChild(alertElement);

    // Registrar alerta activa
    const alert: ActiveAlert = {
      ...config,
      id,
      timestamp: Date.now(),
      element: alertElement
    };
    this.activeAlerts.set(id, alert);

    // Configurar animación de entrada
    this.animateIn(alertElement, config.position || 'top-right');

    // Reproducir sonido si está habilitado
    if (config.playSound && this.soundEnabled) {
      this.playSound(config.type);
    }

    // Configurar auto-dismiss
    if (config.duration && config.duration > 0 && !config.persistent) {
      this.scheduleRemoval(id, config.duration);
    }

    // Configurar eventos
    if (config.onClick) {
      alertElement.addEventListener('click', config.onClick);
    }

    console.log(`🎨 [SevanAlerts] ${config.type.toUpperCase()}: ${config.title}`);
    return id;
  }

  // ==========================================
  // CREACIÓN DE ELEMENTOS
  // ==========================================

  private createAlertElement(id: string, config: AlertConfig): HTMLElement {
    const alert = document.createElement('div');
    alert.className = 'sevan-alert';
    alert.id = id;

    const style = ALERT_STYLES[config.type];
    alert.style.cssText = `
      background: ${style.background};
      color: ${style.color};
      border: ${style.border};
      box-shadow: ${style.shadow};
    `;

    // Contenido del icono
    let iconContent = '';
    if (config.showIcon && config.type !== 'loading') {
      iconContent = `<div class="sevan-alert-icon">${style.icon}</div>`;
    } else if (config.type === 'loading') {
      iconContent = '<div class="sevan-alert-spinner"></div>';
    }

    // Contenido del texto
    const messageContent = config.message ? 
      `<p class="sevan-alert-message">${config.message}</p>` : '';

    // Botón de cierre
    const closeButton = config.showCloseButton ? 
      `<button class="sevan-alert-close" onclick="sevanAlerts.remove('${id}')">&times;</button>` : '';

    // Barra de progreso para auto-dismiss
    const progressBar = config.duration && config.duration > 0 && !config.persistent ?
      `<div class="sevan-alert-progress" style="animation-duration: ${config.duration}ms;"></div>` : '';

    alert.innerHTML = `
      ${iconContent}
      <div class="sevan-alert-content">
        <h4 class="sevan-alert-title">${config.title}</h4>
        ${messageContent}
      </div>
      ${closeButton}
      ${progressBar}
    `;

    return alert;
  }

  // ==========================================
  // POSICIONAMIENTO Y ANIMACIONES
  // ==========================================

  private positionAlert(element: HTMLElement, position: AlertPosition): void {
    const styles = POSITION_STYLES[position];
    Object.assign(element.style, {
      position: 'fixed',
      ...styles,
      zIndex: '999999'
    });
  }

  private animateIn(element: HTMLElement, position: AlertPosition): void {
    const animations = {
      'top-right': 'sevanSlideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      'bottom-right': 'sevanSlideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      'top-left': 'sevanSlideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      'bottom-left': 'sevanSlideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      'top-center': 'sevanSlideInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      'bottom-center': 'sevanSlideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    element.style.animation = animations[position];
    
    // Resetear transform después de la animación
    setTimeout(() => {
      element.style.transform = 'none';
    }, 300);
  }

  // ==========================================
  // GESTIÓN DE ALERTAS
  // ==========================================

  remove(id: string): boolean {
    const alert = this.activeAlerts.get(id);
    if (!alert) return false;

    // Animación de salida
    alert.element.style.animation = 'sevanFadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      if (alert.element.parentNode) {
        alert.element.parentNode.removeChild(alert.element);
      }
      this.activeAlerts.delete(id);
      
      if (alert.onClose) {
        alert.onClose();
      }
    }, 300);

    console.log(`🗑️ [SevanAlerts] Alerta removida: ${id}`);
    return true;
  }

  removeAll(): void {
    console.log('🧹 [SevanAlerts] Removiendo todas las alertas');
    
    this.activeAlerts.forEach((alert) => {
      this.remove(alert.id);
    });
  }

  private removeOldestAlert(): void {
    const oldest = Array.from(this.activeAlerts.values())
      .sort((a, b) => a.timestamp - b.timestamp)[0];
    
    if (oldest) {
      this.remove(oldest.id);
    }
  }

  private scheduleRemoval(id: string, duration: number): void {
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  // ==========================================
  // SONIDOS
  // ==========================================

  private playSound(type: AlertType): void {
    try {
      // Frecuencias para diferentes tipos de alerta
      const frequencies = {
        success: [523.25, 659.25, 783.99], // Do, Mi, Sol
        error: [369.99, 293.66], // Fa#, Re
        warning: [440, 554.37], // La, Do#
        info: [523.25, 659.25], // Do, Mi
        loading: [440] // La
      };

      const freq = frequencies[type];
      if (freq && this.soundEnabled) {
        this.generateBeep(freq, 200);
      }
    } catch (err) {
      // Silently fail if audio context is not supported
    }
  }

  private generateBeep(frequencies: number[], duration: number): void {
    if (typeof window === 'undefined') return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (index + 1) * 0.1);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + (index + 1) * 0.1);
      });
    } catch (err) {
      // Audio not supported
    }
  }

  // ==========================================
  // CONFIGURACIÓN
  // ==========================================

  setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    console.log(`🔊 [SevanAlerts] Sonidos ${enabled ? 'habilitados' : 'deshabilitados'}`);
  }

  setMaxAlerts(max: number): void {
    this.maxAlerts = Math.max(1, Math.min(max, 10));
    console.log(`📊 [SevanAlerts] Máximo de alertas: ${this.maxAlerts}`);
  }

  // ==========================================
  // UTILIDADES
  // ==========================================

  getActiveAlerts(): string[] {
    return Array.from(this.activeAlerts.keys());
  }

  getStats(): { total: number; byType: Record<AlertType, number> } {
    const byType: Record<AlertType, number> = {
      success: 0,
      error: 0,
      warning: 0,
      info: 0,
      loading: 0
    };

    this.activeAlerts.forEach(alert => {
      byType[alert.type]++;
    });

    return {
      total: this.activeAlerts.size,
      byType
    };
  }
}

// ==========================================
// INSTANCIA GLOBAL Y EXPORTACIONES
// ==========================================

export const sevanAlerts = new SevanAlertSystem();

// Exponer en window para uso global
if (typeof window !== 'undefined') {
  (window as any).sevanAlerts = sevanAlerts;
}

console.log('🎨 [SEVAN Alerts] Sistema de alertas cargado correctamente');

export default sevanAlerts;