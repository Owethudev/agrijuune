# Agrijuune --- Master Project Brief

**Document status:** Working baseline\
**Product:** Agrijuune public website, capability showcase, standard
demonstration and enquiry-capture experience\
**Business location:** Gauteng, South Africa

## 1. Project purpose

Agrijuune is an agricultural services business with two equally
important divisions:

1.  **Farm Management Technology** --- software and digital-system
    services that can help farms organise machinery and equipment
    information, maintenance records, stock information and related
    operational data.
2.  **Agricultural Machinery Detailing** --- mobile, on-site cleaning
    and detailing services for tractors and agricultural machinery.

The public website must explain the business, present both divisions
with equal prominence, demonstrate a standard example of the potential
technology offering, and allow interested visitors to submit an enquiry.

The website is a business showcase and lead-generation experience. It is
not the first release of a complete farm-management product.

## 2. Immediate release scope

The first release is limited to:

-   A responsive public-facing website.
-   Clear Agrijuune positioning and information about both business
    divisions.
-   A combined services presentation.
-   A standard sample demonstration using clearly identified
    fictional/sample data.
-   A guided walkthrough or demonstration video where approved assets
    are available.
-   Contact information and enquiry capture.
-   Server-side validation and secure persistence of enquiries.
-   An email notification to Agrijuune after an enquiry has been
    successfully persisted, where an email provider has been selected
    and configured.
-   A clear success or failure state for enquiry submission.

The website should support desktop, tablet and mobile layouts.

## 3. Explicit non-goals for the first release

Do not build or assume any of the following unless the product owner
separately approves the scope:

-   A production farm-management application.
-   Farm-owner, manager or machinery-operator login portals.
-   Client-specific farm dashboards or dedicated farm domains.
-   Live farm machinery, inventory or maintenance data integrations.
-   Farm-specific workflow configuration, permissions or schedules.
-   A maintenance decision-making or automated maintenance-authorisation
    system.
-   Online detailing appointment scheduling or booking.
-   Online payments, invoicing or subscriptions.
-   A customer CRM, internal job-management system or staff-management
    system.
-   Mechanical repairs, mechanical inspections, fault diagnosis or
    engineering services.
-   Food-safe, dairy-safe, poultry-safe or packhouse sanitation
    certification.
-   Automated quotations or guaranteed service prices.

A future farm platform may be considered after consultation with
individual clients. Do not silently expand the current website project
into that product.

## 4. Capability language and truthfulness

The website must distinguish between:

-   **Currently available services:** services Agrijuune is genuinely
    ready and authorised to provide.
-   **Potential platform capabilities:** functions that may be offered,
    configured or developed after a client consultation.
-   **Future possibilities:** ideas that are not yet committed or
    implemented.

Do not describe proposed software functions as already operational. Use
wording such as "potential capabilities", "can be configured", "subject
to consultation" or "planned offering" where appropriate.

Potential technology capabilities may include:

-   Machinery registration and digital asset records.
-   Maintenance schedules, history and reminders.
-   Basic stock or inventory records for tools and equipment.
-   Records of Agrijuune detailing services.
-   Dashboards and reporting.
-   Document storage, subject to client requirements.

These are showcase capabilities, not an instruction to implement the
full platform in this release.

## 5. Service boundaries

Farms retain responsibility for their own maintenance decisions and for
carrying out or arranging maintenance. Agrijuune may provide software to
record or support farm-defined processes, but it does not make
maintenance decisions on a farm's behalf.

Agrijuune's machinery detailing service is a cleaning and detailing
service. It must not be represented as mechanical repair, formal
mechanical inspection, condition certification or fault diagnosis. Any
visible observations made during cleaning must not be presented as a
professional mechanical assessment.

## 6. Enquiry experience

The public visitor should be able to browse the website and access the
standard demo without creating an account.

The approved enquiry field contract is:

-   **Required:** contact person's name, email address, cell number
    (`cell_number`) and one or more services of interest.
-   **Optional:** farm or organisation name, farm location, operation
    type, approximate machine count and additional message.
-   **Service identifiers:** `farm_management_technology` and
    `machinery_detailing`.

The cell number is the only phone field; do not add a separate `phone`
field. The product owner confirms responsibility for enquiry data,
provided acknowledgement wording, approved the notice text and selected
both documented lawful-basis grounds according to the enquiry context;
see the [enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md)
and [Privacy Notice](PRIVACY_NOTICE.md). The notice still contains
placeholders for the registered business name, business address and
Information Officer. The owner set seven-day database retention and
confirmed that Supabase backup retention is configured and verified for
a seven-day maximum; the database purge is not implemented. Exact
provider locations/transfers and Brevo message/log retention are
pending. Do not publish the notice or
enable an enquiry form or endpoint that collects personal information
until those gates are resolved.

On submission:

1.  Validate the request in the browser for usability.
2.  Validate it again on the server.
3.  Persist the enquiry before attempting email notification.
4.  Return a safe response to the browser.
5.  If an email provider, sender and exact recipient address are approved
    and configured, attempt notification through a replaceable email
    adapter. Enquiries are intended to go directly to the product owner;
    delivery remains disabled until those details are approved.
6.  Record notification status without losing the enquiry if email
    delivery fails.

The visitor should receive a clear confirmation after successful
persistence. Do not claim that an email was delivered merely because the
enquiry was saved.

## 7. Technology baseline

The agreed technology direction is:

-   **Frontend:** React + Vite.
-   **Backend:** Node.js + Express.
-   **Database:** Supabase PostgreSQL.
-   **Language:** Strict TypeScript in both frontend and backend.
-   **Styling:** Continue with the existing CSS approach; no styling
    framework is approved.

The backend is a modular monolith. Keep private database operations and
sensitive credentials on the server.

### Deployment and environments

-   **Production frontend:** Vercel,
    <https://agrijuune.vercel.app/>.
-   **Production API:** Render, <https://agrijuune.onrender.com/>.
-   **Production database:** Supabase PostgreSQL.
-   **Custom domain:** None confirmed; the provider hostnames above are
    in use.
-   **Preview:** Vercel pull-request previews support frontend review
    only. No staging API or Supabase database is configured; previews
    must not use production data or credentials.
-   **Local:** Use local configuration and test/sample data. Do not
    reuse production credentials.
-   **Branch protection:** Managed in GitHub settings by the repository
    owner; details are not duplicated in this document.

The following decisions and implementations require confirmation rather
than assumptions:

-   Package manager.
-   Brevo is selected, and the product owner reports `BREVO_API_KEY`,
    `EMAIL_FROM` and `BUSINESS_EMAIL` are configured in the deployed
    backend. The product owner approved sender/recipient routing and
    says the Brevo data-location review is okay, but exact provider
    disclosures remain outstanding. The adapter is not implemented and
    email delivery is disabled.
-   The owner-approved Privacy Notice and selected lawful-basis grounds
    are recorded in the enquiry decision record. The responsible party
    is named Agrijuune, and public privacy contacts are recorded there.
    The notice's registered-name, address and Information Officer
    placeholders remain. The owner specified deletion of database
    records containing submitted form information after seven days and
    a maximum seven-day backup-retention target, which the owner
    confirms is configured and verified. The purge must be implemented
    and verified. Each party will retain email copies as communication
    records; Brevo message/log retention and exact provider
    location/transfer disclosures remain pending.
-   Brand logo, photography, video and final design assets.

No non-essential analytics is approved at launch. Any later analytics
provider or consent approach requires separate approval.

Do not invent provider names, domains, API keys, credentials or business
contact details.

## 8. Design direction

The desired visual direction is premium, modern and agricultural, with
technology and equipment care both clearly represented.

The supplied identity pack provides the working navy, red, blue,
cloud-white and ink palette in
`resources/companyIdentityPack/brand-colors.json`. Treat the palette
and detailed UI tokens as provisional until founder review; see
`DESIGN_SYSTEM.md` for current usage and contrast guidance.

Use motion and any 3D elements selectively. Performance, accessibility,
readability and mobile usability take priority over decorative effects.

## 9. Quality priorities

Priorities, in order:

1.  Correct scope and truthful business representation.
2.  Security and privacy.
3.  Reliability of enquiry capture.
4.  Maintainable architecture and SOLID principles.
5.  Responsive accessibility and usability.
6.  Performance.
7.  Visual polish and animation.

## 10. Definition of first-release completion

The first release is ready for launch when:

-   Both business divisions are clearly and equally represented.
-   All claims about services and software capabilities are accurate.
-   The standard demo is accessible without account registration and
    uses sample data.
-   Enquiry submissions are validated server-side and persisted
    securely.
-   An email failure cannot cause a persisted enquiry to be lost.
-   Privacy information and consent/acknowledgement behaviour are
    approved.
-   No secrets are exposed in frontend assets or source control.
-   Responsive, accessibility, security and regression checks have
    passed.
-   Production deployment, domain, monitoring and enquiry follow-up
    ownership are confirmed.

## 11. Change control

When requirements are unclear, ask the product owner rather than
inventing an answer. Record material decisions in the project
documentation and, where appropriate, in an Architecture Decision Record
under `docs/decisions/`.

Do not change approved scope, API contracts, database structure,
security posture or architectural boundaries without explaining the
impact and obtaining approval.
