'use client';

import { supabase } from './supabase';

// ============ INTERFACES ============

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  status: 'active' | 'banned' | 'suspended' | 'pending';
  registrationDate: string;
  lastLogin?: string;
  loginCount: number;
  isEmailVerified: boolean;
  bannedAt?: string;
  bannedBy?: string;
  banReason?: string;
  roles: UserRole[];
}

export interface UserRole {
  roleId: string;
  roleName: string;
  roleColor: string;
  assignedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface AdminAction {
  id: string;
  adminUserId: string;
  targetUserId?: string;
  actionType: string;
  details: any;
  reason?: string;
  createdAt: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  suspendedUsers: number;
  unverifiedUsers: number;
  newUsersToday: number;
  activeUsersToday: number;
}

// ============ SERVICIO DE GESTIÓN DE USUARIOS ============

class UserManagementService {

  // Obtener todos los usuarios con sus roles
  async getUsers(): Promise<AppUser[]> {
    try {
      console.log('👥 Obteniendo usuarios del sistema...');

      const { data, error } = await supabase
        .from('users_with_roles')
        .select('*')
        .order('registration_date', { ascending: false });

      if (error) {
        console.error('❌ Error obteniendo usuarios:', error);
        throw new Error(`Error obteniendo usuarios: ${error.message}`);
      }

      const users = (data || []).map(this.mapSupabaseUser);
      console.log('✅ Usuarios obtenidos:', users.length);
      return users;
    } catch (error) {
      console.error('❌ Error en servicio getUsers:', error);
      throw error;
    }
  }

  // Banear un usuario
  async banUser(userId: string, adminUserId: string, reason: string): Promise<void> {
    try {
      console.log('🚫 Baneando usuario:', userId);

      const { error } = await supabase.rpc('ban_user', {
        target_user_id: userId,
        admin_user_id: adminUserId,
        ban_reason: reason
      });

      if (error) {
        console.error('❌ Error baneando usuario:', error);
        throw new Error(`Error baneando usuario: ${error.message}`);
      }

      console.log('✅ Usuario baneado correctamente');
    } catch (error) {
      console.error('❌ Error en banUser:', error);
      throw error;
    }
  }

  // Desbanear un usuario
  async unbanUser(userId: string, adminUserId: string): Promise<void> {
    try {
      console.log('✅ Desbaneando usuario:', userId);

      const { error } = await supabase.rpc('unban_user', {
        target_user_id: userId,
        admin_user_id: adminUserId
      });

      if (error) {
        console.error('❌ Error desbaneando usuario:', error);
        throw new Error(`Error desbaneando usuario: ${error.message}`);
      }

      console.log('✅ Usuario desbaneado correctamente');
    } catch (error) {
      console.error('❌ Error en unbanUser:', error);
      throw error;
    }
  }

  // Asignar rol a usuario
  async assignRoleToUser(userId: string, roleId: string, adminUserId: string, notes?: string): Promise<void> {
    try {
      console.log('🎭 Asignando rol a usuario:', { userId, roleId });

      const { error } = await supabase
        .from('user_role_assignments')
        .insert({
          user_id: userId,
          role_id: roleId,
          assigned_by: adminUserId,
          notes: notes || 'Asignación manual desde panel de administración'
        });

      if (error) {
        console.error('❌ Error asignando rol:', error);
        throw new Error(`Error asignando rol: ${error.message}`);
      }

      // Registrar la acción
      await this.logAdminAction(adminUserId, userId, 'assign_role', { roleId, notes });

      console.log('✅ Rol asignado correctamente');
    } catch (error) {
      console.error('❌ Error en assignRoleToUser:', error);
      throw error;
    }
  }

  // Quitar rol a usuario
  async removeRoleFromUser(userId: string, roleId: string, adminUserId: string): Promise<void> {
    try {
      console.log('❌ Quitando rol a usuario:', { userId, roleId });

      const { error } = await supabase
        .from('user_role_assignments')
        .delete()
        .eq('user_id', userId)
        .eq('role_id', roleId);

      if (error) {
        console.error('❌ Error quitando rol:', error);
        throw new Error(`Error quitando rol: ${error.message}`);
      }

      // Registrar la acción
      await this.logAdminAction(adminUserId, userId, 'remove_role', { roleId });

      console.log('✅ Rol quitado correctamente');
    } catch (error) {
      console.error('❌ Error en removeRoleFromUser:', error);
      throw error;
    }
  }

  // Cambiar estado de usuario
  async changeUserStatus(userId: string, newStatus: string, adminUserId: string, reason?: string): Promise<void> {
    try {
      console.log('🔄 Cambiando estado de usuario:', { userId, newStatus });

      const { error } = await supabase
        .from('app_users')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('❌ Error cambiando estado:', error);
        throw new Error(`Error cambiando estado: ${error.message}`);
      }

      // Registrar la acción
      await this.logAdminAction(adminUserId, userId, 'change_status', { 
        newStatus, 
        reason 
      });

      console.log('✅ Estado cambiado correctamente');
    } catch (error) {
      console.error('❌ Error en changeUserStatus:', error);
      throw error;
    }
  }

  // Obtener estadísticas de usuarios
  async getUserStats(): Promise<UserStats> {
    try {
      console.log('📊 Obteniendo estadísticas de usuarios...');

      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .single();

      if (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
        // Fallback con datos por defecto
        return {
          totalUsers: 0,
          activeUsers: 0,
          bannedUsers: 0,
          suspendedUsers: 0,
          unverifiedUsers: 0,
          newUsersToday: 0,
          activeUsersToday: 0
        };
      }

      console.log('✅ Estadísticas obtenidas');
      return {
        totalUsers: data.total_users || 0,
        activeUsers: data.active_users || 0,
        bannedUsers: data.banned_users || 0,
        suspendedUsers: data.suspended_users || 0,
        unverifiedUsers: data.unverified_users || 0,
        newUsersToday: data.new_users_today || 0,
        activeUsersToday: data.active_users_today || 0
      };
    } catch (error) {
      console.error('❌ Error en getUserStats:', error);
      throw error;
    }
  }

  // Obtener historial de acciones administrativas
  async getAdminActions(limit: number = 50): Promise<AdminAction[]> {
    try {
      console.log('📜 Obteniendo historial de acciones...');

      const { data, error } = await supabase
        .from('admin_actions_log')
        .select(`
          *,
          admin:app_users!admin_user_id(full_name, email),
          target:app_users!target_user_id(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('❌ Error obteniendo historial:', error);
        throw new Error(`Error obteniendo historial: ${error.message}`);
      }

      console.log('✅ Historial obtenido:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Error en getAdminActions:', error);
      throw error;
    }
  }

  // ============ MÉTODOS PRIVADOS ============

  private mapSupabaseUser(supabaseUser: any): AppUser {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      fullName: supabaseUser.full_name || '',
      avatarUrl: supabaseUser.avatar_url,
      phone: supabaseUser.phone,
      status: supabaseUser.status,
      registrationDate: supabaseUser.registration_date,
      lastLogin: supabaseUser.last_login,
      loginCount: supabaseUser.login_count || 0,
      isEmailVerified: supabaseUser.is_email_verified || false,
      bannedAt: supabaseUser.banned_at,
      bannedBy: supabaseUser.banned_by,
      banReason: supabaseUser.ban_reason,
      roles: supabaseUser.roles || []
    };
  }

  private async logAdminAction(
    adminUserId: string, 
    targetUserId: string | null, 
    actionType: string, 
    details: any
  ): Promise<void> {
    try {
      await supabase
        .from('admin_actions_log')
        .insert({
          admin_user_id: adminUserId,
          target_user_id: targetUserId,
          action_type: actionType,
          details: details
        });
    } catch (error) {
      console.error('⚠️ Error registrando acción administrativa:', error);
      // No lanzar error para no interrumpir la operación principal
    }
  }
}

// Exportar instancia singleton
export const userManagementService = new UserManagementService();