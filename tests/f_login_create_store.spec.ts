import { test, expect } from "playwright-test-coverage";

test("franchisee login and create store", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    //login request
    if (route.request().method() === "PUT") {
      const loginReq = { email: "f@jwt.com", password: "franchisee" };
      const loginRes = {
        user: {
          id: 3,
          name: "kyle",
          email: "f@jwt.com",
          roles: [{ role: "diner" }, { objectId: 1, role: "franchisee" }],
        },
        token: "karma",
      };
      expect(route.request().method()).toBe("PUT");
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });

    } else if (route.request().method() === "DELETE") { //logout
      const logoutRes = { message: "logout successful" };
      await route.fulfill({
        status: 200,
        headers: {
          Authorization: "Bearer karma",
        },
        body: JSON.stringify(logoutRes),
      });
    }
  });

  await page.route('*/**/api/franchise/*', async (route) => {
    expect(route.request().method()).toBe("GET");
    const franRes = [
      {
        id: 1,
        name: "pizzaPocket",
        admins: [{ id: 3, name: "pizza franchisee", email: "f@jwt.com" }],
        stores: [
          { id: 1, name: "SLC", totalRevenue: 0.016 },
          { id: 2, name: "whoopity", totalRevenue: 0 },
        ],
      },
    ];


    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer karma", // Custom Authorization header
      },
      body: JSON.stringify(franRes),
    });
  });

  //http://localhost:3000/api/franchise/1/store
  await page.route("*/**/api/franchise/\d+/store", async (route) => {
    expect(route.request().method()).toBe("POST");
    const createReq = { id: "", name: "whoopity" };
    const createRes = { id: 12, franchiseId: 1, name: "whoopity" };

    expect(route.request().postDataJSON()).toMatchObject(createReq);
    await route.fulfill({ json: createRes });

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer karma", // Custom Authorization header
      },
      body: JSON.stringify(createRes),
    });
  });

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Login" }).click();
  await expect(
    page.getByRole("textbox", { name: "Email address" })
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading")).toContainText("The web's best pizza");
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByRole("main")).toContainText(
    "Everything you need to run an JWT Pizza franchise. Your gateway to success."
  );
  await page.getByRole("button", { name: "Create store" }).click();
  await page.getByRole("textbox", { name: "store name" }).click();
  await page.getByRole("textbox", { name: "store name" }).fill("whoopity");
  await page.getByRole("button", { name: "Create" }).click();
  //await expect(page.locator("tbody")).toContainText("whoopity");
  await page.getByRole("link", { name: "Logout" }).click();
  await expect(page.getByRole("heading")).toContainText("The web's best pizza");
});
