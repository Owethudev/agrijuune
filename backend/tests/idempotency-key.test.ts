import { describe, expect, it } from 'vitest';
import {
  hashIdempotencyKey,
  hashIdempotencyRequest,
  validateIdempotencyKey,
} from '../src/validation/idempotency-key.js';
import type { EnquiryInput } from '../src/validation/enquiry-validation.js';

describe('enquiry idempotency keys', () => {
  it('accepts and normalizes UUID v4 keys', () => {
    expect(
      validateIdempotencyKey('7E5DFC21-574C-4C33-9F7E-477CB2F79CA3'),
    ).toEqual({
      valid: true,
      value: '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
    });
  });

  it('distinguishes missing keys from malformed or non-v4 keys', () => {
    expect(validateIdempotencyKey(undefined)).toEqual({
      valid: false,
      reason: 'required',
    });
    expect(validateIdempotencyKey('not-a-uuid')).toEqual({
      valid: false,
      reason: 'invalid',
    });
    expect(
      validateIdempotencyKey('7e5dfc21-574c-7c33-9f7e-477cb2f79ca3'),
    ).toEqual({
      valid: false,
      reason: 'invalid',
    });
  });

  it('uses stable key and request hashes without storing the raw key or payload', () => {
    const firstKey = validateIdempotencyKey(
      '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
    );
    const secondKey = validateIdempotencyKey(
      '7e5dfc21-574c-4c33-9f7e-477cb2f79ca4',
    );

    if (!firstKey.valid || !secondKey.valid) {
      throw new Error('Test idempotency keys must be valid.');
    }

    const request: EnquiryInput = {
      contactName: 'Example Contact',
      email: 'contact@example.com',
      cellNumber: '+27 00 000 0000',
      servicesOfInterest: ['farm_management_technology'],
    };

    expect(hashIdempotencyKey(firstKey.value)).toMatch(/^[a-f0-9]{64}$/);
    expect(hashIdempotencyKey(firstKey.value)).not.toBe(firstKey.value);
    expect(hashIdempotencyRequest(request, firstKey.value)).toBe(
      hashIdempotencyRequest(request, firstKey.value),
    );
    expect(hashIdempotencyRequest(request, firstKey.value)).not.toBe(
      hashIdempotencyRequest(request, secondKey.value),
    );
    expect(
      hashIdempotencyRequest(
        { ...request, farmName: 'Different Farm' },
        firstKey.value,
      ),
    ).not.toBe(hashIdempotencyRequest(request, firstKey.value));
    expect(
      hashIdempotencyRequest(
        {
          ...request,
          servicesOfInterest: [
            'machinery_detailing',
            'farm_management_technology',
          ],
        },
        firstKey.value,
      ),
    ).toBe(
      hashIdempotencyRequest(
        {
          ...request,
          servicesOfInterest: [
            'farm_management_technology',
            'machinery_detailing',
          ],
        },
        firstKey.value,
      ),
    );
  });
});
