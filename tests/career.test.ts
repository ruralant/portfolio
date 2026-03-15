import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/career");
});

test.describe("Career page", () => {
  test("should show the main page title", async ({ page }) => {
    const mainTitle = await page.getByRole("heading", {
      name: "The cool things I built and where"
    });
    await expect(mainTitle).toBeVisible();
  });

  test("should display at least one company", async ({ page }) => {
    const companies = await page.locator("a.rounded-lg.shadow-md").count();
    await expect(companies).toBeGreaterThan(0);
  });

  test("should show company information for Gentrack", async ({ page }) => {
    const gentrack = await page.getByText("Gentrack");
    await expect(gentrack).toBeVisible();

    const position = await page.getByText("Senior Software Engineer").first();
    await expect(position).toBeVisible();

    const dateRange = await page.getByText("Mar 2022 — Present");
    await expect(dateRange).toBeVisible();
  });

  test("should show tech stack information", async ({ page }) => {
    const react = await page.getByRole("button", { name: "React" }).first();
    await expect(react).toBeVisible();

    const typescript = await page.getByRole("button", { name: "TypeScript" }).first();
    await expect(typescript).toBeVisible();
  });

  test("should have working company website links", async ({ page }) => {
    const links = await page.getByRole("link").filter({ hasText: /Gentrack|Fika|Clearscore/i });
    const count = await links.count();
    await expect(count).toBeGreaterThan(0);
  });

  test("should be able to toggle the theme", async ({ page }) => {
    const themeToggleIcon = await page.getByRole("link", { name: "toggle light and dark mode" });
    await themeToggleIcon.click();
    const darkBackgroundColor = await page.getByRole("main").evaluate((main) => {
      return window.getComputedStyle(main).getPropertyValue("background-color");
    });
    await expect(darkBackgroundColor).toEqual("rgb(17, 17, 17)");
    await themeToggleIcon.click();
    const clearBackgroundColor = await page.getByRole("main").evaluate((main) => {
      return window.getComputedStyle(main).getPropertyValue("background-color");
    });
    await expect(clearBackgroundColor).toEqual("rgb(250, 250, 252)");
  });
});
