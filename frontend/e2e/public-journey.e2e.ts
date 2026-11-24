import { expect, test, type Page } from '@playwright/test';

const successResponse = {
  success: true,
  data: {
    enquiryId: '00000000-0000-0000-0000-000000000001',
    notificationStatus: 'not_configured',
  },
};

async function openEnquiryForm(page: Page) {
  await page.goto('/');
  await page
    .getByRole('heading', { name: 'Express interest' })
    .scrollIntoViewIfNeeded();
}

async function fillRequiredFields(page: Page, selectService = true) {
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('visitor@example.test');
  await page.getByLabel('Cell number').fill('+27000000000');

  if (selectService) {
    await page
      .getByRole('checkbox', { name: 'Farm Management Technology' })
      .check();
  }

  await page.getByLabel(/By submitting this enquiry/).check();
}

test('completes the Home, Services, demo and enquiry journey without a login', async ({
  page,
}) => {
  await page.route('**/api/v1/enquiries', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify(successResponse),
    });
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const primaryNavigation = page.getByRole('navigation', { name: 'Primary' });
  await primaryNavigation.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/services$/);

  await primaryNavigation.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Explore the demo' }).click();
  await expect(page).toHaveURL(/#platform-demo$/);
  await page.getByRole('button', { name: 'Start demo' }).click();
  await expect(page.getByText('Step 1 of 6')).toBeVisible();

  await page
    .getByRole('heading', { name: 'Express interest' })
    .scrollIntoViewIfNeeded();
  await fillRequiredFields(page);
  await page.getByRole('button', { name: 'Send enquiry' }).click();

  await expect(page.getByRole('status')).toContainText(
    'Your enquiry has been received.',
  );
});

test('shows local and server validation errors accessibly', async ({
  page,
}) => {
  let requestCount = 0;
  await page.route('**/api/v1/enquiries', async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 422,
      contentType: 'application/json',
      body: JSON.stringify({
        error: {
          code: 'INVALID_ENQUIRY',
          message: 'Invalid input',
        },
      }),
    });
  });

  await openEnquiryForm(page);
  await fillRequiredFields(page, false);
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Select at least one service.',
  );
  expect(requestCount).toBe(0);

  await page
    .getByRole('checkbox', { name: 'Farm Management Technology' })
    .check();
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('alert')).toContainText('Check your details');
  expect(requestCount).toBe(1);
});

test('shows a service-unavailable message and safely retries the same request', async ({
  page,
}) => {
  const idempotencyKeys: string[] = [];
  await page.route('**/api/v1/enquiries', async (route) => {
    idempotencyKeys.push(route.request().headers()['idempotency-key'] ?? '');
    if (idempotencyKeys.length === 1) {
      await route.abort('failed');
      return;
    }

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify(successResponse),
    });
  });

  await openEnquiryForm(page);
  await fillRequiredFields(page);
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('alert')).toContainText(
    'We could not submit your enquiry.',
  );

  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('status')).toContainText(
    'Your enquiry has been received.',
  );
  expect(idempotencyKeys).toHaveLength(2);
  expect(idempotencyKeys[0]).not.toBe('');
  expect(idempotencyKeys[1]).toBe(idempotencyKeys[0]);
});

test('mobile navigation and the language switch remain usable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Menu' });
  const primaryNavigation = page.getByRole('navigation', { name: 'Primary' });
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await primaryNavigation.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.click();
  await page.getByRole('combobox', { name: 'Language' }).selectOption('af');
  await expect(page.locator('html')).toHaveAttribute('lang', 'af-ZA');
  const afrikaansNavigation = page.getByRole('navigation', {
    name: 'Primêre navigasie',
  });
  await afrikaansNavigation.getByRole('link', { name: 'Tuis' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
