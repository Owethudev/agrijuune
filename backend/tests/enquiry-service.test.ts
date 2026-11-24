import { describe, expect, it, vi } from 'vitest';
import type {
  EnquiryPersistenceResult,
  EnquiryRepository,
} from '../src/repositories/enquiry-repository.js';
import { createEnquiryService } from '../src/services/enquiry-service.js';
import type { EnquiryInput } from '../src/validation/enquiry-validation.js';
import { validateIdempotencyKey } from '../src/validation/idempotency-key.js';

const enquiry: EnquiryInput = {
  contactName: 'Example Contact',
  email: 'contact@example.com',
  cellNumber: '+27 00 000 0000',
  farmName: 'Do not include farm details',
  servicesOfInterest: ['farm_management_technology'],
  additionalMessage: 'Do not include message details',
};

const idempotencyKey = validateIdempotencyKey(
  '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
);

if (!idempotencyKey.valid) {
  throw new Error('Test idempotency key is invalid.');
}

const persistedEnquiry: EnquiryPersistenceResult = {
  ok: true,
  enquiryId: '00000000-0000-0000-0000-000000000001',
  replayed: false,
  notificationStatus: 'not_configured',
};

function createRepository(
  createResult: EnquiryPersistenceResult = persistedEnquiry,
  updateResult: { ok: true } | { ok: false } = { ok: true },
) {
  const events: string[] = [];
  const repository: EnquiryRepository = {
    create: vi.fn(async () => {
      events.push('persist');
      return createResult;
    }),
    updateNotificationStatus: vi.fn(async (_id, status) => {
      events.push(`status:${status}`);
      return updateResult;
    }),
  };

  return { repository, events };
}

describe('enquiry notification service', () => {
  it('does not send notifications when the explicit feature flag is disabled', async () => {
    const { repository } = createRepository();
    const notifier = { send: vi.fn() };
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: false,
    });

    await expect(
      service.submit(enquiry, idempotencyKey.value),
    ).resolves.toEqual(persistedEnquiry);

    expect(notifier.send).not.toHaveBeenCalled();
    expect(repository.updateNotificationStatus).not.toHaveBeenCalled();
  });

  it('does not notify when persistence fails', async () => {
    const { repository } = createRepository({
      ok: false,
      reason: 'unavailable',
    });
    const notifier = { send: vi.fn() };
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    await expect(
      service.submit(enquiry, idempotencyKey.value),
    ).resolves.toEqual({ ok: false, reason: 'unavailable' });

    expect(notifier.send).not.toHaveBeenCalled();
    expect(repository.updateNotificationStatus).not.toHaveBeenCalled();
  });

  it('persists before sending and stores a minimal notification outcome', async () => {
    const { repository, events } = createRepository();
    const notifier = {
      send: vi.fn(async (message: { subject: string; textContent: string }) => {
        events.push('send');
        expect(message.subject).toBe('New Agrijuune enquiry');
        expect(message.textContent).toContain('Contact name: Example Contact');
        expect(message.textContent).toContain('Email: contact@example.com');
        expect(message.textContent).toContain(
          'Services: farm_management_technology',
        );
        expect(message.textContent).not.toContain(
          'Do not include farm details',
        );
        expect(message.textContent).not.toContain(
          'Do not include message details',
        );
        return { status: 'sent' as const };
      }),
    };
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    const result = await service.submit(enquiry, idempotencyKey.value);

    expect(result).toEqual({
      ...persistedEnquiry,
      notificationStatus: 'sent',
    });
    expect(events).toEqual([
      'persist',
      'status:pending',
      'send',
      'status:sent',
    ]);
    expect(repository.updateNotificationStatus).toHaveBeenNthCalledWith(
      2,
      persistedEnquiry.enquiryId,
      'sent',
      expect.any(String),
    );
  });

  it('keeps a saved enquiry successful when the notifier reports failure', async () => {
    const { repository } = createRepository();
    const notifier = {
      send: vi.fn().mockResolvedValue({ status: 'failed' as const }),
    };
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    await expect(
      service.submit(enquiry, idempotencyKey.value),
    ).resolves.toEqual({
      ...persistedEnquiry,
      notificationStatus: 'failed',
    });
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.updateNotificationStatus).toHaveBeenLastCalledWith(
      persistedEnquiry.enquiryId,
      'failed',
      expect.any(String),
    );
  });

  it('records an unexpected notifier rejection as a safe failure', async () => {
    const { repository } = createRepository();
    const notifier = {
      send: vi.fn().mockRejectedValue(new Error('private provider details')),
    };
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    try {
      await expect(
        service.submit(enquiry, idempotencyKey.value),
      ).resolves.toEqual({
        ...persistedEnquiry,
        notificationStatus: 'failed',
      });
      expect(repository.updateNotificationStatus).toHaveBeenLastCalledWith(
        persistedEnquiry.enquiryId,
        'failed',
        expect.any(String),
      );
      expect(errorLog.mock.calls.flat().join(' ')).not.toContain(
        'private provider details',
      );
      expect(errorLog.mock.calls.flat().join(' ')).not.toContain(enquiry.email);
    } finally {
      errorLog.mockRestore();
    }
  });

  it('leaves the status pending when the final outcome cannot be persisted', async () => {
    const { repository } = createRepository();
    vi.spyOn(repository, 'updateNotificationStatus')
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false });
    const notifier = {
      send: vi.fn().mockResolvedValue({ status: 'sent' as const }),
    };
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    try {
      await expect(
        service.submit(enquiry, idempotencyKey.value),
      ).resolves.toEqual({
        ...persistedEnquiry,
        notificationStatus: 'pending',
      });
      expect(errorLog.mock.calls.flat().join(' ')).not.toContain(enquiry.email);
    } finally {
      errorLog.mockRestore();
    }
  });

  it('does not send a second notification when an idempotent replay occurs', async () => {
    const replayed: EnquiryPersistenceResult = {
      ...persistedEnquiry,
      replayed: true,
      notificationStatus: 'sent',
    };
    const { repository } = createRepository(replayed);
    const notifier = { send: vi.fn() };
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    await expect(
      service.submit(enquiry, idempotencyKey.value),
    ).resolves.toEqual(replayed);

    expect(notifier.send).not.toHaveBeenCalled();
    expect(repository.updateNotificationStatus).not.toHaveBeenCalled();
  });

  it('does not send when pending status cannot be recorded', async () => {
    const { repository } = createRepository(persistedEnquiry, { ok: false });
    const notifier = { send: vi.fn() };
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
    const service = createEnquiryService(repository, {
      notifier,
      notificationsEnabled: true,
    });

    try {
      await expect(
        service.submit(enquiry, idempotencyKey.value),
      ).resolves.toEqual(persistedEnquiry);
      expect(notifier.send).not.toHaveBeenCalled();
      expect(errorLog.mock.calls.flat().join(' ')).not.toContain(enquiry.email);
    } finally {
      errorLog.mockRestore();
    }
  });
});
