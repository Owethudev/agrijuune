type NodeEnvironment = 'development' | 'test' | 'production';

type EnvironmentSource = Record<string, string | undefined>;

export type BrevoConfiguration = Readonly<{
  apiKey: string;
  sender: string;
  recipient: string;
}>;

export type EnquiryRateLimitConfiguration = Readonly<{
  max: number;
  windowMs: number;
}>;

const DEFAULT_ENQUIRY_RATE_LIMIT_MAX = 10;
const DEFAULT_ENQUIRY_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const NODE_ENVIRONMENTS = new Set<string>([
  'development',
  'test',
  'production',
]);

function readOptionalValue(source: EnvironmentSource, name: string) {
  const value = source[name]?.trim();
  return value ? value : undefined;
}

function readOrigin(
  source: EnvironmentSource,
  name: string,
  requireHttps: boolean,
) {
  const value = readOptionalValue(source, name);

  if (!value) {
    return undefined;
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid HTTP(S) origin.`);
  }

  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(`${name} must be a valid HTTP(S) origin.`);
  }

  if (requireHttps && url.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS in production.`);
  }

  return url.origin;
}

function readBoundedInteger(
  source: EnvironmentSource,
  name: string,
  defaultValue: number,
  min: number,
  max: number,
) {
  const value = readOptionalValue(source, name);

  if (!value) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (
    !/^\d+$/.test(value) ||
    !Number.isSafeInteger(parsedValue) ||
    parsedValue < min ||
    parsedValue > max
  ) {
    throw new Error(`${name} must be an integer from ${min} to ${max}.`);
  }

  return parsedValue;
}

function isNodeEnvironment(value: string): value is NodeEnvironment {
  return NODE_ENVIRONMENTS.has(value);
}

export function parseEnvironment(source: EnvironmentSource) {
  const nodeEnvValue = readOptionalValue(source, 'NODE_ENV') ?? 'development';

  if (!isNodeEnvironment(nodeEnvValue)) {
    throw new Error('NODE_ENV must be development, test, or production.');
  }

  const portValue = readOptionalValue(source, 'PORT');

  if (nodeEnvValue === 'production' && !portValue) {
    throw new Error('PORT is required in production.');
  }

  if (portValue && !/^\d+$/.test(portValue)) {
    throw new Error('PORT must be a valid TCP port number.');
  }

  const port = Number(portValue ?? 3001);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port number.');
  }

  const requireHttps = nodeEnvValue === 'production';
  const supabaseUrl = readOrigin(source, 'SUPABASE_URL', requireHttps);
  const supabaseServiceRoleKey = readOptionalValue(
    source,
    'SUPABASE_SERVICE_ROLE_KEY',
  );

  if (Boolean(supabaseUrl) !== Boolean(supabaseServiceRoleKey)) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured together.',
    );
  }

  const brevoApiKey = readOptionalValue(source, 'BREVO_API_KEY');
  const emailFrom = readOptionalValue(source, 'EMAIL_FROM');
  const businessEmail = readOptionalValue(source, 'BUSINESS_EMAIL');
  const brevoConfigured = [brevoApiKey, emailFrom, businessEmail].some(
    (value) => value !== undefined,
  );

  if (brevoConfigured && !(brevoApiKey && emailFrom && businessEmail)) {
    throw new Error(
      'BREVO_API_KEY, EMAIL_FROM, and BUSINESS_EMAIL must be configured together.',
    );
  }

  return {
    nodeEnv: nodeEnvValue,
    port,
    frontendOrigin: readOrigin(source, 'FRONTEND_ORIGIN', requireHttps),
    enquiryRateLimit: {
      max: readBoundedInteger(
        source,
        'ENQUIRY_RATE_LIMIT_MAX',
        DEFAULT_ENQUIRY_RATE_LIMIT_MAX,
        1,
        1000,
      ),
      windowMs: readBoundedInteger(
        source,
        'ENQUIRY_RATE_LIMIT_WINDOW_MS',
        DEFAULT_ENQUIRY_RATE_LIMIT_WINDOW_MS,
        1000,
        86_400_000,
      ),
    } satisfies EnquiryRateLimitConfiguration,
    supabase:
      supabaseUrl && supabaseServiceRoleKey
        ? { url: supabaseUrl, serviceRoleKey: supabaseServiceRoleKey }
        : undefined,
    brevo:
      brevoApiKey && emailFrom && businessEmail
        ? ({
            apiKey: brevoApiKey,
            sender: emailFrom,
            recipient: businessEmail,
          } satisfies BrevoConfiguration)
        : undefined,
  };
}
