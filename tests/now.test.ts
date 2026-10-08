import { expect, test } from "@playwright/test";

test.describe("Now page", () => {
  test("should be linked from the main navigation", async ({ page }) => {
    await page.goto("/");
    const nowLink = page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Now" });
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
    const lastUpdated = page.getByRole("term").filter({ hasText: "Last updated" });
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

  test("should have a back link to home", async ({ page }) => {
    await page.goto("/now");
    const backLink = page.getByRole("main").getByRole("link", { name: "Home" }).first();
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/");
  });
});
