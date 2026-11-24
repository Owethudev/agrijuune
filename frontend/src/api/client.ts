const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? '/api/v1';

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getErrorCode(value: unknown) {
  if (!isRecord(value) || !isRecord(value.error)) {
    return undefined;
  }

  return typeof value.error.code === 'string' ? value.error.code : undefined;
}

export class ApiClientError extends Error {
  constructor(
    readonly status: number,
    readonly code?: string,
  ) {
    super('API request failed');
    this.name = 'ApiClientError';
  }
}

async function post(
  path: string,
  body: unknown,
  requestHeaders?: HeadersInit,
): Promise<void> {
  const headers = new Headers(requestHeaders);
  headers.set('Content-Type', 'application/json');

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiClientError(0);
    }

    throw error;
  }

  if (response.ok) {
    return;
  }

  let code: string | undefined;
  try {
    code = getErrorCode(await response.json());
  } catch (error) {
    if (!(error instanceof SyntaxError) && !(error instanceof TypeError)) {
      throw error;
    }
  }

  throw new ApiClientError(response.status, code);
}

export const apiClient = {
  post,
};
