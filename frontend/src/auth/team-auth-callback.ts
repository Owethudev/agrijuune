import { isTeamAuthCallbackUrl } from '../routing/routes';

export const initialTeamAuthCallback =
  typeof window !== 'undefined' && isTeamAuthCallbackUrl(window.location);
