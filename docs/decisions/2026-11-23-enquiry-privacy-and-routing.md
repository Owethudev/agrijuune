# Enquiry, Privacy and Routing Decisions

- **Status:** Partially decided; personal-data collection is blocked.
- **Confirmed:** 2026-11-23
- **Related issue:** [#3 — SET-03](https://github.com/Owethudev/agrijuune/issues/3)

## Confirmed form contract

Required fields:

- `contact_name`
- `email`
- `cell_number`
- `services_of_interest` (one or more approved services)

Optional fields:

- `farm_name`
- `farm_location`
- `operation_type`
- `machine_count_estimate`
- `additional_message`

`cell_number` is the only phone field; there is no separate `phone`
field. API JSON uses camelCase names. The approved service identifiers
are `farm_management_technology` and `machinery_detailing`.

## Enquiry destination and notifications

The product owner stated that enquiries should come directly to them and
confirmed that they are responsible for the enquiry data. They supplied
`jezvestptyltd@gmail.com` and `0602900630` as public privacy contacts.
The name to identify as the responsible party in the Privacy Notice is
Agrijuune.

The product owner selected Brevo and reports that the deployed backend
uses these environment variable names:

- **Provider:** Brevo
- **API key:** `BREVO_API_KEY` (server-side secret)
- **Sender:** `EMAIL_FROM`
- **Recipient routing:** `BUSINESS_EMAIL`

No values are recorded here or in source control. The server-side
adapter is implemented and unit-tested, but no enquiry workflow invokes
it and no email has been sent. The product owner confirms that the
configured sender and authorised recipient are approved for enquiry
routing. Keep credentials in server-side environment configuration;
never put them in chat, documentation or source control.

## Privacy and analytics gate

The product owner supplied this privacy acknowledgement wording:

> By submitting this enquiry, you acknowledge that Agrijuune will
> process the personal information you provide to respond to your
> enquiry, communicate with you about requested services and maintain
> an appropriate record of the communication, in accordance with
> applicable data protection laws, including South Africa's Protection
> of Personal Information Act (POPIA).
>
> For more information about how your information is collected, used,
> stored and protected, please read our Privacy Notice.

The product owner supplied and approved the text in
[`../PRIVACY_NOTICE.md`](../PRIVACY_NOTICE.md), and selected both
sections 6.1 (steps requested before a potential agreement) and 6.2
(legitimate interests for general enquiries), depending on the
circumstances. The owner says no additional legal review is needed. This
records the owner's decision and is not an independent legal assessment.
The acknowledgement is not a substitute for the Privacy Notice.

The official privacy email is `jezvestptyltd@gmail.com`. The registered
business name, business address and appointed Information Officer are
still placeholders in the notice and must be completed before
publication.

The product owner set seven-day retention for database records, starting
when the enquiry is submitted, and wants all form-submitted information
deleted from the database. The bounded purge command exists but is not scheduled or verified.
The Supabase dashboard was checked on 2026-11-25 and shows that
production and staging use the Free Plan, which does not include project
backups. This contradicts the earlier owner-reported confirmation, and
the seven-day backup-retention target is not met. Each party will retain
their email copies as communication records; the application
purge will not remove mailbox-held copies. Brevo message and log
retention remains pending.

The product owner marked exact provider locations, cross-border
transfers and safeguards pending. Do not claim that data stays in South
Africa or that a particular safeguard is active until provider
configuration and disclosures are verified.

The approved form fields, acknowledgement, notice text and provider
selection do not by themselves authorize collection. A later
product-owner instruction specifically authorizes applying the prototype
schema to the live Supabase project. This schema-only authorization
supersedes the earlier prohibition on applying that migration, but does
not authorize publishing the notice, enabling the form or accepting
endpoint, inserting test or real enquiries, or sending email. Those
activities remain blocked until the publication placeholders, deletion
process, backup handling and provider disclosures are resolved and
verified.

The schema-only migration was applied to live Supabase on 2026-11-24
through the authenticated Dashboard SQL Editor because the configured
CLI database password failed authentication. Its migration version was
recorded in Supabase's migration history. No enquiry records were
inserted, and this did not enable collection or email.

No non-essential analytics is approved at launch. Any later analytics
provider or consent approach requires separate approval.

## Follow-up

Issue #3 remains open until the publication placeholders, seven-day
database deletion, Brevo message/log retention, and exact provider
location/transfer disclosures are resolved. The owner-provided notice,
lawful-basis choices are recorded, but are not an independent legal
assessment or authorization to begin collecting personal data.

## Implementation status update (2026-11-24)

The backend enquiry route and bilingual frontend form are implemented
behind explicit opt-in flags. The route is not mounted unless
`ENQUIRY_COLLECTION_ENABLED=true`,
`ENQUIRY_PRIVACY_GATES_VERIFIED=true` and Supabase is configured. The
frontend additionally requires `VITE_ENQUIRY_COLLECTION_ENABLED=true`
and a public HTTPS URL for the completed Privacy Notice. These settings
remain disabled; no production environment was changed, no enquiry data
was inserted and no email was sent.

The backend provides a one-shot seven-day purge command,
`npm run purge:expired-enquiries --workspace backend`, which requires
`ENQUIRY_RETENTION_PURGE_ENABLED=true`. No production or staging
schedule has been configured, and the purge has not been verified
against a database. The launch blockers above remain open;
the idempotency migration also remains unapplied. This code change does
not authorize collection or publication.
