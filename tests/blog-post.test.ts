import { expect, test } from "@playwright/test";

test.describe("Blog page", () => {
  test("has a title and image", async ({ page }) => {
    await page.goto("/blog");

    const posts = await page.$$(
      'a[class="mt-5 flex w-full items-center justify-between overflow-hidden rounded-md bg-white p-4 text-left font-Poppins shadow-md transition duration-300 ease-in-out hover:scale-105 dark:bg-neutral-900 md:w-full"]'
    );
    const firstPost = posts[0];

    await firstPost.click();

    const postHeader = await page.$$("h1");
    const postSubHeader = await page.$$("h2");
    const postImage = await page.$$("img");

    await expect(postHeader).toBeDefined();
    await expect(postSubHeader).toBeDefined();
    await expect(postImage).toBeDefined();
  });
});
