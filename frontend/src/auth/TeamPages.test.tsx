// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { translations } from '../content/translations';
import {
  TeamAuthProvider,
  type TeamAuthService,
  type TeamRole,
} from './team-auth';
import { TeamPortalPage, TeamSignInPage } from './TeamPages';

function createService(
  role: TeamRole | null,
  session: { email: string | null } | null = null,
  signOutFails = false,
) {
  const signOut = vi.fn<TeamAuthService['signOut']>(async () => {
    if (signOutFails) {
      throw new Error('test sign-out failure');
    }

    return { ok: true, value: null };
  });
  const addTeamMember = vi.fn<TeamAuthService['addTeamMember']>(async () => ({
    ok: true,
    value: null,
  }));
  const listMembers = vi.fn<TeamAuthService['listMembers']>(async () => ({
    ok: true,
    value: [],
  }));
  const requestPasswordReset = vi.fn<TeamAuthService['requestPasswordReset']>(
    async () => ({ ok: true, value: null }),
  );
  const updatePassword = vi.fn<TeamAuthService['updatePassword']>(async () => ({
    ok: true,
    value: null,
  }));

  const service: TeamAuthService = {
    getSession: async () => ({ ok: true, value: session }),
    onAuthStateChange: () => () => {},
    signIn: async () => ({
      ok: true,
      value: { email: 'member@example.test' },
    }),
    requestPasswordReset,
    updatePassword,
    signOut,
    getRole: async () => ({ ok: true, value: role }),
    listMembers,
    addTeamMember,
    removeTeamMember: async () => ({ ok: true, value: null }),
  };

  return {
    service,
    signOut,
    addTeamMember,
    requestPasswordReset,
    updatePassword,
  };
}

function SignInFixture({
  service,
  onAuthenticated,
}: {
  service: TeamAuthService;
  onAuthenticated: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <TeamAuthProvider service={service}>
      <TeamSignInPage
        copy={translations.en.team}
        headingRef={headingRef}
        onAuthenticated={onAuthenticated}
      />
    </TeamAuthProvider>
  );
}

function PortalFixture({ service }: { service: TeamAuthService }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <TeamAuthProvider service={service}>
      <TeamPortalPage
        copy={translations.en.team}
        headingRef={headingRef}
        onSignIn={() => {}}
      />
    </TeamAuthProvider>
  );
}

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

afterEach(() => {
  cleanup();
  window.history.replaceState(null, '', '/');
});

describe('team access pages', () => {
  it('signs in a member with a team role and opens the portal', async () => {
    const { service } = createService('team');
    const onAuthenticated = vi.fn();

    render(
      <SignInFixture service={service} onAuthenticated={onAuthenticated} />,
    );

    const signInButton = await screen.findByRole('button', { name: 'Sign in' });
    await waitFor(() => expect(signInButton).toBeEnabled());
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'member@example.test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'a-test-password' },
    });
    fireEvent.click(signInButton);

    await waitFor(() => expect(onAuthenticated).toHaveBeenCalledOnce());
    expect(
      await screen.findByRole('button', { name: 'Open team portal' }),
    ).toBeInTheDocument();
  });

  it('signs out authenticated accounts that have no team role', async () => {
    const { service, signOut } = createService(null);
    const onAuthenticated = vi.fn();

    render(
      <SignInFixture service={service} onAuthenticated={onAuthenticated} />,
    );

    const signInButton = await screen.findByRole('button', { name: 'Sign in' });
    await waitFor(() => expect(signInButton).toBeEnabled());
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'visitor@example.test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'a-test-password' },
    });
    fireEvent.click(signInButton);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'This account does not have team access.',
    );
    expect(signOut).toHaveBeenCalledOnce();
    expect(onAuthenticated).not.toHaveBeenCalled();
  });

  it('reports a sign-out failure when rejecting a non-member account', async () => {
    const { service, signOut } = createService(null, null, true);

    render(<SignInFixture service={service} onAuthenticated={vi.fn()} />);

    const signInButton = await screen.findByRole('button', { name: 'Sign in' });
    await waitFor(() => expect(signInButton).toBeEnabled());
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'visitor@example.test' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'a-test-password' },
    });
    fireEvent.click(signInButton);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'You could not be signed out.',
    );
    expect(signOut).toHaveBeenCalledOnce();
  });

  it('sends a generic password reset request for the normalized email', async () => {
    const { service, requestPasswordReset } = createService(null);

    render(<SignInFixture service={service} onAuthenticated={vi.fn()} />);

    fireEvent.click(
      await screen.findByRole('button', {
        name: 'Need to set or reset your password?',
      }),
    );
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: '  MEMBER@example.test ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send password link' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'If an invited account matches that email, a password link has been sent.',
    );
    expect(requestPasswordReset).toHaveBeenCalledWith('member@example.test');
  });

  it('reports password reset request failures', async () => {
    const { service, requestPasswordReset } = createService(null);
    requestPasswordReset.mockResolvedValue({ ok: false });

    render(<SignInFixture service={service} onAuthenticated={vi.fn()} />);

    fireEvent.click(
      await screen.findByRole('button', {
        name: 'Need to set or reset your password?',
      }),
    );
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'member@example.test' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send password link' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'The password link could not be sent. Try again later.',
    );
  });

  it('sets a password from a Supabase recovery session', async () => {
    window.history.replaceState(
      null,
      '',
      '/team/sign-in#access_token=test-token&type=recovery',
    );
    const { service, updatePassword } = createService('team', {
      email: 'member@example.test',
    });

    render(<SignInFixture service={service} onAuthenticated={vi.fn()} />);

    fireEvent.change(await screen.findByLabelText('Password'), {
      target: { value: 'a-new-password-12' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new password'), {
      target: { value: 'a-new-password-12' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save password' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Password saved. Open the team portal to continue.',
    );
    expect(updatePassword).toHaveBeenCalledWith('a-new-password-12');
    expect(
      screen.getByRole('button', { name: 'Open team portal' }),
    ).toBeInTheDocument();
  });

  it('rejects mismatched passwords without updating the account', async () => {
    window.history.replaceState(
      null,
      '',
      '/team/sign-in#access_token=test-token&type=recovery',
    );
    const { service, updatePassword } = createService('team', {
      email: 'member@example.test',
    });

    render(<SignInFixture service={service} onAuthenticated={vi.fn()} />);

    fireEvent.change(await screen.findByLabelText('Password'), {
      target: { value: 'a-new-password-12' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new password'), {
      target: { value: 'different-password-12' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save password' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Passwords do not match.',
    );
    expect(updatePassword).not.toHaveBeenCalled();
  });

  it('reports password update failures', async () => {
    window.history.replaceState(
      null,
      '',
      '/team/sign-in#access_token=test-token&type=recovery',
    );
    const { service, updatePassword } = createService('team', {
      email: 'member@example.test',
    });
    updatePassword.mockResolvedValue({ ok: false });

    render(<SignInFixture service={service} onAuthenticated={vi.fn()} />);

    fireEvent.change(await screen.findByLabelText('Password'), {
      target: { value: 'a-new-password-12' },
    });
    fireEvent.change(screen.getByLabelText('Confirm new password'), {
      target: { value: 'a-new-password-12' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save password' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'The password could not be saved. Request a new link and try again.',
    );
  });

  it('allows admins to add team members while team members cannot manage access', async () => {
    const admin = createService('admin', { email: 'admin@example.test' });

    render(<PortalFixture service={admin.service} />);

    fireEvent.change(await screen.findByLabelText('Team member email'), {
      target: { value: 'new-member@example.test' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add team member' }));

    await waitFor(() =>
      expect(admin.addTeamMember).toHaveBeenCalledWith(
        'new-member@example.test',
      ),
    );
    expect(await screen.findByText(/Team access added/)).toBeInTheDocument();

    cleanup();
    const member = createService('team', { email: 'member@example.test' });
    render(<PortalFixture service={member.service} />);

    expect(await screen.findAllByText('Team member')).toHaveLength(2);
    expect(
      screen.queryByRole('heading', { name: 'Team access' }),
    ).not.toBeInTheDocument();
  });
});
