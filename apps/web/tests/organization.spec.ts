import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/en/app/admin/dashboard/identity/organization");
});

test("adding new organization", async ({ page }) => {
  await page.getByRole("button", { name: "+ Add root unit" }).click();
  await page.getByLabel("Display Name *").fill("Test Organization");
  await page.getByText("Save Changes").click();
  await expect(
    page.locator("li").filter({ hasText: "Test Organization" }),
  ).toBeVisible();
});

test("add users and roles to organization", async ({ page }) => {
  await page.locator("button").filter({ hasText: "Test Organization" }).click();
  await page.getByRole("button", { name: "+ Add user" }).click();
  await page.waitForTimeout(5000);
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Roles" }).click();
  await page.getByRole("button", { name: "+ Add role" }).click();
  await page.waitForTimeout(5000);
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
});

test("delete users and roles from organization", async ({ page }) => {
  await page.locator("button").filter({ hasText: "Test Organization" }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("row", { name: "admin admin@abp.io" })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Roles" }).click();
  await page.getByRole("row", { name: "admin" }).getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
});

test("add sub unit to organization", async ({ page }) => {
  await page
    .locator("li")
    .filter({ hasText: "Test Organization" })
    .getByRole("img")
    .nth(1)
    .click();
  await page.getByRole("menuitem", { name: "Add Sub-unit" }).click();
  await page.getByLabel("Display Name *").click();
  await page.getByLabel("Display Name *").fill("Test Organization sub");
  await page.getByText("Save Changes").click();
});

test("move all users from organization", async ({ page }) => {
  await page
    .locator("li")
    .filter({ hasText: "Test Organization" })
    .getByRole("img")
    .nth(2)
    .click();
  await page.getByRole("menuitem", { name: "Move all Users" }).click();
  await page.getByRole("combobox").click();
  await page
    .getByLabel("Test Organization sub Parent")
    .getByText("Test Organization sub Parent")
    .click();
  await page.getByText("Save Changes").click();
});

test("edit organization", async ({ page }) => {
  await page
    .locator("li")
    .filter({ hasText: "Test Organization" })
    .getByRole("img")
    .nth(2)
    .click();
  await page.getByRole("menuitem", { name: "Edit" }).click();
  await page.getByLabel("Display Name *").click();
  await page.getByLabel("Display Name *").fill("Test Organization edit");
  await page.getByText("Save Changes").click();
  await expect(
    page.locator("li").filter({ hasText: "Test Organization edit" }),
  ).toBeVisible();
});

test("delete organization", async ({ page }) => {
  await page
    .locator("li")
    .filter({ hasText: "Test Organization" })
    .getByRole("img")
    .nth(2)
    .click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
});
