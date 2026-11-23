import { expect, test } from "@playwright/test";

const CONTRACT = "https://m4ow.uk/socw/3.txt";

test.describe("Search Only Terms Contract", () => {
  test("robots.txt should point every crawler at the contract", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain(`# License ${CONTRACT}\nUser-agent: *\ntdl: ${CONTRACT}\nAllow: /\n`);
  });

  test("the terms page should incorporate the contract and state the fee", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Terms and Conditions");
    await expect(page.getByRole("link", { name: CONTRACT })).toHaveAttribute("href", CONTRACT);
    await expect(
      page.getByText("is £100 (one hundred pounds sterling) exclusive of VAT")
    ).toBeVisible();
  });

  test("every page should link to the terms and the contract", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="terms-of-service"]')).toHaveAttribute("href", CONTRACT);
    await page.getByRole("contentinfo").getByRole("link", { name: "Terms" }).click();
    await expect(page).toHaveURL(/\/terms$/);
  });
});
