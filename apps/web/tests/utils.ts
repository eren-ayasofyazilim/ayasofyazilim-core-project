import { expect, Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/tr/login");
  await page.url();
  await page.getByPlaceholder("name@example.com").click();
  await page
    .getByPlaceholder("name@example.com")
    .fill(process.env.TEST_USERNAME as string);
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page.keyboard.insertText(process.env.TEST_PASSWORD as string);
  await page.getByRole("button", { name: "Giriş" }).click();
  await page.waitForURL("**/public");
  await page
    .locator("div")
    .filter({ hasText: /^Bursaİlerleyin$/ })
    .getByRole("link")
    .click();
  await page.url();
  await page.waitForURL("**/public");
  //   await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  //   expect the previos button to be visible
  await expect(
    page.getByRole('button').first(),
  ).toBeVisible();
  
  await page.waitForURL("**/");
}
