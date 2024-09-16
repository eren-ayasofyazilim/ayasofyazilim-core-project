import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/en/app/admin/home");
  await expect(page.locator("body")).toContainText("CRM");
  await expect(page.getByRole("link", { name: "Traveller" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Contracts" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Operations" })).toBeVisible();
});
