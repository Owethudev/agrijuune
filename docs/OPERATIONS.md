# Agrijuune Release Operations Runbook

**Status:** Partial; staging API health is verified, but staging data/email
acceptance, alert delivery, backup retention and the first scheduled
purge execution remain unverified.
**Last checked:** 25 November 2026

## Current release state

- Production frontend: `https://agrijuune.vercel.app/`.
- Production API health check: `https://agrijuune.onrender.com/api/health`.
- A free Render service, `https://agrijuune-staging-api.onrender.com`,
  tracks `main` and auto-deploys. Following PR #102, both production and
  staging deployed main commit `e12b04a`; their `/api/health` endpoints
  returned HTTP 200 on 25 November (verified at 13:17 UTC). The staging service
  is health-only: enquiry, notification, privacy and retention switches are
  explicitly disabled, and no Supabase, Brevo or test-inbox credentials are
  configured. A read-only query on the non-production `juune-phase2-test` project
  confirmed zero enquiry rows. This does not verify staging persistence
  or email delivery.
- Before adding Supabase credentials to staging, rotate the non-production
  project's legacy service-role credential and use only the replacement
  server-side. Never place secret values in this runbook or client config.
- The Render workspace notification email is configured to the
  owner-confirmed monitored contact, and the staging service inherits the
  workspace's failure-only notification policy. This verifies routing
  configuration only; alert delivery has not been tested.
- Production Supabase runs an active `purge-expired-enquiries` job daily
  at 02:00 GMT. It deletes rows older than seven days. The configuration
  is verified in `cron.job`; as of 25 November 2026 06:13 UTC,
  `cron.job_run_details` contains no runs. The first scheduled run is
  expected at 02:00 UTC on 26 November and must still be verified. A
  daily run may delete a row up to 24 hours after it crosses the
  seven-day cutoff.
- The production `enquiries` table contained zero rows when the job was
  configured. Enquiry collection and email notifications remain
  disabled.
- Server-only Supabase and Postgres environment variables were removed
  from Vercel Production. The Production `VITE_SUPABASE_URL` matches the
  intended project, and its publishable `VITE_SUPABASE_ANON_KEY` was
  accepted by that project's Auth settings endpoint; neither key value is
  reproduced here. `VITE_API_BASE_URL` points to the production API and is
  now scoped to Production only.
- The school-project privacy and demo-data notice is published at
  `/privacy`. Public enquiries, orders, marketing sign-ups and enquiry
  notifications remain disabled. The notice does not claim a legal
  exemption; review applicable obligations before enabling any public
  personal-data collection.
- Vercel pull-request previews remain frontend-only. Their Supabase
  variables and `VITE_API_BASE_URL` are not scoped to Preview. Existing
  previews built before the scope change were not redeployed or verified;
  Vercel environment changes apply to new deployments. The
  non-production Supabase project remains designated for schema and RLS
  verification only.
- On 25 November 2026, migration `20261124141740_add_enquiry_idempotency`
  was applied to the non-production Supabase project after confirming the
  enquiries table was empty; its version is recorded in migration history.
  The idempotency columns, constraint and index are present; RLS remains
  enabled with no policies, anonymous/authenticated table privileges remain
  revoked, and `supabase/tests/enquiries_rls.sql` passed. No staging API,
  test inbox or end-to-end enquiry flow has been verified.
- The current Supabase Free Plan does not provide project backups. The
  seven-day backup-retention target is unmet; no restore capability has
  been verified.

## Read-only release smoke checks

The following checks were performed on 25 November 2026:

| Check | Result |
| --- | --- |
| Public home page | Loaded and rendered the expected content. |
| Public `/privacy` page | Loaded after production deployment `63ee4ea`; it states that public collection is disabled and the site is an educational prototype. |
| Fictional-data demo | Started successfully and displayed step 1 of 6. |
| Team sign-in page | Loaded with an enabled form and invited-user password reset option after PR #102; a reset link was requested for the admin email, but email receipt, password setting and authenticated sign-in remain unverified. |
| Production and staging Express API `/api/health` | Both returned `{"success":true,"data":{"status":"ok"}}` on 25 November after auto-deploying main commit `e12b04a` (verified at 13:17 UTC). The staging service is health-only and has no database or email credentials. |
| Vercel Production configuration | Supabase URL and publishable key were verified against the production project. `VITE_API_BASE_URL` is scoped to Production only; pre-existing previews have not been redeployed. |
| Enquiry persistence, notification and thank-you flow | Not tested in production. Collection is intentionally disabled; do not submit test personal information. |
| Scheduled purge execution | Job `purge-expired-enquiries` active on schedule `0 2 * * *`. As of 25 November 13:25 UTC, the first scheduled execution (due 26 Nov 02:00 UTC) has not yet run; no manual deletion was performed. |
| Backup restore | Not available to verify on the current Free Plan. |

These are limited smoke checks, not launch acceptance. The demo notice is
published, but public data collection must remain disabled until its
privacy scope, retention and recovery controls are reviewed. Do not mark
the release ready until staging acceptance, backup retention, monitoring
and the outstanding authentication test are complete.

## Monitoring and escalation

The application returns a server-generated `X-Request-ID` response
header. Backend error logs include the request ID, HTTP method and error
name, and do not log the request body. Notification failures are logged
with an enquiry identifier and error name; never copy enquiry content
into logs, tickets or chat.

Automated alert delivery to a monitored owner is not verified. The
Render workspace notification email is configured to the
owner-confirmed contact, and the staging service inherits failure-only
notifications. The successful delivery and recipient mailbox access
have not been confirmed. The service owner must configure and test alerts for:

- Repeated API health-check failures, elevated 5xx responses and
  abnormal latency in the Render service.
- Failed or missing scheduled purge runs in Supabase.
- Persistence or notification failures after collection is approved.

**Operational alert recipient:** Configured in the Render workspace
using the owner-confirmed monitored contact; successful delivery still
needs verification.

Until alert delivery is verified, an operator must check service health,
provider logs and the purge run history directly. Do not represent this
manual check as automated monitoring.

## Daily purge verification

Run these read-only queries in the production Supabase SQL Editor:

```sql
select jobid, jobname, schedule, active, command
from cron.job
where jobname = 'purge-expired-enquiries';
```

```sql
select runid, status, start_time, end_time, return_message
from cron.job_run_details
where jobid = (
  select jobid
  from cron.job
  where jobname = 'purge-expired-enquiries'
)
order by start_time desc
limit 10;
```

Confirm exactly one active job with schedule `0 2 * * *` and the
seven-day cutoff command. After the first scheduled execution, confirm a
successful status in `cron.job_run_details`. Investigate and notify the
designated owner if the job is missing, inactive or fails. Do not insert
test enquiries or run a manual production deletion to prove the job.

## Incident response

1. Record the UTC timestamp, route, HTTP status and `X-Request-ID`.
   Exclude names, emails, phone numbers, messages, credentials and
   complete request/response bodies.
2. Check Render service health and logs for the matching request ID.
   Record only safe diagnostic fields; do not expose stack traces or
   provider responses to visitors.
3. Check Supabase service status and the scheduled purge run history
   when persistence or retention is involved.
4. If persistence or notification behavior is uncertain, keep enquiry
   collection disabled. Do not retry a submission manually; the API's
   idempotency controls are required for safe retries.
5. Escalate to the designated service owner. The operational alert
   recipient and incident contact still need confirmation.

## Secrets, recovery and hotfixes

- Keep Supabase service-role credentials and Brevo credentials only in
  the authenticated backend environment. Vercel may contain public
  Supabase URL and anon/publishable key only.
- To rotate a credential, issue a replacement at its provider, update
  the backend environment, deploy and verify the health check, then
  revoke the old credential. Never include secret values in this
  runbook, logs, pull requests or frontend variables.
- Database backups are unavailable on the current plan. Do not promise
  recovery of enquiry data or enable collection until an eligible backup
  or alternative retention approach is selected and its restore process
  is tested.
- Deliver hotfixes through a reviewed pull request and the required CI
  checks. Use the hosting provider's authenticated rollback controls
  only after confirming the target deployment and impact.

## Staging and launch completion

The free Render staging API currently verifies only build, start and
health. It has no database or email credentials and cannot run the
required data-path acceptance checks. Full staging requires non-production
Supabase credentials, an authorized test inbox and restricted secrets.
Do not connect a preview deployment to production or use production
personal data.

Before closing launch blockers, record staging migration and rollback
results, test-only persistence and notification outcomes, an invited
team-member login, the first successful production purge run, alert
delivery to the confirmed owner and backup/restore verification. Record
any additional privacy review required before public collection is
enabled.
