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
    const reading = page.getByRole("heading", { name: "Reading and playing" });
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

  test("should list previous updates that open as archived pages", async ({ page }) => {
    await page.goto("/now");
    const previous = page.getByRole("region", { name: "Previous updates" }).getByRole("link");
    await expect(previous.first()).toBeVisible();
    await previous.first().click();
    await expect(page).toHaveURL(/\/now\/\d{4}-\d{2}-\d{2}$/);

    await expect(page.getByRole("heading", { name: "Now", level: 1 })).toBeVisible();
    await expect(page.getByRole("term").filter({ hasText: "Archived update" })).toBeVisible();
    await expect(page.getByRole("link", { name: /up to now/ })).toHaveAttribute("href", "/now");
    await expect(
      page.getByRole("region", { name: "Previous updates" }).locator("[aria-current=page]")
    ).toHaveCount(1);
  });
});
