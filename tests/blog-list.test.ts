import { expect, test } from "@playwright/test";

test.describe("Blog list page", () => {
  test("has expected title", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Latest Articles");
  });

  test("should show a list of blog articles", async ({ page }) => {
    await page.goto("/blog");

    const posts = page.getByRole("main").getByRole("heading", { level: 3 });
    await expect(posts.first()).toBeVisible();
    expect(await posts.count()).toBeGreaterThan(0);
  });

  test("should load the blog and a tag page from prerendered data", async ({ page }) => {
    await page.goto("/");

    const blogData = page.waitForRequest((request) => request.url().includes("/blog/__data.json"));
    await page.getByRole("link", { name: "Blog", exact: true }).first().click();
    await blogData;
    await expect(page.getByRole("heading", { name: "Latest Articles", level: 1 })).toBeVisible();

    const tag = page.getByRole("main").getByRole("listitem").first().getByRole("link").nth(1);
    const tagName = (await tag.textContent())?.trim() ?? "";
    const tagData = page.waitForRequest((request) => request.url().includes("__data.json"));
    await tag.click();
    await tagData;
    await expect(
      page.getByRole("heading", { name: `This is what I wrote about ${tagName}` })
    ).toBeVisible();
  });
});
