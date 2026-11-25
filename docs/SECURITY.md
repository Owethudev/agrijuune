# Agrijuune --- Security and Privacy Requirements

**Scope:** First-release public website, sample demo, enquiry API and
invite-only team access\
**Status:** Engineering baseline; not a legal certification or
substitute for legal advice

**Current enquiry gate:** The product owner approved the enquiry field
set, confirmed responsibility for enquiry data, approved the notice text
and selected both documented lawful-basis grounds according to enquiry
context; see the [enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md).
The responsible-party name is Agrijuune. The notice still has
placeholders for the registered business name, business address and
Information Officer. The owner set seven-day retention for database
records from submission and a maximum seven-day backup-retention target.
The Supabase dashboard was checked on 2026-11-25 and shows that
production and staging use the Free Plan, which does not include project
backups; the backup-retention target is not met. One active production
`pg_cron` job now runs the seven-day purge daily at 02:00 GMT. Its
configuration and deletion command are verified in `cron.job`, but a
successful scheduled execution has not yet been verified. Daily runs
may occur up to 24 hours after the seven-day cutoff; staging has no
purge schedule.
Each party will retain their email copies as communication records; the
application purge will not remove those mailbox copies. Brevo
message/log retention and exact provider location/transfer disclosures
remain pending. Brevo is selected, and the
product owner reports that `BREVO_API_KEY`, `EMAIL_FROM` and
`BUSINESS_EMAIL` are configured in the deployed backend. They approved
sender/recipient routing. The server-only adapter is implemented and
unit-tested, and the enquiry service now persists notification outcomes;
the public route remains unwired and no email has been sent. The
backend-only `ENQUIRY_EMAIL_NOTIFICATIONS_ENABLED` setting defaults to
`false`. Do not collect personal information or enable notifications
until the remaining privacy and deletion decisions are actionable. No
non-essential analytics is approved at launch.

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

## 6. Personal information and POPIA readiness

The enquiry form may collect names, email addresses, phone numbers, farm
names, locations and service interests. Collect only what is necessary
for responding to the enquiry.

Before launch:

-   Identify and document the responsible party and contact details.
-   Complete the owner-approved notice's registered-name, address and
    Information Officer placeholders before publication.
-   Record the owner's selected lawful-basis grounds in the
    [enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md);
    this is not an independent legal assessment.
-   Obtain and record any required consent or acknowledgement
    accurately; do not use a checkbox as a substitute for identifying
    the lawful basis.
-   Schedule and verify the seven-day database purge, and meet the
    backup-retention target before collection.
-   Restrict access to enquiry records to authorised personnel.
-   Establish a process for access, correction, objection and deletion
    requests where applicable.
-   Verify provider retention, locations and cross-border safeguards;
    keep exact disclosures pending until confirmed.
-   Avoid collecting sensitive personal information in the enquiry form.

Do not invent the privacy notice version, retention period or legal
contact details. They must be approved by the business.

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
