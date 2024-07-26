import { test, expect } from "@playwright/test";

test.describe("Main Page testing", () => {
  test("Cities navigations", async ({ page }) => {
    // await loginAsAdmin(page);
    await page.goto("/en/public");
    await page.getByText("konya").click();
    const cities = ["bursa", "kizilay" ,"konya", "istanbul", "sakarya"];
    for (const city of cities) {
      await expect(page.getByText(city)).toBeVisible();
    }
    const cityLocator = page
      .locator("div")
      .filter({ hasText: /^İlerleyin$$/ })
      .getByRole("link");
    await expect(cityLocator).toHaveCount(cities.length);
    let index = 0;
    for (let city of cities) {
      await cityLocator.nth(index).click();
      await page.waitForURL("**/" + city);
      await expect(page.url()).toContain(city);
      await page.goBack();
      index++;
    }
  });
});
