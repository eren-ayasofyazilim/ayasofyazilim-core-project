import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  const userName = process.env.TEST_USERNAME || ".env not provided";
  const password = process.env.TEST_PASSWORD || ".env not provided";
  await page.goto("/tr/login");
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill(userName);
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page.keyboard.insertText(password);
  const clickLogin = page.getByRole("button", { name: "Giriş" });
  await clickLogin.click();
  await page.waitForResponse("**/login");
}

export async function expectStatusMessage(
  page: Page,
  message: string | RegExp | readonly (string | RegExp)[],
) {
  await expect(page.getByRole("status")).toContainText(message);
}
