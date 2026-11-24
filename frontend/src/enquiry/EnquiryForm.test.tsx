// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { translations } from '../content/translations';

vi.mock('./config', () => ({
  enquiryApiBaseUrl: 'https://api.example.test/api/v1',
  enquiryPrivacyNoticeUrl: 'https://example.test/privacy',
}));

import { EnquiryForm } from './EnquiryForm';

const idempotencyKey = '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3';
const formCopy = translations.en.home.interest.form;

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText('Your name'), {
    target: { value: 'Example Contact' },
  });
  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'contact@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Cell number'), {
    target: { value: '+27 00 000 0000' },
  });
  fireEvent.click(screen.getByLabelText('Farm Management Technology'));
  fireEvent.click(screen.getByLabelText(/By submitting this enquiry/));
}

describe('EnquiryForm', () => {
  it('sends the approved fields with a stable idempotency key across retry', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError('Network unavailable'))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            success: true,
            data: {
              enquiryId: '00000000-0000-0000-0000-000000000001',
              notificationStatus: 'not_configured',
            },
          }),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    const randomUUID = vi.fn(() => idempotencyKey);
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('crypto', { randomUUID });

    render(<EnquiryForm copy={formCopy} />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Send enquiry' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      formCopy.errorMessage,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Send enquiry' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      formCopy.successMessage,
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(randomUUID).toHaveBeenCalledOnce();

    const firstRequest = fetchMock.mock.calls[0]?.[1];
    const retryRequest = fetchMock.mock.calls[1]?.[1];
    expect(new Headers(firstRequest?.headers).get('Idempotency-Key')).toBe(
      idempotencyKey,
    );
    expect(new Headers(retryRequest?.headers).get('Idempotency-Key')).toBe(
      idempotencyKey,
    );
    expect(JSON.parse(String(firstRequest?.body))).toEqual({
      contactName: 'Example Contact',
      email: 'contact@example.com',
      cellNumber: '+27 00 000 0000',
      servicesOfInterest: ['farm_management_technology'],
      privacyNoticeAcknowledged: true,
    });
  });

  it('requires at least one approved service before making a request', () => {
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('crypto', { randomUUID: () => idempotencyKey });

    render(<EnquiryForm copy={formCopy} />);
    fireEvent.change(screen.getByLabelText('Your name'), {
      target: { value: 'Example Contact' },
    });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'contact@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Cell number'), {
      target: { value: '+27 00 000 0000' },
    });
    fireEvent.click(screen.getByLabelText(/By submitting this enquiry/));
    const form = screen.getByLabelText('Your name').closest('form');
    expect(form).not.toBeNull();
    if (!form) {
      throw new Error('Enquiry form was not rendered.');
    }
    fireEvent.submit(form);

    expect(screen.getByRole('alert')).toHaveTextContent(
      formCopy.servicesRequiredMessage,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
