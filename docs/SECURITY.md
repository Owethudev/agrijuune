# Agrijuune --- Security and Privacy Requirements

**Scope:** First-release public website, standard sample demo and
enquiry API\
**Status:** Engineering baseline; not a legal certification or
substitute for legal advice

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
-   Validate required server environment variables on startup.
-   Rotate any credential that is accidentally committed or exposed.

Potential backend configuration names (confirm exact names during
implementation):

``` env
NODE_ENV=
PORT=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM=
ENQUIRY_NOTIFICATION_TO=
FRONTEND_ORIGIN=
```

These are names/examples only. Do not populate them with invented
values.

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

Do not invent rate-limit thresholds as permanent policy; choose and
document values during deployment.

## 6. Personal information and POPIA readiness

The enquiry form may collect names, email addresses, phone numbers, farm
names, locations and service interests. Collect only what is necessary
for responding to the enquiry.

Before launch:

-   Identify and document the responsible party and contact details.
-   Approve a clear privacy notice explaining purpose, use, recipients,
    retention and contact channels.
-   Determine and document the appropriate lawful basis for processing.
-   Obtain and record any required consent or acknowledgement
    accurately; do not use a checkbox as a substitute for identifying
    the lawful basis.
-   Define retention and secure deletion procedures.
-   Restrict access to enquiry records to authorised personnel.
-   Establish a process for access, correction, objection and deletion
    requests where applicable.
-   Review email provider, hosting and database operator terms and data
    locations.
-   Assess cross-border processing and operator agreements where
    relevant.
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
    failures.
-   Define who receives operational alerts.

## 10. Security review checklist

Before launch, verify:

-   [ ] No secrets or `.env` files are committed.
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
