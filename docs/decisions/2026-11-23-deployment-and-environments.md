# Deployment and Environment Plan

- **Status:** Accepted.
- **Confirmed:** 2026-11-23

## Production services

- **Frontend:** Vercel at <https://agrijuune.vercel.app/>.
- **API:** Render at <https://agrijuune.onrender.com/>.
- **Database:** Supabase PostgreSQL. Do not copy the project URL or
  credentials into public documentation.
- **Custom domain:** None confirmed; use the current Vercel and Render
  hostnames.
- **Transport:** Production website and API use HTTPS.

## Environments and promotion

- **Local:** Run the frontend and backend locally with local-only
  configuration. Use sample/test data and do not reuse production
  credentials.
- **Preview:** Vercel pull-request previews are available for frontend
  review. The user-confirmed `juune-phase2-test` Supabase project is
  designated for isolated schema and RLS checks only; there is no
  separate staging API. Treat frontend previews as visual-only; do not
  connect them to either database or submit real enquiries.
- **Production:** The public frontend, API and Supabase database are the
  production environment. Promote changes through a pull request into
  `main`; the Vercel and Render project settings control deployments.
  The owner has specifically authorized the initial prototype enquiry
  schema to be applied to the live Supabase project; it was applied on
  2026-11-24 and recorded in migration history. This is a schema-only
  exception: it does not authorize data writes, enquiry collection, or
  connecting local and preview environments to production.

Do not treat a frontend preview as a complete staging environment.
Before testing API-backed behaviour with non-production data, provision
and document a separate API environment.

## Secrets and access

- Keep backend-only credentials in the Render service's environment
  configuration. Never commit secret values.
- Vercel frontend variables must contain public configuration only;
  anything bundled into the browser is public.
- Use separate provider environment scopes and values for preview and
  production. Previews must not receive production credentials or
  connect to either database.
- The repository owner manages GitHub branch-protection settings outside
  this repository. Those settings have been addressed by the owner; this
  document does not assert individual rule details.

## Boundaries

Do not invent a custom domain, staging endpoint, Supabase project URL or
provider credential. Update this plan when staging API services are
provisioned.
