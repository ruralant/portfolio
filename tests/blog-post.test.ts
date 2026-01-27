import { expect, test } from "@playwright/test";

test.describe("Blog page", () => {
  test("has a title and image", async ({ page }) => {
    await page.goto("/blog");

    // Wait for posts to be rendered
    await page.waitForSelector("ul.flex.flex-col");

    const firstPost = page.locator("a.font-Poppins").first();
    await expect(firstPost).toBeVisible();

    await firstPost.click();

    const postHeader = await page.$$("h1");
    const postSubHeader = await page.$$("h2");
    const postImage = await page.$$("img");

    await expect(postHeader).toBeDefined();
    await expect(postSubHeader).toBeDefined();
    await expect(postImage).toBeDefined();
  });
});
