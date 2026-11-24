export const ENQUIRY_SERVICE_IDS = [
  'farm_management_technology',
  'machinery_detailing',
] as const;

export type EnquiryServiceId = (typeof ENQUIRY_SERVICE_IDS)[number];

export interface EnquiryInput {
  contactName: string;
  email: string;
  cellNumber: string;
  servicesOfInterest: EnquiryServiceId[];
  farmName?: string;
  farmLocation?: string;
  operationType?: string;
  machineCountEstimate?: number;
  additionalMessage?: string;
}

export type EnquiryValidationIssueCode =
  | 'INVALID_FORMAT'
  | 'INVALID_TYPE'
  | 'INVALID_VALUE'
  | 'REQUIRED'
  | 'TOO_LONG'
  | 'UNEXPECTED_FIELD';

export interface EnquiryValidationIssue {
  field: string;
  code: EnquiryValidationIssueCode;
  message: string;
}

export type EnquiryValidationResult =
  | { valid: true; value: EnquiryInput }
  | { valid: false; errors: EnquiryValidationIssue[] };

const MAX_POSTGRES_INTEGER = 2_147_483_647;
const allowedFields = new Set([
  'contactName',
  'email',
  'cellNumber',
  'farmName',
  'farmLocation',
  'operationType',
  'machineCountEstimate',
  'servicesOfInterest',
  'additionalMessage',
  'privacyNoticeAcknowledged',
]);
const serviceIds: readonly string[] = ENQUIRY_SERVICE_IDS;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function characterLength(value: string) {
  return Array.from(value).length;
}

function isEmailAddress(value: string) {
  const atIndex = value.indexOf('@');

  if (
    atIndex <= 0 ||
    atIndex !== value.lastIndexOf('@') ||
    value.length > 254
  ) {
    return false;
  }

  const localPart = value.slice(0, atIndex);
  const domain = value.slice(atIndex + 1);
  const domainLabels = domain.split('.');

  if (
    localPart.length > 64 ||
    localPart.startsWith('.') ||
    localPart.endsWith('.') ||
    localPart.includes('..') ||
    !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart) ||
    domainLabels.length < 2 ||
    domainLabels.some(
      (label) =>
        label.length > 63 ||
        !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label),
    )
  ) {
    return false;
  }

  const topLevelLabel = domainLabels.at(-1);
  return Boolean(
    topLevelLabel &&
    topLevelLabel.length >= 2 &&
    /[A-Za-z]/.test(topLevelLabel),
  );
}

function isCellNumber(value: string) {
  if (!/^\+?[( ]*\d[\d ().-]*$/.test(value) || !/[0-9)]$/.test(value)) {
    return false;
  }

  const digitCount = value.replace(/\D/g, '').length;

  if (digitCount < 7 || digitCount > 15) {
    return false;
  }

  let parenthesisDepth = 0;

  for (const character of value) {
    if (character === '(') {
      parenthesisDepth += 1;
    } else if (character === ')') {
      parenthesisDepth -= 1;

      if (parenthesisDepth < 0) {
        return false;
      }
    }
  }

  return parenthesisDepth === 0;
}

function addIssue(
  errors: EnquiryValidationIssue[],
  field: string,
  code: EnquiryValidationIssueCode,
  message: string,
) {
  errors.push({ field, code, message });
}

function readRequiredString(
  body: Record<string, unknown>,
  field: 'contactName' | 'email' | 'cellNumber',
  maxLength: number,
  errors: EnquiryValidationIssue[],
) {
  const value = body[field];

  if (typeof value !== 'string') {
    addIssue(
      errors,
      field,
      value === undefined ? 'REQUIRED' : 'INVALID_TYPE',
      value === undefined ? 'This field is required.' : 'Enter a text value.',
    );
    return undefined;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    addIssue(errors, field, 'REQUIRED', 'This field is required.');
    return undefined;
  }

  if (normalizedValue.includes('\0')) {
    addIssue(
      errors,
      field,
      'INVALID_FORMAT',
      'This field has an invalid format.',
    );
    return undefined;
  }

  if (characterLength(normalizedValue) > maxLength) {
    addIssue(
      errors,
      field,
      'TOO_LONG',
      `This field must be no more than ${maxLength} characters.`,
    );
    return undefined;
  }

  if (field === 'email' && !isEmailAddress(normalizedValue)) {
    addIssue(errors, field, 'INVALID_FORMAT', 'Enter a valid email address.');
    return undefined;
  }

  if (field === 'cellNumber' && !isCellNumber(normalizedValue)) {
    addIssue(errors, field, 'INVALID_FORMAT', 'Enter a valid cell number.');
    return undefined;
  }

  return normalizedValue;
}

function readOptionalString(
  body: Record<string, unknown>,
  field: 'farmName' | 'farmLocation' | 'operationType' | 'additionalMessage',
  maxLength: number,
  errors: EnquiryValidationIssue[],
) {
  const value = body[field];

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'string') {
    addIssue(errors, field, 'INVALID_TYPE', 'Enter a text value.');
    return undefined;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  if (normalizedValue.includes('\0')) {
    addIssue(
      errors,
      field,
      'INVALID_FORMAT',
      'This field has an invalid format.',
    );
    return undefined;
  }

  if (characterLength(normalizedValue) > maxLength) {
    addIssue(
      errors,
      field,
      'TOO_LONG',
      `This field must be no more than ${maxLength} characters.`,
    );
    return undefined;
  }

  return normalizedValue;
}

function readServicesOfInterest(
  body: Record<string, unknown>,
  errors: EnquiryValidationIssue[],
) {
  const value = body.servicesOfInterest;

  if (!Array.isArray(value)) {
    addIssue(
      errors,
      'servicesOfInterest',
      value === undefined ? 'REQUIRED' : 'INVALID_TYPE',
      value === undefined
        ? 'Select at least one service.'
        : 'Select services from the available options.',
    );
    return undefined;
  }

  if (value.length === 0) {
    addIssue(
      errors,
      'servicesOfInterest',
      'REQUIRED',
      'Select at least one service.',
    );
    return undefined;
  }

  if (
    !value.every(
      (service): service is EnquiryServiceId =>
        typeof service === 'string' && serviceIds.includes(service),
    )
  ) {
    addIssue(
      errors,
      'servicesOfInterest',
      'INVALID_VALUE',
      'Select only the listed services.',
    );
    return undefined;
  }

  return value;
}

function readMachineCountEstimate(
  body: Record<string, unknown>,
  errors: EnquiryValidationIssue[],
) {
  const value = body.machineCountEstimate;

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'number') {
    addIssue(
      errors,
      'machineCountEstimate',
      'INVALID_TYPE',
      'Enter a whole number.',
    );
    return undefined;
  }

  if (
    !Number.isSafeInteger(value) ||
    value < 0 ||
    value > MAX_POSTGRES_INTEGER
  ) {
    addIssue(
      errors,
      'machineCountEstimate',
      'INVALID_VALUE',
      `Enter a whole number between 0 and ${MAX_POSTGRES_INTEGER}.`,
    );
    return undefined;
  }

  return value;
}

export function validateEnquiryRequest(
  value: unknown,
): EnquiryValidationResult {
  if (!isRecord(value)) {
    return {
      valid: false,
      errors: [
        {
          field: 'body',
          code: 'INVALID_TYPE',
          message: 'The request body must be an object.',
        },
      ],
    };
  }

  const errors: EnquiryValidationIssue[] = [];

  if (Object.keys(value).some((field) => !allowedFields.has(field))) {
    addIssue(
      errors,
      'body',
      'UNEXPECTED_FIELD',
      'The request contains unsupported fields.',
    );
  }

  if (value.privacyNoticeAcknowledged !== true) {
    addIssue(
      errors,
      'privacyNoticeAcknowledged',
      'REQUIRED',
      'Acknowledge the Privacy Notice before submitting.',
    );
  }

  const contactName = readRequiredString(value, 'contactName', 120, errors);
  const email = readRequiredString(value, 'email', 254, errors);
  const cellNumber = readRequiredString(value, 'cellNumber', 32, errors);
  const servicesOfInterest = readServicesOfInterest(value, errors);
  const farmName = readOptionalString(value, 'farmName', 160, errors);
  const farmLocation = readOptionalString(value, 'farmLocation', 160, errors);
  const operationType = readOptionalString(value, 'operationType', 100, errors);
  const machineCountEstimate = readMachineCountEstimate(value, errors);
  const additionalMessage = readOptionalString(
    value,
    'additionalMessage',
    2000,
    errors,
  );

  if (
    errors.length > 0 ||
    !contactName ||
    !email ||
    !cellNumber ||
    !servicesOfInterest
  ) {
    return { valid: false, errors };
  }

  const enquiry: EnquiryInput = {
    contactName,
    email,
    cellNumber,
    servicesOfInterest,
  };

  if (farmName !== undefined) {
    enquiry.farmName = farmName;
  }

  if (farmLocation !== undefined) {
    enquiry.farmLocation = farmLocation;
  }

  if (operationType !== undefined) {
    enquiry.operationType = operationType;
  }

  if (machineCountEstimate !== undefined) {
    enquiry.machineCountEstimate = machineCountEstimate;
  }

  if (additionalMessage !== undefined) {
    enquiry.additionalMessage = additionalMessage;
  }

  return { valid: true, value: enquiry };
}
