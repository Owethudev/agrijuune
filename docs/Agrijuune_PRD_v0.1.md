> **Source note:** This remains a draft derived from the
> [PDF](Agrijuune_PRD_v0.1.pdf). The approved enquiry fields and service
> identifiers are recorded in the
> [enquiry decision record](decisions/2026-11-23-enquiry-privacy-and-routing.md).
> Lawful-basis, Privacy Notice, deletion/backup and email-delivery
> approvals remain outstanding. The owner-set one-week retention period
> and supplied draft acknowledgement are recorded in the decision record;
> use the [master project brief](MASTER.md) and current decisions for
> approved requirements.

**AGRIJUUNE**

**Product Requirements Document (PRD)**

**Version:** 0.1 | **Status:** Draft for review | **Date:** 22 November 2026

**Scope:** Public website • Guided platform demonstration • Enquiry conversion

> **Critical scope boundary:** This PRD defines Agrijuune's public-facing website, standard guided demonstration and enquiry journey. It is not an instruction to build the complete farm-specific management systems now. Farm-specific technical requirements, configurations, permissions, workflows, maintenance decisions and service arrangements are determined with each customer during consultation. Farms make and execute their own maintenance decisions. Agrijuune provides the platform and agricultural machinery detailing services.

# Document control

- **Product:** Agrijuune Public Website and Platform Showcase.

- **Author:** Owethu Jezile (confirm preferred author attribution before external circulation).

- **Business area:** Gauteng, South Africa.

- **Version:** v0.1.

- **Status:** Draft — discovery answers consolidated; open decisions remain.

- **Source:** 100 Agrijuune discovery answers and the supplied _PRD Template — Student Copy_.

- **Purpose:** Establish a reliable source of truth for the first public website and its lead-generation experience.

| Version | Date | Change | Regenerated |

| --- | --- | --- | --- |

| v0.1 | 22 Nov 2026 | First consolidated draft from 100 discovery answers. | Not applicable |

This document should remain **Draft** until Section 13.3 is resolved and the founder approves the scope, content, privacy approach and technology choices.

**1. Product overview**

## 1.1 Product name

**Agrijuune — Public Website and Platform Showcase.**

## 1.2 One-line pitch

Agrijuune helps Gauteng farm owners explore practical farm technology and machinery detailing services so they can enquire about support suited to their operations.

## 1.3 Problem statement

Farm owners and managers may need clearer ways to understand available digital machinery-management support and agricultural machinery detailing, but these needs are often presented by separate providers. A prospective customer currently has no single Agrijuune destination where both divisions, the company's purpose and a representative platform demonstration can be explored together. Agrijuune is at an early validation stage and has not yet established confirmed customer numbers, measured demand or verified performance outcomes. The website must explain the offer without presenting assumptions as proven results.

## 1.4 Solution

The website introduces Agrijuune and gives equal prominence to **Farm Management Technology** and **Agricultural Machinery Detailing** . Visitors can explore one combined services page, read about the company, view a guided step-by-step demonstration using sample farm information, consult an FAQ page and submit an expression-of-interest enquiry. Agrijuune receives the enquiry and follows up manually to understand the farm's requirements before discussing a proposal or client-specific service arrangement.

## 1.5 Platform

Responsive public website, accessible through modern desktop, laptop, tablet and mobile browsers. Design the responsive web experience first; no native mobile application is included.

## 1.6 Vision

Agrijuune aims to become an agricultural support provider combining practical digital farm-management capabilities with on-site agricultural machinery detailing. The website should grow as genuine services, customer projects and validated platform capabilities are established.

## 1.7 Key terms

- **Agrijuune:** The business and umbrella brand.

- **Farm Management Technology:** The division presenting potential digital farm-management systems and related setup/support.

- **Agricultural Machinery Detailing:** The division providing agricultural machinery cleaning and detailing.

- **Platform:** The proposed farm-facing digital system; the public demo is illustrative, not a live customer system.

- **Guided Demo:** A standard step-by-step walkthrough using fictional sample farm and machinery records.

- **Enquiry:** A visitor's expression of interest submitted through the website.

- **Client Consultation:** The later discussion used to understand a farm's needs and agree on suitable configuration, scope and service arrangements.

**2. Users, personas and roles**

## 2.1 Primary user

Farm owners and farm managers in Gauteng, South Africa, particularly those operating crop and vegetable farms. They may use a smartphone, tablet or desktop computer and have mixed levels of comfort with digital tools. The website must use clear, practical agricultural language and work on mobile data as well as office connectivity. Specific age ranges, device/browser mix and digital-literacy levels have not yet been researched.

## 2.2 Secondary users

Other agricultural decision-makers and people researching Agrijuune's services. The founder or authorised Agrijuune personnel receive and respond to enquiries. The v1 public website does not provide an authenticated customer portal.

## 2.3 Personas (illustrative, not research-validated)

**Persona 1 — Farm owner**

- Situation: Owns or oversees a crop/vegetable farm in Gauteng.

- Goal: Understand whether Agrijuune's technology or detailing offer may suit the farm.

- Frustration: Unclear scope, technical jargon or promises that do not reflect the farm's needs.

- How the website helps: Explains both divisions, provides a guided demo and makes enquiry simple.

- Representative quote: “Show me what you offer and then we can discuss what fits this farm.”

**Persona 2 — Farm manager**

- Situation: Coordinates day-to-day farm activity and may research providers for the owner.

- Goal: Understand the showcase and share relevant information with decision-makers.

- Frustration: Difficulty comparing a technology offering and a physical service in one place.

- How the website helps: Provides clear service information and a repeatable guided demo.

- Representative quote: “I need to understand the options before I recommend a conversation.”

## 2.4 Roles and permissions

- **Public visitor:** Anyone visiting the website; no account required. Can view public pages, switch language, view the guided demo, read FAQ and submit an enquiry. Cannot access real farm systems, other enquiries or private customer data.

- **Agrijuune enquiry handler:** Authorised Agrijuune personnel, handled outside the public website in v1. Can receive and follow up on enquiries through approved business email/provider tools. No public admin dashboard is included.

- **Farm customer:** Not an account role in this project. A future farm system would require its own PRD and consultation.

## 2.5 Admin approach

No website admin screens in v1. Enquiries are routed to an Agrijuune-controlled email destination and handled manually. The destination email, authorised recipients and access controls must be confirmed before launch.

**3. Goals, success metrics and non-goals**

## 3.1 Goals

- **G1 — Explain both divisions:** At least 8 of 10 target-market usability participants correctly identify both service divisions after browsing. Check through moderated tests with 5–10 farm-sector participants.

- **G2 — Make the demo understandable:** At least 8 of 10 participants can describe three or more capability areas shown in the walkthrough. Check demo completion and comprehension.

- **G3 — Convert interest into enquiries:** Establish a baseline in the first 90 days; proposed initial target is at least 20% of enquiry-form starts resulting in successful submissions. Measure using privacy-approved analytics and delivery logs.

- **G4 — Reliable responsive experience:** 100% of critical acceptance tests pass on supported device/browser combinations before launch.

Targets are proposed validation targets, not proven forecasts.

## 3.2 Non-goals

- Building or deploying a complete farm-specific management system for a customer.

- Building an internal Agrijuune CRM, operations, job-management or detailing workforce platform.

- Farm logins, customer portals, live farm dashboards or real customer operational data.

- Automated farm maintenance decisions, mechanical diagnosis, repair recommendations or formal machinery inspections by Agrijuune.

- Defining each farm's maintenance procedures, schedules, thresholds, stock rules, role matrix, approval rules or notification recipients.

- Online detailing bookings, payments, quotations, invoices or contract management.

- Native mobile applications, offline-first farm platform, telematics or operating-hour tracking commitments.

- Publishing unverified testimonials, case studies, customer logos or invented portfolio examples.

- Claiming ordinary detailing provides food-safe sanitation or mechanical inspection.

**4. Features, business rules and notifications**

## 4.1 Feature list and priority

**Must**

- **F1 — Public company and service website:** Browse Agrijuune's purpose, both divisions, combined services page, FAQ and contact details; switch English/Afrikaans. Goals G1.

- **F2 — Guided standard platform demo:** Start and complete a walkthrough of illustrative sample capabilities and records. Goal G2.

- **F3 — Expression-of-interest enquiry:** Choose services of interest, provide contact/farm details, validate and submit. Goal G3.

- **F4 — Confirmation and follow-up expectations:** Show immediate confirmation and a thank-you page explaining next steps and contact details. Goal G3.

**Should**

- **F5 — SEO foundations:** Unique metadata, semantic content, bilingual page structure and Gauteng location context. Goal G1.

- **F6 — Privacy-respecting analytics (deferred):** No non-essential analytics at launch; reconsider only after separate privacy and consent approval.

- **F7 — Future portfolio readiness:** Prepare for genuine testimonials and a gallery for both divisions, but do not display fabricated content. Goal G1.

## 4.2 MVP definition

A responsive, bilingual public Agrijuune website with a clear introduction to both divisions, one combined services page, a guided sample platform demo, an expression-of-interest form, submission confirmation and a manual email follow-up process.

## 4.3 Future features

- Client-specific farm management systems, separately scoped and configured after consultation.

- Dedicated farm login portals and secure farm environments, subject to hosting, ownership, licensing and support agreements.

- Optional ongoing technical support.

- Client-specific maintenance, inventory, permissions, reporting, document storage and notification configurations.

- Expanded gallery and verified testimonials after real customer projects and permission.

- Additional languages beyond English and Afrikaans.

## 4.4 Business rules

- **BR1:** Public website access requires no registration or login.

- **BR2:** Farm Management Technology and Agricultural Machinery Detailing receive equal prominence on the homepage and service overview.

- **BR3:** The public demo is the same standard demonstration for all visitors and uses fictional/sample farm, machinery and maintenance data.

- **BR4:** The demo is a guided walkthrough, not a live customer system or a tool for configuring a real farm.

- **BR5:** The demo showcases machinery/equipment management, maintenance management, inventory/stock tracking, detailing records, dashboards and reporting.

- **BR6:** Client-specific workflows, technical scope, configuration, permissions, maintenance rules, recipients and service arrangements are agreed during consultation.

- **BR7:** Farms make and execute their own maintenance decisions. Agrijuune provides the platform; it does not decide maintenance priorities or perform mechanical diagnosis/repair under this offer.

- **BR8:** Agricultural Machinery Detailing is cleaning/detailing, not formal mechanical inspection, repair or fault diagnosis.

- **BR9:** No fixed package prices, guaranteed outcomes or unverified performance claims are published. Package combinations and pricing are discussed after consultation.

- **BR10:** Enquiry is non-binding and is not a confirmed booking, quote acceptance or purchase.

- **BR11:** Enquiry details are sent to an Agrijuune-controlled email destination; follow-up is manual.

- **BR12:** Email is the confirmed direct contact channel for v1. Phone, WhatsApp, social media contact and online booking are not confirmed.

- **BR13:** English is the default language; visitors can switch to Afrikaans.

- **BR14:** Testimonials and gallery content are published only when genuine, verified and authorised.

- **BR15:** The Gauteng coverage visual must not imply a more precise service boundary than Agrijuune can support; validate its wording and geography.

- **BR16:** Analytics must respect applicable privacy requirements, including POPIA; non-essential tracking must not run before required consent.

## 4.5 Notifications

- On valid enquiry: email the submitted details to authorised Agrijuune recipient(s); Agrijuune follows up manually.

- On valid enquiry: show the visitor an immediate on-screen confirmation and thank-you page.

- Visitor acknowledgement email is **not** included in v1; the selected discovery answer was confirmation plus thank-you page.

- No SMS, WhatsApp, push or in-app customer notifications are included in this public website.

**5. Accounts and sign-in**

**No accounts:** anyone can use the public website and guided demo without signing in. There is no visitor sign-up, login, password reset, account deletion or session management in v1. Farm customer authentication belongs to a future, separately scoped farm-system PRD.

**6. User stories, acceptance criteria and edge cases**

## 6.1 User stories and tests

**US1 / F1 — Understand Agrijuune**

- As a farm owner, I want to understand Agrijuune and both divisions so I can decide whether to explore further.

- **T-US1-1:** Given I open Home, when it loads, then the company purpose and both divisions are visible on desktop and mobile.

- **T-US1-2:** Given I select Afrikaans, when the language changes, then navigation and approved page content switch to Afrikaans.

- **T-US1-3 (unhappy):** Given a translation is unavailable, when I open that content, then the site falls back to English and does not show broken or empty text.

**US2 / F1 — Explore services**

- As a visitor, I want one services page explaining both divisions so I can compare the offer.

- **T-US2-1:** Both divisions receive equal visual prominence.

- **T-US2-2:** Each division is described in practical language with its scope and consultation boundary.

- **T-US2-3 (unhappy):** If a content block fails, a clear fallback appears and the rest of the page remains usable.

**US3 / F2 — Use the guided demo**

- As a prospective customer, I want a guided demo so I can understand platform capabilities before contacting Agrijuune.

- **T-US3-1:** Demo introduction states it is a standard sample walkthrough, not a live farm system.

- **T-US3-2:** The walkthrough covers all six capability areas in BR5 using consistent sample records.

- **T-US3-3 (unhappy):** If a step fails, the visitor can retry, continue or restart without losing access to the site.

**US4 / F3 — Submit an enquiry**

- As a visitor, I want to submit an expression of interest so Agrijuune can contact me about relevant services.

- **T-US4-1:** Valid required details and at least one service selection are accepted and delivered to the configured destination.

- **T-US4-2:** Missing or malformed fields show field-level errors and retain valid entered values.

- **T-US4-3 (unhappy):** If delivery fails, the site does not claim success; it offers retry and the published contact email.

**US5 / F4 — Know what happens next**

- As a visitor, I want confirmation after submission so I know the enquiry was received.

- **T-US5-1:** Successful submission shows immediate confirmation and navigates to Thank You.

- **T-US5-2:** Thank You explains manual follow-up, provides email contact and links to both divisions.

- **T-US5-3 (unhappy):** A failed submission never displays a successful thank-you state.

**US6 / F5 — Discover Agrijuune through search**

- **T-US6-1:** Each key page has a unique title, description, canonical URL and language metadata.

- **T-US6-2:** Page content clearly describes the relevant service and Gauteng context.

- **T-US6-3 (unhappy):** Missing sitemap/metadata is detected by build or deployment checks.

**US7 / F6 — Measure site engagement**

- **T-US7-1:** If consent is required and not granted, non-essential analytics do not fire.

- **T-US7-2:** With consent, approved events record service views, demo engagement and enquiry conversion without unnecessary personal information.

- **T-US7-3 (unhappy):** Analytics failure never blocks website or enquiry functionality.

**US8 / F7 — Prepare for portfolio content**

- **T-US8-1:** If no approved assets exist, no fake testimonials, customer logos or project photographs appear.

- **T-US8-2:** Future assets require customer permission, accurate descriptions and privacy review.

- **T-US8-3 (unhappy):** An unverified or unauthorised asset is withheld.

## 6.2 Edge cases

- No internet: “You appear to be offline. Check your connection and try again.” Keep entered values where safe; disable submission.

- Email/API unavailable: “We couldn’t send your enquiry just now. Please try again or contact Agrijuune by email.” Do not show success.

- Required field missing: “Please complete this field.” Preserve other valid values.

- Invalid email: “Enter a valid email address.”

- No service selected: “Select at least one service you are interested in.”

- Repeated submission: “Your enquiry may already have been sent. Please wait while we check.” Use duplicate protection.

- Demo asset failure: “This demo step is temporarily unavailable. Try again or return to the demo overview.”

- Translation unavailable: “This content is currently available in English.”

- Analytics blocked: no user-facing error; core site continues.

- Spam submission: “We couldn’t process this submission. Please try again later.” Apply server-side controls.

**7. User flows and navigation**

## 7.1 Core flows

**Flow A — Discover services:** S1 Home → S2 Services → explore S3 Farm Management Technology and S4 Agricultural Machinery Detailing sections → optionally S5 About/Contact or S9 FAQ → Express Interest or Platform Demo.

**Flow B — Guided demo:** S1 or navigation → S6 Demo Introduction → S7 Guided Demo → walkthrough of machinery, maintenance, inventory, detailing records, dashboards and reporting → Express Interest → S8 Enquiry. On failure, retry or return to S6.

**Flow C — Enquiry:** S8 Enquiry → enter contact and farm details → choose services → submit. Invalid data stays on S8 with errors. Delivery failure stays on S8 with retry/contact email. Success → S10 Thank You.

**Flow D — Direct contact:** S5 About/Contact or S9 FAQ → email link → visitor's email application.

## 7.2 Navigation map

flowchart TD S1[Home] -->|Services| S2[Services] S1 -->|Platform Demo| S6[Demo Introduction] S1 -->|About| S5[About and Contact] S1 -->|FAQ| S9[FAQ] S2 -->|Technology section| S3[Farm Management Technology] S2 -->|Detailing section| S4[Agricultural Machinery Detailing] S3 -->|Express Interest| S8[Enquiry Form] S4 -->|Express Interest| S8 S6 -->|Start walkthrough| S7[Guided Demo] S7 -->|Express Interest| S8 S8 -->|Successful submission| S10[Thank You] S10 -->|Explore services| S2 S10 -->|Return home| S1

**8. Screens**

## 8.1 Screen inventory

- **S1 Home:** Introduce Agrijuune and both divisions equally; clear CTAs.

- **S2 Services overview:** One combined page explaining both divisions.

- **S3 Farm Management Technology:** Explain proposed farm-facing technology capabilities and consultation boundary; may be an anchored section within S2.

- **S4 Agricultural Machinery Detailing:** Explain cleaning/detailing offer and exclusions; may be an anchored section within S2.

- **S5 About and Contact:** Explain purpose/vision and provide email contact.

- **S6 Demo Introduction:** Explain the demo is standard, sample-based and illustrative.

- **S7 Guided Demo:** Ordered sample capability walkthrough.

- **S8 Enquiry Form:** Collect contact, farm and service-interest details.

- **S9 FAQ:** Answer common questions.

- **S10 Thank You:** Confirm successful submission and explain next steps.

## 8.2 Screen specifications

**S1 — Home**

- Header: Agrijuune logo; Home, Services, Platform Demo, About Us, Contact, FAQ; English/Afrikaans switch; prominent “Express Interest”.

- Hero: strong combined introduction; innovation-led agricultural message; both divisions visible immediately.

- Hero visual: modern 3D technology-and-agriculture composition combining machinery and digital-interface motifs. Static fallback required.

- Two equal service cards/sections, one per division.

- CTAs: “Explore Services”, “Explore Platform Demo”, “Express Interest”.

- Gauteng service coverage map/visual with note that detailed availability is confirmed during enquiry.

- Footer: contact email, language switch, Privacy Notice, FAQ and division links.

**S2 — Services overview**

- One combined page with two equally prominent divisions, not separate top-level service pages in v1.

- Farm Management Technology summary: machinery/asset records, maintenance management, tools/equipment inventory, detailing records, dashboards and reports as potential capability areas.

- Agricultural Machinery Detailing summary: on-site cleaning/detailing for tractors and agricultural machinery.

- Explain that scope, package combinations, pricing, configuration and operating arrangements are determined with each customer.

- “Express Interest” CTA for each division.

**S3 — Farm Management Technology**

- Explain the purpose: digital tools intended to help farms organise and view relevant machinery and operational information.

- Showcase potential capability categories: machinery registration and digital asset records; maintenance schedules/history/reminders; tools/equipment stock availability; detailing service records; dashboards/reports; possible document storage subject to consultation.

- Do not claim all features are already built or included in every customer system.

- Do not present operating-hours tracking, telematics or automated maintenance decisions as committed capabilities.

- Explain that workflows, data, permissions, recipients, configuration, hosting and support are agreed during consultation.

**S4 — Agricultural Machinery Detailing**

- Explain on-site agricultural machinery cleaning/detailing, initially focused on tractors and agricultural machinery.

- Describe a tailored approach based on machine type, condition and customer requirements without publishing unvalidated technical procedures.

- State that this is not mechanical repair, fault diagnosis or formal technical inspection.

- Do not imply standard detailing provides food-safe sanitation.

- Direct booking is handled through enquiry/contact; no online booking system in v1.

**S5 — About and Contact**

- Focus on Agrijuune's purpose and vision and its intended combination of agricultural technology and machinery detailing.

- Brand message: innovation. Tone: agricultural, practical, clear and approachable.

- Email is the only confirmed direct contact channel for v1; actual address is pending.

- Show Gauteng, South Africa; do not publish a private street address.

**S6 — Demo Introduction**

- Demo is available without registration or farm details.

- Explain it is a standard demonstration using sample farm information, not a real farm environment.

- Buttons: “Start Guided Demo” and “Back to Services”.

- Explain that real systems are scoped/configured after consultation.

**S7 — Guided Demo**

- Step-by-step walkthrough with progress indicator, next/back controls and concise explanations.

- Ordered content: (1) machinery registration/asset records; (2) maintenance schedules, records and reminders; (3) tools/equipment inventory and availability; (4) detailing records/service-report concept; (5) dashboards and reporting; (6) overview connecting the capability areas.

- Use fictional records labelled “Sample data — for demonstration”.

- Do not permit edits to real farm data or imply that the visitor created an account.

- Final step invites the visitor to express interest.

**S8 — Enquiry Form**

Required or recommended fields:

- Contact person's full name — required.

- Email address — required.

- Cell number — required; this is the only phone field.

- Farm name — optional.

- Farm location — optional; general town/area and province, not precise GPS.

- Type of farming operation — optional.

- Approximate number of tractors/machines — optional estimate.

- Services of interest — required multi-select, allowlisting:

- `farm_management_technology` — Farm Management Technology.

- `machinery_detailing` — Agricultural Machinery Detailing.

- Additional message — optional, with length limit and warning not to submit sensitive or confidential farm information.

The form must state that an enquiry is not a booking, quote acceptance or purchase commitment. The owner supplied draft acknowledgement wording, recorded in the enquiry decision record; the complete Privacy Notice and lawful basis still require approval. Do not enable personal-data collection before that review.

**S9 — FAQ**

Cover what Agrijuune offers, the two divisions, guided demo, expressing interest, what happens after submission, client-specific scope and detailing exclusions. Avoid fixed prices, guaranteed response times, universal features or unconfirmed technical claims.

**S10 — Thank You**

- Confirm receipt of the enquiry.

- Explain Agrijuune will review details and follow up personally; do not promise an unapproved response time.

- Provide contact email.

- Explain that consultation may be used to understand farm requirements and discuss a suitable proposal.

- Link to Services, both divisions and Home.

## 8.3 Shared components

Header/navigation; primary and secondary CTA buttons; service division cards; accessible form fields; language switcher; privacy/analytics consent control; inline status/toast; loading and error fallbacks. Reuse consistent spacing, typography, focus states and error treatment.

## 8.4 Sample data

Use fictional records only, clearly marked “Sample data — for demonstration”. Example records: Tractor T-014; Utility tractor T-022 with a fictional upcoming maintenance entry; “Workshop tools — sample stock”; “Tractor T-014 — sample detailing visit”; illustrative dashboard totals. Never use real farm names, serial numbers, contact details or customer records.

**9. Design direction**

## 9.1 Look and brand

- **Look and feel:** Innovative, agricultural, professional; practical rather than overly technical.

- **Working palette:** The supplied identity pack provides navy
  (`#0B2D5B`), red (`#E30613`), blue (`#00AEEF`), cloud white
  (`#F8FAFC`) and ink (`#071B33`). These working values remain subject
  to founder approval; see `DESIGN_SYSTEM.md`.

- **Font:** A provisional Inter/system sans-serif stack is in use;
  final typography remains subject to founder approval.

- **Typography:** Body 16px minimum; small text 12px minimum; responsive
  headings. Current implementation values are provisional.

- **Spacing:** Proposed 8px scale.

- **Logo:** Use the supplied identity-pack assets as working brand
  direction; final selection and approval remain pending.

- **Imagery:** 3D technology-and-agriculture hero visual; each division has a distinct visual theme within one unified brand.

- Typography, spacing, corner radii, shadows and detailed design
  tokens require founder approval.

## 9.2 Tone of voice

Agricultural and practical: clear, direct, approachable and credible. Explain technology in plain language. Avoid jargon, inflated promises and unsupported claims.

## 9.3 Platform rules

- Design web-first and mobile-first.

- Proposed breakpoints: mobile under 640px; tablet 640–1024px; desktop above 1024px.

- Desktop top navigation; compact mobile menu.

- All interactions have hover, keyboard-focus, pressed and disabled states.

- 3D visuals must not block essential content; use reduced-motion support and static fallback.

- No autoplay video or high-bandwidth media required for essential content.

## 9.4 Accessibility

Target WCAG 2.2 AA. Body text at least 16px; small text at least 12px; normal text contrast at least 4.5:1; large text at least 3:1; interactive targets at least 44×44px where practical. Never communicate meaning by colour alone. Provide alt text, keyboard access, persistent form labels, accessible errors and reduced-motion alternatives.

**10. Data model**

The public website requires a small data model only. It must not store real customer machinery, maintenance, inventory or farm operations data. Demo records are static/sample content.

## 10.1 Entity: Enquiry

- `id` — unique generated identifier.

- `contact_name` — required text.

- `email` — required email.

- `cell_number` — required cell number, normalise server-side.

- `farm_name` — optional text.

- `farm_location` — optional general town/area/province text.

- `operation_type` — optional text.

- `machine_count_estimate` — optional approximate whole number or range.

- `services_of_interest` — required non-empty list of `farm_management_technology` and/or `machinery_detailing`.

- `additional_message` — optional long text with length limit.

- `privacy_acknowledged` — conditional on the approved privacy design; wording and version are not yet approved.

- `created_at` — date-time stored UTC, displayed SAST.

- `submission_status` — Received, delivery_failed, reviewed, followed_up.

## 10.2 Entity: AnalyticsEvent (only if approved and consented)

- `id`, `event_name`, `page_or_step`, `language`, `consent_state`, `created_at`.

- Event names may include page_view, service_view, demo_start, demo_step_complete, demo_complete, enquiry_start and enquiry_submit.

- Do not include names, email addresses, phone numbers or free-text enquiry content in analytics.

## 10.3 Relationships

A visitor may submit one or more independent enquiries. Analytics events are not linked to an enquiry unless a specific lawful and disclosed measurement requirement is approved. Demo sample records are static and are not linked to real enquiries.

## 10.4 Reference and seed data

Maintain approved service-interest options, language strings, FAQ content, navigation labels and demo step definitions. Seed the demo with fictional farm, machinery, maintenance, inventory, detailing and dashboard examples. No production test accounts are required.

**11. Tech stack and architecture**

> **Technology decisions are not yet confirmed.** The following are candidates, not approved selections. Do not install dependencies or generate a build plan until the founder approves the stack and hosting approach.

## 11.1 Stack decisions

- **Frontend candidate:** React + Vite + TypeScript. Confirm framework and versions.

- **Styling candidate:** Tailwind CSS. Confirm version and design approach.

- **3D candidate:** Three.js / React Three Fiber, subject to performance testing and static fallback.

- **Backend/API:** Undecided. A server-side endpoint is likely needed for secure enquiry validation and email delivery; choose serverless or Node.js/Express.

- **Database:** Undecided; possibly none for MVP if a reliable form/email provider is sufficient. Decide whether durable enquiry storage is required.

- **Authentication:** None for public website v1.

- **File storage:** None required unless approved media assets need managed storage.

- **Scheduled jobs:** None in v1.

- **Hosting/domain:** Undecided.

- **Testing:** Automated form/route checks plus manual device, accessibility and privacy testing.

- **Version control:** Repository link not supplied. Store this document as `docs/PRD.md`.

## 11.2 Third-party services

Brevo is the selected email delivery provider. The product owner reports that the deployed backend has `BREVO_API_KEY`, `EMAIL_FROM` and `BUSINESS_EMAIL` configured; actual values are not recorded here. The owner approved sender/recipient routing and says the Brevo data-location review is okay, but exact location/transfer details for the Privacy Notice have not been supplied. The email adapter is not implemented or tested, and delivery remains disabled until the privacy gate and implementation are complete. Analytics, map and bot-protection providers are not selected. No non-essential analytics is approved at launch. Keep paid/key-based integrations to the minimum. Never place secret API keys in frontend code. The Gauteng coverage map may initially be a static illustration if an interactive map is not approved.

## 11.3 How the parts connect

A visitor's browser loads the public website and static demo content. Enquiry collection must not be enabled until the lawful basis, complete Privacy Notice, seven-day deletion implementation and backup/provider-copy handling are approved. The responsible-party name is Agrijuune, and public privacy contact details are recorded in the enquiry decision record. The owner specified deletion of all form-submitted information seven days after submission and wants the purge implemented in code. Once approved, the browser may send validated form data to a server-side endpoint. That service validates the request, applies abuse controls and persists the enquiry; email delivery is a separate, disabled step until the Brevo adapter is implemented and the privacy gate is approved. No non-essential analytics runs at launch.

## 11.4 Permissions

- Public content: anyone can read.

- Enquiry: public visitor may create through a validated endpoint only after the privacy gate is approved.

- Enquiry read/update: authorised Agrijuune handler only, through approved provider; no public exposure.

- Analytics: no non-essential analytics at launch; any later use requires approval and applicable consent.

## 11.5 Environment variables (proposed)

- `PUBLIC_SITE_URL` — canonical URL; public.

- `BREVO_API_KEY` — Brevo API key; server only.

- `EMAIL_FROM` — sender identity; server configuration.

- `BUSINESS_EMAIL` — destination inbox; server configuration.

- `ANALYTICS_ID` — analytics property identifier; only after consent configuration.

- `MAP_PROVIDER_KEY` — only if an interactive map is selected; restrict by domain.

- Exact names depend on selected providers. Keep real values in server environment; commit placeholders only in `.env.example`.

## 11.6 Proposed folder structure

agrijuune-website/ docs/ (PRD.md, decisions/) public/ (images/, models/, icons/) src/ components/ pages/ sections/ content/en/ content/af/ demo/ forms/ analytics/ styles/ utils/ server/ (only if server-side endpoint is approved) tests/ .env.example README.md

## 11.7 Testing plan

- Test all T-US acceptance criteria; automate form validation, navigation, language routing and enquiry endpoint tests where practical.

- Test current Chrome, Edge, Firefox, Safari, iOS Safari and Android Chrome.

- Test widths from 360px through tablet and desktop.

- Test reduced motion, keyboard navigation, screen-reader labels, contrast and form error announcements.

- Test network failure, email provider outage, analytics blocked, spam, duplicate submission and language fallback.

- Test 3D enabled/disabled and static fallback.

- Use test-only contact details in staging.

- **Five-minute demo script:** homepage and dual service offer; combined services page; demo introduction; walkthrough of capability areas; Express Interest form; thank-you page and manual follow-up explanation.

**12. Quality, errors, security and privacy**

## 12.1 Quality requirements

- **Speed:** Target Largest Contentful Paint ≤ 2.5 seconds at the 75th percentile on representative mobile connections after launch; 3D assets must not block primary text or CTA.

- **Data usage:** No autoplay video; compress images/3D assets; lazy-load below-the-fold media; provide static fallback.

- **Offline:** Loaded content may remain visible; enquiry requires connection. Show “You appear to be offline. Check your connection and try again.”

- **Devices:** Responsive from 360px upward; current major desktop browsers, iOS Safari and Android Chrome.

- **Language/region:** English (South Africa) default and Afrikaans; SAST UTC+2; dates such as 22 Nov 2026; consistent ZAR format to be approved; phone input supports +27.

- **Accessibility:** WCAG 2.2 AA target.

- **Scale:** Size hosting to measured traffic; do not claim capacity before load testing.

- **Abuse limits:** Server-side validation, rate limiting and bot controls; exact thresholds selected with provider.

## 12.2 Error messages

- No internet: “You appear to be offline. Check your connection and try again.”

- Delivery error: “We couldn’t send your enquiry just now. Please try again or contact Agrijuune by email.”

- Form validation: “Please check the highlighted fields.”

- Expired form token: “This form has expired. Refresh the page and try again.”

- Rate limit: “We couldn’t process this submission. Please try again later.”

- Demo asset error: “This demo step is temporarily unavailable. Try again or return to the demo overview.”

## 12.3 Security

- HTTPS for all public pages and form endpoints.

- Server-side validation and sanitisation; client validation is supplementary.

- Protect enquiry endpoint against spam, automated abuse, injection and excessive requests.

- Keep email-provider secrets server-side; never commit secrets.

- Restrict inbox/provider access to authorised personnel; enable MFA where available.

- Do not expose enquiries or personal information in public code, URLs, logs or analytics.

- Use dependency updates, secure headers, backup/retention controls and deployment access controls.

- No visitor file uploads or sensitive farm operational details in v1.

## 12.4 Privacy and POPIA

Agrijuune must identify the responsible party and confirm lawful basis, purposes, retention, operator contracts and cross-border processing before launch. This PRD is not legal advice. Publish a Privacy Notice before collecting personal information and have the final notice and consent wording reviewed.

Personal information collected: contact name, email, phone, farm name, general location, farming operation, approximate machinery count and optional message. Purpose: respond to the enquiry and understand the service interest. Access: authorised Agrijuune handler. Storage provider and country: **to be selected and disclosed** . Retention: **must be decided and justified before launch** . Deletion/access/correction requests: provide a published contact route, subject to legal obligations.

Privacy requirements:

- Link Privacy Notice in footer and beside enquiry form.

- Explain collected information, purposes, recipients/operators, retention and rights.

- Do not bundle marketing consent with an enquiry.

- Do not knowingly collect children's personal information; confirm the age policy.

- Confirm where hosting, email, analytics and form providers store/process data and disclose cross-border transfers where required.

- Non-essential analytics must respect consent. Never send names, email addresses, phone numbers or message content to analytics.

**13. Assumptions, risks, open questions and milestones**

## 13.1 Assumptions and validation

- Gauteng crop/vegetable farms are a viable initial audience — validate through interviews and direct outreach.

- Visitors will understand the two-division offer — test with 5–10 target-market participants.

- Guided demo is more useful than a feature list — observe completion and ask what visitors understood.

- Email is sufficient for initial contact — validate with early prospects.

- Standard sample demo communicates enough value before consultation — test with prospects.

- Full-Gauteng detailing coverage is practical — validate travel, costs, equipment, capacity and demand before promising universal availability.

## 13.2 Risks

- **Showcase mistaken for a finished product (Medium likelihood / High impact):** Label capabilities as potential and explain consultation boundary.

- **3D visuals slow mobile site (Medium / Medium):** Compress, lazy-load, use reduced-motion and static fallback.

- **Enquiry delivery failure (Medium / High):** End-to-end tests, delivery monitoring and fallback contact.

- **POPIA gaps (Medium / High):** Confirm providers, data locations, retention, notice and consent.

- **Gauteng coverage commercially impractical (Medium / High):** Validate travel and capacity; use indicative coverage wording.

- **Detailing misunderstood as repair/inspection/sanitation (Medium / High):** State exclusions clearly.

- **Bespoke system ownership/hosting economics unclear (High / High):** Do not make public commitments until IP, licences, hosting and support are reviewed.

- **Unverified testimonials/assets (Low / High):** Require proof, permission and approval.

## 13.3 Open questions — resolve before approval

1. What exact Brevo location/transfer details should the Privacy Notice disclose? The owner says the data-location review is okay, but disclosure details remain pending. Public privacy contacts and the responsible-party name, Agrijuune, have been supplied; sender/recipient routing is approved.

1. Should any farm details be collected before the demo? Earlier answers suggested pre-demo farm context, but later answers say anyone can view the demo without registration. Recommended resolution: no gate before demo; collect farm context in the enquiry form only.

1. Who approves the final English and Afrikaans copy?

1. What exact Gauteng coverage representation is accurate, and should it be an interactive map or static illustration?

1. What are the final approved brand hex codes, logo asset, typography and 3D direction?

1. Which hosting, domain and frontend stack will be used? Brevo is the selected enquiry delivery provider.

1. Is a database needed, or is a secure form/email service sufficient?

1. What specific lawful basis and complete Privacy Notice are approved? The owner specified deleting all form-submitted information seven days after submission; the purge, backup and provider-copy handling remain to be implemented or documented.

1. How will enquiries be tracked after delivery? The product owner is the intended follow-up recipient; no CRM/dashboard has been selected.

1. Should the thank-you page state a response time? No response SLA has been agreed.

1. What future commercial terms govern bespoke system ownership, third-party licences, hosting transfer and support?

1. What detailing service boundaries or travel limits must be stated before publishing broad availability claims?

## 13.4 Milestones

- **M0 — Discovery:** 100 discovery questions answered and consolidated. Complete.

- **M1 — PRD approved:** Founder resolves open questions and approves scope/content. Target date TBC.

- **M2 — Design ready:** Logo/brand tokens, responsive layouts and screens reviewed. Target TBC.

- **M3 — Build plan ready:** Stack approved and MASTER.md aligned to PRD. Target TBC.

- **M4 — MVP built:** Public site, guided demo, bilingual pages and enquiry flow deployed to staging. Target TBC.

- **M5 — Tested and launched:** Acceptance, privacy, accessibility, SEO and device checks pass. Target TBC.

**14. Using this PRD with AI**

This is a later-stage workflow, not authorisation to code before open questions and stack decisions are resolved.

- **Step 0 — Style guide:** Use Sections 8 and 9 to create a one-page style guide with approved colours, typography, spacing, buttons, forms, cards, navigation, consent, error states and responsive behaviour.

- **Step 1 — Screens:** Generate one screen at a time from its specification, shared components and approved translations. Include relevant normal, loading, error, offline and success states. Do not create farm login or operational dashboard screens.

- **Step 2 — MASTER.md:** After PRD approval and stack selection, generate the build plan with scope, non-goals, stack, folder structure, environment variables, enquiry data model, BR1–BR16, S1–S10, privacy/security and testing. If contradictions remain, stop and ask rather than guessing.

- **Step 3 — Build phases:** (1) setup, tokens, navigation and home; (2) services, About/Contact, FAQ and bilingual content; (3) guided demo; (4) enquiry endpoint, email delivery and thank-you flow; (5) SEO, analytics consent, performance, accessibility, privacy and launch hardening.

- **Step 4 — Final comparison:** Compare deployed site with Sections 6, 8, 9 and 12; update the PRD before regenerating affected screens/build instructions.

**15. Submission checklist**

- 100 discovery answers consolidated — complete.

- Scope limited to public website, guided sample demo and enquiry conversion — complete.

- Both service divisions equally prominent — complete.

- 4 Must features and 3 Should features — complete.

- 10 screens listed — complete.

- User stories and test criteria drafted — complete.

- At least five edge cases — complete.

- Flows and navigation map — complete.

- Final brand tokens and logo — pending founder approval.

- Technology stack, hosting and integrations — pending.

- Specific lawful basis, complete Privacy Notice, exact provider location/transfer disclosures, seven-day purge implementation and backup/provider-copy handling — pending. The owner named Agrijuune as responsible party, supplied public privacy contacts, specified deletion of all form-submitted information seven days after submission and approved sender/recipient routing; see the enquiry decision record.

- Open questions empty — not complete; see Section 13.3.

- Founder approval and version v1.0 — pending.

**Recommended status: Draft v0.1.** Do not treat this as an approved build specification until all pending decisions are resolved.

**16. Glossary**

- **Acceptance criteria:** Specific checks proving a requirement works.

- **Analytics event:** A recorded action such as a page view or demo completion.

- **API/endpoint:** A controlled way for the website to send data to another service.

- **Backend:** Server-side logic that validates enquiries and protects secrets.

- **CTA:** Call to action; a button or link inviting the visitor to act.

- **Demo data:** Fictional records used to demonstrate a possible system.

- **Enquiry:** A non-binding expression of interest.

- **MVP:** Minimum Viable Product; the smallest release fulfilling the agreed purpose.

- **POPIA:** South Africa's Protection of Personal Information Act.

- **Responsive website:** A site layout that adapts to mobile, tablet and desktop.

- **SEO:** Search engine optimisation.

- **Three.js:** A JavaScript library for 3D graphics in a browser.

- **WCAG:** Web Content Accessibility Guidelines.
