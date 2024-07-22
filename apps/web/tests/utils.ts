import { expect, Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/en/login");
  await page.url();
  await page.getByPlaceholder("name@example.com").click();
  await page
    .getByPlaceholder("name@example.com")
    .fill(process.env.TEST_USERNAME as string);
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page
    .getByPlaceholder("Password")
    .fill(process.env.TEST_PASSWORD as string);
  await page.getByRole("button", { name: "Login" }).click();
  await page.url();
  await page.locator('div').filter({ hasText: /^bursaİlerleyin$/ }).getByRole('button').click();
  await page.url();
  await page.waitForURL("**/public");
  //   await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  //   expect the previos button to be visible
  await expect(
    page.getByRole("button", { name: "admin admin@abp.io" }),
  ).toBeVisible();
  await page.waitForURL("**/");
}
