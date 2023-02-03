import { expect, test } from "@playwright/test";

test("index page has expected h1", async ({ page }) => {
  await page.goto("/");
  expect(await page.textContent("h1")).toBe("Hi, I'm Antonio 👋");
});

test("dev blog page has expected title", async ({ page }) => {
  await page.goto("/blog/development");
  expect(await page.textContent("h1")).toBe("Latest Articles");
});
