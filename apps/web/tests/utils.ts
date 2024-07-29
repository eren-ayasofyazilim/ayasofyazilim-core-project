import { expect, Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/tr/login");
  
}
