import { createContext, useContext } from 'react';
import type { TeamAuthService, TeamAuthState } from './team-auth';

export type TeamAuthContextValue = {
  service: TeamAuthService | null;
  state: TeamAuthState;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
};

export const TeamAuthContext = createContext<TeamAuthContextValue | null>(null);

export function useTeamAuth() {
  const context = useContext(TeamAuthContext);

  if (!context) {
    throw new Error('useTeamAuth must be used within a TeamAuthProvider.');
  }

  return context;
}
