create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null
    check (char_length(btrim(contact_name)) between 1 and 120),
  email text not null
    check (char_length(btrim(email)) between 3 and 254),
  cell_number text not null
    check (char_length(btrim(cell_number)) between 1 and 32),
  farm_name text
    check (farm_name is null or char_length(btrim(farm_name)) <= 160),
  farm_location text
    check (farm_location is null or char_length(btrim(farm_location)) <= 160),
  operation_type text
    check (operation_type is null or char_length(btrim(operation_type)) <= 100),
  machine_count_estimate integer
    check (machine_count_estimate is null or machine_count_estimate >= 0),
  services_of_interest text[] not null
    check (
      cardinality(services_of_interest) > 0
      and array_position(services_of_interest, null) is null
      and services_of_interest <@ array[
        'farm_management_technology',
        'machinery_detailing'
      ]::text[]
    ),
  additional_message text
    check (additional_message is null or char_length(additional_message) <= 2000),
  privacy_notice_version text
    check (privacy_notice_version is null or char_length(privacy_notice_version) <= 64),
  privacy_acknowledged_at timestamptz,
  created_at timestamptz not null default now(),
  notification_status text not null default 'not_configured'
    check (notification_status in ('pending', 'sent', 'failed', 'not_configured')),
  notification_attempted_at timestamptz,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed'))
);

create index enquiries_created_at_idx
  on public.enquiries (created_at desc);

alter table public.enquiries enable row level security;

revoke all on table public.enquiries from public, anon, authenticated;
grant select, insert, update, delete on table public.enquiries to service_role;