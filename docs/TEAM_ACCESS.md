# Team access and sign-in

The public website remains available without an account. Team members
use **Team sign in** in the menu to reach the private team workspace.
Supabase Auth handles passwords and sessions; `team_members` stores the
allow-listed email and its `admin` or `team` role.

## Initial setup

1. Apply the `create_team_members` migration to the intended Supabase
   project after reviewing the target. It creates the role table and
   RLS policies and seeds the admin role for `jezvestptyltd@gmail.com`.
   It does not create an Auth user or set a password.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the frontend
   environment. The anon key is public; never put the service-role key
   or a password in a `VITE_*` variable.
3. Configure the hosted Supabase Auth project to disable public signups,
   enable email confirmations, require at least 12-character passwords,
   and allow the production site URL and `/team/sign-in` redirect. Add
   local development URLs only to local configuration. These settings
   are not applied by the database migration.
4. Invite the seeded admin email from the Supabase Auth dashboard. The
   recipient should use the invitation flow to set a new strong
   password. Never reuse a password shared in chat or store credentials
   in this repository.
5. After signing in, an admin can add team-role email addresses in the
   workspace. Then invite each same address through Supabase Auth.
   Remove team access from the workspace when it is no longer needed.

   Removing a role blocks subsequent membership checks and RLS-protected
   queries, but does not revoke an existing Supabase Auth session. For
   immediate account termination, also disable the user in the Supabase
   Auth dashboard. This workspace currently contains no enquiry access or
   other private application data.

The Supabase Auth user and `team_members` row must use the same email.
Email addresses are normalized to lowercase. Public account creation is
disabled; a valid password alone does not grant workspace access.

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
never place private credentials in preview builds. Keep public signup
disabled in hosted Supabase settings, verify the allowed redirect URLs,
and test admin and team-role access against a non-production project
before enabling the feature in production.

The repository's local Supabase config disables signup and requires
email confirmation. It is local development configuration only.
