import { useEffect, useState, type FormEvent, type RefObject } from 'react';
import type { TeamCopy } from '../content/translations';
import type { TeamMember } from './team-auth';
import { useTeamAuth } from './team-auth-context';
import './TeamPages.css';

type TeamPageProps = {
  copy: TeamCopy;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onAuthenticated: () => void;
};

function getAuthError(copy: TeamCopy, error?: string) {
  if (error === 'access-denied') {
    return copy.accessDenied;
  }

  if (error === 'access-check') {
    return copy.accessCheckError;
  }

  if (error === 'sign-out') {
    return copy.signOutError;
  }

  return copy.authError;
}

export function TeamSignInPage({
  copy,
  headingRef,
  onAuthenticated,
}: TeamPageProps) {
  const { signIn, state } = useTeamAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (await signIn(email, password)) {
        setPassword('');
        onAuthenticated();
      }
    } finally {
      setSubmitting(false);
    }
  }

  const error =
    state.status === 'unconfigured'
      ? copy.notConfigured
      : state.status === 'error' || state.status === 'signed-out'
        ? state.message
          ? getAuthError(copy, state.message)
          : null
        : null;

  return (
    <section className="team-page container">
      <div className="card team-card">
        <p className="page-eyebrow">Agrijuune</p>
        <h1 ref={headingRef} tabIndex={-1}>
          {copy.signInTitle}
        </h1>
        <p className="page-description">{copy.signInDescription}</p>

        {state.status === 'loading' && (
          <p role="status" className="team-message">
            {copy.checkingSession}
          </p>
        )}

        {error && (
          <p role="alert" className="team-message team-message--error">
            {error}
          </p>
        )}

        {state.status === 'authenticated' ? (
          <button
            className="button button--primary"
            type="button"
            onClick={onAuthenticated}
          >
            {copy.portalLinkLabel}
          </button>
        ) : (
          <form className="team-form" onSubmit={handleSubmit}>
            <label htmlFor="team-email">{copy.emailLabel}</label>
            <input
              id="team-email"
              autoComplete="username"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <label htmlFor="team-password">{copy.passwordLabel}</label>
            <input
              id="team-password"
              autoComplete="current-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <button
              className="button button--primary"
              type="submit"
              disabled={
                submitting ||
                state.status === 'loading' ||
                state.status === 'unconfigured'
              }
            >
              {submitting ? copy.signingIn : copy.signInButton}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function TeamMembers({ copy }: { copy: TeamCopy }) {
  const { service } = useTeamAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadMembers() {
      if (!service) {
        setLoading(false);
        setError(copy.loadMembersError);
        return;
      }

      try {
        const result = await service.listMembers();

        if (!active) {
          return;
        }

        if (result.ok) {
          setMembers(result.value);
          setError(null);
        } else {
          setError(copy.loadMembersError);
        }
      } catch {
        if (active) {
          setError(copy.loadMembersError);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadMembers();

    return () => {
      active = false;
    };
  }, [copy.loadMembersError, service]);

  async function refreshMembers() {
    if (!service) {
      setError(copy.loadMembersError);
      return;
    }

    try {
      const result = await service.listMembers();

      if (result.ok) {
        setMembers(result.value);
        setError(null);
      } else {
        setError(copy.loadMembersError);
      }
    } catch {
      setError(copy.loadMembersError);
    }
  }

  async function handleAddMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!service) {
      setError(copy.addMemberError);
      return;
    }

    setSubmitting(true);
    setError(null);
    setNotice(null);

    try {
      const result = await service.addTeamMember(email.trim().toLowerCase());

      if (!result.ok) {
        setError(
          result.code === '23505'
            ? copy.memberExistsError
            : copy.addMemberError,
        );
        return;
      }

      setEmail('');
      setNotice(copy.addMemberSuccess);
      await refreshMembers();
    } catch {
      setError(copy.addMemberError);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemoveMember(memberEmail: string) {
    if (!service || !window.confirm(copy.removeMemberConfirmation)) {
      return;
    }

    setError(null);
    setNotice(null);

    try {
      const result = await service.removeTeamMember(memberEmail);

      if (!result.ok) {
        setError(copy.removeMemberError);
        return;
      }

      setNotice(null);
      await refreshMembers();
    } catch {
      setError(copy.removeMemberError);
    }
  }

  return (
    <section className="team-members" aria-labelledby="team-members-heading">
      <h2 id="team-members-heading">{copy.membersTitle}</h2>
      <p>{copy.membersDescription}</p>
      <p className="team-invitation-note">{copy.invitationInstructions}</p>

      <form className="team-form team-form--inline" onSubmit={handleAddMember}>
        <label htmlFor="new-team-member">{copy.memberEmailLabel}</label>
        <input
          id="new-team-member"
          autoComplete="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <button
          className="button button--primary"
          type="submit"
          disabled={submitting}
        >
          {copy.addMemberButton}
        </button>
      </form>

      {error && (
        <p role="alert" className="team-message team-message--error">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="team-message">
          {notice}
        </p>
      )}
      {loading ? (
        <p role="status">{copy.checkingSession}</p>
      ) : (
        <ul className="team-member-list">
          {members.map((member) => (
            <li key={member.email}>
              <span>
                <strong>{member.email}</strong>
                <span className="team-role">
                  {member.role === 'admin' ? copy.adminRole : copy.teamRole}
                </span>
              </span>
              {member.role === 'team' && (
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={() => void handleRemoveMember(member.email)}
                >
                  {copy.removeMemberButton}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function TeamPortalPage({
  copy,
  headingRef,
  onSignIn,
}: Omit<TeamPageProps, 'onAuthenticated'> & { onSignIn: () => void }) {
  const { signOut, state } = useTeamAuth();

  if (state.status !== 'authenticated') {
    const message =
      state.status === 'unconfigured'
        ? copy.notConfigured
        : state.status === 'loading'
          ? copy.checkingSession
          : state.status === 'signed-out' || state.status === 'error'
            ? state.status === 'signed-out' && !state.message
              ? copy.signInDescription
              : getAuthError(copy, state.message)
            : copy.accessDenied;

    return (
      <section className="team-page container">
        <div className="card team-card">
          <h1 ref={headingRef} tabIndex={-1}>
            {copy.portalTitle}
          </h1>
          <p role="status" className="team-message">
            {message}
          </p>
          {(state.status === 'signed-out' ||
            state.status === 'unconfigured') && (
            <button
              className="button button--primary"
              type="button"
              onClick={onSignIn}
            >
              {copy.signInButton}
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="team-page container">
      <div className="card team-card team-card--wide">
        <p className="page-eyebrow">
          {state.role === 'admin' ? copy.adminRole : copy.teamRole}
        </p>
        <h1 ref={headingRef} tabIndex={-1}>
          {copy.portalTitle}
        </h1>
        <p className="page-description">{copy.portalDescription}</p>
        {state.role === 'admin' ? (
          <TeamMembers copy={copy} />
        ) : (
          <p className="team-message">{copy.teamRole}</p>
        )}
        <button
          className="button button--secondary team-sign-out"
          type="button"
          onClick={() => void signOut()}
        >
          {copy.signOutButton}
        </button>
      </div>
    </section>
  );
}
