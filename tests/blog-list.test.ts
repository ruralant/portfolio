import { expect, test } from "@playwright/test";

test.describe("Blog list page", () => {
  test("has expected title", async ({ page }) => {
    await page.goto("/blog/development");
    expect(await page.textContent("h1")).toBe("Latest Articles");
  });

  test("should show a list of blog articles", async ({ page }) => {
    await page.goto("/blog/development");
    const posts = await page.$$(
      'a[class="font-Poppins md:w-full flex w-full p-4 mt-5 justify-between text-left items-center rounded-md overflow-hidden shadow-md bg-white dark:bg-neutral-900 hover:scale-105 transition duration-300 ease-in-out"]'
    );

    expect(posts.length).toBeGreaterThan(0);
  });
});
