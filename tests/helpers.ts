import { expect, type Page } from "@playwright/test";

export async function testThemeToggle(page: Page) {
  const themeToggleIcon = page.getByRole("link", { name: "toggle light and dark mode" });
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
}
