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
confirmed that they are responsible for the enquiry data. The public
responsible-party identity and contact details for privacy requests have
not been supplied.

The email provider has not been selected. Keep these values as
placeholders until routing is approved:

- **Provider:** `PENDING`
- **Sender:** `PENDING`
- **Authorised recipient:** `PENDING`

Email notifications must remain disabled until these details are
approved and configured. Configure provider credentials as deployment
secrets after selection; never put credentials in chat, documentation
or source control.

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

The complete Privacy Notice and lawful basis have not been supplied or
approved. The acknowledgement is not a substitute for either. The
product owner set a one-week retention period; the starting point,
deletion process and handling of backups remain to be confirmed.

The complete Privacy Notice, lawful basis, public responsible-party
contact details, and deletion/backup process are prerequisites to
collecting personal information; the approved form fields and
acknowledgement do not authorize collection. Do not enable an enquiry
form or accepting endpoint, apply a production enquiry migration, or
submit real enquiries until these are approved.

No non-essential analytics is approved at launch. Any later analytics
provider or consent approach requires separate approval.

## Follow-up

Issue #3 remains open until the privacy and retention decisions are
completed, including the lawful basis, complete Privacy Notice,
responsible-party contact details, deletion/backup handling and email
route. This record captures owner-provided decisions and blockers; it
is not legal approval or authorization to begin collecting personal
data.
