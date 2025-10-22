'use client';

import { supabase } from './supabase';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users: number;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface SupabaseRole {
  id: string;
  name: string;
  description: string | null;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  permissions: any[];
  user_count: number;
}

interface SupabasePermission {
  id: string;
  name: string;
  description: string | null;
  category: string;
}

class RolesService {
  // Convertir rol de Supabase a formato interno
  private mapSupabaseRole(supabaseRole: SupabaseRole): Role {
    return {
      id: supabaseRole.id,
      name: supabaseRole.name,
      description: supabaseRole.description || '',
      permissions: supabaseRole.permissions?.map(p => p.name) || [],
      users: supabaseRole.user_count || 0,
      color: supabaseRole.color,
      isActive: supabaseRole.is_active,
      createdAt: supabaseRole.created_at,
      updatedAt: supabaseRole.updated_at
    };
  }

  // Convertir permiso de Supabase a formato interno
  private mapSupabasePermission(supabasePermission: SupabasePermission): Permission {
    return {
      id: supabasePermission.id,
      name: supabasePermission.name,
      description: supabasePermission.description || '',
      category: supabasePermission.category
    };
  }

  // Obtener todos los roles desde Supabase
  async getRoles(): Promise<Role[]> {
    try {
      console.log('🔄 Obteniendo roles desde Supabase...');
      
      // Intentar primero con la vista, si falla usar tabla básica
      let { data, error } = await supabase
        .from('roles_with_permissions')
        .select('*')
        .order('created_at', { ascending: false });

      // Si la vista no existe, usar la tabla básica roles
      if (error && error.message.includes('schema cache')) {
        console.log('⚠️ Vista no existe, usando tabla básica...');
        
        const { data: basicData, error: basicError } = await supabase
          .from('roles')
          .select('*')
          .order('created_at', { ascending: false });

        if (basicError) {
          // Si ni las tablas básicas existen, devolver array vacío
          console.log('⚠️ Tablas no existen aún, devolviendo array vacío');
          return [];
        }

        // Mapear datos básicos a formato esperado
        const mappedData = basicData?.map(role => ({
          ...role,
          role_name: role.name,
          permissions: [] // Sin permisos por ahora
        }));

        data = mappedData;
        error = null;
      }

      if (error) {
        console.error('❌ Error obteniendo roles:', error);
        return []; // Devolver array vacío en lugar de lanzar error
      }

      const roles = (data || []).map(this.mapSupabaseRole);
      console.log('✅ Roles obtenidos:', roles.length);
      return roles;
    } catch (error) {
      console.error('❌ Error en servicio getRoles:', error);
      // En lugar de lanzar error, devolver array vacío para no romper la UI
      return [];
    }
  }

  // Obtener rol por ID
  async getRoleById(id: string): Promise<Role | null> {
    try {
      console.log('🔍 Buscando rol por ID:', id);
      
      const { data, error } = await supabase
        .from('roles_with_permissions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('❌ Rol no encontrado');
          return null;
        }
        throw new Error(`Error obteniendo rol: ${error.message}`);
      }

      const role = this.mapSupabaseRole(data);
      console.log('✅ Rol encontrado:', role.name);
      return role;
    } catch (error) {
      console.error('❌ Error en getRoleById:', error);
      throw error;
    }
  }

  // Crear nuevo rol
  async createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
    try {
      console.log('🆕 Creando nuevo rol:', roleData.name);
      
      // Primero crear el rol
      const { data: newRole, error: roleError } = await supabase
        .from('roles')
        .insert({
          name: roleData.name,
          description: roleData.description || null,
          color: roleData.color,
          is_active: roleData.isActive
        })
        .select()
        .single();

      if (roleError) {
        console.error('❌ Error creando rol:', roleError);
        if (roleError.code === '23505') {
          throw new Error('Ya existe un rol con ese nombre');
        }
        throw new Error(`Error creando rol: ${roleError.message}`);
      }

      // Asignar permisos si los hay
      if (roleData.permissions && roleData.permissions.length > 0) {
        await this.assignPermissionsToRole(newRole.id, roleData.permissions);
      }

      console.log('✅ Rol creado exitosamente');
      
      // Obtener el rol completo con permisos
      const createdRole = await this.getRoleById(newRole.id);
      if (!createdRole) {
        throw new Error('Error obteniendo rol recién creado');
      }

      return createdRole;
    } catch (error) {
      console.error('❌ Error en createRole:', error);
      throw error;
    }
  }

  // Actualizar rol existente
  async updateRole(id: string, updates: Partial<Role>): Promise<Role | null> {
    try {
      console.log('📝 Actualizando rol:', id);
      
      // Actualizar datos básicos del rol
      const { data: updatedRole, error: updateError } = await supabase
        .from('roles')
        .update({
          name: updates.name,
          description: updates.description || null,
          color: updates.color,
          is_active: updates.isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Error actualizando rol:', updateError);
        if (updateError.code === '23505') {
          throw new Error('Ya existe un rol con ese nombre');
        }
        throw new Error(`Error actualizando rol: ${updateError.message}`);
      }

      // Actualizar permisos si se especifican
      if (updates.permissions !== undefined) {
        await this.updateRolePermissions(id, updates.permissions);
      }

      console.log('✅ Rol actualizado exitosamente');
      
      // Obtener el rol completo actualizado
      const role = await this.getRoleById(id);
      return role;
    } catch (error) {
      console.error('❌ Error en updateRole:', error);
      throw error;
    }
  }

  // Eliminar rol
  async deleteRole(id: string): Promise<boolean> {
    try {
      console.log('🗑️ Eliminando rol:', id);
      
      // Verificar que no sea Super Admin
      const role = await this.getRoleById(id);
      if (role && role.name === 'Super Admin') {
        throw new Error('No se puede eliminar el rol Super Admin');
      }

      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Error eliminando rol:', error);
        throw new Error(`Error eliminando rol: ${error.message}`);
      }

      console.log('✅ Rol eliminado exitosamente');
      return true;
    } catch (error) {
      console.error('❌ Error en deleteRole:', error);
      throw error;
    }
  }

  // Obtener todos los permisos disponibles
  async getPermissions(): Promise<Permission[]> {
    try {
      console.log('🔑 Obteniendo permisos disponibles...');
      
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('❌ Error obteniendo permisos:', error);
        throw new Error(`Error obteniendo permisos: ${error.message}`);
      }

      const permissions = (data || []).map(this.mapSupabasePermission);
      console.log('✅ Permisos obtenidos:', permissions.length);
      return permissions;
    } catch (error) {
      console.error('❌ Error en getPermissions:', error);
      throw error;
    }
  }

  // Obtener estadísticas de roles
  async getRoleStats(): Promise<{
    totalRoles: number;
    totalUsers: number;
    activeRoles: number;
    superAdmins: number;
  }> {
    try {
      console.log('📊 Calculando estadísticas de roles desde tablas reales...');
      
      // Calcular directamente desde las tablas reales
      const [rolesResult, usersResult, assignmentsResult] = await Promise.all([
        // Total de roles
        supabase.from('roles').select('*', { count: 'exact', head: true }),
        // Total de usuarios
        supabase.from('app_users').select('*', { count: 'exact', head: true }),
        // Asignaciones activas
        supabase.from('user_role_assignments').select('*').eq('is_active', true)
      ]);

      // Obtener ID del rol Super Admin para contar cuántos lo tienen
      const { data: superAdminRole } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'Super Admin')
        .single();

      let superAdminsCount = 0;
      if (superAdminRole && assignmentsResult.data) {
        superAdminsCount = assignmentsResult.data.filter(
          assignment => assignment.role_id === superAdminRole.id
        ).length;
      }

      const stats = {
        totalRoles: rolesResult.count || 0,
        totalUsers: assignmentsResult.data?.length || 0, // Usuarios con roles asignados
        activeRoles: rolesResult.count || 0, // Asumiendo que todos los roles están activos
        superAdmins: superAdminsCount
      };

      console.log('✅ Estadísticas calculadas correctamente:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Error en getRoleStats:', error);
      throw error;
    }
  }

  // Asignar permisos a un rol
  private async assignPermissionsToRole(roleId: string, permissionNames: string[]): Promise<void> {
    try {
      // Primero obtener los IDs de los permisos
      const { data: permissions, error: permError } = await supabase
        .from('permissions')
        .select('id, name')
        .in('name', permissionNames);

      if (permError) {
        throw new Error(`Error obteniendo permisos: ${permError.message}`);
      }

      if (!permissions || permissions.length === 0) {
        return; // No hay permisos que asignar
      }

      // Crear las relaciones rol-permiso
      const rolePermissions = permissions.map(p => ({
        role_id: roleId,
        permission_id: p.id
      }));

      const { error: assignError } = await supabase
        .from('role_permissions')
        .insert(rolePermissions);

      if (assignError && assignError.code !== '23505') { // Ignorar duplicados
        throw new Error(`Error asignando permisos: ${assignError.message}`);
      }
    } catch (error) {
      console.error('❌ Error en assignPermissionsToRole:', error);
      throw error;
    }
  }

  // Actualizar permisos de un rol
  private async updateRolePermissions(roleId: string, permissionNames: string[]): Promise<void> {
    try {
      // Eliminar permisos actuales
      const { error: deleteError } = await supabase
        .from('role_permissions')
        .delete()
        .eq('role_id', roleId);

      if (deleteError) {
        throw new Error(`Error eliminando permisos: ${deleteError.message}`);
      }

      // Asignar nuevos permisos
      if (permissionNames.length > 0) {
        await this.assignPermissionsToRole(roleId, permissionNames);
      }
    } catch (error) {
      console.error('❌ Error en updateRolePermissions:', error);
      throw error;
    }
  }

  // Verificar conexión con Supabase
  async testConnection(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('roles')
        .select('count')
        .limit(1);

      return !error;
    } catch (error) {
      console.error('❌ Test de conexión fallido:', error);
      return false;
    }
  }

  // Inicializar datos si es necesario
  async initializeIfEmpty(): Promise<void> {
    try {
      const { count } = await supabase
        .from('roles')
        .select('*', { count: 'exact', head: true });

      if (count === 0) {
        console.log('📥 Base de datos vacía, ejecuta el script SQL para inicializar');
      }
    } catch (error) {
      console.error('❌ Error verificando inicialización:', error);
    }
  }
}

// Instancia singleton
export const rolesService = new RolesService();

// Inicializar al cargar
if (typeof window !== 'undefined') {
  rolesService.initializeIfEmpty().catch(console.error);
}