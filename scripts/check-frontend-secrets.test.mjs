import assert from 'node:assert/strict';
import test from 'node:test';
import { findServerSecretIndicators } from './check-frontend-secrets.mjs';

test('accepts public content and an anonymous Supabase JWT', () => {
  const anonPayload = Buffer.from('{"role":"anon"}').toString('base64url');
  const anonJwt = `eyJhbGciOiJIUzI1NiJ9.${anonPayload}.signaturetoken123`;

  assert.deepEqual(
    findServerSecretIndicators([
      {
        path: 'assets/index.js',
        contents: `const publicKey = "${anonJwt}";`,
      },
    ]),
    [],
  );
});

test('detects server-only setting names and service-role JWTs', () => {
  const servicePayload = Buffer.from('{"role":"service_role"}').toString(
    'base64url',
  );
  const serviceJwt = `eyJhbGciOiJIUzI1NiJ9.${servicePayload}.signaturetoken123`;

  assert.deepEqual(
    findServerSecretIndicators([
      {
        path: 'assets/index.js',
        contents: `const key = "${serviceJwt}"; SUPABASE_SERVICE_ROLE_KEY`,
      },
    ]),
    [
      'assets/index.js: contains server-only setting name SUPABASE_SERVICE_ROLE_KEY.',
      'assets/index.js: contains a Supabase service-role JWT.',
    ],
  );
});

test('detects provider keys and private-key material without exposing values', () => {
  const findings = findServerSecretIndicators([
    {
      path: 'assets/index.js',
      contents: 'xkeysib-123456789012345678901234-----BEGIN PRIVATE KEY-----',
    },
  ]);

  assert.deepEqual(findings, [
    'assets/index.js: contains a Brevo API key.',
    'assets/index.js: contains a private key.',
  ]);
  assert.equal(findings.join(' ').includes('123456789012345678901234'), false);
});
