import { supabase } from '@/lib/supabase';

export type UserRole = 'admin' | 'manager' | 'user';

export interface RoleResult {
  isAdmin: boolean;
  role: UserRole;
}

export async function fetchUserRole(): Promise<RoleResult> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { isAdmin: false, role: 'user' };
    const role = (user.user_metadata?.role as UserRole) || 'user';
    return { isAdmin: role === 'admin', role };
  } catch {
    return { isAdmin: false, role: 'user' };
  }
}
