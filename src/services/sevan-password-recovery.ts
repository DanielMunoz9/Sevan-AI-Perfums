// 🔧 SERVICIO DE RECUPERACIÓN PERSONALIZADO CON EMAILJS
// Reemplaza el email básico de Supabase con diseño SEVAN

import { supabase } from '../lib/supabase';
import { sevanEmailJS } from './sevan-emailjs-service';

interface RecoveryResult {
  success: boolean;
  error?: string;
}

class SevanPasswordRecoveryService {
  
  private config = {
    recoveryUrl: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : 'http://localhost:3001/reset-password',
    tokenExpiry: 15 * 60 * 1000, // 15 minutos
    fromName: 'SEVAN Security',
    fromEmail: 'sevan7625@gmail.com'
  };

  // 📧 ENVIAR EMAIL DE RECUPERACIÓN PERSONALIZADO
  async sendPasswordRecovery(email: string): Promise<RecoveryResult> {
    try {
      console.log('🔒 Iniciando recuperación personalizada para:', email);

      // 🔐 GENERAR TOKEN DE RECUPERACIÓN SEGURO
      const resetToken = this.generateSecureToken();
      const expiryTime = Date.now() + this.config.tokenExpiry;
      
      // 💾 GUARDAR TOKEN EN SUPABASE (tabla personalizada)
      const { error: saveError } = await supabase
        .from('password_reset_tokens')
        .upsert({
          email: email,
          token: resetToken,
          expires_at: new Date(expiryTime).toISOString(),
          created_at: new Date().toISOString(),
          used: false
        });

      if (saveError) {
        console.log('❌ Error guardando token:', saveError);
        // Fallback a método nativo de Supabase
        return await this.fallbackSupabaseRecovery(email);
      }

      // 📧 ENVIAR EMAIL PERSONALIZADO VIA EMAILJS
      const emailSent = await this.sendCustomRecoveryEmail(email, resetToken);
      
      if (emailSent) {
        console.log('✅ Email de recuperación enviado exitosamente');
        return { success: true };
      } else {
        console.log('⚠️ Falló envío personalizado, usando fallback');
        return await this.fallbackSupabaseRecovery(email);
      }

    } catch (error) {
      console.log('❌ Error en recuperación personalizada:', error);
      // Siempre tener fallback
      return await this.fallbackSupabaseRecovery(email);
    }
  }

  // 🎨 ENVIAR EMAIL CON DISEÑO SEVAN
  private async sendCustomRecoveryEmail(email: string, token: string): Promise<boolean> {
    try {
      const resetUrl = `${this.config.recoveryUrl}?token=${token}`;
      
      const subject = '🔒 Recuperación de Contraseña - SEVAN Perfumes';
      
      const message = `
¡Hola!

Has solicitado restablecer la contraseña de tu cuenta SEVAN Perfumes.

🔐 TU CÓDIGO DE RECUPERACIÓN:
${token}

🔗 ENLACE DIRECTO:
${resetUrl}

⚡ IMPORTANTE:
• Este código expira en 15 minutos
• Úsalo solo si solicitaste el cambio
• Si no fuiste tú, ignora este correo

¡Tu seguridad es nuestra prioridad!

Saludos,
Equipo SEVAN Perfumes
      `;

      return await sevanEmailJS.sendEmailJS(email, subject, message);
      
    } catch (error) {
      console.log('❌ Error enviando email personalizado:', error);
      return false;
    }
  }

  // 🔄 FALLBACK A SUPABASE NATIVO
  private async fallbackSupabaseRecovery(email: string): Promise<RecoveryResult> {
    try {
      console.log('🔄 Usando recuperación nativa de Supabase...');
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: this.config.recoveryUrl,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };

    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // 🔐 VALIDAR TOKEN PERSONALIZADO
  async validateResetToken(token: string): Promise<{valid: boolean, email?: string}> {
    try {
      const { data, error } = await supabase
        .from('password_reset_tokens')
        .select('*')
        .eq('token', token)
        .eq('used', false)
        .single();

      if (error || !data) {
        return { valid: false };
      }

      // Verificar expiración
      const now = new Date();
      const expiry = new Date(data.expires_at);
      
      if (now > expiry) {
        console.log('🕒 Token expirado');
        return { valid: false };
      }

      return { valid: true, email: data.email };

    } catch (error) {
      console.log('❌ Error validando token:', error);
      return { valid: false };
    }
  }

  // ✅ MARCAR TOKEN COMO USADO
  async markTokenAsUsed(token: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('password_reset_tokens')
        .update({ 
          used: true, 
          used_at: new Date().toISOString() 
        })
        .eq('token', token);

      return !error;

    } catch (error) {
      console.log('❌ Error marcando token:', error);
      return false;
    }
  }

  // 🔐 GENERAR TOKEN SEGURO
  private generateSecureToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    
    for (let i = 0; i < 8; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return token;
  }

  // 🔧 CONFIGURAR URL DE RECUPERACIÓN
  setRecoveryUrl(url: string) {
    this.config.recoveryUrl = url;
  }

  // 📋 OBTENER CONFIGURACIÓN
  getConfig() {
    return { ...this.config };
  }
}

// 🌟 INSTANCIA GLOBAL
export const sevanPasswordRecovery = new SevanPasswordRecoveryService();

// 📝 SQL PARA CREAR TABLA (ejecutar en Supabase SQL Editor)
export const CREATE_TOKENS_TABLE_SQL = `
-- Tabla para tokens de recuperación personalizados
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(20) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_email ON password_reset_tokens(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires ON password_reset_tokens(expires_at);

-- Política RLS (Row Level Security)
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Limpiar tokens expirados automáticamente (opcional)
-- Ejecutar esto como función o cron job
DELETE FROM password_reset_tokens 
WHERE expires_at < NOW() - INTERVAL '1 day';
`;

export default SevanPasswordRecoveryService;