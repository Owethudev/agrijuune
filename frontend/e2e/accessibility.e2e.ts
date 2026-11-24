import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const publicRoutes = ['/', '/services', '/about', '/faq'] as const;
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test('/team/sign-in has no automated WCAG 2.2 AA violations', async ({
  page,
}) => {
  await page.goto('/team/sign-in');

  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  expect(results.violations).toEqual([]);
});

for (const route of publicRoutes) {
  test(`${route} has no automated WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });
}

test('menu, demo and enquiry validation states remain accessible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.getByRole('button', { name: 'Menu' }).click();
  let results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);

  await page.getByRole('button', { name: 'Start demo' }).focus();
  await page.keyboard.press('Enter');
  await page
    .getByRole('heading', { name: 'Express interest' })
    .scrollIntoViewIfNeeded();

  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('visitor@example.test');
  await page.getByLabel('Cell number').fill('+27000000000');
  await page.getByLabel(/By submitting this enquiry/).check();
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Select at least one service.',
  );

  results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);
});

test('keyboard navigation reaches skip link and restores focus after Escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to main content' }),
  ).toBeFocused();
  await expect(
    page.getByRole('link', { name: 'Skip to main content' }),
  ).toHaveCSS('outline-style', 'solid');
  await expect(
    page.getByRole('link', { name: 'Skip to main content' }),
  ).toHaveCSS('outline-width', '3px');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Agrijuune home' }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Close menu' }),
  ).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');

  await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );

  await page.keyboard.press('Enter');
  const servicesLink = page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Services' });
  await servicesLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('reduced-motion preference preserves keyboard-operated controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const nextSlide = page.getByRole('button', { name: 'Next', exact: true });
  await nextSlide.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Slide 2 of 3', { exact: false })).toBeVisible();

  const startDemo = page.getByRole('button', { name: 'Start demo' });
  await startDemo.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Step 1 of 6')).toBeVisible();
});
