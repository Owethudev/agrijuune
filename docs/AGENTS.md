# Agent Instructions --- Agrijuune

These instructions apply to every AI coding agent and every task
performed in this repository.

## 1. Read before changing code

Before implementation, read:

1.  `MASTER.md`
2.  `ARCHITECTURE.md`
3.  `CODING_STANDARDS.md`
4.  `SECURITY.md`
5.  The relevant parts of `DATABASE.md`, `API_CONTRACTS.md` and
    `TESTING.md`

Also inspect the existing repository, package scripts, current
implementation and nearby tests. Documentation does not replace
inspecting the actual code.

If a nested `AGENTS.md` exists, follow it in addition to this file. If
instructions conflict, stop and explain the conflict rather than
silently choosing.

## 2. Product scope is mandatory

The immediate Agrijuune release is the public website, standard sample
demonstration and enquiry-capture workflow.

Do not independently build a full farm-management platform, farm login
portal, customer CRM, online booking/payment system, live farm
integrations or client-specific workflows. These are outside the current
approved scope.

Both Farm Management Technology and Agricultural Machinery Detailing
must receive equal prominence. Do not misrepresent proposed capabilities
as live services.

Farms make and execute their own maintenance decisions. Agrijuune is not
a mechanical repair, inspection, diagnosis or certification provider.

## 3. Required working method

For each task:

1.  Restate the requested outcome and identify relevant constraints.
2.  Inspect the relevant files and existing patterns.
3.  Identify the smallest safe implementation that satisfies the
    request.
4.  Check whether the change affects architecture, database schema, API
    contracts, privacy or security.
5.  If it does, identify the required documentation and migration
    changes before coding.
6.  Implement only the approved scope.
7.  Add or update tests.
8.  Run relevant lint, type-check, test and build commands that actually
    exist in the repository.
9.  Review the diff for accidental changes, secrets, dead code and
    regressions.
10. Report files changed, checks run, results and any unresolved risks.

For a substantial or cross-cutting change, present a short
implementation plan and wait for approval if the task did not clearly
authorise the design decisions.

## 4. Architecture rules

-   Use a modular monolith unless the product owner approves a different
    architecture.
-   Keep HTTP concerns in routes/controllers and business rules in
    services.
-   Keep database access behind repositories or an equivalent isolated
    data-access boundary.
-   Keep provider-specific email/database code behind infrastructure
    adapters.
-   Keep frontend components focused on presentation and interaction.
-   Keep API communication in a dedicated frontend API/client layer.
-   Do not duplicate business rules across controllers, components and
    repositories.
-   Do not add abstractions that have no current use or clear benefit.
-   Follow the established structure in `ARCHITECTURE.md`.

## 5. Change safety

-   Do not remove, rename or rewrite working functionality unless
    explicitly requested or required for the approved change.
-   Do not perform broad refactors while implementing a small feature.
-   Do not change public API behaviour or database contracts without
    documenting the impact.
-   Do not add dependencies without explaining why they are needed.
-   Do not silently change package managers, framework versions, build
    tools or project configuration.
-   Do not invent environment variables, credentials, endpoints,
    provider settings or business details.
-   Preserve existing conventions where they do not conflict with
    approved standards.
-   Prefer small, reviewable changes.

## 6. Code quality

Follow `CODING_STANDARDS.md`:

-   Apply SOLID principles pragmatically.
-   Prefer readable, cohesive, testable code.
-   Use clear names and explicit types where the project uses
    TypeScript.
-   Avoid giant components, controllers and service modules.
-   Avoid duplicated logic, hidden side effects and unnecessary global
    state.
-   Handle errors deliberately; never swallow errors silently.
-   Do not leave debug logs, temporary code or placeholder behaviour in
    production paths.

## 7. Security and privacy

Follow `SECURITY.md` and `DATABASE.md`.

-   Never place Supabase service-role credentials or other secrets in
    frontend code.
-   Never commit real secrets or `.env` files.
-   Treat all browser input as untrusted.
-   Validate and constrain data on the server.
-   Use parameterised database operations and least-privilege access.
-   Do not expose enquiry records through public read endpoints.
-   Do not log passwords, tokens, full enquiry payloads or unnecessary
    personal data.
-   Do not weaken Row Level Security to make a feature work.
-   Do not claim POPIA compliance merely because a privacy notice
    exists; legal review and operational controls are still required.

## 8. Testing and completion

Follow `TESTING.md`.

At minimum, test the changed behaviour and relevant failure paths. For
enquiry handling, verify validation, persistence, duplicate/retry
behaviour where applicable, safe errors and email-provider failure after
persistence.

Run the repository's available checks. If a check cannot be run, state
why; never claim it passed.

A task is not complete merely because code was written. It is complete
when the implementation, tests, documentation and review are consistent.

## 9. Documentation maintenance

Update the relevant documentation when changing:

-   Architecture or module boundaries: `ARCHITECTURE.md`.
-   Code conventions: `CODING_STANDARDS.md`.
-   Security controls or data handling: `SECURITY.md`.
-   Schema, indexes, RLS or migrations: `DATABASE.md`.
-   Endpoints or payloads: `API_CONTRACTS.md`.
-   Test strategy or commands: `TESTING.md`.
-   Product scope or approved decisions: `MASTER.md`.

Record significant architectural decisions in `docs/decisions/` using
dated ADR files.

## 10. Required final response

After each task, report:

-   **Summary:** what changed.
-   **Files:** exact paths changed or created.
-   **Validation:** commands run and their actual results.
-   **Security/data impact:** any relevant changes or "none".
-   **Outstanding items:** decisions, risks or checks not completed.

Be direct and factual. Do not claim work, tests, deployment or
verification that did not happen.
