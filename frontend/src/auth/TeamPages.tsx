import { useEffect, useState, type FormEvent, type RefObject } from 'react';
import type { TeamCopy } from '../content/translations';
import { isTeamAuthCallbackUrl } from '../routing/routes';
import { initialTeamAuthCallback } from './team-auth-callback';
import type { TeamMember } from './team-auth';
import { useTeamAuth } from './team-auth-context';
import './TeamPages.css';

type TeamPageProps = {
  copy: TeamCopy;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onAuthenticated: () => void;
};

type SignInMode = 'sign-in' | 'request-password' | 'set-password';

function getInitialSignInMode(): SignInMode {
  return initialTeamAuthCallback || isTeamAuthCallbackUrl(window.location)
    ? 'set-password'
    : 'sign-in';
}

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
  const { service, signIn, state } = useTeamAuth();
  const [mode, setMode] = useState<SignInMode>(getInitialSignInMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setNotice(null);

    try {
      if (await signIn(email, password)) {
        setPassword('');
        onAuthenticated();
      }
    } catch {
      setFormError(copy.authError);
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!service) {
      setFormError(copy.notConfigured);
      return;
    }

    setSubmitting(true);
    setFormError(null);
    setNotice(null);

    try {
      const result = await service.requestPasswordReset(
        email.trim().toLowerCase(),
      );

      if (!result.ok) {
        setFormError(copy.passwordResetRequestError);
        return;
      }

      setNotice(copy.passwordResetRequestSuccess);
    } catch {
      setFormError(copy.passwordResetRequestError);
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!service || state.status !== 'authenticated') {
      setFormError(copy.passwordUpdateLinkExpired);
      return;
    }

    if (password.length < 12) {
      setFormError(copy.passwordMinimumLength);
      return;
    }

    if (password !== confirmPassword) {
      setFormError(copy.passwordMismatch);
      return;
    }

    setSubmitting(true);
    setFormError(null);
    setNotice(null);

    try {
      const result = await service.updatePassword(password);

      if (!result.ok) {
        setFormError(copy.passwordUpdateError);
        return;
      }

      setPassword('');
      setConfirmPassword('');
      setMode('sign-in');
      setNotice(copy.passwordUpdateSuccess);
    } catch {
      setFormError(copy.passwordUpdateError);
    } finally {
      setSubmitting(false);
    }
  }

  const authError =
    state.status === 'unconfigured'
      ? copy.notConfigured
      : state.status === 'error' || state.status === 'signed-out'
        ? state.message
          ? getAuthError(copy, state.message)
          : null
        : null;
  const error = formError ?? (mode !== 'set-password' ? authError : null);
  const title =
    mode === 'request-password'
      ? copy.passwordResetTitle
      : mode === 'set-password'
        ? copy.passwordUpdateTitle
        : copy.signInTitle;
  const description =
    mode === 'request-password'
      ? copy.passwordResetDescription
      : mode === 'set-password'
        ? copy.passwordUpdateDescription
        : copy.signInDescription;

  return (
    <section className="team-page container">
      <div className="card team-card">
        <p className="page-eyebrow">Agrijuune</p>
        <h1 ref={headingRef} tabIndex={-1}>
          {title}
        </h1>
        <p className="page-description">{description}</p>

        {mode === 'sign-in' && state.status === 'loading' && (
          <p role="status" className="team-message">
            {copy.checkingSession}
          </p>
        )}

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

        {mode === 'request-password' ? (
          <form className="team-form" onSubmit={handlePasswordReset}>
            <label htmlFor="team-reset-email">{copy.emailLabel}</label>
            <input
              id="team-reset-email"
              autoComplete="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <button
              className="button button--primary"
              type="submit"
              disabled={submitting || state.status === 'unconfigured'}
            >
              {submitting ? copy.passwordResetSending : copy.passwordResetSend}
            </button>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => {
                setMode('sign-in');
                setFormError(null);
                setNotice(null);
              }}
            >
              {copy.backToSignIn}
            </button>
          </form>
        ) : mode === 'set-password' ? (
          state.status === 'authenticated' ? (
            <form className="team-form" onSubmit={handlePasswordUpdate}>
              <label htmlFor="team-new-password">{copy.passwordLabel}</label>
              <input
                id="team-new-password"
                autoComplete="new-password"
                type="password"
                minLength={12}
                required
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <label htmlFor="team-confirm-password">
                {copy.confirmPasswordLabel}
              </label>
              <input
                id="team-confirm-password"
                autoComplete="new-password"
                type="password"
                minLength={12}
                required
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.currentTarget.value)
                }
              />
              <button
                className="button button--primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? copy.passwordUpdating : copy.passwordUpdateButton}
              </button>
            </form>
          ) : state.status === 'loading' ? (
            <p role="status" className="team-message">
              {copy.checkingSession}
            </p>
          ) : (
            <>
              <p role="alert" className="team-message team-message--error">
                {state.status === 'unconfigured'
                  ? copy.notConfigured
                  : (authError ?? copy.passwordUpdateLinkExpired)}
              </p>
              <button
                className="button button--secondary"
                type="button"
                onClick={() => {
                  setMode('request-password');
                  setFormError(null);
                  setNotice(null);
                }}
                disabled={state.status === 'unconfigured'}
              >
                {copy.passwordResetLink}
              </button>
            </>
          )
        ) : state.status === 'authenticated' ? (
          <button
            className="button button--primary"
            type="button"
            onClick={onAuthenticated}
          >
            {copy.portalLinkLabel}
          </button>
        ) : (
          <>
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
            {state.status !== 'unconfigured' && (
              <button
                className="button button--secondary"
                type="button"
                onClick={() => {
                  setMode('request-password');
                  setFormError(null);
                  setNotice(null);
                }}
              >
                {copy.passwordResetLink}
              </button>
            )}
          </>
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
