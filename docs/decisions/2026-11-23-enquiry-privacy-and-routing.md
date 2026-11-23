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

No values are recorded here or in source control. The email adapter has
not been implemented or tested, and no email has been sent. The product
owner confirms that the configured sender and authorised recipient are
approved for enquiry routing. Keep credentials in server-side
environment configuration; never put them in chat, documentation or
source control.

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

The complete Privacy Notice and specific lawful basis have not been
supplied or approved. The acknowledgement is not a substitute for
either. The product owner set a one-week retention period starting when
the enquiry is submitted and specified that all information submitted
through the form should be deleted. They want the seven-day deletion
implemented in application code. The purge is not implemented yet, and
handling of backups and provider copies remains to be confirmed.

The product owner says the Brevo data-location and cross-border review
is okay; the exact location and transfer details to disclose in the
Privacy Notice have not been supplied. The complete Privacy Notice,
specific lawful basis, implemented deletion process, backup/provider-copy
handling and provider disclosure are prerequisites to collecting
personal information. The approved form fields, acknowledgement and
provider selection do not authorize collection. Do not enable an enquiry
form or accepting endpoint, apply a production enquiry migration, or
submit real enquiries until these are approved.

No non-essential analytics is approved at launch. Any later analytics
provider or consent approach requires separate approval.

## Follow-up

Issue #3 remains open until the privacy and retention decisions are
completed, including the specific lawful basis, complete Privacy Notice,
seven-day deletion implementation, backup/provider-copy handling and
provider location/transfer disclosures. The responsible-party name,
public privacy contacts, retention period and deletion scope have been
provided. The owner has approved sender/recipient routing and says the
Brevo location review is okay. This record captures owner-provided
decisions and blockers; it is not legal approval or authorization to
begin collecting personal data.
