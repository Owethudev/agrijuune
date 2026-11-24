import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIGRATIONS_DIRECTORY = fileURLToPath(
  new URL('../supabase/migrations/', import.meta.url),
);
const MIGRATION_NAME_PATTERN = /^(\d{14})_[a-z][a-z0-9_]*\.sql$/;
const ENQUIRY_WRITE_PATTERN =
  /\b(?:insert\s+into|copy|update|delete\s+from|truncate(?:\s+table)?|merge\s+into)\s+(?:"?public"?\s*\.\s*)?"?enquiries"?(?=[^\w]|$)/i;

export function validateMigrationFiles(files) {
  const errors = [];
  const versions = new Set();

  if (files.length === 0) {
    errors.push('No SQL migration files found.');
  }

  for (const { name, contents } of files) {
    const match = MIGRATION_NAME_PATTERN.exec(name);

    if (!match) {
      errors.push(`${name}: expected a 14-digit version and snake_case name.`);
    } else if (versions.has(match[1])) {
      errors.push(`${name}: migration version ${match[1]} is duplicated.`);
    } else {
      versions.add(match[1]);
    }

    const sql = contents
      .replace(/'(?:''|[^'])*'/g, "''")
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/--.*$/gm, '');

    if (!sql.trim()) {
      errors.push(`${name}: migration is empty.`);
    }

    if (ENQUIRY_WRITE_PATTERN.test(sql)) {
      errors.push(
        `${name}: direct writes to public.enquiries are not allowed.`,
      );
    }
  }

  return errors;
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  const filenames = readdirSync(MIGRATIONS_DIRECTORY)
    .filter((filename) => filename.endsWith('.sql'))
    .sort();
  const migrationFiles = filenames.map((name) => ({
    name,
    contents: readFileSync(join(MIGRATIONS_DIRECTORY, name), 'utf8'),
  }));
  const errors = validateMigrationFiles(migrationFiles);

  if (errors.length > 0) {
    throw new Error(`Supabase migration check failed:\n${errors.join('\n')}`);
  }

  console.log(`Validated ${migrationFiles.length} Supabase migration(s).`);
}
