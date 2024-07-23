import test, { expect } from "@playwright/test";

test.describe("Investor Page testing", () => {
  test("Navigating to adming page and checking menus", async ({ page }) => {
    // await loginAsAdmin(page);
    await page.goto("/en/public");
    await page
      .locator("div")
      .filter({ hasText: /^bursaİlerleyin$/ })
      .getByRole("link")
      .click();
    await page.getByRole("button", { name: "admin admin@abp.io" }).click();
    await page.getByRole("link", { name: "Yatırımcı Merkezi" }).click();
    await page.waitForURL("**/investor");
    await expect(page.url()).toContain("investor");
  });
});
