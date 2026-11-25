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
  review. Their Supabase variables and `VITE_API_BASE_URL` are scoped to
  Production only; treat previews as visual-only and do not connect them
  to either database or submit real enquiries. Existing preview
  deployments built before the scope change have not been redeployed or
  verified; Vercel applies environment changes to new deployments.
- **Staging:** A free Render service,
  <https://agrijuune-staging-api.onrender.com>, is deployed from `main`
  with automatic deployments. After PR #98 merged, the service
  auto-deployed commit `b7fda60` and its health endpoint returned HTTP
  200. It is health-only, with collection, notification, privacy and
  retention switches disabled and no Supabase or email credentials. The
  user-confirmed `juune-phase2-test` Supabase project remains designated
  for isolated schema and RLS checks only. This is not yet a full staging
  environment for enquiry or email acceptance.
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
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` and
  `VITE_API_BASE_URL` are scoped to Vercel Production only. Previews must
  not receive production credentials or connect to either database.
- The repository owner manages GitHub branch-protection settings outside
  this repository. Those settings have been addressed by the owner; this
  document does not assert individual rule details.

## Boundaries

Do not invent a custom domain, Supabase project URL or provider
credential. The health-only staging API has been provisioned; update this
plan when non-production database and test-inbox configuration is
approved and the complete staging acceptance flow is verified.
