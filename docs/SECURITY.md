# Agrijuune --- Security and Privacy Requirements

**Scope:** First-release public website, sample demo, enquiry API and
invite-only team access\
**Status:** Engineering baseline; not a legal certification or
substitute for legal advice

**Current data boundary:** The owner clarified on 2026-11-25 that the
public deployment is a school-project prototype, not a live customer
enquiry service. Public enquiry collection and enquiry email
notifications remain disabled; use fictional demo content only. The
public `/privacy` page describes this limited scope and invite-only
Supabase team authentication. This scope does not claim legal compliance
or exempt any personal-data processing from applicable law.

The production seven-day enquiry purge is configured for 02:00 GMT but
its first scheduled execution has not yet been verified. The current
Supabase Free Plan does not include project backups, and provider log
locations and retention periods have not been independently confirmed.
Do not enable public data collection or notifications without a new
owner-approved review of actual data flows and safeguards. See the
[enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md)
for the scope change and prior design decisions.

## 1. Security objectives

-   Protect visitor and enquiry information.
-   Keep privileged credentials server-side.
-   Prevent public access to private enquiry records.
-   Validate and constrain all untrusted input.
-   Reduce abuse of public endpoints.
-   Avoid losing enquiries due to notification-provider failures.
-   Design privacy practices with South Africa's Protection of Personal
    Information Act (POPIA) in mind.

Do not claim the system is POPIA-compliant solely because these controls
are documented. The responsible party, lawful basis, notices, retention,
operator agreements, cross-border transfers and operational procedures
require review.

## 2. Secrets and environment variables

-   Never commit `.env` files, private keys, API tokens or real
    credentials.
-   Keep a safe `.env.example` containing variable names and
    placeholders only.
-   Never expose the Supabase service-role key to the browser.
-   Never place private email-provider credentials in frontend code.
-   Treat all Vite-exposed variables as public; only non-secret
    configuration may use the frontend's public environment prefix.
-   Keep production backend secrets in the Render service's environment
    configuration. Vercel frontend variables must contain public
    configuration only.
-   Vercel pull-request previews are frontend-only; do not connect them
    to production credentials, API writes or personal data.
-   Validate required server environment variables on startup.
-   Rotate any credential that is accidentally committed or exposed.

Backend configuration names:

``` env
NODE_ENV=
PORT=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
BREVO_API_KEY=
EMAIL_FROM=
BUSINESS_EMAIL=
FRONTEND_ORIGIN=
ENQUIRY_EMAIL_NOTIFICATIONS_ENABLED=false
```

These are names/examples only; do not record real values in source
control or documentation. Keep `BREVO_API_KEY` server-side.

Set `FRONTEND_ORIGIN` to the exact approved frontend origin
(`https://agrijuune.vercel.app` in production and
`http://localhost:5173` for local development). The backend rejects
requests carrying any other `Origin`; if this setting is absent, it
fails closed for cross-origin browser requests. CORS does not enable
credentials and allows only `Content-Type` and `Idempotency-Key` on
preflight requests.

GitHub secret scanning and push protection are enabled for the
repository. Dependabot dependency graph, alerts and security updates are
also enabled; `.github/dependabot.yml` schedules weekly npm version
updates. The required `quality` job runs `npm audit --audit-level=high`
and scans the production frontend build for server-only setting names,
Supabase service-role JWTs, Brevo API keys and private-key material.
This supplements, but does not replace, GitHub secret scanning. Keep the
`quality` job required by the active `main` ruleset, with no bypass
actors.

## 3. Supabase and database access

-   Enable Row Level Security (RLS) on tables containing enquiry or
    personal information.
-   Anonymous visitors must not be able to select, update or delete
    enquiry records.
-   Prefer submitting enquiries through the Express API rather than
    allowing direct browser inserts.
-   Keep service-role operations on the server only.
-   Grant only the permissions required by each database role.
-   Do not disable RLS to fix application errors.
-   Use migrations for schema and policy changes.
-   Review database policies whenever a table or access path changes.
-   Team roles are stored only in `team_members`; do not infer access to
    enquiries or other records from a client-side role check.
-   Keep public Auth signup disabled. Invite approved team members
    through Supabase Auth only after adding their normalized email to
    `team_members`.
-   Configure hosted Supabase Auth settings separately from
    `supabase/config.toml`; local configuration does not update hosted
    projects.

## 4. Input validation

Treat every request as untrusted, including requests from the public
website.

-   Validate request body shape and field types on the server.
-   Enforce sensible maximum lengths and allowed formats.
-   Trim and normalise values where appropriate.
-   Reject unexpected fields where practical.
-   Validate email and phone inputs without assuming one
    country-specific format unless the product requirement defines it.
-   Validate service selections against an allowlist.
-   Limit request body size.
-   Avoid unsafe dynamic SQL; use parameterised queries or the Supabase
    client safely.
-   Escape or safely render user-supplied content to prevent cross-site
    scripting.
-   Never rely only on browser-side validation.

## 5. Public endpoint abuse controls

For the public enquiry endpoint:

-   Apply rate limiting with a sensible configurable threshold.
-   Consider bot mitigation or a honeypot only if abuse justifies it.
-   Apply CORS allowlists for approved website origins; do not use
    wildcard origins with credentials.
-   Use HTTPS in production.
-   Set appropriate security headers.
-   Restrict accepted HTTP methods and content types.
-   Avoid exposing whether a private record exists.
-   Monitor unusual request volumes and repeated failures.

The API currently limits JSON request bodies to 10 KB, accepts JSON
content types on `POST`, and allows only `GET`, `HEAD`, `POST` and CORS
`OPTIONS` preflight requests. It sends restrictive API security headers,
including HSTS in production. Rate limiting remains a separate control
and must be in place before an enquiry endpoint is exposed.

Do not invent rate-limit thresholds as permanent policy; choose and
document values during deployment.

## 6. Future public personal-data collection

The current school-project deployment does not accept public enquiries.
This section applies only if a future release proposes collecting
personal information:

-   Review applicable privacy requirements and the actual data flow;
    do not assume school-project status is an exemption.
-   Identify an accurate project contact and explain the actual purpose
    and providers to visitors.
-   Obtain and record any required consent or acknowledgement
    accurately; do not use a checkbox as a substitute for identifying
    the lawful basis.
-   Verify deletion, retention, access controls, provider processing and
    recovery before enabling collection.
-   Establish a process for access, correction, objection and deletion
    requests where applicable.
-   Avoid collecting sensitive personal information.

Do not invent privacy details or claim legal compliance without
verification.

## 7. Email notification

-   Persist the enquiry before sending a notification.
-   Use an approved provider and verified sender configuration.
-   Keep provider credentials server-side.
-   Do not include more personal information in notification emails than
    necessary.
-   Do not expose provider error details to the visitor.
-   Record notification status safely.
-   Ensure a temporary email failure does not discard the enquiry.
-   Define a manual review/retry procedure before launch.
-   Keep `ENQUIRY_EMAIL_NOTIFICATIONS_ENABLED` unset or `false` until
    the privacy and deletion gates are cleared. Enabling it does not
    publish or wire the currently unavailable public endpoint.

## 8. Authentication and demo boundary

The first public release does not require visitor accounts or farm-user
authentication.

-   Do not add login or farm tenant access without an approved scope and
    security design.
-   Keep the standard demo isolated from real client data.
-   Use fictional/sample data only.
-   Do not embed privileged credentials or hidden administrative
    functions in the demo.

If a future farm platform is approved, perform a separate threat model
and design authentication, tenant isolation, authorisation, account
recovery, audit logging and session management before implementation.

## 9. Logging, errors and monitoring

-   Use request IDs or equivalent correlation identifiers.
-   Do not log secrets, tokens, passwords or full enquiry payloads.
-   Return generic, safe error messages to clients.
-   Keep stack traces and provider diagnostics server-side.
-   Restrict access to production logs.
-   Monitor API availability, failed persistence and notification
    failures. See the [release operations runbook](OPERATIONS.md) for
    the current status and verification steps.
-   Confirm alert delivery and the designated owner before launch; these
    are not yet configured or verified.

## 10. Security review checklist

Before launch, verify:

-   [ ] No secrets or `.env` files are committed.
-   [ ] GitHub secret scanning and push protection are enabled.
-   [ ] Dependabot dependency graph, alerts and security updates are
    enabled.
-   [ ] `main` requires the `quality` job and a pull request,
    without bypass actors.
-   [ ] Supabase service-role key is server-only.
-   [ ] RLS is enabled and tested on private tables.
-   [ ] Anonymous reads/updates/deletes of enquiries are denied.
-   [ ] Server-side validation is tested.
-   [ ] Rate limiting and CORS are configured.
-   [ ] HTTPS and security headers are enabled in production.
-   [ ] Error responses do not leak internal details.
-   [ ] Logs do not contain unnecessary personal data.
-   [ ] Privacy notice, lawful basis, retention and contact details are
    approved.
-   [ ] Email-provider failure does not lose saved enquiries.
-   [ ] Dependencies and deployment configuration have been reviewed.
