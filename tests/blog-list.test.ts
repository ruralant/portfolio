import { expect, test } from "@playwright/test";

test.describe("Blog list page", () => {
  test("as expected title", async ({ page }) => {
    await page.goto("/blog/development");
    expect(await page.textContent("h1")).toBe("Latest Articles");
  });

  test("should show a list of blog articles", async ({ page }) => {
    await page.goto("/blog/development");
    const posts = await page.$$('li[class="font-Poppins md:w-full mt-5"]');

    expect(posts.length).toBeGreaterThan(0);
  });
});
