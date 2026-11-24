import { createHash, createHmac } from 'node:crypto';
import type { EnquiryInput } from './enquiry-validation.js';

declare const idempotencyKeyBrand: unique symbol;

export type IdempotencyKey = string & {
  readonly [idempotencyKeyBrand]: true;
};

export type IdempotencyKeyValidationResult =
  | { valid: true; value: IdempotencyKey }
  | { valid: false; reason: 'required' | 'invalid' };

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateIdempotencyKey(
  value: unknown,
): IdempotencyKeyValidationResult {
  if (value === undefined || value === null || value === '') {
    return { valid: false, reason: 'required' };
  }

  if (typeof value !== 'string' || !UUID_V4_PATTERN.test(value)) {
    return { valid: false, reason: 'invalid' };
  }

  return { valid: true, value: value.toLowerCase() as IdempotencyKey };
}

export function hashIdempotencyKey(key: IdempotencyKey) {
  return createHash('sha256').update(key).digest('hex');
}

export function hashIdempotencyRequest(
  input: EnquiryInput,
  key: IdempotencyKey,
) {
  const canonicalInput = {
    contactName: input.contactName,
    email: input.email,
    cellNumber: input.cellNumber,
    farmName: input.farmName ?? null,
    farmLocation: input.farmLocation ?? null,
    operationType: input.operationType ?? null,
    machineCountEstimate: input.machineCountEstimate ?? null,
    servicesOfInterest: [...input.servicesOfInterest].sort(),
    additionalMessage: input.additionalMessage ?? null,
  };

  return createHmac('sha256', key)
    .update(JSON.stringify(canonicalInput))
    .digest('hex');
}
