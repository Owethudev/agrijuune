# Agrijuune

Agrijuune is a proposed Gauteng-based agricultural support business for crop and vegetable farms. It combines practical farm administration, operational systems setup and mobile cleaning/care of agricultural machinery and tools.

> **Status:** Working business concept for discussion and validation. Agrijuune is not yet a final business plan, financial forecast, service-level agreement or compliance certification.

## Table of Contents

- [Purpose](#purpose)
- [Target Customers](#target-customers)
- [Services](#services)
- [Business Model](#business-model)
- [Positioning](#positioning)
- [Founder Resources](#founder-resources)
- [Current Stage](#current-stage)
- [Immediate Next Steps](#immediate-next-steps)
- [Risk and Scope Boundaries](#risk-and-scope-boundaries)
- [Documentation](#documentation)
- [Project Links](#project-links)

## Purpose

Agrijuune aims to help farms reduce administrative workload, organise day-to-day operations and keep machinery and working equipment clean and properly cared for.

The business will start as a service provider using existing tools, spreadsheets and carefully selected third-party software before deciding whether a proprietary farm-management application is commercially justified.

## Target Customers

The initial target market is:

- Crop and vegetable farms in Gauteng, South Africa
- Owner-managed and small-to-medium farm operations
- Farms that use a mix of paper, spreadsheets, messaging applications or existing software
- Farms with recurring administrative work or machinery-cleaning needs

Likely decision-makers include farm owners or managing directors, farm managers or operations managers, and administrative or finance staff.

Customer and market scope are provisional and should be refined through direct discovery.

## Services

Customers can purchase individual services or an agreed support package.

### Farm Administration Support

- Organise and digitise agreed business and operational documents
- Set up structured digital folders, naming conventions and document registers
- Maintain agreed inventory and stock records
- Prepare recurring operational summaries and management reports

### Farm Management Systems and Setup

- Configure practical spreadsheets, dashboards or suitable third-party applications
- Set up equipment registers, stock tracking and maintenance schedules
- Set up simple task and job tracking
- Provide basic onboarding and staff training
- Review and adjust systems to match the farm's workflow

### Mobile Equipment Cleaning and Care

- Travel to farms using available transport and agreed mobile equipment
- Wash and appropriately clean tractors, trailers, implements and selected tools
- Offer scheduled cleaning visits and job records
- Use equipment-appropriate methods and products while protecting sensitive components

## Business Model

Agrijuune is planned as a service-led business with both once-off setup work and recurring service agreements.

| Revenue stream | Proposed delivery |
| --- | --- |
| Administration support | Monthly hours, document batches or agreed recurring tasks |
| Digital system setup | Once-off setup of registers, dashboards, workflows and onboarding |
| System support | Monthly updates, data checks, user assistance and reporting |
| Equipment cleaning | Per machine, per visit, per equipment category or agreed schedule |
| Combined farm support | Tailored monthly or seasonal package |

No validated pricing, profit margin or customer acquisition cost is available yet.

**Pricing:** `[PLACEHOLDER - to be set after customer interviews and cost analysis]`

## Positioning

Professional and approachable: more structured than an informal one-off cleaning or administration service, while remaining accessible to farms that do not need or cannot justify a large enterprise solution.

The intended differentiators are:

- A modular offer for administration, system setup and equipment care
- Hands-on implementation and ongoing support
- A local, founder-led relationship
- Measured outcomes and documented work
- Clear scopes and honest capability boundaries

## Founder Resources

The concept currently assumes:

- Founder software-development experience
- Existing access to a vehicle
- Access to a pressure washer, vacuum and general cleaning equipment
- A willingness to undertake relevant professional cleaning, chemical handling and equipment-care training

The founder will network directly with farms to validate needs and relationships.

**Founder name:** `Owethu Jezile`

**Founder contact:** `[PLACEHOLDER]`

## Current Stage

Agrijuune is at an early validation stage. No customer interviews, letters of intent, paid pilots or confirmed contracts have yet been reported.

The first milestone is validated demand, not a large customer count.

## Immediate Next Steps

1. Complete the founder's product requirement template.
2. Conduct discovery conversations with Gauteng crop and vegetable farms.
3. Select an initial paid offer based on validated demand.
4. Create quotations, job sheets, equipment registers, cleaning records and reporting templates.
5. Complete relevant training, insurance and written service terms.
6. Review evidence before investing in advanced equipment or proprietary software.

## Risk and Scope Boundaries

- Demand and willingness to pay have not yet been validated.
- No mechanical repair, agronomic, pesticide-handling or food-safety sanitation service should be offered without the necessary competence, training, insurance and authorisation.
- General machinery detailing must not be represented as food-safety sanitation.
- Water access, chemical storage, wastewater/runoff, electrical protection and environmental requirements must be confirmed for each job.
- Farm data requires confidentiality, backup, retention and deletion practices agreed in writing.
- Liability, vehicle, equipment and contractor arrangements must be investigated before operations begin.
- Pricing must account for travel, labour, consumables, water, fuel, equipment wear and job turnaround.
- Third-party contractors require qualification, insurance and reference checks.

## Documentation

- [Agrijuune Business Concept](docs/Agrijuune_Business_Concept.pdf)
- [Stitch Design Project](https://stitch.google.com/projects/6282007789333470748)
- `[PLACEHOLDER - product requirements document]`
- `[PLACEHOLDER - implementation plan]`
- `[PLACEHOLDER - operating manuals and templates]`

## Project Links

- **Repository:** [Owethudev/agrijuune](https://github.com/Owethudev/agrijuune)
- **Website:** [Agrijuune](https://agrijuune.vercel.app/)
- **Backend:** [Agrijuune API](https://agrijuune.onrender.com)
- **Email:** `[PLACEHOLDER]`
- **Phone:** `[PLACEHOLDER]`
- **Social media:** `[PLACEHOLDER]`

## Open Business Items

- `[PLACEHOLDER - legal business name and registration status]`
- `[PLACEHOLDER - tax status]`
- `[PLACEHOLDER - exact Gauteng service radius]`
- `[PLACEHOLDER - trademark, domain and social-handle availability]`
- `[PLACEHOLDER - target customer pricing]`
- `[PLACEHOLDER - insurance cover]`
- `[PLACEHOLDER - training and certification]`
- `[PLACEHOLDER - POPIA and data-handling procedures]`

## Development Setup

This repository uses npm workspaces for the React/Vite frontend and
Node.js/Express backend. TypeScript is a provisional scaffold choice;
the project documentation still requires confirmation.

Install dependencies:

```sh
npm install
```

Run the applications in separate terminals:

```sh
npm run dev:frontend
npm run dev:backend
```

Other project checks:

```sh
npm run build
npm run lint
npm run typecheck
npm test
```

Copy the relevant `.env.example` to `.env` in each application directory
for local configuration. Keep real credentials out of Git; the
Supabase service-role key belongs only in the backend environment.
