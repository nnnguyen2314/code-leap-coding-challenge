import { test, expect } from '@playwright/test';

test('loads main page and shows loading state', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Loading...')).toBeVisible();
});
