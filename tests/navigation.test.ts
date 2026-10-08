import { expect, test } from "@playwright/test";

const LINKS = ["Blog", "Career", "About", "Now", "Colophon"];

test.describe("Navigation", () => {
  test("should show every section in the header on wide screens", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of LINKS) await expect(nav.getByRole("link", { name })).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  });

  test("should mark the current section", async ({ page }) => {
    await page.goto("/blog");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Career" })).not.toHaveAttribute("aria-current");
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("should open a menu with every section and close it after navigating", async ({
      page
    }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Menu" }).click();

      const nav = page.getByRole("navigation", { name: "Main" });
      for (const name of LINKS) await expect(nav.getByRole("link", { name })).toBeVisible();

      await nav.getByRole("link", { name: "Colophon" }).click();
      await expect(page).toHaveURL(/\/colophon$/);
      await expect(page.getByRole("heading", { name: "Colophon", level: 1 })).toBeVisible();
      await expect(page.getByRole("button", { name: "Close" })).toBeHidden();
    });

    test("should close the menu with Escape", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Close" })).toBeHidden();
    });
  });
});
