import { test, expect } from 'playwright-test-coverage';

test('register', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => { //register request
    const registerReq = {name: "k", email: 'k@mail.com', password: 'k' };
    const registerRes = { user: { name: 'k', email: 'k@mail.com', roles: [{ role: 'diner' }], id: 3}, token: 'leg' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });

  await page.goto('http://localhost:5173/');
  await expect(page.locator('#navbar-dark')).toContainText('Register');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('k');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('k@mail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('k');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
});
