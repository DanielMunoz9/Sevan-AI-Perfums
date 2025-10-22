import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

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

const collectRoles = (user: any) => {
  if (!user) {
    return [] as string[];
  }

  const appMetadataRoles = Array.isArray(user.app_metadata?.roles)
    ? user.app_metadata.roles
    : (typeof user.app_metadata?.role === 'string' ? [user.app_metadata.role] : []);

  const userMetadataRoles = Array.isArray(user.user_metadata?.roles)
    ? user.user_metadata.roles
    : (typeof user.user_metadata?.role === 'string' ? [user.user_metadata.role] : []);

  return [...appMetadataRoles, ...userMetadataRoles]
    .map(normalizeRoleValue)
    .filter((value): value is string => Boolean(value));
};

const userHasAdminAccess = async (request: NextRequest, response: NextResponse, supabaseUrl: string, supabaseAnonKey: string) => {
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        response.cookies.set(name, value, options);
      },
      remove(name: string, options: any) {
        if (options) {
          response.cookies.delete({ name, ...options });
        } else {
          response.cookies.delete(name);
        }
      }
    }
  });

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (!user) {
    return { isAdmin: false, hasSession: false } as const;
  }

  const normalizedRole = normalizeRoleValue((user.user_metadata?.role as string | undefined) ?? (user.app_metadata?.role as string | undefined));
  const allRoles = new Set([...collectRoles(user), normalizedRole].filter(Boolean) as string[]);

  if (Array.from(allRoles).some(role => ADMIN_ROLE_WHITELIST.has(role))) {
    return { isAdmin: true, hasSession: true } as const;
  }

  const email = user.email?.toLowerCase() ?? '';
  if (email && ADMIN_EMAILS.includes(email)) {
    return { isAdmin: true, hasSession: true } as const;
  }

  try {
    const { data: storedRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();

    const storedRoleValue = normalizeRoleValue((storedRole as any)?.role);
    if (storedRoleValue && ADMIN_ROLE_WHITELIST.has(storedRoleValue)) {
      return { isAdmin: true, hasSession: true } as const;
    }
  } catch (error) {
    console.warn('⚠️ Error verificando rol en middleware:', error);
  }

  return { isAdmin: false, hasSession: true } as const;
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/cms');

  if (!isAdminRoute) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase env variables missing, skipping middleware guard');
    return response;
  }

  const { isAdmin, hasSession } = await userHasAdminAccess(request, response, supabaseUrl, supabaseAnonKey);

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/cms/:path*'],
};
