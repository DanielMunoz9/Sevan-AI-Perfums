import { createClient } from '@supabase/supabase-js'
import { generateRandomCode } from '@/lib/utils'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export class PasswordRecoveryService {
  
  // 🔐 GENERAR TOKEN DE RECUPERACIÓN
  async generateRecoveryToken(email: string): Promise<{
    success: boolean;
    token?: string;
    expiresAt?: Date;
    error?: string;
  }> {
    try {
      // Verificar si el usuario existe
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, email, nombre')
        .eq('email', email)
        .single();

      if (userError || !user) {
        return {
          success: false,
          error: 'No se encontró una cuenta con este email'
        };
      }

      // Generar token único de 6 dígitos
      const token = generateRandomCode(6);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

      // Guardar token en la base de datos
      const { error: tokenError } = await supabase
        .from('password_recovery_tokens')
        .upsert({
          email,
          token,
          expires_at: expiresAt.toISOString(),
          used: false,
          created_at: new Date().toISOString()
        });

      if (tokenError) {
        console.error('Error saving token:', tokenError);
        return {
          success: false,
          error: 'Error al generar el token de recuperación'
        };
      }

      return {
        success: true,
        token,
        expiresAt
      };

    } catch (error) {
      console.error('Password recovery error:', error);
      return {
        success: false,
        error: 'Error interno del sistema'
      };
    }
  }

  // 📧 ENVIAR EMAIL DE RECUPERACIÓN
  async sendRecoveryEmail(email: string, token: string, userName?: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Usar el servicio EmailJS ya configurado
      const emailData = {
        to_email: email,
        from_name: 'SEVAN Security',
        from_email: 'sevan7625@gmail.com',
        reply_to: 'sevan7625@gmail.com',
        subject: 'SEVAN - Recuperación de Contraseña',
        message: `Código de recuperación: ${token}`,
        recovery_code: token,
        user_name: userName || 'Usuario',
        timestamp: new Date().toLocaleString('es-ES'),
        expiry_time: '15 minutos',
        security_note: 'Si no solicitaste este cambio, ignora este email.'
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_9vua9zf',
          template_id: 'template_jco0gnl', // Password Reset template
          user_id: '_JMzGyt6e8bFodIvJ',
          template_params: emailData
        })
      });

      if (response.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Error al enviar el email de recuperación'
        };
      }

    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        error: 'Error al enviar el email de recuperación'
      };
    }
  }

  // 🔍 VALIDAR TOKEN DE RECUPERACIÓN
  async validateRecoveryToken(email: string, token: string): Promise<{
    success: boolean;
    expired?: boolean;
    used?: boolean;
    error?: string;
  }> {
    try {
      const { data: tokenData, error } = await supabase
        .from('password_recovery_tokens')
        .select('*')
        .eq('email', email)
        .eq('token', token)
        .eq('used', false)
        .single();

      if (error || !tokenData) {
        return {
          success: false,
          error: 'Token inválido'
        };
      }

      // Verificar si ha expirado
      const now = new Date();
      const expiresAt = new Date(tokenData.expires_at);

      if (now > expiresAt) {
        return {
          success: false,
          expired: true,
          error: 'El token ha expirado'
        };
      }

      return {
        success: true
      };

    } catch (error) {
      console.error('Token validation error:', error);
      return {
        success: false,
        error: 'Error al validar el token'
      };
    }
  }

  // 🔄 CAMBIAR CONTRASEÑA CON TOKEN
  async resetPassword(email: string, token: string, newPassword: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Validar token primero
      const validation = await this.validateRecoveryToken(email, token);
      if (!validation.success) {
        return validation;
      }

      // Actualizar contraseña del usuario
      const { error: updateError } = await supabase
        .from('users')
        .update({
          password: newPassword, // En producción, esto debería estar hasheado
          updated_at: new Date().toISOString()
        })
        .eq('email', email);

      if (updateError) {
        console.error('Password update error:', updateError);
        return {
          success: false,
          error: 'Error al actualizar la contraseña'
        };
      }

      // Marcar token como usado
      await supabase
        .from('password_recovery_tokens')
        .update({ used: true })
        .eq('email', email)
        .eq('token', token);

      return {
        success: true
      };

    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Error al cambiar la contraseña'
      };
    }
  }

  // 🧹 LIMPIAR TOKENS EXPIRADOS (ejecutar periódicamente)
  async cleanupExpiredTokens(): Promise<void> {
    try {
      const now = new Date().toISOString();
      await supabase
        .from('password_recovery_tokens')
        .delete()
        .lt('expires_at', now);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();