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

The product owner stated that enquiries should come directly to them.
The exact recipient address, email provider and sender configuration
have not been supplied or approved. Email notifications must remain
disabled until these details are approved and configured. Do not put
personal contact details or credentials in repository documentation.

## Privacy and analytics gate

The responsible party and contact details, lawful basis, privacy notice
and acknowledgement wording, retention period, and deletion process
remain pending owner/legal review. These decisions are prerequisites to
collecting personal information; the approved form fields do not
authorize collection. Do not enable an enquiry form or accepting
endpoint, apply a production enquiry migration, or submit real enquiries
until the privacy gate is approved.

No non-essential analytics is approved at launch. Any later analytics
provider or consent approach requires separate approval.

## Follow-up

Issue #3 remains open until the privacy and retention decisions are
approved and the provider, sender and exact recipient address are
selected. This record captures confirmed decisions and blockers; it is
not legal approval or authorization to begin collecting personal data.
