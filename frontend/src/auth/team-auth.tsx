import { useEffect, useState, type ReactNode } from 'react';
import {
  createClient,
  type Session,
  type SupabaseClient,
} from '@supabase/supabase-js';
import { TeamAuthContext } from './team-auth-context';

export type TeamRole = 'admin' | 'team';

export type TeamMember = {
  email: string;
  role: TeamRole;
  created_at: string;
};

type TeamDatabase = {
  public: {
    Tables: {
      team_members: {
        Row: TeamMember;
        Insert: {
          email: string;
          role: TeamRole;
          created_at?: string;
        };
        Update: Partial<{
          email: string;
          role: TeamRole;
          created_at: string;
        }>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type ServiceResult<T> = { ok: true; value: T } | { ok: false; code?: string };

export type TeamAuthSession = {
  email: string | null;
};

export type TeamAuthService = {
  getSession: () => Promise<ServiceResult<TeamAuthSession | null>>;
  onAuthStateChange: (
    listener: (session: TeamAuthSession | null) => void,
  ) => () => void;
  signIn: (
    email: string,
    password: string,
  ) => Promise<ServiceResult<TeamAuthSession>>;
  signOut: () => Promise<ServiceResult<null>>;
  getRole: (email: string) => Promise<ServiceResult<TeamRole | null>>;
  listMembers: () => Promise<ServiceResult<TeamMember[]>>;
  addTeamMember: (email: string) => Promise<ServiceResult<null>>;
  removeTeamMember: (email: string) => Promise<ServiceResult<null>>;
};

function toTeamAuthSession(session: Session | null): TeamAuthSession | null {
  return session ? { email: session.user.email ?? null } : null;
}

function createSupabaseTeamAuthService(
  client: SupabaseClient<TeamDatabase>,
): TeamAuthService {
  return {
    async getSession() {
      const { data, error } = await client.auth.getSession();

      return error
        ? { ok: false }
        : { ok: true, value: toTeamAuthSession(data.session) };
    },
    onAuthStateChange(listener) {
      const {
        data: { subscription },
      } = client.auth.onAuthStateChange((_event, session) =>
        listener(toTeamAuthSession(session)),
      );

      return () => subscription.unsubscribe();
    },
    async signIn(email, password) {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      const session = toTeamAuthSession(data.session);

      return error || !session ? { ok: false } : { ok: true, value: session };
    },
    async signOut() {
      const { error } = await client.auth.signOut();

      return error ? { ok: false } : { ok: true, value: null };
    },
    async getRole(email) {
      const { data, error } = await client
        .from('team_members')
        .select('role')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        return { ok: false };
      }

      if (data?.role !== 'admin' && data?.role !== 'team') {
        return { ok: true, value: null };
      }

      return { ok: true, value: data.role };
    },
    async listMembers() {
      const { data, error } = await client
        .from('team_members')
        .select('email, role, created_at')
        .order('email');

      return error ? { ok: false } : { ok: true, value: data };
    },
    async addTeamMember(email) {
      const { error } = await client
        .from('team_members')
        .insert({ email, role: 'team' });

      return error
        ? { ok: false, code: error.code }
        : { ok: true, value: null };
    },
    async removeTeamMember(email) {
      const { error } = await client
        .from('team_members')
        .delete()
        .eq('email', email)
        .eq('role', 'team');

      return error ? { ok: false } : { ok: true, value: null };
    },
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const defaultTeamAuthService =
  supabaseUrl && supabaseAnonKey
    ? createSupabaseTeamAuthService(
        createClient<TeamDatabase>(supabaseUrl, supabaseAnonKey, {
          auth: {
            autoRefreshToken: true,
            detectSessionInUrl: true,
            persistSession: true,
          },
        }),
      )
    : null;

type AuthMessage =
  'access-check' | 'access-denied' | 'invalid-credentials' | 'sign-out';

export type TeamAuthState =
  | { status: 'loading' }
  | { status: 'unconfigured' }
  | { status: 'signed-out'; message?: AuthMessage }
  | { status: 'error'; message: AuthMessage }
  | { status: 'authenticated'; email: string; role: TeamRole };

type SignOutFailureState = Extract<
  TeamAuthState,
  { status: 'signed-out' | 'error' }
>;

async function signOutWithFallback(
  service: TeamAuthService,
  fallback: SignOutFailureState,
): Promise<SignOutFailureState> {
  try {
    const result = await service.signOut();
    return result.ok ? fallback : { status: 'error', message: 'sign-out' };
  } catch {
    return { status: 'error', message: 'sign-out' };
  }
}

export function TeamAuthProvider({
  children,
  service = defaultTeamAuthService,
}: {
  children: ReactNode;
  service?: TeamAuthService | null;
}) {
  const [state, setState] = useState<TeamAuthState>(() =>
    service ? { status: 'loading' } : { status: 'unconfigured' },
  );

  useEffect(() => {
    const authService = service;
    if (!authService) {
      return;
    }

    let active = true;

    async function resolveSession(
      authService: TeamAuthService,
      session: TeamAuthSession | null,
    ) {
      if (!session?.email) {
        if (active) {
          setState({ status: 'signed-out' });
        }
        return;
      }

      try {
        const email = session.email.trim().toLowerCase();
        const result = await authService.getRole(email);

        if (!active) {
          return;
        }

        if (!result.ok) {
          setState({ status: 'error', message: 'access-check' });
          return;
        }

        if (!result.value) {
          const nextState = await signOutWithFallback(authService, {
            status: 'signed-out',
            message: 'access-denied',
          });
          if (active) {
            setState(nextState);
          }
          return;
        }

        setState({ status: 'authenticated', email, role: result.value });
      } catch {
        if (active) {
          setState({ status: 'error', message: 'access-check' });
        }
      }
    }

    const unsubscribe = authService.onAuthStateChange((session) => {
      if (!session) {
        setState({ status: 'signed-out' });
        return;
      }

      void Promise.resolve().then(() => resolveSession(authService, session));
    });

    void authService
      .getSession()
      .then((result) => {
        if (!active) {
          return;
        }

        if (result.ok) {
          return resolveSession(authService, result.value);
        }

        setState({ status: 'error', message: 'access-check' });
        return undefined;
      })
      .catch(() => {
        if (active) {
          setState({ status: 'error', message: 'access-check' });
        }
      });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [service]);

  async function signIn(email: string, password: string) {
    if (!service) {
      setState({ status: 'unconfigured' });
      return false;
    }

    setState({ status: 'loading' });

    try {
      const signInResult = await service.signIn(
        email.trim().toLowerCase(),
        password,
      );

      if (!signInResult.ok) {
        setState({ status: 'signed-out', message: 'invalid-credentials' });
        return false;
      }

      if (!signInResult.value.email) {
        setState(
          await signOutWithFallback(service, {
            status: 'signed-out',
            message: 'invalid-credentials',
          }),
        );
        return false;
      }

      const normalizedEmail = signInResult.value.email.trim().toLowerCase();
      const roleResult = await service.getRole(normalizedEmail);

      if (!roleResult.ok) {
        setState(
          await signOutWithFallback(service, {
            status: 'error',
            message: 'access-check',
          }),
        );
        return false;
      }

      if (!roleResult.value) {
        setState(
          await signOutWithFallback(service, {
            status: 'signed-out',
            message: 'access-denied',
          }),
        );
        return false;
      }

      setState({
        status: 'authenticated',
        email: normalizedEmail,
        role: roleResult.value,
      });
      return true;
    } catch {
      setState(
        await signOutWithFallback(service, {
          status: 'signed-out',
          message: 'invalid-credentials',
        }),
      );
      return false;
    }
  }

  async function signOut() {
    if (!service) {
      setState({ status: 'unconfigured' });
      return false;
    }

    try {
      const result = await service.signOut();

      if (result.ok) {
        setState({ status: 'signed-out' });
        return true;
      } else {
        setState({ status: 'error', message: 'sign-out' });
        return false;
      }
    } catch {
      setState({ status: 'error', message: 'sign-out' });
      return false;
    }
  }

  return (
    <TeamAuthContext.Provider
      value={{
        service,
        state: service ? state : { status: 'unconfigured' },
        signIn,
        signOut,
      }}
    >
      {children}
    </TeamAuthContext.Provider>
  );
}
