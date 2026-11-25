# Agrijuune --- API Contracts

**API style:** REST over HTTPS\
**Base path:** `/api/v1`\
**Scope:** First-release public website and enquiry submission

## 1. Contract principles

-   The API is the trusted boundary between the public browser and
    private data.
-   All input is untrusted and must be validated server-side.
-   Responses use predictable JSON shapes.
-   Do not expose database records or provider internals unnecessarily.
-   Keep endpoint behaviour documented and tested.
-   Do not add endpoints for future farm-platform functionality without
    approval.

## 2. Common response format

Successful response:

``` json
{
  "success": true,
  "data": {},
  "message": "Request completed."
}
```

Error response:

``` json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please review the submitted information.",
    "details": [],
    "requestId": "server-generated-request-id"
  }
}
```

Every handled response includes a server-generated `X-Request-ID` header.
Error responses include the same ID in `error.requestId`. Unknown routes
return `404` with code `NOT_FOUND`; unexpected failures return `500` with
code `INTERNAL_ERROR` and a generic message.

`details` should contain only safe, field-level validation information.
Do not return stack traces, SQL errors, provider responses, secrets or
internal implementation details.

The exact response envelope may be adapted to an established repository
convention, but once adopted it must remain consistent and be
documented.

## 3. Endpoint: health check

`GET /api/health`

Purpose: basic service availability check for deployment/monitoring.

Example response:

``` json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

Do not expose environment variables, database credentials, internal
hostnames or detailed infrastructure information. If database readiness
is checked, expose only a safe status and ensure the endpoint does not
become a data-disclosure channel.

On `SIGINT` or `SIGTERM`, the backend stops accepting new connections and
allows active requests to finish before shutdown.

## 4. Endpoint: submit an enquiry

`POST /api/v1/enquiries`

Purpose: validate and persist an enquiry from the public website.

### Example request

``` json
{
  "contactName": "Example Contact",
  "email": "contact@example.com",
  "cellNumber": "+27 00 000 0000",
  "farmName": "Example Farm",
  "farmLocation": "Gauteng",
  "operationType": "Mixed farming",
  "machineCountEstimate": 12,
  "servicesOfInterest": [
    "farm_management_technology",
    "machinery_detailing"
  ],
  "additionalMessage": "Please contact me about your services.",
  "privacyNoticeAcknowledged": true
}
```

This is illustrative sample data, not real contact information. Final
field names use camelCase in JSON and must match the approved form.

Every POST must also include an
`Idempotency-Key` header containing a UUID v4 generated for that user
submission. Reuse that key only for retries of the same submission.

### Field guidance

  ------------------------------------------------------------------------
  Field                    Type                    Validation
  ------------------------ ----------------------- -----------------------
  `contactName`            string                  Required; trim;
                                                   maximum 120 characters

  `email`                  string                  Required; valid email;
                                                   maximum 254 characters

  `cellNumber`             string                  Required; 7–15 digits,
                                                   up to 32 characters;
                                                   +, spaces, parentheses,
                                                   periods and hyphens

  `farmName`               string                  Optional; maximum 160
                                                   characters

  `farmLocation`           string                  Optional; maximum 160
                                                   characters

  `operationType`          string                  Optional; maximum 100
                                                   characters

  `machineCountEstimate`   integer                 Optional; zero to
                                                   2,147,483,647

  `servicesOfInterest`     string array            Required; non-empty;
                                                   allowlisted identifiers

  `additionalMessage`      string                  Optional; maximum
                                                   2,000 characters

  `privacyNoticeAcknowledged` boolean               Required; must be
                                                   `true`; notice version
                                                   and timestamp are set
                                                   by the server
  ------------------------------------------------------------------------

The server must set `created_at`, initial lead `status` and notification
status. Ignore or reject client attempts to set server-controlled
fields. The request validator also rejects other unexpected fields and
does not echo submitted values in validation details.

The server validates the acknowledgement but does not trust a
client-supplied notice version or timestamp. It records version `1.0`
and the server receipt time with the enquiry.

The approved required fields are `contactName`, `email`, `cellNumber`
and a non-empty `servicesOfInterest` containing only
`farm_management_technology` and/or `machinery_detailing`. `farmName`,
`farmLocation`, `operationType`, `machineCountEstimate` and
`additionalMessage` are optional. There is no separate `phone` field.

This contract is not permission to collect personal information. The
product owner approved the Privacy Notice text and selected both
documented lawful-basis grounds according to enquiry context; see the
[enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md).
The notice still has publication placeholders for the registered
business name, business address and Information Officer. The product
owner set seven-day database retention from submission. The Supabase
dashboard was checked on 2026-11-25 and shows that production and staging
use the Free Plan, which does not include project backups; the
seven-day backup-retention target is not met. Production has one active
daily `pg_cron` purge job at 02:00 GMT for rows older than seven days.
The schedule is catalog-verified, but its first successful execution
has not yet been verified; daily execution may occur up to 24 hours
after a record crosses the cutoff. The production table had zero rows
when checked, and staging has no purge schedule. Each party retains
their email copies as communication records; database deletion does not
remove mailbox copies. Brevo message/log retention and exact provider
location/transfer disclosures remain outstanding. Do not enable the
form or endpoint until all publication, successful-deletion, backup
and provider-disclosure gates are resolved and verified.

The route is implemented but is not mounted unless
`ENQUIRY_COLLECTION_ENABLED=true`, `ENQUIRY_PRIVACY_GATES_VERIFIED=true`
and server-side Supabase settings are all present. The idempotency
migration must also be applied through the reviewed database workflow
before enabling the route. All gates default to disabled. The frontend additionally requires
`VITE_ENQUIRY_COLLECTION_ENABLED=true` and a configured HTTPS
`VITE_ENQUIRY_PRIVACY_NOTICE_URL`. These are deployment gates, not
evidence that the outstanding privacy work is complete. No production
settings have been changed, no enquiry records have been inserted and
no email has been sent. Brevo notifications additionally require
`ENQUIRY_EMAIL_NOTIFICATIONS_ENABLED=true` and complete server-side
Brevo configuration. No non-essential analytics is approved.

### Success response

Return `201 Created` for a new enquiry successfully persisted and
`200 OK` for an idempotent replay.

``` json
{
  "success": true,
  "data": {
    "enquiryId": "00000000-0000-0000-0000-000000000000",
    "notificationStatus": "not_configured"
  }
}
```

The example UUID is a placeholder. Do not return the full enquiry record
or provider details to the browser.

### Error responses

  --------------------------------------------------------------------------
  HTTP status             Error code                 Meaning
  ----------------------- -------------------------- -----------------------
  `400`                   `INVALID_ENQUIRY`           Invalid or incomplete
                                                     request

  `400`                   `INVALID_JSON`              Malformed JSON request

  `400`                   `IDEMPOTENCY_KEY_REQUIRED`  Missing key header

  `400`                   `INVALID_IDEMPOTENCY_KEY`   Key is not a UUID v4

  `403`                   `ORIGIN_NOT_ALLOWED`        Origin or preflight
                                                     headers are not
                                                     allowlisted

  `405`                   `METHOD_NOT_ALLOWED`        HTTP method is not
                                                     enabled

  `413`                   `PAYLOAD_TOO_LARGE`        Request body exceeds
                                                     configured limit

  `415`                   `UNSUPPORTED_MEDIA_TYPE`   Unsupported content
                                                     type

  `429`                   `RATE_LIMITED`             Too many requests

  `409`                   `IDEMPOTENCY_CONFLICT`      Key reused with
                                                     different content

  `500`                   `INTERNAL_ERROR`           Unexpected server
                                                     failure

  `503`                   `SERVICE_UNAVAILABLE`      Required persistence
                                                     service unavailable
  --------------------------------------------------------------------------

Do not return `201` if persistence failed.

The JSON request-body limit is 10 KB. `POST` requests must use
`Content-Type: application/json`. The current API only enables `GET`,
`HEAD`, `POST` and `OPTIONS`; `OPTIONS` is used for allowed CORS
preflights. CORS allows the exact `FRONTEND_ORIGIN` configured for the
backend, without credentials, and only the `Content-Type` and
`Idempotency-Key` request headers.
If `FRONTEND_ORIGIN` is unset, cross-origin browser requests are denied.

Enquiry POST requests are limited to 10 requests per IP address in a
15-minute window by default. Configure `ENQUIRY_RATE_LIMIT_MAX` and
`ENQUIRY_RATE_LIMIT_WINDOW_MS` on the backend to change the bounded
threshold; the allowed ranges are 1–1,000 requests and 1,000–86,400,000
milliseconds. The current limiter uses process-local memory, so a shared
store is required if the API is scaled across multiple instances.

Do not suppress enquiries based only on matching email addresses or
request contents. That could reject legitimate repeat enquiries. The
idempotency-key validator accepts only UUID v4 keys. The repository
stores a SHA-256 hash of each key and an HMAC fingerprint of the
normalized request, keyed by that UUID, on the corresponding enquiry
row; it does not store the raw key or request fingerprint input. A
repeat with the same key and
normalized request replays the original enquiry ID and success response.
Reusing a key with different content returns `409 IDEMPOTENCY_CONFLICT`
and does not create another enquiry. A new intentional submission must
use a new key. The key hashes are deleted with their enquiry, so they do
not outlive the enquiry retention period.

The route remains unavailable under the default configuration.
Persistence failures return `503 SERVICE_UNAVAILABLE`; key conflicts
return `409 IDEMPOTENCY_CONFLICT`. Do not enable the route until the
privacy and deletion prerequisites above are resolved.

### Email notification behaviour

The enquiry must be persisted before notification is attempted.

-   The server-only Brevo adapter uses `BREVO_API_KEY`, `EMAIL_FROM` and
    `BUSINESS_EMAIL`. It returns `not_configured` when no complete
    provider configuration is present and safe `failed` outcomes for
    provider or request errors.
-   The service records `pending` after successful persistence and
    before attempting notification, then records `sent`, `failed` or
    `not_configured`. If the final status update fails, `pending` remains
    for manual follow-up. Idempotent replays do not send another email.
-   The public route invokes this integration only when collection and
    privacy gates are explicitly enabled. The
    `ENQUIRY_EMAIL_NOTIFICATIONS_ENABLED` backend setting defaults to
    `false`; do not enable it until the privacy launch gate is complete.
-   If persistence succeeds for a new enquiry, return `201`; an
    idempotent replay returns `200`, regardless of the previous
    notification outcome.
-   If persistence succeeds but email fails, the enquiry is still
    received; return `201` and record the notification failure for
    operational follow-up.
-   If persistence fails, return an appropriate error and do not claim
    the enquiry was received.
-   Do not expose email-provider details in the response.

A later retry/outbox endpoint or worker is not part of the initial
public API unless separately approved.

## 5. CORS and request controls

-   Allow only approved website origins in production.
-   Do not use wildcard origins with credentialed requests.
-   Accept JSON for the enquiry endpoint.
-   Apply request-size limits and rate limiting.
-   Reassess whether a honeypot or other bot control is justified before
    enabling the enquiry form or route; both remain disabled by default.
-   Use HTTPS in production.
-   Do not enable credentials unless the endpoint genuinely needs them.

## 6. API client behaviour

The frontend API client should:

-   Use a configured API base URL.
-   Set the expected content type.
-   Generate one UUID v4 idempotency key per deliberate submission and
    preserve it across retries of that submission.
-   Handle network failures and non-2xx responses.
-   Show localized, safe feedback for server-side validation failures.
-   Avoid logging personal form data.
-   Preserve the key only when the submitted fields are unchanged; do
    not automatically retry.
-   Never reuse an idempotency key for a changed submission.

## 7. Contract change process

When changing endpoint paths, methods, field names, validation, status
codes or response shapes:

1.  Explain why the change is needed.
2.  Update this document.
3.  Update backend validation and controller/service code.
4.  Update frontend API types and form behaviour.
5.  Update automated tests.
6.  Consider backward compatibility and deployment order.

## 8. Explicitly out of scope

Do not add farm authentication, machinery CRUD, maintenance schedules,
inventory endpoints, detailing bookings, payments or customer
administration endpoints as part of this API baseline.
