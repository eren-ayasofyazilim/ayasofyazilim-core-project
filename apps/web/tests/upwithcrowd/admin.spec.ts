import test, { expect } from "@playwright/test";

test.describe("Admin Page testing", () => {
  test("Navigating to adming page and checking menus", async ({ page }) => {
    // await loginAsAdmin(page);
    await page.goto("/en/public");
    await page
      .locator("div")
      .filter({ hasText: /^istanbulGo to city page$/ })
      .getByRole("button")
      .click();
    await page.getByRole("menuitem", { name: "Campaigns" }).click();
    await expect(page.getByText("No Projects")).toBeVisible();
    await page.getByRole("button", { name: "admin admin@abp.io" }).click();
    await page.getByRole("link", { name: "Admin Center" }).click();
    await page.goto("/en/app/admin");
    await expect(
      page.getByRole("link", { name: "Identity Management" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Campaigns" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Language Management" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "New admin" })).toBeVisible();
    await page.getByRole("link", { name: "New admin" }).click();
    await page.goto("/en/app/admin/profile/new");
  });
});
