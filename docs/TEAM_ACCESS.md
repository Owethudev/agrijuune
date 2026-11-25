# Team access and sign-in

The public website remains available without an account. Team members
use **Team sign in** in the menu to reach the private team workspace.
Supabase Auth handles passwords and sessions; `team_members` stores the
allow-listed email and its `admin` or `team` role.

## Current hosted rollout status (2026-11-25)

The team-members migration has been applied to the production
`agrijuune` and non-production `juune-phase2-test` Supabase projects.
The seeded administrator was invited through production Supabase Auth
and accepted the invitation on 25 November. Supabase reports the account
confirmed, but sign-in through the production app and access to the
role-gated portal remain unverified.

Email authentication and email confirmation are enabled in both hosted
projects. Public signups are disabled and the minimum password length is
12 characters. Production Auth uses `https://agrijuune.vercel.app/` as
its site URL and allows that URL plus `/team/sign-in` as redirects. The
Vercel Production has `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY`, using the production project URL and public
publishable key. A production deployment is live, and the `/team/sign-in`
route displays an enabled form. On 25 November, the Supabase Auth Site
URL was corrected to the canonical production origin after an invite
redirected to a stale Vercel alias that returned 404. Staging acceptance
tests also remain outstanding. PR #102 added an invite-only password
setup/reset flow to `/team/sign-in`. A password reset request was submitted
in production for the seeded admin email (`jezvestptyltd@gmail.com`), returning
the expected account-neutral confirmation. Email receipt, password creation,
authenticated sign-in and role-gated access to the portal remain unverified
and require action by the account holder. This does not enable public signup.
Do not treat hosted team sign-in as fully accepted until app authentication
and staging checks pass.

## Initial setup

1. Apply the `create_team_members` migration to the intended Supabase
   project after reviewing the target. It creates the role table and
   RLS policies and seeds the admin role for `jezvestptyltd@gmail.com`.
   It does not create an Auth user or set a password. For the current
   rollout, it has been applied to production and `juune-phase2-test`.
2. The production `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   variables are configured in Vercel. The sign-in route loads, but
   invited-user login remains unverified. Never put the service-role or
   secret key, or a password, in a `VITE_*` variable.
3. Keep hosted Auth invite-only, with email confirmations enabled and a
   minimum 12-character password. These settings are applied in both
   hosted projects. Production's site URL and team sign-in redirect are
   configured; add local development URLs only to local configuration.
   These settings are not applied by the database migration.
4. Invite the seeded admin email from the Supabase Auth dashboard. The
   production invitation was accepted on 25 November, but app sign-in
   still needs verification at `/team/sign-in`. If the invitee has not
   set a password, choose **Need to set or reset your password?** and
   follow the secure link sent by Supabase Auth. Never reuse a password
   shared in chat or store credentials in this repository.
5. After signing in, an admin can add team-role email addresses in the
   workspace. Then invite each same address through Supabase Auth.
   Remove team access from the workspace when it is no longer needed.

   Removing a role blocks subsequent membership checks and RLS-protected
   queries, but does not revoke an existing Supabase Auth session. For
   immediate account termination, also disable the user in the Supabase
   Auth dashboard. This workspace currently contains no enquiry access or
   other private application data. Public signups are disabled in both
   hosted projects; invite-only access is configured at Supabase Auth.

The Supabase Auth user and `team_members` row must use the same email.
Email addresses are normalized to lowercase. The application allows
only listed team members into the workspace, and hosted public signup
is disabled in both projects. A valid password alone does not grant workspace access. Production
sign-in remains unverified until a new Vercel deployment uses the
variables and the sign-in flow is tested.

## Authorization boundary

RLS permits an authenticated member to read their own role. An admin can
read the role list and insert or remove `team` rows, but cannot use the
workspace to create, modify or remove an `admin` row. Anonymous access
is revoked. The role table grants no access to enquiries, and this
feature does not change enquiry-collection privacy gates or policies.

The workspace UI is not a backend authorization boundary. Any future
private API or data feature must enforce authorization server-side or
with its own database RLS policies; do not assume that a client-side
role check protects it.

## Validation and deployment

Configure production and preview environments deliberately. Use the
production Supabase project only for the production deployment, and
never place private credentials in preview builds. Public signup is
disabled and production redirects and public Vite variables are
configured. Staging acceptance tests and a successful invited-user login
remain outstanding. Test admin and team-role access against a
non-production project before considering the rollout complete.

The repository's local Supabase config disables signup and requires
email confirmation. It is local development configuration only.
