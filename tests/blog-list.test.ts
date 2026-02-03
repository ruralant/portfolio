import { expect, test } from "@playwright/test";

test.describe("Blog list page", () => {
  test("has expected title", async ({ page }) => {
    await page.goto("/blog");
    expect(await page.textContent("h1")).toBe("Latest Articles");
  });

  test("should show a list of blog articles", async ({ page }) => {
    await page.goto("/blog");

    // Wait for posts to be rendered
    await page.waitForSelector("ul.flex.flex-col");

    const posts = await page.locator("a.font-Poppins").all();

    expect(posts.length).toBeGreaterThan(0);
  });
});
