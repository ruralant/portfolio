import { expect, test } from "@playwright/test";
import { testThemeToggle } from "./helpers.js";

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

  test("should be able to toggle the theme", ({ page }) => testThemeToggle(page));
});
