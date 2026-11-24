create table public.team_members (
  email text primary key
    check (
      email = lower(btrim(email))
      and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    ),
  role text not null
    check (role in ('admin', 'team')),
  created_at timestamptz not null default now()
);

insert into public.team_members (email, role)
values ('jezvestptyltd@gmail.com', 'admin')
on conflict (email) do nothing;

create function public.current_team_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select team_member.role
  from public.team_members as team_member
  where team_member.email = lower(coalesce((select auth.jwt() ->> 'email'), ''))
  limit 1
$$;

revoke all on function public.current_team_role() from public, anon;
grant execute on function public.current_team_role() to authenticated;

alter table public.team_members enable row level security;

revoke all on table public.team_members from public, anon, service_role;
grant select, insert, delete on table public.team_members to authenticated;

create policy team_members_read_self_or_admin
  on public.team_members
  for select
  to authenticated
  using (
    email = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    or (select public.current_team_role()) = 'admin'
  );

create policy team_members_admin_add_team
  on public.team_members
  for insert
  to authenticated
  with check (
    (select public.current_team_role()) = 'admin'
    and role = 'team'
    and email <> lower(coalesce((select auth.jwt() ->> 'email'), ''))
  );

create policy team_members_admin_remove_team
  on public.team_members
  for delete
  to authenticated
  using (
    (select public.current_team_role()) = 'admin'
    and role = 'team'
    and email <> lower(coalesce((select auth.jwt() ->> 'email'), ''))
  );
