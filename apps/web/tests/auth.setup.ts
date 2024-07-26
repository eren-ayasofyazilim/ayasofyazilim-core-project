import { test as setup, expect } from "@playwright/test";
import * as path from "path";
import fs from "fs";
import { loginAsAdmin } from "./utils";
// const authFile = "playwright/.auth/user.json";
const authFile = path.join(__dirname, "playwright", ".auth", "user.json");
console.log(`Auth file setup: ${authFile}`);

// Skip if the file exists and is newer than 1 hour
// setup.skip(() => {
//   if (!fs.existsSync(authFile)) return false;
//   const stats = fs.statSync(authFile);
//   return Date.now() - stats.mtimeMs < 1000 * 60 * 60;
// });

setup("Authenticate/Login", async ({ page }) => {
  await loginAsAdmin(page);
  await page.context().storageState({ path: authFile });
  console.log(`Storage state saved to: ${authFile}`);
});