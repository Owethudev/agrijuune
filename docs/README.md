# Agrijuune Documentation

Start with `AGENTS.md` for repository guidance. The product and
engineering references describe the public website, standard
demonstration and enquiry-capture release.

## Product and design documents

-   [`Agrijuune_PRD_v0.1.md`](Agrijuune_PRD_v0.1.md) --- Markdown
    version of the product requirements document.
-   [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) --- working palette,
    provisional UI tokens and shared CSS primitives.
-   [`Agrijuune_PRD_v0.1.pdf`](Agrijuune_PRD_v0.1.pdf) --- source PRD.
-   [`Agrijuune_Implementation_Plan_v1.0.pdf`](Agrijuune_Implementation_Plan_v1.0.pdf)
    --- implementation plan.
-   [`Agrijuune_Business_Concept.pdf`](Agrijuune_Business_Concept.pdf)
    --- business concept.
-   [`designs/`](designs/) --- Stitch design export and image assets.
-   [`decisions/`](decisions/) --- recorded project decisions.
-   [`decisions/2026-11-23-deployment-and-environments.md`](decisions/2026-11-23-deployment-and-environments.md)
    --- production hosts, preview boundaries and secret handling.
-   [`PRIVACY_NOTICE.md`](PRIVACY_NOTICE.md) --- current educational
    prototype notice and demo-data limits.

## Engineering references

-   [`AGENTS.md`](AGENTS.md) --- agent operating instructions
-   [`MASTER.md`](MASTER.md) --- product purpose, scope and approved
    baseline
-   [`ARCHITECTURE.md`](ARCHITECTURE.md) --- application boundaries and
    request flow
-   [`CODING_STANDARDS.md`](CODING_STANDARDS.md) --- code quality and
    SOLID principles
-   [`SECURITY.md`](SECURITY.md) --- security and privacy requirements
-   [`OPERATIONS.md`](OPERATIONS.md) --- release smoke checks, retention
    verification, incident response and operational gaps
-   [`DATABASE.md`](DATABASE.md) --- Supabase schema and access baseline
-   [`API_CONTRACTS.md`](API_CONTRACTS.md) --- first-release API
    contract
-   [`TESTING.md`](TESTING.md) --- verification strategy

## Important status notes

The product requirements include an earlier proposed commercial enquiry
flow. The current public deployment is an educational prototype; the
owner's 25 November 2026 scope clarification in the
[enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md)
supersedes public enquiry collection for this deployment. The public
form and enquiry notifications remain disabled, and only fictional demo
data should be used.

Strict TypeScript is used in both applications, and the frontend keeps
its existing CSS approach without a styling framework. The current npm
workspace setup remains unchanged. Production and preview hosts are
recorded in the deployment plan. The `/privacy` page describes the
prototype's current data handling, including invite-only team
authentication. It does not claim legal compliance or exempt the
project from applicable privacy laws. The seven-day production purge is
configured but its first scheduled run is unverified; Supabase Free
does not provide project backups, and provider log locations and
retention have not been independently confirmed. Do not enable public
data collection without a new owner-approved review of actual
requirements and provider controls.
Review all proposed schema and SQL before applying it to a database.
