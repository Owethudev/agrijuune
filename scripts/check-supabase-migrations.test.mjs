import assert from 'node:assert/strict';
import test from 'node:test';
import { validateMigrationFiles } from './check-supabase-migrations.mjs';

test('accepts a versioned schema-only migration', () => {
  assert.deepEqual(
    validateMigrationFiles([
      {
        name: '20261124095323_create_enquiries.sql',
        contents: 'create table public.enquiries (id uuid primary key);',
      },
    ]),
    [],
  );
});

test('rejects invalid names, duplicate versions, and empty migrations', () => {
  assert.deepEqual(
    validateMigrationFiles([
      {
        name: '20261124095323_create_enquiries.sql',
        contents: 'create table public.enquiries (id uuid primary key);',
      },
      {
        name: '20261124095323_also_create_enquiries.sql',
        contents: '',
      },
      {
        name: 'invalid-name.sql',
        contents: 'select 1;',
      },
    ]),
    [
      '20261124095323_also_create_enquiries.sql: migration version 20261124095323 is duplicated.',
      '20261124095323_also_create_enquiries.sql: migration is empty.',
      'invalid-name.sql: expected a 14-digit version and snake_case name.',
    ],
  );
});

test('rejects enquiry data writes but ignores comments and string contents', () => {
  assert.deepEqual(
    validateMigrationFiles([
      {
        name: '20261124095324_create_enquiries.sql',
        contents: `-- INSERT INTO public.enquiries values (1);
          select 'INSERT INTO public.enquiries' as note;
          insert into public.enquiries (contact_name) values ('Example');`,
      },
    ]),
    [
      '20261124095324_create_enquiries.sql: direct writes to public.enquiries are not allowed.',
    ],
  );
});
