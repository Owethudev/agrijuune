// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.resetModules();
  window.history.replaceState(null, '', '/');
});

describe('team auth callback initialization', () => {
  it('captures invite callbacks before the Supabase client initializes', async () => {
    window.history.replaceState(
      null,
      '',
      '/#access_token=test-token&type=invite',
    );
    vi.resetModules();

    await import('./team-auth');
    const { initialTeamAuthCallback } = await import('./team-auth-callback');

    expect(initialTeamAuthCallback).toBe(true);
  });
});
