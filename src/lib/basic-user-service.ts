// 🎯 SERVICIO BÁSICO DE GESTIÓN DE USUARIOS REALES
// =================================================

import { supabase } from './supabase';

export interface AppUser {
  id: string;
  email: string;
  full_name?: string;
  status: 'active' | 'banned' | 'suspended';
  registration_date: string;
  is_email_verified: boolean;
  created_at: string;
  roles?: UserRole[];
}

export interface UserRole {
  role_id: string;
  role_name: string;
  role_color?: string;
  assigned_at: string;
}

export interface UserRoleAssignment {
  id: string;
  user_id: string;
  role_id: string;
  assigned_at: string;
  is_active: boolean;
}

export interface UserStats {
  total_users: number;
  active_users: number;
  banned_users: number;
  verified_users: number;
  new_users_today: number;
}

class BasicUserManagementService {
  // 👥 OBTENER TODOS LOS USUARIOS
  async getUsers(): Promise<AppUser[]> {
    try {
      console.log('🔍 Obteniendo usuarios desde app_users...');
      
      const { data: users, error } = await supabase
        .from('app_users')
        .select('*')
        .order('registration_date', { ascending: false });

      if (error) {
        console.error('❌ Error obteniendo usuarios:', error);
        throw error;
      }

      console.log(`✅ ${users?.length || 0} usuarios obtenidos`);
      
      // Obtener roles para cada usuario
      const usersWithRoles = await Promise.all((users || []).map(async (user) => {
        const userRoles = await this.getUserRoles(user.id);
        return {
          ...user,
          roles: userRoles
        };
      }));

      return usersWithRoles;
    } catch (error) {
      console.error('💥 Error en getUsers:', error);
      throw error;
    }
  }

  // 🎭 OBTENER ROLES DE UN USUARIO
  async getUserRoles(userId: string): Promise<UserRole[]> {
    try {
      const { data, error } = await supabase
        .from('user_role_assignments')
        .select(`
          role_id,
          assigned_at,
          roles!user_role_assignments_role_id_fkey(
            id,
            name,
            color
          )
        `)
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) {
        console.error('❌ Error obteniendo roles del usuario:', error);
        return [];
      }

      return (data || []).map((item: any) => ({
        role_id: item.role_id,
        role_name: item.roles?.name || 'Sin nombre',
        role_color: item.roles?.color || '#gray',
        assigned_at: item.assigned_at
      }));
    } catch (error) {
      console.error('💥 Error en getUserRoles:', error);
      return [];
    }
  }

  // ➕ ASIGNAR ROL A USUARIO
  async assignRoleToUser(userId: string, roleId: string): Promise<boolean> {
    try {
      console.log(`🎭 [SERVICIO] Iniciando asignación de rol...`);
      console.log(`📝 Usuario ID: ${userId}`);
      console.log(`📝 Rol ID: ${roleId}`);

      // Verificar que el usuario existe
      const { data: userExists, error: userError } = await supabase
        .from('app_users')
        .select('id, email')
        .eq('id', userId)
        .single();

      if (userError || !userExists) {
        console.error('❌ Usuario no encontrado:', userError);
        throw new Error(`Usuario con ID ${userId} no encontrado`);
      }
      
      console.log(`✅ Usuario encontrado: ${userExists.email}`);

      // Verificar que el rol existe
      const { data: roleExists, error: roleError } = await supabase
        .from('roles')
        .select('id, name')
        .eq('id', roleId)
        .single();

      if (roleError || !roleExists) {
        console.error('❌ Rol no encontrado:', roleError);
        throw new Error(`Rol con ID ${roleId} no encontrado`);
      }
      
      console.log(`✅ Rol encontrado: ${roleExists.name}`);

      // Verificar si ya existe la asignación
      const { data: existingAssignment, error: checkError } = await supabase
        .from('user_role_assignments')
        .select('*')
        .eq('user_id', userId)
        .eq('role_id', roleId)
        .eq('is_active', true)
        .single();

      if (existingAssignment) {
        console.log('⚠️ El usuario ya tiene este rol asignado (activo)');
        return true;
      }

      // Insertar nueva asignación
      console.log('📝 Insertando nueva asignación...');
      const { data, error } = await supabase
        .from('user_role_assignments')
        .insert({
          user_id: userId,
          role_id: roleId,
          // assigned_by debe ser UUID o null - omitimos este campo
          notes: `Asignado desde CMS - ${roleExists.name}`,
          is_active: true
        })
        .select();

      if (error) {
        console.error('❌ Error insertando asignación:', error);
        throw error;
      }

      console.log('✅ Asignación insertada exitosamente:', data);
      return true;
    } catch (error) {
      console.error('💥 Error completo en assignRoleToUser:', error);
      throw error;
    }
  }

  // ➖ QUITAR ROL DE USUARIO
  async removeRoleFromUser(userId: string, roleId: string): Promise<boolean> {
    try {
      console.log(`🗑️ Quitando rol ${roleId} del usuario ${userId}...`);

      const { error } = await supabase
        .from('user_role_assignments')
        .delete()
        .eq('user_id', userId)
        .eq('role_id', roleId);

      if (error) {
        console.error('❌ Error quitando rol:', error);
        throw error;
      }

      console.log('✅ Rol quitado exitosamente');
      return true;
    } catch (error) {
      console.error('💥 Error en removeRoleFromUser:', error);
      throw error;
    }
  }

  // 🚫 CAMBIAR ESTADO DE USUARIO
  async changeUserStatus(userId: string, status: 'active' | 'banned' | 'suspended'): Promise<boolean> {
    try {
      console.log(`🔄 Cambiando estado del usuario ${userId} a ${status}...`);

      const { error } = await supabase
        .from('app_users')
        .update({ status })
        .eq('id', userId);

      if (error) {
        console.error('❌ Error cambiando estado:', error);
        throw error;
      }

      console.log('✅ Estado cambiado exitosamente');
      return true;
    } catch (error) {
      console.error('💥 Error en changeUserStatus:', error);
      throw error;
    }
  }

  // 📊 OBTENER ESTADÍSTICAS DE USUARIOS
  async getUserStats(): Promise<UserStats> {
    try {
      console.log('📊 Obteniendo estadísticas de usuarios...');

      const { data, error } = await supabase
        .from('app_users')
        .select('status, is_email_verified, registration_date');

      if (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
        throw error;
      }

      const users = data || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats: UserStats = {
        total_users: users.length,
        active_users: users.filter(u => u.status === 'active').length,
        banned_users: users.filter(u => u.status === 'banned').length,
        verified_users: users.filter(u => u.is_email_verified).length,
        new_users_today: users.filter(u => {
          const regDate = new Date(u.registration_date);
          return regDate >= today;
        }).length
      };

      console.log('✅ Estadísticas obtenidas:', stats);
      return stats;
    } catch (error) {
      console.error('💥 Error en getUserStats:', error);
      return {
        total_users: 0,
        active_users: 0,
        banned_users: 0,
        verified_users: 0,
        new_users_today: 0
      };
    }
  }

  // 🔍 BUSCAR USUARIOS
  async searchUsers(query: string): Promise<AppUser[]> {
    try {
      console.log(`🔍 Buscando usuarios: "${query}"`);

      const { data: users, error } = await supabase
        .from('app_users')
        .select('*')
        .or(`email.ilike.%${query}%,full_name.ilike.%${query}%`)
        .order('registration_date', { ascending: false });

      if (error) {
        console.error('❌ Error buscando usuarios:', error);
        throw error;
      }

      console.log(`✅ ${users?.length || 0} usuarios encontrados`);
      
      // Obtener roles para cada usuario
      const usersWithRoles = await Promise.all((users || []).map(async (user) => {
        const userRoles = await this.getUserRoles(user.id);
        return {
          ...user,
          roles: userRoles
        };
      }));

      return usersWithRoles;
    } catch (error) {
      console.error('💥 Error en searchUsers:', error);
      throw error;
    }
  }
}

export const basicUserService = new BasicUserManagementService();