import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/en/app/admin/dashboard/identity/organization");
});

test("adding new organization", async ({ page }) => {
  await page.getByRole("button", { name: "+ Add root unit" }).click();
  await page.getByLabel("Display Name *").fill("Test Organization");
  await page.getByText("Save Changes").click();
  await expect(
    page.locator("li").filter({ hasText: "Test Organization" })
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "Organization unit added successfully"
  );
});

test("add users and roles to organization", async ({ page }) => {
  await page.locator("button").filter({ hasText: "Test Organization" }).click();
  await page.getByRole("button", { name: "+ Add user" }).click();
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  const userStatusMessage = page
    .locator("li")
    .filter({ hasText: "Users added successfully" });
  await userStatusMessage.waitFor({ state: "visible" });
  await expect(userStatusMessage).toContainText("Users added successfully");
  await page.getByRole("button", { name: "Roles" }).click();
  await page.getByRole("button", { name: "+ Add role" }).click();
  await page.getByLabel("Select all").click();
  await page.getByRole("button", { name: "Save" }).click();
  const roleStatusMessage = page
    .locator("li")
    .filter({ hasText: "Roles added successfully" });
  await roleStatusMessage.waitFor({ state: "visible" });
  await expect(roleStatusMessage).toContainText("Roles added successfully");
});

test("delete users and roles from organization", async ({ page }) => {
  await page.locator("button").filter({ hasText: "Test Organization" }).click();
  const userRow = page.getByRole("row", { name: "admin admin@abp.io" });
  await userRow.waitFor({ state: "visible" });
  await userRow.getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  const userStatusMessage = page
    .locator("li")
    .filter({ hasText: "User deleted successfully" });
  await userStatusMessage.waitFor({ state: "visible" });
  await expect(userStatusMessage).toContainText("User deleted successfully");
  await page.getByRole("button", { name: "Roles" }).click();
  const roleRow = page.getByRole("row", { name: "admin" });
  await roleRow.waitFor({ state: "visible" });
  await roleRow.getByRole("button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  const roleStatusMessage = page
    .locator("li")
    .filter({ hasText: "Role deleted successfully" });
  await roleStatusMessage.waitFor({ state: "visible" });
  await expect(roleStatusMessage).toContainText("Role deleted successfully");
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
  await expect(page.getByRole("status")).toContainText(
    "Organization unit added successfully"
  );
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
  await expect(page.getByRole("status")).toContainText(
    "Users moved successfully"
  );
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
    page.locator("li").filter({ hasText: "Test Organization edit" })
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "Organization unit updated successfully"
  );
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
  await expect(
    page.locator("li").filter({ hasText: "Test Organization" })
  ).not.toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "Organization unit deleted successfully"
  );
});
