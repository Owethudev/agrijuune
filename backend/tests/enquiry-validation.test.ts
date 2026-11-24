import { describe, expect, it } from 'vitest';
import { validateEnquiryRequest } from '../src/validation/enquiry-validation.js';

const validPayload = {
  contactName: 'Alex Morgan',
  email: 'alex.morgan@example.org',
  cellNumber: '+27 (11) 555-0123',
  servicesOfInterest: ['farm_management_technology', 'machinery_detailing'],
};

describe('validateEnquiryRequest', () => {
  it('trims approved input and omits empty optional fields', () => {
    const result = validateEnquiryRequest({
      ...validPayload,
      contactName: '  Alex Morgan  ',
      email: '  alex.morgan@example.org  ',
      cellNumber: '  +27 (11) 555-0123  ',
      farmName: '   ',
      additionalMessage: '  Please contact me.\n',
      machineCountEstimate: 0,
    });

    expect(result).toEqual({
      valid: true,
      value: {
        ...validPayload,
        contactName: 'Alex Morgan',
        email: 'alex.morgan@example.org',
        cellNumber: '+27 (11) 555-0123',
        additionalMessage: 'Please contact me.',
        machineCountEstimate: 0,
      },
    });
  });

  it.each([null, [], 'not an object'])(
    'rejects a non-object request body (%s)',
    (body) => {
      expect(validateEnquiryRequest(body)).toMatchObject({
        valid: false,
        errors: [
          {
            field: 'body',
            code: 'INVALID_TYPE',
          },
        ],
      });
    },
  );

  it('reports missing required fields without including supplied values', () => {
    const result = validateEnquiryRequest({
      contactName: ' ',
      email: 'person@example.org',
      cellNumber: '+27 (11) 555-0123',
      servicesOfInterest: [],
    });

    expect(result).toMatchObject({
      valid: false,
      errors: [
        { field: 'contactName', code: 'REQUIRED' },
        { field: 'servicesOfInterest', code: 'REQUIRED' },
      ],
    });
    expect(JSON.stringify(result)).not.toContain('person@example.org');
  });

  it('rejects invalid emails and cell numbers', () => {
    const result = validateEnquiryRequest({
      ...validPayload,
      email: 'not-an-email',
      cellNumber: '123\n4567',
    });

    expect(result).toMatchObject({
      valid: false,
      errors: [
        { field: 'email', code: 'INVALID_FORMAT' },
        { field: 'cellNumber', code: 'INVALID_FORMAT' },
      ],
    });
  });

  it('rejects unapproved services and invalid machine counts', () => {
    const result = validateEnquiryRequest({
      ...validPayload,
      servicesOfInterest: ['unapproved_service'],
      machineCountEstimate: -1,
    });

    expect(result).toMatchObject({
      valid: false,
      errors: [
        { field: 'servicesOfInterest', code: 'INVALID_VALUE' },
        { field: 'machineCountEstimate', code: 'INVALID_VALUE' },
      ],
    });
  });

  it.each([1.5, 2_147_483_648, Number.MAX_SAFE_INTEGER + 1])(
    'rejects machine count %s outside the database integer range',
    (machineCountEstimate) => {
      const result = validateEnquiryRequest({
        ...validPayload,
        machineCountEstimate,
      });

      expect(result).toMatchObject({
        valid: false,
        errors: [{ field: 'machineCountEstimate', code: 'INVALID_VALUE' }],
      });
    },
  );

  it('rejects unexpected server-managed fields without echoing their names', () => {
    const result = validateEnquiryRequest({
      ...validPayload,
      status: 'new',
      notificationStatus: 'sent',
    });

    expect(result).toMatchObject({
      valid: false,
      errors: [
        {
          field: 'body',
          code: 'UNEXPECTED_FIELD',
          message: 'The request contains unsupported fields.',
        },
      ],
    });
    expect(JSON.stringify(result)).not.toContain('notificationStatus');
  });

  it.each([
    ['contactName', { contactName: 'x'.repeat(121) }],
    ['cellNumber', { cellNumber: '1'.repeat(33) }],
    ['farmName', { farmName: 'x'.repeat(161) }],
    ['farmLocation', { farmLocation: 'x'.repeat(161) }],
    ['operationType', { operationType: 'x'.repeat(101) }],
    ['additionalMessage', { additionalMessage: 'x'.repeat(2001) }],
  ])('rejects an overlong %s field', (field, invalidField) => {
    const result = validateEnquiryRequest({
      ...validPayload,
      ...invalidField,
    });

    expect(result).toMatchObject({
      valid: false,
      errors: [{ field, code: 'TOO_LONG' }],
    });
  });

  it('rejects email addresses longer than 254 characters', () => {
    const email = `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(62)}`;
    expect(email).toHaveLength(255);

    expect(
      validateEnquiryRequest({
        ...validPayload,
        email,
      }),
    ).toMatchObject({
      valid: false,
      errors: [{ field: 'email', code: 'TOO_LONG' }],
    });
  });
});
