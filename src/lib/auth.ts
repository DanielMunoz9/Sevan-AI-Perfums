import { createSupabaseClient } from './supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';

export interface AuthService {
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{
    user: User | null;
    error: AuthError | null;
    isAdmin?: boolean;
    role?: string | null;
    session?: Session | null;
  }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  getSession: () => Promise<Session | null>;
  getUser: () => Promise<User | null>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: { firstName?: string; lastName?: string }) => Promise<{ error: AuthError | null }>;
  checkIsAdmin: (email: string, userId?: string) => Promise<boolean>;
  getStoredRole: (userId: string) => Promise<string | null>;
}

// Emails de administradores (carga desde env)
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);

const ADMIN_ROLE_NAMES = new Set(['admin', 'super_admin', 'superadmin', 'manager', 'owner', 'crm', 'staff']);
const CUSTOMER_ROLE_NAMES = new Set(['customer', 'client', 'user', 'member', 'cliente']);

class SupabaseAuthService implements AuthService {
  private supabase = createSupabaseClient();

  private collectRoles(user: User | null): string[] {
    if (!user) return [];

    const roles = new Set<string>();
    const appMetadata = (user as any).app_metadata ?? {};
    const userMetadata = user.user_metadata ?? {};

    const registerRole = (candidate: unknown) => {
      if (typeof candidate === 'string' && candidate.trim().length > 0) {
        roles.add(candidate.toLowerCase());
      }
    };

    const registerRoleCollection = (collection: unknown) => {
      if (Array.isArray(collection)) {
        collection.forEach(registerRole);
      }
    };

    registerRole(appMetadata.role);
    registerRoleCollection(appMetadata.roles);
    registerRole(userMetadata.role);
    registerRoleCollection(userMetadata.roles);

    return Array.from(roles);
  }

  private isAdminRole(role: string | null | undefined): boolean {
    if (!role) return false;
    const normalized = role.toLowerCase().replace(/\s+/g, '_');
    return ADMIN_ROLE_NAMES.has(normalized);
  }

  private resolvePersistedRole(preferredRole: string | null, isAdmin: boolean): string {
    if (preferredRole) {
      const normalized = preferredRole.toLowerCase().replace(/\s+/g, '_');

      if (this.isAdminRole(normalized)) {
        if (normalized === 'superadmin') {
          return 'super_admin';
        }
        if (normalized === 'owner' || normalized === 'crm' || normalized === 'staff') {
          return 'admin';
        }
        return normalized;
      }

      if (CUSTOMER_ROLE_NAMES.has(normalized)) {
        return 'customer';
      }
    }

    return isAdmin ? 'admin' : 'customer';
  }

  private async upsertAppUser(user: User) {
    try {
      const email = user.email?.toLowerCase();
      if (!email) {
        return;
      }

      const metadata = user.user_metadata ?? {};
      const fullName: string | null = (metadata.full_name as string) ||
        [metadata.firstName as string | undefined, metadata.lastName as string | undefined]
          .filter(Boolean)
          .join(' ') ||
        null;

      const payload: Record<string, any> = {
        id: user.id,
        email,
        full_name: fullName,
        status: 'active',
        is_email_verified: Boolean((user as any).email_confirmed_at || (user as any).confirmed_at),
        updated_at: new Date().toISOString(),
      };

      const { error } = await this.supabase
        .from('app_users')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.warn('⚠️ Error sincronizando app_users:', error);
      }
    } catch (err) {
      console.warn('⚠️ Error en upsertAppUser:', err);
    }
  }

  private async ensureUserRole(userId: string, desiredRole: string, isAdmin: boolean) {
    try {
      const { data: existingRole, error: fetchError } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.warn('⚠️ Error consultando user_roles:', fetchError);
        return;
      }

      if (!existingRole) {
        const { error: insertError } = await this.supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: desiredRole,
            updated_at: new Date().toISOString(),
          });

        if (insertError) {
          console.warn('⚠️ Error insertando user_roles:', insertError);
        }
        return;
      }

      const currentRole = (existingRole as any).role ? String((existingRole as any).role).toLowerCase().replace(/\s+/g, '_') : null;

      if (isAdmin && !this.isAdminRole(currentRole)) {
        const { error: updateError } = await this.supabase
          .from('user_roles')
          .update({
            role: desiredRole,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (updateError) {
          console.warn('⚠️ Error actualizando user_roles:', updateError);
        }
      }
    } catch (err) {
      console.warn('⚠️ Error asegurando user_roles:', err);
    }
  }

  async getStoredRole(userId: string): Promise<string | null> {
    try {
      const { data, error } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

      if (error) {
        if (!error.message?.includes('0 rows')) {
          console.warn('⚠️ Error obteniendo rol almacenado:', error);
        }
        return null;
      }

      const rawRole = (data as any)?.role;
      return rawRole ? String(rawRole).toLowerCase().replace(/\s+/g, '_') : null;
    } catch (err) {
      console.warn('⚠️ Excepción obteniendo rol almacenado:', err);
      return null;
    }
  }

  async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      // 1. Registrar en Supabase Auth
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            full_name: `${firstName} ${lastName}`,
            role: 'customer' // Por defecto siempre customer
          }
        }
      });

      if (error) return { user: null, error };
      if (!data.user) return { user: null, error: new Error('No se pudo crear el usuario') as AuthError };

      // 2. Crear registro en tabla customers
      try {
        const { error: customerError } = await this.supabase
          .from('customers')
          .insert([{
            user_id: data.user.id,
            email: email.toLowerCase(),
            first_name: firstName,
            last_name: lastName,
            customer_status: 'new',
            total_orders: 0,
            total_spent: 0,
            average_order_value: 0,
            customer_lifetime_value: 0
          }]);

        if (customerError) {
          console.error('Error creando customer:', customerError);
          // No fallamos el registro si falla crear customer, se puede crear después
        }
      } catch (customerErr) {
        console.error('Error en insert customer:', customerErr);
      }

      return { user: data.user, error: null };
    } catch (err) {
      console.error('Error en signUp:', err);
      return { user: null, error: err as AuthError };
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error, isAdmin: false, role: null, session: null };
      }
      if (!data.user) {
        return { user: null, error: new Error('Usuario no encontrado') as AuthError, isAdmin: false, role: null, session: null };
      }

      const metadataRoles = this.collectRoles(data.user);
      const preferredRole = metadataRoles.find(role => this.isAdminRole(role)) ?? metadataRoles[0] ?? null;

      let isAdmin = metadataRoles.some(role => this.isAdminRole(role));
      const normalizedEmail = (data.user.email || '').toLowerCase();

      if (!isAdmin && normalizedEmail && ADMIN_EMAILS.includes(normalizedEmail)) {
        isAdmin = true;
      }

      if (!isAdmin) {
        isAdmin = await this.checkIsAdmin(data.user.email || '', data.user.id);
      }

      const persistedRole = this.resolvePersistedRole(preferredRole ?? null, isAdmin);

      await this.upsertAppUser(data.user);
      await this.ensureUserRole(data.user.id, persistedRole, isAdmin);

      return { user: data.user, error: null, isAdmin, role: persistedRole, session: data.session ?? null };
    } catch (err) {
      console.error('Error en signIn:', err);
      return { user: null, error: err as AuthError, isAdmin: false, role: null, session: null };
    }
  }

  async checkIsAdmin(email: string, userId?: string): Promise<boolean> {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      
      // Verificar contra lista de emails admin
      if (ADMIN_EMAILS.includes(normalizedEmail)) {
        return true;
      }

      const targetUserId = userId ?? (await this.getUser())?.id;

      if (!targetUserId) {
        return false;
      }

      // Verificar en tabla user_roles si existe
      const { data: roleRow, error: roleError } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', targetUserId)
        .limit(1)
        .maybeSingle();

      if (!roleError && roleRow?.role) {
        const storedRole = String(roleRow.role).toLowerCase().replace(/\s+/g, '_');
        if (this.isAdminRole(storedRole)) {
          return true;
        }
      } else if (roleError) {
        console.warn('⚠️ Error leyendo user_roles:', roleError);
      }

      // Verificar asignaciones en user_role_assignments (si existiese sistema avanzado)
      const { data: assignmentRow, error: assignmentError } = await this.supabase
        .from('user_role_assignments')
        .select('roles!inner(name)')
        .eq('user_id', targetUserId)
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();

      if (!assignmentError && assignmentRow && (assignmentRow as any).roles?.name) {
        const assignmentRole = String((assignmentRow as any).roles.name).toLowerCase().replace(/\s+/g, '_');
        if (this.isAdminRole(assignmentRole)) {
          return true;
        }
      } else if (assignmentError && assignmentError.message && !assignmentError.message.includes('0 rows')) {
        console.warn('⚠️ Error leyendo user_role_assignments:', assignmentError);
      }

      return false;
    } catch (err) {
      console.error('Error checking admin:', err);
      return false;
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async getSession() {
    const { data: { session } } = await this.supabase.auth.getSession();
    return session;
  }

  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async resetPassword(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  }

  async updateProfile(updates: { firstName?: string; lastName?: string }) {
    const { error } = await this.supabase.auth.updateUser({
      data: {
        firstName: updates.firstName,
        lastName: updates.lastName,
        full_name: updates.firstName && updates.lastName 
          ? `${updates.firstName} ${updates.lastName}` 
          : undefined,
      }
    });
    return { error };
  }

  // Suscribirse a cambios de autenticación
  onAuthStateChange(callback: (session: Session | null) => void | Promise<void>) {
    return this.supabase.auth.onAuthStateChange(async (_event, session) => {
      await callback(session);
    });
  }
}

export const authService = new SupabaseAuthService();