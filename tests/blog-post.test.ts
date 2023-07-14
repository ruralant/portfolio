import { expect, test } from "@playwright/test";

test.describe("Blog page", () => {
  test("has a title and image", async ({ page }) => {
    await page.goto("/blog");

    const posts = await page.$$(
      'a[class="font-Poppins md:w-full flex w-full p-4 mt-5 justify-between text-left items-center rounded-md overflow-hidden shadow-md bg-white dark:bg-neutral-900 hover:scale-105 transition duration-300 ease-in-out"]'
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
