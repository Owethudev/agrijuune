# Agrijuune --- Testing Strategy

## 1. Purpose

Testing protects the enquiry workflow, public website experience,
security boundaries and existing functionality. Every meaningful change
must include appropriate verification.

## 2. Testing principles

-   Test observable behaviour, not private implementation details.
-   Prioritise critical user journeys and failure paths.
-   Keep tests deterministic and independent.
-   Do not use real personal data, production credentials or real
    customer records in automated tests.
-   Use mocks/fakes for external email services.
-   Use a non-production database for integration tests.
-   Never claim a test passed unless it was actually run and passed.

## 3. Test layers

### Unit tests

Test isolated logic, especially:

-   Enquiry input normalisation and validation.
-   Service-level rules.
-   Allowlisted service identifiers.
-   Error mapping.
-   Notification status decisions.
-   Utility functions and reusable UI logic.

### Integration tests

Test collaboration between modules:

-   Routes and validation middleware.
-   Controllers and services.
-   Services and repository contracts.
-   Repository behaviour against a test database where practical.
-   Email adapter success and failure behaviour using a fake provider.

### Frontend component tests

Test:

-   Form labels and accessible controls.
-   Required and optional field behaviour.
-   Validation feedback.
-   Loading, success and error states.
-   Keyboard interactions for navigation and demo controls.
-   Public route rendering, active navigation, route-change focus, and
    keyboard dismissal of the mobile menu.
-   Responsive-critical components where the test environment supports
    it.

### End-to-end tests

Cover the important visitor journeys:

1.  Visitor opens the homepage.
2.  Visitor can find both Agrijuune service divisions.
3.  Visitor opens and explores the standard demo without registering.
4.  Visitor opens the enquiry form.
5.  Visitor submits valid information and receives confirmation.
6.  Visitor receives understandable feedback for invalid or failed
    submissions.

Use test data only.

## 4. Critical enquiry tests

The following cases are mandatory before launch:

  -----------------------------------------------------------------------
  Scenario                            Expected result
  ----------------------------------- -----------------------------------
  Valid enquiry                       Record persisted; safe success
                                      response

  Missing required name               Validation error; no record

  Missing/invalid email               Validation error; no record

  Empty service selection             Validation error; no record

  Unknown service identifier          Validation error; no record

  Negative machine count              Validation error; no record

  Overlong free-text input            Validation error

  Unexpected server-controlled fields Ignored or rejected

  Database unavailable                Safe failure; no false success

  Email provider fails after          Enquiry remains saved; notification
  persistence                         failure recorded

  Repeated abusive submissions        Rate limit applied

  Anonymous database read             Denied

  Browser attempts privileged         No service-role credential
  database access                     available
  -----------------------------------------------------------------------

Also test that a notification failure does not cause the frontend to
encourage a duplicate submission when the enquiry was already saved.

## 5. Security tests

-   Verify RLS policies using the intended database roles.
-   Verify no anonymous select/update/delete access to enquiries.
-   Verify the service-role key is absent from frontend build output.
-   Run `npm audit --audit-level=high` and scan the built frontend for
    server-only credentials.
-   Verify production CORS rejects unapproved origins.
-   Verify request-size and rate limits.
-   Verify idempotent retries replay the saved ID, changed content with
    the same key conflicts, and a new key permits a legitimate repeat.
-   Verify CORS preflights permit `Idempotency-Key` but reject other
    unapproved request headers.
-   Verify errors do not disclose stack traces or provider internals.
-   Verify logs do not contain full enquiry payloads or secrets.

Run [`supabase/tests/enquiries_rls.sql`](../supabase/tests/enquiries_rls.sql)
through the Supabase SQL Editor only against the confirmed non-production
database after applying the enquiries migration. The assertions use
catalogue metadata and do not read or write enquiry records.

## 6. Accessibility checks

Check:

-   Keyboard-only navigation.
-   Visible focus indicators.
-   Semantic heading order.
-   Form labels and instructions.
-   Accessible validation and status messages.
-   Colour contrast.
-   Reduced-motion preference where animations are used.
-   Alternative text for meaningful images.
-   No essential information conveyed only by colour or animation.

The Playwright accessibility suite runs axe-core WCAG 2.2 AA checks on
public routes and representative menu, demo and form-error states. It
also checks keyboard focus, skip navigation, Escape handling, and
keyboard-operated controls with reduced motion enabled. Automated checks
supplement, but do not replace, manual assistive-technology testing.

## 7. Performance checks

Measure the built production site, not only the development server.

Recommended targets, where field measurement is available:

-   Largest Contentful Paint (LCP): 2.5 seconds or less.
-   Interaction to Next Paint (INP): 200 milliseconds or less.
-   Cumulative Layout Shift (CLS): 0.1 or less.

Also review image sizes, font loading, JavaScript bundle size, 3D
loading strategy and mobile network behaviour. These are targets, not
guarantees.

## 8. Commands and tooling

From the repository root, install from the lockfile and run the checks
defined by the current npm workspace scripts:

``` bash
npm ci
npx playwright install chromium
npm run check:migrations
npm run lint
npm run format:check
npm run typecheck
npm test
npm run test:e2e --workspace frontend
npm audit --audit-level=high
npm run build
npm run check:performance
```

The Playwright suite starts the frontend locally, enables the gated form
only for that test process, and intercepts enquiry API requests with
fictional responses. It never submits data to a backend or sends email.
These local end-to-end checks do not replace staging database, provider,
or release smoke tests.

The root `npm run build` scans the frontend output for server-only
credentials and runs `npm run check:performance` after building both
workspaces.

The migration check is offline and does not connect to Supabase or
execute SQL. It verifies timestamped migration names and prevents direct
data writes to `public.enquiries`; it does not validate PostgreSQL
syntax. Apply reviewed migrations to the confirmed non-production
project before any authorized production change.

The GitHub Actions workflow at `.github/workflows/ci.yml` runs these
checks, including Chromium-based Playwright tests, on pull requests
targeting `main` and on pushes to `main`. The `quality` job is required
by the active `main` ruleset.
The workflow uses no production credentials or personal data.

Dependabot dependency alerts/security updates are enabled in repository
settings; `.github/dependabot.yml` schedules weekly npm version updates
for the root lockfile and workspaces.

## 9. Definition of done

A change is complete when:

-   The requested behaviour works.
-   Relevant unit/integration/component/E2E tests are added or updated.
-   Existing relevant tests pass.
-   Lint, type-check and build checks pass where configured.
-   Security and privacy implications have been considered.
-   API/database/architecture documentation is updated when contracts
    change.
-   The diff contains no unrelated edits, secrets, debug code or
    accidental scope expansion.

If a test cannot be run, report the exact reason and remaining risk.
