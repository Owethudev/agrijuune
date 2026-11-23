# Agrijuune --- Coding Standards

## 1. Purpose

These standards keep the codebase readable, secure, testable and
maintainable. Apply them pragmatically; do not introduce unnecessary
abstractions merely to satisfy a pattern.

## 2. Core principles

-   **SOLID:** use single responsibility, open/closed design,
    substitutability, interface segregation and dependency inversion
    where they improve the design.
-   **DRY:** avoid duplicated business rules, while allowing small
    duplication when abstraction would make code harder to understand.
-   **KISS:** choose the simplest design that meets the requirement.
-   **YAGNI:** do not build speculative features or infrastructure.
-   **Separation of concerns:** UI, HTTP, business rules, persistence
    and provider integrations have distinct responsibilities.
-   **Least surprise:** follow existing project patterns consistently.

## 3. General code rules

-   Use descriptive names that communicate intent.
-   Prefer small cohesive functions and modules.
-   Keep functions focused on one responsibility.
-   Avoid deeply nested conditionals; use clear guard clauses where
    appropriate.
-   Avoid magic values; name meaningful constants.
-   Avoid hidden side effects and unexpected mutation.
-   Avoid unnecessary global state.
-   Handle errors explicitly; never silently swallow exceptions.
-   Remove temporary debug output before production.
-   Add comments to explain non-obvious reasoning, constraints or
    trade-offs---not to narrate obvious code.
-   Do not add comments that become inaccurate after a change.

## 4. TypeScript and JavaScript

TypeScript is recommended, but the final language choice is still to be
confirmed. Follow the language already used in the repository.

If TypeScript is adopted:

-   Enable strict type checking where practical.
-   Avoid `any`; use `unknown` and narrow types at untrusted boundaries.
-   Define explicit request, response and domain types.
-   Do not use type assertions to bypass validation.
-   Keep runtime validation for external input; TypeScript types do not
    validate HTTP requests.
-   Avoid duplicating types manually where a safe shared source can be
    used.

If JavaScript is retained, use clear module boundaries and runtime
schemas for external input.

## 5. Backend standards

-   Routes define endpoint paths and middleware order.
-   Controllers handle HTTP translation only.
-   Services own use-case/business logic.
-   Repositories own persistence operations.
-   Infrastructure adapters encapsulate Supabase and email provider
    details.
-   Do not call Supabase directly from controllers or route handlers.
-   Do not send email directly from controllers.
-   Do not pass Express `Request` or `Response` objects into
    service/domain logic.
-   Use central error handling and consistent response contracts.
-   Validate environment configuration at startup.
-   Use asynchronous error handling consistently.

## 6. Frontend standards

-   Components should be cohesive and reasonably small.
-   Separate reusable UI components from feature-specific components.
-   Keep API requests in a shared API/client layer, not scattered
    through presentational components.
-   Keep form state and validation understandable.
-   Provide loading, empty, success and error states where applicable.
-   Use semantic HTML and accessible labels.
-   Use stable keys for rendered collections.
-   Avoid unnecessary effects and duplicated derived state.
-   Do not introduce state-management libraries without a demonstrated
    need.
-   Do not add animation or 3D dependencies solely for decoration.

## 7. Naming and file organisation

Follow existing repository conventions. Recommended naming:

-   Components: `PascalCase`.
-   Functions and variables: `camelCase`.
-   Constants: `UPPER_SNAKE_CASE` for true module-level constants.
-   Types/interfaces: `PascalCase`.
-   Database columns: `snake_case`.
-   Feature and module names: descriptive, consistent and
    domain-oriented.

Use one clear naming convention per layer. Do not rename large areas of
the project as part of an unrelated feature.

## 8. Dependencies and configuration

-   Prefer existing dependencies when suitable.
-   Add a dependency only when the benefit is clear and the package is
    maintained and appropriate.
-   Explain the purpose and impact of new dependencies.
-   Do not change package manager or lockfiles casually.
-   Keep secrets out of source files and version control.
-   Keep example environment files limited to variable names and safe
    placeholders.

## 9. Error handling and logging

-   Use predictable error types or error codes for expected failures.
-   Convert internal errors into safe API responses at the HTTP
    boundary.
-   Log enough context to diagnose failures, such as request ID and
    operation name.
-   Never log passwords, access tokens, service-role keys or full
    personal-data payloads.
-   Avoid logging the same error repeatedly at multiple layers without a
    reason.

## 10. Documentation and changes

-   Update API, database, architecture or security documentation when
    the implementation changes those contracts.
-   Keep pull requests/commits focused.
-   Use commit messages that describe the change, for example:
    -   `feat(enquiries): add enquiry submission endpoint`
    -   `fix(enquiries): preserve saved enquiry when email fails`
    -   `test(enquiries): cover invalid submission payloads`
    -   `docs(architecture): clarify email notification flow`

## 11. Prohibited shortcuts

Do not:

-   Put database queries in UI components or controllers.
-   Trust client-side validation as the only validation.
-   expose secrets in frontend variables or bundles.
-   use broad `catch` blocks that hide errors.
-   disable tests, lint rules or security controls merely to make a
    build pass.
-   create generic frameworks or layers for one trivial use case without
    a clear benefit.
-   implement unapproved product scope.
