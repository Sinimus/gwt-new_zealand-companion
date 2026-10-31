import { test, expect, type Page } from '@playwright/test';
import routes from './routes.json' with { type: 'json' };

// Every page must render its heading from the JavaScript bundle (the shell in
// index.html has no headings) without an uncaught error or a console error.
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console.error: ${message.text()}`);
  });
  return errors;
}

for (const route of routes) {
  test(`${route.path} renders "${route.heading}"`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(route.path);
    await expect(
      page.getByRole('heading', { level: 1, name: route.heading, exact: true }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('the module cards open their pages and unknown paths return home', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await page.getByRole('link', { name: /^Scoring/ }).click();
  await expect(page).toHaveURL(/\/scoring$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Scoring', exact: true })).toBeVisible();
  await page.goto('/no-such-page');
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Great Western Trail: New Zealand' }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
