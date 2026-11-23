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

## Engineering references

-   [`AGENTS.md`](AGENTS.md) --- agent operating instructions
-   [`MASTER.md`](MASTER.md) --- product purpose, scope and approved
    baseline
-   [`ARCHITECTURE.md`](ARCHITECTURE.md) --- application boundaries and
    request flow
-   [`CODING_STANDARDS.md`](CODING_STANDARDS.md) --- code quality and
    SOLID principles
-   [`SECURITY.md`](SECURITY.md) --- security and privacy requirements
-   [`DATABASE.md`](DATABASE.md) --- Supabase schema and access baseline
-   [`API_CONTRACTS.md`](API_CONTRACTS.md) --- first-release API
    contract
-   [`TESTING.md`](TESTING.md) --- verification strategy

## Important status notes

These documents are based on the current Agrijuune first-release scope:
public website, standard sample demo and enquiry capture. They
deliberately do not specify a full farm-management application.

Strict TypeScript is used in both applications, and the frontend keeps
its existing CSS approach without a styling framework. The current npm
workspace setup remains unchanged. The production hosts and preview
boundaries are recorded in the deployment plan. The enquiry field
contract and one-week retention period are recorded in the
[enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md).
The email provider, complete Privacy Notice, lawful basis, public
responsible-party contact details and deletion/backup process remain
open. Review all proposed schema and SQL before applying it to a
database.
