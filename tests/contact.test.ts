import { expect, test } from "@playwright/test";
import { testThemeToggle } from "./helpers.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
});

test.describe("Contact page", () => {
  test("should show the page title", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Get in touch", level: 1 })).toBeVisible();
  });

  test("should show every form field with a label", async ({ page }) => {
    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(page.getByLabel("Your email")).toBeVisible();
    await expect(page.getByLabel("Subject")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("should keep empty required fields from submitting", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByLabel("Your name")).toBeFocused();
  });

  test("should render the anti-spam widget", async ({ page }) => {
    await expect(page.locator("input[name='cf-turnstile-response']")).toBeAttached({
      timeout: 15000
    });
  });

  test("should send a message and confirm it", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Thanks, your message is on its way." })
      });
    });

    await page.getByLabel("Your name").fill("Ada Lovelace");
    await page.getByLabel("Your email").fill("ada@example.com");
    await page.getByLabel("Subject").fill("Green software");
    await page.getByLabel("Message").fill("I would love to talk about carbon-aware computing.");

    await expect(page.locator("input[name='cf-turnstile-response']")).not.toHaveValue("", {
      timeout: 15000
    });
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toHaveText("Thanks, your message is on its way.");
    await expect(page.getByLabel("Message")).toHaveValue("");
  });

  test("should be able to toggle the theme", ({ page }) => testThemeToggle(page));
});
