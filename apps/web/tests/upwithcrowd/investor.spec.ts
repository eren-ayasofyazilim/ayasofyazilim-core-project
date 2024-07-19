import test, { expect } from "@playwright/test";

test.describe("Investor Page testing", () => {
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
    await page.getByRole("link", { name: "Investor Center" }).click();
    await page.goto("/en/app/Investor");
  });
});
