'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  isAdmin: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; isAdmin?: boolean; role?: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_ROLE_WHITELIST = new Set(['admin', 'super_admin', 'superadmin', 'owner', 'manager', 'crm', 'staff']);

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);

const normalizeRoleValue = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.toLowerCase().replace(/\s+/g, '_') : null;
};

const collectRoles = (user: User | null) => {
  if (!user) return [] as string[];

  const appMetadataRoles = Array.isArray((user as any).app_metadata?.roles)
    ? (user as any).app_metadata.roles
    : (typeof (user as any).app_metadata?.role === 'string' ? [(user as any).app_metadata.role] : []);

  const userMetadataRoles = Array.isArray(user.user_metadata?.roles)
    ? user.user_metadata.roles
    : (typeof user.user_metadata?.role === 'string' ? [user.user_metadata.role] : []);

  return [...appMetadataRoles, ...userMetadataRoles]
    .map(normalizeRoleValue)
    .filter((value): value is string => Boolean(value));
};

const userHasAdminAccess = (user: User | null, role: string | null) => {
  if (!user) {
    return false;
  }

  const normalizedRole = normalizeRoleValue(role);
  if (normalizedRole && ADMIN_ROLE_WHITELIST.has(normalizedRole)) {
    return true;
  }

  const allRoles = new Set([...collectRoles(user), normalizedRole].filter(Boolean) as string[]);
  if (Array.from(allRoles).some(metadataRole => ADMIN_ROLE_WHITELIST.has(metadataRole))) {
    return true;
  }

  const email = user.email?.toLowerCase() ?? '';
  if (email && ADMIN_EMAILS.includes(email)) {
    return true;
  }
  return false;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const initialSession = await authService.getSession();
        setSession(initialSession);

        const initialUser = initialSession?.user ?? null;
        setUser(initialUser);

        if (initialUser) {
          const storedRole = await authService.getStoredRole(initialUser.id);
          const fallbackRole = normalizeRoleValue(initialUser.user_metadata?.role as string | undefined);
          setRole(storedRole || fallbackRole || null);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error('Error obteniendo sesión inicial:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Suscribirse a cambios de autenticación
    const { data: { subscription } } = authService.onAuthStateChange(async (session) => {
      setSession(session);
      const nextUser = session?.user ?? null;
      setUser(nextUser);

      if (nextUser) {
        const storedRole = await authService.getStoredRole(nextUser.id);
        const fallbackRole = normalizeRoleValue(nextUser.user_metadata?.role as string | undefined);
        setRole(storedRole || fallbackRole || null);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Za-z]/.test(password)) {
      return { success: false, error: 'Contraseña mínima 8 caracteres con letras y números.' };
    }
    try {
      const { user, error } = await authService.signUp(email, password, firstName, lastName);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      if (user) {
        return { success: true };
      }
      
      return { success: false, error: 'Error desconocido durante el registro' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user, error, isAdmin, role, session } = await authService.signIn(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      if (user) {
        const confirmed = (user as any).email_confirmed_at || (user as any).confirmed_at;
        if (!confirmed) {
          return { success: false, error: 'Debes confirmar tu email antes de ingresar.' };
        }

        setUser(user);
        const normalizedRole = normalizeRoleValue(role) || normalizeRoleValue(user.user_metadata?.role as string | undefined);
        setRole(normalizedRole || null);
        setSession(session ?? null);

        return { success: true, isAdmin, role: normalizedRole || null };
      }
      
      return { success: false, error: 'Error desconocido durante el inicio de sesión' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      setRole(null);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await authService.resetPassword(email);
      
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
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    role,
    isAdmin: userHasAdminAccess(user, role),
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}