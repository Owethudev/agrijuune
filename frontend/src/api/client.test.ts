import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClientError, apiClient } from './client';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('apiClient', () => {
  it('sends JSON requests with caller headers through the configured API base', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);

    await apiClient.post(
      '/enquiries',
      { contactName: 'Example Contact' },
      { 'Idempotency-Key': 'request-key' },
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0] ?? [];
    expect(url).toMatch(/\/enquiries$/);
    expect(options?.method).toBe('POST');
    expect(new Headers(options?.headers).get('Content-Type')).toBe(
      'application/json',
    );
    expect(new Headers(options?.headers).get('Idempotency-Key')).toBe(
      'request-key',
    );
    expect(options?.body).toBe('{"contactName":"Example Contact"}');
  });

  it('exposes safe server error codes without returning response details', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: 'INVALID_ENQUIRY',
            message: 'Sensitive response detail',
          },
        }),
        { status: 422 },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const request = apiClient.post('/enquiries', {});

    await expect(request).rejects.toBeInstanceOf(ApiClientError);
    await expect(request).rejects.toMatchObject({
      status: 422,
      code: 'INVALID_ENQUIRY',
      message: 'API request failed',
    });
  });

  it('converts network failures into a safe client error', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new TypeError('Network unavailable'));
    vi.stubGlobal('fetch', fetchMock);

    await expect(apiClient.post('/enquiries', {})).rejects.toMatchObject({
      status: 0,
      message: 'API request failed',
    });
  });
});
