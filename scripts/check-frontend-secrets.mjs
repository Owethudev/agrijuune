import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FRONTEND_BUILD_DIRECTORY = fileURLToPath(
  new URL('../frontend/dist/', import.meta.url),
);
const SERVER_ONLY_ENVIRONMENT_NAMES = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'BREVO_API_KEY',
  'EMAIL_FROM',
  'BUSINESS_EMAIL',
];
const JWT_PATTERN =
  /\beyJ[A-Za-z0-9_-]{10,}\.([A-Za-z0-9_-]{8,})\.[A-Za-z0-9_-]{8,}\b/g;
const SERVICE_ROLE_PATTERN = /"role"\s*:\s*"service_role"/;
const BREVO_SECRET_PATTERN = /\bxkeysib-[A-Za-z0-9_-]{20,}\b/;
const PRIVATE_KEY_PATTERN = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;

export function findServerSecretIndicators(assets) {
  const findings = [];

  for (const { path, contents } of assets) {
    for (const name of SERVER_ONLY_ENVIRONMENT_NAMES) {
      if (contents.includes(name)) {
        findings.push(`${path}: contains server-only setting name ${name}.`);
      }
    }

    for (const match of contents.matchAll(JWT_PATTERN)) {
      const payload = Buffer.from(match[1], 'base64url').toString('utf8');

      if (SERVICE_ROLE_PATTERN.test(payload)) {
        findings.push(`${path}: contains a Supabase service-role JWT.`);
      }
    }

    if (BREVO_SECRET_PATTERN.test(contents)) {
      findings.push(`${path}: contains a Brevo API key.`);
    }

    if (PRIVATE_KEY_PATTERN.test(contents)) {
      findings.push(`${path}: contains a private key.`);
    }
  }

  return findings;
}

function collectBuildAssets(directory) {
  const assets = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      assets.push(...collectBuildAssets(path));
    } else if (entry.isFile()) {
      assets.push({
        path: relative(FRONTEND_BUILD_DIRECTORY, path),
        contents: readFileSync(path, 'utf8'),
      });
    }
  }

  return assets;
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  const buildDirectory = resolve(FRONTEND_BUILD_DIRECTORY);
  const assets = collectBuildAssets(buildDirectory);

  if (assets.length === 0) {
    throw new Error('Frontend secret check found no build assets to inspect.');
  }

  const findings = findServerSecretIndicators(assets);

  if (findings.length > 0) {
    throw new Error(`Frontend secret check failed:\n${findings.join('\n')}`);
  }

  console.log(
    `Checked ${assets.length} frontend build asset(s) for server secrets.`,
  );
}
