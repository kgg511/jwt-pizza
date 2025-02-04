import { test, expect } from "playwright-test-coverage";

test('visit franchise/about/history', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' })).toBeVisible();
  await expect(page.getByRole('contentinfo')).toContainText('Franchise');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
  await expect(page.getByRole('contentinfo')).toContainText('About');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('list')).toContainText('about');
  await expect(page.getByRole('contentinfo')).toContainText('History');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('list')).toContainText('history');
});