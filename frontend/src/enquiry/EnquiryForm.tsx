import { useRef, useState, type FormEvent } from 'react';
import { ApiClientError, apiClient } from '../api/client';
import type { EnquiryFormCopy } from '../content/translations';
import { enquiryPrivacyNoticeUrl } from './config';
import './EnquiryForm.css';

type EnquiryFormProps = {
  copy: EnquiryFormCopy;
};

type SubmissionStatus =
  'idle' | 'submitting' | 'success' | 'validation' | 'error' | 'conflict';

export function EnquiryForm({ copy }: EnquiryFormProps) {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [servicesError, setServicesError] = useState('');
  const idempotencyKeyRef = useRef<string | null>(null);
  const servicesFieldsetRef = useRef<HTMLFieldSetElement>(null);

  function markChanged() {
    if (status === 'submitting') {
      return;
    }

    idempotencyKeyRef.current = null;
    setStatus('idle');
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting' || !enquiryPrivacyNoticeUrl) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const servicesOfInterest = formData
      .getAll('servicesOfInterest')
      .map((service) => String(service));

    if (servicesOfInterest.length === 0) {
      setServicesError(copy.servicesRequiredMessage);
      servicesFieldsetRef.current?.focus();
      return;
    }

    setServicesError('');
    const payload: Record<string, unknown> = {
      contactName: String(formData.get('contactName') ?? ''),
      email: String(formData.get('email') ?? ''),
      cellNumber: String(formData.get('cellNumber') ?? ''),
      servicesOfInterest,
      privacyNoticeAcknowledged:
        formData.get('privacyNoticeAcknowledged') === 'on',
    };

    const optionalFields = [
      'farmName',
      'farmLocation',
      'operationType',
      'additionalMessage',
    ] as const;

    for (const field of optionalFields) {
      const value = String(formData.get(field) ?? '').trim();
      if (value) {
        payload[field] = value;
      }
    }

    const machineCountEstimate = String(
      formData.get('machineCountEstimate') ?? '',
    ).trim();
    if (machineCountEstimate) {
      payload.machineCountEstimate = Number(machineCountEstimate);
    }

    let idempotencyKey: string;

    try {
      idempotencyKey = idempotencyKeyRef.current ?? crypto.randomUUID();
    } catch {
      setStatus('error');
      return;
    }

    idempotencyKeyRef.current = idempotencyKey;
    setStatus('submitting');

    try {
      await apiClient.post('/enquiries', payload, {
        'Idempotency-Key': idempotencyKey,
      });
      setStatus('success');
      idempotencyKeyRef.current = null;
      form.reset();
    } catch (error) {
      if (!(error instanceof ApiClientError)) {
        throw error;
      }

      const code = error.code;
      if (code) {
        setStatus(
          code === 'IDEMPOTENCY_CONFLICT'
            ? 'conflict'
            : code === 'INVALID_ENQUIRY'
              ? 'validation'
              : 'error',
        );
      } else {
        setStatus('error');
      }
    }
  }

  const message =
    status === 'success'
      ? copy.successMessage
      : status === 'conflict'
        ? copy.conflictMessage
        : status === 'validation'
          ? copy.validationErrorMessage
          : status === 'error'
            ? copy.errorMessage
            : '';

  return (
    <form className="enquiry-form" onSubmit={submitEnquiry}>
      <label htmlFor="enquiry-contact-name">{copy.contactNameLabel}</label>
      <input
        id="enquiry-contact-name"
        name="contactName"
        type="text"
        autoComplete="name"
        maxLength={120}
        required
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <label htmlFor="enquiry-email">{copy.emailLabel}</label>
      <input
        id="enquiry-email"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        required
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <label htmlFor="enquiry-cell-number">{copy.cellNumberLabel}</label>
      <input
        id="enquiry-cell-number"
        name="cellNumber"
        type="tel"
        autoComplete="tel"
        maxLength={32}
        required
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <label htmlFor="enquiry-farm-name">{copy.farmNameLabel}</label>
      <input
        id="enquiry-farm-name"
        name="farmName"
        type="text"
        autoComplete="organization"
        maxLength={160}
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <label htmlFor="enquiry-farm-location">{copy.farmLocationLabel}</label>
      <input
        id="enquiry-farm-location"
        name="farmLocation"
        type="text"
        maxLength={160}
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <label htmlFor="enquiry-operation-type">{copy.operationTypeLabel}</label>
      <input
        id="enquiry-operation-type"
        name="operationType"
        type="text"
        maxLength={100}
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <label htmlFor="enquiry-machine-count">
        {copy.machineCountEstimateLabel}
      </label>
      <input
        id="enquiry-machine-count"
        name="machineCountEstimate"
        type="number"
        min={0}
        max={2147483647}
        step={1}
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <fieldset
        ref={servicesFieldsetRef}
        className="enquiry-form__services"
        aria-describedby={servicesError ? 'enquiry-services-error' : undefined}
        tabIndex={-1}
      >
        <legend>{copy.servicesLabel}</legend>
        <label>
          <input
            name="servicesOfInterest"
            type="checkbox"
            value="farm_management_technology"
            disabled={status === 'submitting'}
            onChange={() => {
              markChanged();
              setServicesError('');
            }}
          />
          {copy.technologyOptionLabel}
        </label>
        <label>
          <input
            name="servicesOfInterest"
            type="checkbox"
            value="machinery_detailing"
            disabled={status === 'submitting'}
            onChange={() => {
              markChanged();
              setServicesError('');
            }}
          />
          {copy.detailingOptionLabel}
        </label>
      </fieldset>
      {servicesError ? (
        <p
          id="enquiry-services-error"
          className="enquiry-form__field-error"
          role="alert"
        >
          {servicesError}
        </p>
      ) : null}

      <label htmlFor="enquiry-additional-message">
        {copy.additionalMessageLabel}
      </label>
      <textarea
        id="enquiry-additional-message"
        name="additionalMessage"
        maxLength={2000}
        rows={5}
        disabled={status === 'submitting'}
        onChange={markChanged}
      />

      <div className="enquiry-form__acknowledgement">
        <label>
          <input
            name="privacyNoticeAcknowledged"
            type="checkbox"
            required
            disabled={status === 'submitting'}
            onChange={markChanged}
          />
          {copy.privacyAcknowledgement}
        </label>
        <p>{copy.privacyNoticePrompt}</p>
        <a href={enquiryPrivacyNoticeUrl} target="_blank" rel="noreferrer">
          {copy.privacyNoticeLinkLabel}
        </a>
      </div>

      {message ? (
        <p
          className="enquiry-form__status"
          role={
            status === 'error' ||
            status === 'conflict' ||
            status === 'validation'
              ? 'alert'
              : 'status'
          }
          aria-live={
            status === 'error' ||
            status === 'conflict' ||
            status === 'validation'
              ? 'assertive'
              : 'polite'
          }
        >
          {message}
        </p>
      ) : null}

      <button
        className="button button--accent"
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? copy.submittingLabel : copy.submitLabel}
      </button>
    </form>
  );
}
