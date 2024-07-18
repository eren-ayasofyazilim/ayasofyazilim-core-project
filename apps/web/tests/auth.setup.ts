import { test as setup, expect } from "@playwright/test";
import * as path from "path";
import fs from "fs";
// const authFile = "playwright/.auth/user.json";
const authFile = path.join(__dirname, "playwright", ".auth", "user.json");
console.log(`Auth file setup: ${authFile}`);

// Skip if the file exists and is newer than 1 hour
setup.skip(() => {
  if (!fs.existsSync(authFile)) return false;
  const stats = fs.statSync(authFile);
  return Date.now() - stats.mtimeMs < 1000 * 60 * 60;
});

setup("Authenticate/Login", async ({ page }) => {
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
  await page
    .locator("div")
    .filter({ hasText: /^istanbulGo to city page$/ })
    .getByRole("button")
    .click();
  await page.url();
  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.context().storageState({ path: authFile });
  console.log(`Storage state saved to: ${authFile}`);
});
