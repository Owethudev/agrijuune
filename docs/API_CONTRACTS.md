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
    "details": []
  }
}
```

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
  "additionalMessage": "Please contact me about your services."
}
```

This is illustrative sample data, not real contact information. Final
field names use camelCase in JSON and must match the approved form.

### Field guidance

  ------------------------------------------------------------------------
  Field                    Type                    Validation
  ------------------------ ----------------------- -----------------------
  `contactName`            string                  Required; trim;
                                                   sensible maximum length

  `email`                  string                  Required; valid email;
                                                   maximum 254 characters

  `cellNumber`             string                  Required; length and
                                                   format bounds

  `farmName`               string                  Optional; length bound

  `farmLocation`           string                  Optional; length bound

  `operationType`          string                  Optional; approved
                                                   values or bounded text

  `machineCountEstimate`   integer                 Optional; zero or
                                                   greater

  `servicesOfInterest`     string array            Required; non-empty;
                                                   allowlisted identifiers

  `additionalMessage`      string                  Optional; strict
                                                   maximum length

  `privacyNoticeVersion`   string                  Conditional on approved
                                                   privacy design
  ------------------------------------------------------------------------

The server must set `created_at`, initial lead `status` and notification
status. Ignore or reject client attempts to set server-controlled
fields.

The approved required fields are `contactName`, `email`, `cellNumber`
and a non-empty `servicesOfInterest` containing only
`farm_management_technology` and/or `machinery_detailing`. `farmName`,
`farmLocation`, `operationType`, `machineCountEstimate` and
`additionalMessage` are optional. There is no separate `phone` field.

This contract is not permission to collect personal information. The
product owner confirms responsibility for enquiry data, supplied
acknowledgement wording and set a one-week retention period; see the
[enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md).
The lawful basis, complete Privacy Notice, public responsible-party
contact details and deletion/backup process remain pending. Do not
enable the form or endpoint until these are approved and actionable.
Brevo is selected, and the product owner reports that the deployed
backend uses `BREVO_API_KEY`, `EMAIL_FROM` and `BUSINESS_EMAIL`. The
adapter is not implemented or tested, sender/recipient verification and
provider data-location review remain pending, and email notifications
remain disabled. No non-essential analytics is approved at launch.

### Success response

Return `201 Created` once the enquiry has been successfully persisted.

``` json
{
  "success": true,
  "data": {
    "enquiryId": "00000000-0000-0000-0000-000000000000"
  },
  "message": "Your enquiry has been received. Agrijuune will follow up."
}
```

The example UUID is a placeholder. Do not return the full enquiry record
to the browser.

### Error responses

  --------------------------------------------------------------------------
  HTTP status             Error code                 Meaning
  ----------------------- -------------------------- -----------------------
  `400`                   `VALIDATION_ERROR`         Invalid or incomplete
                                                     request

  `413`                   `PAYLOAD_TOO_LARGE`        Request body exceeds
                                                     configured limit

  `415`                   `UNSUPPORTED_MEDIA_TYPE`   Unsupported content
                                                     type

  `429`                   `RATE_LIMITED`             Too many requests

  `500`                   `INTERNAL_ERROR`           Unexpected server
                                                     failure

  `503`                   `SERVICE_UNAVAILABLE`      Required persistence
                                                     service unavailable
  --------------------------------------------------------------------------

Do not return `201` if persistence failed.

### Email notification behaviour

The enquiry must be persisted before notification is attempted.

-   Do not attempt email while a provider, sender and exact authorized
    recipient address are unapproved or unconfigured, or while the
    privacy gate or adapter implementation remains incomplete. Brevo is
    selected, but no email has been sent; until delivery is approved and
    implemented, record notification status as `not_configured`.
-   If persistence succeeds and email succeeds, return `201`.
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
-   Use HTTPS in production.
-   Do not enable credentials unless the endpoint genuinely needs them.

## 6. API client behaviour

The frontend API client should:

-   Use a configured API base URL.
-   Set the expected content type.
-   Handle network failures and non-2xx responses.
-   Map safe validation messages to the relevant form fields.
-   Avoid logging personal form data.
-   Avoid automatic retries for enquiry POST requests unless an
    idempotency strategy is implemented.

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
