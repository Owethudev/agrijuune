do $$
declare
  enquiries_table regclass := to_regclass('public.enquiries');
  role_name text;
  privilege text;
begin
  if enquiries_table is null then
    raise exception 'public.enquiries table is missing';
  end if;

  if not exists (
    select 1
    from pg_class
    where oid = enquiries_table
      and relrowsecurity
  ) then
    raise exception 'RLS is not enabled on public.enquiries';
  end if;

  if exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'enquiries'
  ) then
    raise exception 'Unexpected policy exists on public.enquiries';
  end if;

  foreach role_name in array array['anon', 'authenticated'] loop
    foreach privilege in array array['SELECT', 'INSERT', 'UPDATE', 'DELETE'] loop
      if has_table_privilege(role_name, enquiries_table, privilege) then
        raise exception 'Unexpected % privilege for % on public.enquiries',
          privilege,
          role_name;
      end if;
    end loop;
  end loop;

  foreach privilege in array array['SELECT', 'INSERT', 'UPDATE', 'DELETE'] loop
    if not has_table_privilege('service_role', enquiries_table, privilege) then
      raise exception 'Missing % privilege for service_role on public.enquiries',
        privilege;
    end if;
  end loop;

  if not exists (
    select 1
    from pg_roles
    where rolname = 'service_role'
      and rolbypassrls
  ) then
    raise exception 'service_role does not bypass RLS';
  end if;

  raise notice 'Enquiries RLS and privilege checks passed';
end
$$;
