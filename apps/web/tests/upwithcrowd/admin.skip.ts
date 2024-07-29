import test, { expect } from "@playwright/test";

test.describe("Admin Page testing", () => {
  test("Navigating to adming page and checking menus", async ({ page }) => {
    // await loginAsAdmin(page);
    await page.goto("/en/public");
    await page
      .locator("div")
      .filter({ hasText: /^bursaİlerleyin$/ })
      .getByRole("link")
      .click();
    await page.getByRole("menuitem", { name: "Kampanyalar" }).click();
    await page.getByRole("button", { name: "admin admin@abp.io" }).click();
    await page.getByRole("link", { name: "Yönetim Merkezi" }).click();
    await expect(
      page.getByRole("link", { name: "Kimlik Yönetimi" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Profil" }).click();
    await expect(page.getByRole("link", { name: "Profil" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Kampanyalar" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Dil Yönetimi" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "New admin" })).toBeVisible();
    await page.getByRole("link", { name: "New admin" }).click();
    await page.goto("/en/app/admin/profile/new");
  });
});
