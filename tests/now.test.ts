import { expect, test } from "@playwright/test";

test.describe("Now page", () => {
  test("should be accessible from the home page easter egg link", async ({ page }) => {
    await page.goto("/");
    const nowLink = page.getByRole("link", { name: "What I'm up to now →" });
    await expect(nowLink).toBeVisible();
    await nowLink.click();
    await expect(page).toHaveURL("/now");
  });

  test("should show the page title", async ({ page }) => {
    await page.goto("/now");
    const title = page.getByRole("heading", { name: "Now", level: 1 });
    await expect(title).toBeVisible();
  });

  test("should show the last updated date", async ({ page }) => {
    await page.goto("/now");
    const lastUpdated = page.getByText("Last updated:");
    await expect(lastUpdated).toBeVisible();
  });

  test("should show content sections", async ({ page }) => {
    await page.goto("/now");
    const workingOn = page.getByRole("heading", { name: "Working on" });
    await expect(workingOn).toBeVisible();
    const reading = page.getByRole("heading", { name: "Reading" });
    await expect(reading).toBeVisible();
    const outsideWork = page.getByRole("heading", { name: "Outside work" });
    await expect(outsideWork).toBeVisible();
  });

  test("should have a back arrow linking to home", async ({ page }) => {
    await page.goto("/now");
    const backLink = page.locator("a[href='/']").first();
    await expect(backLink).toBeVisible();
  });
});
