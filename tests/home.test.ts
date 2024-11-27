import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home page", () => {
  test("should show the main page title", async ({ page }) => {
    const mainTitle = await page.getByText("Hi, I'm Antonio 👋");
    await expect(mainTitle).toBeVisible();
  });

  test("should show the main page subtitle", async ({ page }) => {
    const subtitleLine1 = await page.getByText("I'm a software engineer based in Reading, UK.");
    await expect(subtitleLine1).toBeVisible();
    const subtitleLine2 = await page.getByText(
      "I'm interested in green software and climate adaptation."
    );
    await expect(subtitleLine1).toBeVisible();
    await expect(subtitleLine2).toBeVisible();
  });

  test("should show the homepage photo", async ({ page }) => {
    const image = await page.getByRole("img", { name: "myself speaking in public" });
    await expect(image).toBeVisible();
  });

  test("Latest Articles section should show at least one post", async ({ page }) => {
    const articlesNumber = await page.getByRole("listitem").count();
    await expect(articlesNumber).toBeGreaterThan(0);
  });

  test("should show the Contact section", async ({ page }) => {
    const contactTitle = await page.getByRole("heading", { name: "I'm always up for a chat." });
    await expect(contactTitle).toBeVisible();
  });

  test("should show all the social icons/links", async ({ page }) => {
    const twitter = await page.getByRole("link", { name: "Twitter logo" });
    await expect(twitter).toBeVisible();
    const linkedIn = await page.getByRole("link", { name: "LinkedIn logo" });
    await expect(linkedIn).toBeVisible();
    const instagram = await page.getByRole("link", { name: "instagram logo" });
    await expect(instagram).toBeVisible();
    const mail = await page.getByRole("link", { name: "mail icon" });
    await expect(mail).toBeVisible();
    const rss = await page.getByRole("link", { name: "rss feed icon" });
    await expect(rss).toBeVisible();
  });

  test("should be able to toggle the theme", async ({ page }) => {
    const themeToggleIcon = await page.getByRole("link", { name: "toggle light and dark mode" });
    await themeToggleIcon.click();
    const darkBackgroundColor = await page.getByRole("main").evaluate((main) => {
      return window.getComputedStyle(main).getPropertyValue("background-color");
    });
    await expect(darkBackgroundColor).toEqual("rgb(17, 17, 17)");
    await themeToggleIcon.click();
    const clearBackgroundColor = await page.getByRole("main").evaluate((main) => {
      return window.getComputedStyle(main).getPropertyValue("background-color");
    });
    await expect(clearBackgroundColor).toEqual("rgb(250, 250, 252)");
  });
});
