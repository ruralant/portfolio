import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("index page has expected h1", async ({ page }) => {
  expect(await page.textContent("h1")).toBe("Hi, I'm Antonio 👋");
});

test("dropdown menu links to blog", async ({ page }) => {
  await page.getByRole("button", { name: "Work" }).click();
  const linkToArticles = page.getByRole("menuitem", { name: "Articles" });
  expect(linkToArticles).toHaveText("Articles");
  await linkToArticles.click();
  const latestArticles = page.getByRole("heading", { name: "Latest Articles" });
  expect(latestArticles).toBeVisible();
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
