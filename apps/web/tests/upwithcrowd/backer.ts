import { test, expect } from "@playwright/test";

test("create delete backer test", async ({ page }) => {
  test.setTimeout(120000);
  const name = "Test Backer #" + Date.now();
  await page.goto("http://localhost:3000/en/public");
  await page
    .locator("div")
    .filter({ hasText: /^Bursaİlerleyin$/ })
    .getByRole("link")
    .click();
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill("admin");
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page.getByPlaceholder("Şifre").fill("123Aa!");
  await page.getByPlaceholder("Şifre").press("Enter");
  await page
    .locator("div")
    .filter({ hasText: /^Bursaİlerleyin$/ })
    .getByRole("link")
    .click();
  await page.getByRole("button", { name: "admin admin@abp.io" }).click();
  await page.getByRole("link", { name: "Yönetim Merkezi" }).click();
  await page.getByRole("link", { name: "Profil" }).click();
  await page.getByRole("button", { name: "Yeni Profil" }).click();
  await page.getByRole("link", { name: "Kurumsal Profil" }).click();
  await page.getByLabel("Company Name").click();
  await page.getByLabel("Company Name").fill(name);
  await page.getByLabel("Company Name").press("Tab");
  await page.getByLabel("Taxpayer Id").fill("12");
  await page.getByLabel("Legal Status Code").click();
  await page.getByLabel("Legal Status Code").fill("1");
  await page.getByLabel("Customer Number").click();
  await page.getByLabel("Customer Number").fill("12");
  await page.getByLabel("Email Address").click();
  await page.getByLabel("Email Address").fill("asd@asd.com");
  await page.locator('input[type="tel"]').click();

  await page.keyboard.type("5555555555");
  await page
    .locator("div")
    .filter({ hasText: /^Type Code01$/ })
    .getByRole("combobox")
    .click();
  await page.getByLabel("1", { exact: true }).click();
  await page.getByLabel("Address Line").click();
  await page.getByLabel("Address Line").fill("adres");
  await page.getByLabel("City", { exact: true }).fill("ad");
  await page.getByLabel("City", { exact: true }).click();
  await page.getByLabel("City", { exact: true }).fill("adres");
  await page.getByLabel("Terriority").click();
  await page.getByLabel("Terriority").fill("adres");
  await page.getByLabel("Postal Code").click();
  await page.getByLabel("Postal Code").fill("2");
  await page.getByLabel("Country", { exact: true }).fill("ad");
  await page.getByLabel("Country", { exact: true }).click();
  await page.getByLabel("Country", { exact: true }).fill("adres");
  await page.getByLabel("Full Address").click();
  await page.getByLabel("Full Address").fill("adres");
  await page.getByRole("button", { name: "Kaydet" }).click();

  await page.getByRole("link", { name: "Profil" }).click();

  await page.getByRole("link", { name: "Test Backer #" }).click();
  await page.getByRole("button", { name: "Profili Sil" }).click();
  await page.getByRole("button", { name: "Evet" }).click();

  await page.getByRole("button", { name: "Yeni Profil" }).click();
  await page.getByRole("link", { name: "Bireysel Profil" }).click();
  await page.getByLabel("Name", { exact: true }).click();
  await page.getByLabel("Name", { exact: true }).fill(name);
  await page.getByLabel("Email Address").click();
  await page.getByLabel("Email Address").fill("abc@asd.com");
  await page.locator('input[type="tel"]').click();
  await page.keyboard.type("5555555555");
  await page
    .locator("div")
    .filter({ hasText: /^Type Code01$/ })
    .getByRole("combobox")
    .click();
  await page.getByLabel("1", { exact: true }).click();
  await page.getByLabel("Address Line").click();
  await page.getByLabel("Address Line").fill("adres");
  await page.getByLabel("Address Line").press("Tab");
  await page.getByLabel("City", { exact: true }).fill("adres");
  await page.getByLabel("City", { exact: true }).press("Tab");
  await page.getByLabel("Terriority").fill("adres");
  await page.getByLabel("Terriority").press("Tab");
  await page.getByLabel("Postal Code").fill("100");
  await page.getByLabel("Postal Code").press("Tab");
  await page.getByLabel("Country", { exact: true }).fill("adres");
  await page.getByLabel("Country", { exact: true }).press("Tab");
  await page.getByLabel("Full Address").fill("adres");
  await page.getByRole("button", { name: "Kaydet" }).click();
  await page.getByRole("link", { name: "Profil" }).click();

  await page.getByRole("link", { name: "Test Backer #" }).click();
  await page.getByRole("button", { name: "Profili Sil" }).click();
  await page.getByRole("button", { name: "Evet" }).click();
});
