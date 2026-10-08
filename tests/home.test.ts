import { expect, test } from "@playwright/test";
import { testThemeToggle } from "./helpers.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home page", () => {
  test("should show the main page title", async ({ page }) => {
    const mainTitle = page.getByRole("heading", { level: 1, name: "Hi, I’m Antonio." });
    await expect(mainTitle).toBeVisible();
  });

  test("should show the main page subtitle", async ({ page }) => {
    const subtitleLine1 = await page.getByText("Software engineer based in Reading, UK.");
    await expect(subtitleLine1).toBeVisible();
    const subtitleLine2 = await page.getByText(
      "I’m interested in green software and climate adaptation."
    );
    await expect(subtitleLine1).toBeVisible();
    await expect(subtitleLine2).toBeVisible();
  });

  test("should show the solarpunk house model", async ({ page }) => {
    const model = await page.getByRole("img", { name: /solarpunk house/ });
    await expect(model).toBeVisible();
  });

  test("Latest Articles section should show at least one post", async ({ page }) => {
    const articlesNumber = await page.getByRole("listitem").count();
    await expect(articlesNumber).toBeGreaterThan(0);
  });

  test("should show the Contact section", async ({ page }) => {
    const contactTitle = await page.getByRole("heading", { name: "I’m always up for a chat." });
    await expect(contactTitle).toBeVisible();
  });

  test("should show all the contact and social links", async ({ page }) => {
    const contact = page.getByRole("region", { name: "I’m always up for a chat." });
    await expect(contact.getByRole("link", { name: "Send me a message" })).toBeVisible();
    await expect(contact.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
    await expect(contact.getByRole("link", { name: "RSS" })).toBeVisible();
  });

  test("should link to the contact form", async ({ page }) => {
    await page.getByRole("link", { name: "Send me a message" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { name: "Get in touch" })).toBeVisible();
  });

  test("should be able to toggle the theme", ({ page }) => testThemeToggle(page));
});
