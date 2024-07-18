import { test, expect } from "@playwright/test";
import { before, beforeEach, describe } from "node:test";

describe("Main Page testing", () => {
  test("Cities tags", async ({ page }) => {
    await page.goto("http://localhost:3000/en/public");
    await page.getByText("konya").click();
    const cities = ["bursa", "istanbul", "sakarya", "konya"];
    for (const city of cities) {
      await expect(page.getByText(city)).toBeVisible();
    }
    const cityLocator = page
      .locator("div")
      .filter({ hasText: /^Go to city page$/ })
      .getByRole("button");
    await expect(cityLocator).toHaveCount(cities.length);

    let index = 0;
    for (let city of cities) {
      await cityLocator.nth(index).click();
      // wait to navigate to the city page
      await page.waitForURL(`*${city}*`);
      // await page.url();
      // await expect(page.url()).toContain(city);
      // await expect(page.getByRole("heading")).toHaveText(city);
      await page.goBack();
      index++;
    }
  });
});
