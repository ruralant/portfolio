import { expect, test } from "@playwright/test";

test.describe("Blog list page", () => {
  test("has expected title", async ({ page }) => {
    await page.goto("/blog");
    expect(await page.textContent("h1")).toBe("Latest Articles");
  });

  test("should show a list of blog articles", async ({ page }) => {
    await page.goto("/blog");
    const posts = await page.$$(
      'a[class="font-Poppins mt-5 flex w-full items-center justify-between overflow-hidden rounded-md bg-white p-4 text-left shadow-md transition duration-300 ease-in-out hover:scale-105 md:w-full dark:bg-neutral-900"]'
    );

    expect(posts.length).toBeGreaterThan(0);
  });
});
