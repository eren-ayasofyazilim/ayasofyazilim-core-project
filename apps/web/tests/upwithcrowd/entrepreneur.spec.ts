import test, { expect } from "@playwright/test";

test.describe("Entrepreneur Page testing", () => {
  test("Navigating to adming page and checking menus", async ({ page }) => {
    // await loginAsAdmin(page);
    await page.goto("/en/public");
    await page.locator('div').filter({ hasText: /^bursaİlerleyin$/ }).getByRole('button').click();
    await page.getByRole("button", { name: "admin admin@abp.io" }).click();
    await page.getByRole('link', { name: 'Girişimci Merkezi' }).click();
    await page.waitForURL('**/entrepreneur');
    // expect link to be contain "entrepreneur"
    await expect(page.url()).toContain("entrepreneur");
  });
});
