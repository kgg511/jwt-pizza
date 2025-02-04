import { test, expect } from 'playwright-test-coverage';

test('test', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => { //login request
    const loginReq = { email: 'a@jwt.com', password: 'admin' };
    const loginRes = { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'cheese' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/order', async (route) => { //login request
    const OrderRes = { dinerId: 4, orders: [{ id: 1, franchiseId: 1, storeId: 1, date: '2024-06-05T05:14:40.000Z', items: [{ id: 1, menuId: 1, description: 'Veggie', price: 0.05 }] }], page: 1 };
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: OrderRes });
  });

  // http://localhost:3000/api/franchise
  await page.route('*/**/api/franchise', async (route) => {
    if (route.request().method() === "GET") {
      const franRes = [
        {
          id: 1,
          name: "cheese",
          admins: [{ id: 3, name: "常用名字", email: "a@jwt.com" }],
          stores: [
            { id: 1, name: "SLC", totalRevenue: 0.016 },
            { id: 2, name: "whoopity", totalRevenue: 999 },

          ],
        },
      ];
      await route.fulfill({ json: franRes });
    }
    else if (route.request().method() === "POST"){
      const postReq = {
        stores: [],
        id: "",
        name: "cheese",
        admins: [{"email": "a@jwt.com"}]
      }
      expect(route.request().postDataJSON()).toMatchObject(postReq);
      const postRes = {
        stores: [],
        id: 9,
        name: "cheese",
        admins: [{email: "a@jwt.com", id: 1, name: "常用名字"}]
      }
      await route.fulfill({ json: postRes });
    } 
  });

  //delete franchise: http://localhost:3000/api/franchise/9
  await page.route(/.*\/api\/franchise\/\d+$/, async (route) => {
    const deleteRes = {"message": "franchise deleted"}
    expect(route.request().method()).toBe('DELETE');
    await route.fulfill({ json: deleteRes });
  });

  await page.goto('http://localhost:5173/');

  //login
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '常' }).click();

  //go to page
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
  await expect(page.getByRole('main')).toContainText('a@jwt.com');
  await expect(page.getByRole('main')).toContainText('admin');

  //admin dashboard
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('main')).toContainText('Keep the dough rolling and the franchises signing up.');

  //create franchise
  await expect(page.getByRole('main')).toContainText('Add Franchise');
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('cheese');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
  await expect(page.locator('form')).toContainText('Want to create franchise?');
  await page.getByRole('button', { name: 'Create' }).click();

  //close franchise
  await page.getByRole('row', { name: 'cheese 常用名字 Close' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await expect(page.getByRole('main')).toContainText('Are you sure you want to close the cheese franchise? This will close all associated stores and cannot be restored. All outstanding revenue with not be refunded.');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('main')).toContainText('Keep the dough rolling and the franchises signing up.');
});


