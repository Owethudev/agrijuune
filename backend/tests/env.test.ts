import { describe, expect, it } from 'vitest';
import { parseEnvironment } from '../src/config/environment.js';

describe('parseEnvironment', () => {
  it('uses development defaults when optional local settings are absent', () => {
    expect(parseEnvironment({})).toMatchObject({
      nodeEnv: 'development',
      port: 3001,
      frontendOrigin: undefined,
      enquiryRateLimit: {
        max: 10,
        windowMs: 900000,
      },
      supabase: undefined,
      brevo: undefined,
    });
  });

  it('requires a valid port in production', () => {
    expect(() => parseEnvironment({ NODE_ENV: 'production' })).toThrow(
      'PORT is required in production.',
    );
  });

  it('rejects invalid environment names and ports', () => {
    expect(() => parseEnvironment({ NODE_ENV: 'preview' })).toThrow(
      'NODE_ENV must be development, test, or production.',
    );
    expect(() => parseEnvironment({ PORT: '65536' })).toThrow(
      'PORT must be a valid TCP port number.',
    );
    expect(() => parseEnvironment({ PORT: '1e3' })).toThrow(
      'PORT must be a valid TCP port number.',
    );
  });

  it('accepts bounded enquiry rate-limit configuration', () => {
    expect(
      parseEnvironment({
        ENQUIRY_RATE_LIMIT_MAX: '25',
        ENQUIRY_RATE_LIMIT_WINDOW_MS: '60000',
      }).enquiryRateLimit,
    ).toEqual({
      max: 25,
      windowMs: 60000,
    });

    expect(() =>
      parseEnvironment({
        ENQUIRY_RATE_LIMIT_MAX: '0',
      }),
    ).toThrow('ENQUIRY_RATE_LIMIT_MAX must be an integer from 1 to 1000.');

    expect(() =>
      parseEnvironment({
        ENQUIRY_RATE_LIMIT_WINDOW_MS: '86400001',
      }),
    ).toThrow(
      'ENQUIRY_RATE_LIMIT_WINDOW_MS must be an integer from 1000 to 86400000.',
    );
  });

  it('rejects partial integration configuration', () => {
    expect(() =>
      parseEnvironment({
        SUPABASE_URL: 'https://project.supabase.co',
      }),
    ).toThrow(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured together.',
    );
    expect(() =>
      parseEnvironment({
        BREVO_API_KEY: 'configured',
      }),
    ).toThrow(
      'BREVO_API_KEY, EMAIL_FROM, and BUSINESS_EMAIL must be configured together.',
    );
  });

  it('validates origins and reads approved server-only integration names', () => {
    expect(
      parseEnvironment({
        NODE_ENV: 'production',
        PORT: '10000',
        FRONTEND_ORIGIN: 'https://agrijuune.vercel.app',
        SUPABASE_URL: 'https://project.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'server-only-secret',
        BREVO_API_KEY: 'server-only-key',
        EMAIL_FROM: 'sender@example.com',
        BUSINESS_EMAIL: 'business@example.com',
      }),
    ).toMatchObject({
      nodeEnv: 'production',
      port: 10000,
      frontendOrigin: 'https://agrijuune.vercel.app',
      supabase: {
        url: 'https://project.supabase.co',
        serviceRoleKey: 'server-only-secret',
      },
      brevo: {
        apiKey: 'server-only-key',
        sender: 'sender@example.com',
        recipient: 'business@example.com',
      },
    });
  });

  it('rejects origins that contain paths or credentials', () => {
    expect(() =>
      parseEnvironment({
        FRONTEND_ORIGIN: 'https://user:password@example.com/path',
      }),
    ).toThrow('FRONTEND_ORIGIN must be a valid HTTP(S) origin.');
  });

  it('requires HTTPS origins in production', () => {
    expect(() =>
      parseEnvironment({
        NODE_ENV: 'production',
        PORT: '3001',
        FRONTEND_ORIGIN: 'http://agrijuune.vercel.app',
      }),
    ).toThrow('FRONTEND_ORIGIN must use HTTPS in production.');
  });
});
