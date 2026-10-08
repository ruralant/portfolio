import { expect, type Page } from "@playwright/test";

// --color-paper in src/tailwind.css, for each theme
const PAPER = { dark: "rgb(18, 18, 17)", light: "rgb(247, 246, 242)" };

const backgroundColor = (page: Page) =>
  page.locator("body").evaluate((body) => window.getComputedStyle(body).backgroundColor);

export async function testThemeToggle(page: Page) {
  const themeToggleIcon = page.getByRole("button", { name: "toggle light and dark mode" });
  await themeToggleIcon.click();
  expect(await backgroundColor(page)).toEqual(PAPER.dark);
  await themeToggleIcon.click();
  expect(await backgroundColor(page)).toEqual(PAPER.light);
}
