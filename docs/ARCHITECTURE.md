# Agrijuune --- Architecture

**Status:** Baseline architecture for the first public website release\
**Architecture style:** Modular monolith with a separately built React
frontend and Express API

## 1. Architectural objective

Deliver a fast, accessible public Agrijuune website with a standard
sample demonstration and reliable enquiry capture.

The architecture must be maintainable and secure without prematurely
building the future farm-management product.

## 2. System context

``` text
Visitor
  |
  v
React + Vite public website
  |-- Public pages and service information
  |-- Standard sample demo (sample data only)
  |-- Enquiry form
  |
  | HTTPS API request
  v
Node.js + Express API
  |-- Routes
  |-- Middleware (validation, security, request context)
  |-- Controllers
  |-- Services
  |-- Repositories
  |-- Infrastructure adapters
  |
  +---------------------> Supabase PostgreSQL
  |                         Enquiry records
  |
  +---------------------> Email provider
                            Agrijuune notification
```

The frontend must not connect to the database using a service-role key.
Enquiry persistence is performed by the backend.

## 3. First-release boundaries

### Frontend responsibilities

-   Render public pages and the combined services presentation.
-   Present approved business information and truthful capability
    descriptions.
-   Render the standard demonstration using non-sensitive sample data.
-   Collect enquiry input and provide client-side usability feedback.
-   Call the backend API through a central API client.
-   Display loading, success and safe error states.
-   Provide accessible responsive navigation and forms.

### Backend responsibilities

-   Expose versioned HTTP endpoints.
-   Apply security middleware, request limits and server-side
    validation.
-   Enforce business rules for enquiry submission.
-   Persist enquiries through a repository.
-   Trigger email notification through an infrastructure adapter after
    persistence.
-   Record notification outcomes without exposing internal provider
    details.
-   Return consistent, safe API responses.

### Database responsibilities

-   Persist enquiry records and the minimum operational metadata needed.
-   Enforce constraints and least-privilege access.
-   Keep private records inaccessible to anonymous browser reads.
-   Support auditable schema changes through migrations.

### External provider responsibilities

-   Supabase hosts PostgreSQL.
-   An email provider sends notifications after one is selected and
    configured.
-   Provider-specific implementation must be isolated behind adapters.

## 4. Backend request lifecycle

``` text
HTTP request
  -> Express route
  -> security / request middleware
  -> request validation
  -> controller
  -> service (business rules)
  -> repository (data access)
  -> Supabase PostgreSQL
  -> service coordinates result and notification
  -> controller formats HTTP response
```

The exact middleware order must be documented in the application setup
and must ensure request-size limits, security headers, CORS policy, rate
limiting and validation are applied appropriately.

The current API middleware order is request ID, security headers, exact
origin allowlist, HTTP method/content-type checks, a 10 KB JSON parser,
routes, not-found handling and central error handling. Rate limiting and
enquiry validation are not enabled until their endpoints are implemented.

### Layer responsibilities

  -----------------------------------------------------------------------
  Layer                   Responsibility          Must not do
  ----------------------- ----------------------- -----------------------
  Route                   Map HTTP method/path to Contain business rules
                          middleware and          or database queries
                          controller              

  Middleware              Cross-cutting request   Become a substitute for
                          checks and context      domain services

  Controller              Translate HTTP          Contain complex
                          input/output            business logic or SQL

  Service                 Enforce use-case rules  Depend on Express
                          and coordinate work     request/response
                                                  objects

  Repository              Read/write persisted    Decide HTTP status
                          data                    codes or send email

  Infrastructure adapter  Integrate               Leak provider-specific
                          Supabase/email provider details into domain
                                                  logic
  -----------------------------------------------------------------------

## 5. Enquiry workflow and reliability

1.  Browser submits an enquiry to the API.
2.  Server validates and normalises permitted fields.
3.  Service creates the enquiry through the repository.
4.  Once persistence succeeds, the service attempts notification through
    the email adapter.
5.  Notification status is recorded where feasible.
6.  API responds that the enquiry was received.

**Critical reliability rule:** email failure must not erase or
invalidate an enquiry that has already been saved. Return success for
successful persistence even if notification delivery fails, while
logging a safe operational error and making the notification failure
observable to the business operator.

For stronger delivery guarantees, a future approved change may introduce
a transactional outbox and background worker. Do not add that complexity
until the deployment and operational requirements justify it.

## 6. Suggested backend module layout

Adapt to the repository's actual structure rather than moving files
without approval.

``` text
backend/
  src/
    app.ts
    server.ts
    config/
      env.ts
    modules/
      enquiries/
        enquiry.routes.ts
        enquiry.controller.ts
        enquiry.service.ts
        enquiry.repository.ts
        enquiry.validation.ts
        enquiry.types.ts
    infrastructure/
      database/
        supabase.client.ts
      email/
        email.sender.ts
    middleware/
      error-handler.ts
      not-found.ts
      request-id.ts
    shared/
      errors/
      logging/
      validation/
  tests/
```

Both applications use strict TypeScript. Keep runtime validation for
untrusted input; TypeScript types do not validate HTTP requests.

## 7. Suggested frontend layout

``` text
frontend/
  src/
    app/
    components/
      layout/
      navigation/
      forms/
      feedback/
    features/
      home/
      services/
      demo/
      enquiries/
      faq/
      contact/
    content/
    lib/
      api/
    styles/
    types/
  public/
```

Use feature-oriented organisation where it improves cohesion. Avoid
creating empty folders or abstractions before they are needed.

## 8. Demo architecture

The standard demo is a showcase, not a live farm tenant environment.

-   Use fictional/sample farm and machinery records.
-   Make it visually clear that the information is demonstration data.
-   Do not use real client information.
-   Do not connect the demo to production farm records.
-   Do not expose credentials or privileged API access in demo code.
-   Prefer static or locally bundled sample data for the first release
    unless a specific interactive requirement justifies an API.
-   Keep demo capabilities consistent with what Agrijuune actually
    intends to offer; label unbuilt capabilities as illustrative.

## 9. API versioning and errors

-   Use `/api/v1` for public application endpoints.
-   Keep response shapes consistent; see `API_CONTRACTS.md`.
-   Use central error handling.
-   Return safe client-facing messages and log diagnostic details
    server-side without sensitive payloads.
-   Do not expose stack traces, SQL errors, provider credentials or
    internal infrastructure details.

## 10. Configuration and environments

Separate local, test/staging and production configuration. Validate
required environment variables at application startup. Never silently
substitute production credentials or default secrets.

Production hosts, URLs and environment boundaries are recorded in
`MASTER.md` and
`decisions/2026-11-23-deployment-and-environments.md`. Vercel pull-request
previews are frontend-only; no staging API or database is configured.

`FRONTEND_ORIGIN` configures the backend's single allowed browser origin.
Set it to the deployed frontend origin in production; an unset value
fails closed for cross-origin browser requests.

The repository owner manages branch-protection settings in GitHub.
Package manager and email configuration remain open decisions. Do not
hard-code assumptions.

## 11. Performance and accessibility

-   Optimise images and serve responsive formats.
-   Lazy-load below-the-fold media and heavy interactive/3D elements.
-   Avoid loading a 3D library on pages that do not need it.
-   Keep sample demo assets appropriately sized.
-   Minimise unnecessary client-side JavaScript.
-   Provide semantic HTML, keyboard access, visible focus and accessible
    form errors.
-   Treat performance and accessibility as acceptance criteria, not
    last-minute polish.

## 12. Future evolution

A future farm platform may require tenant isolation, authentication,
farm-specific roles, audit history, configurable workflows and
additional data models. Those concerns are not a reason to implement
unused infrastructure now.

Before that product is approved, perform a separate discovery and
architecture exercise covering tenancy model, data ownership,
permissions, retention, backups, support, hosting, migrations and
contractual responsibilities.
