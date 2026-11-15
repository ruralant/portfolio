import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import edge, { stamp } from "../netlify/edge-functions/grid-mode.ts";
import { GRID_MODES, readChoice, type GridMode, type GridReading } from "../src/lib/grid/modes.ts";

const POST = "/blog/react-usecallback-usememo";
const POST_IMAGE = "react-memo.";

const reading = (mode: GridMode, intensity: number): GridReading => ({
  zone: "GB",
  intensity,
  mode,
  datetime: "2026-11-15T13:00:00.000Z"
});

// `npm run preview` doesn't run Netlify's edge functions, so stamp each page the way it would.
const withEdge = async (page: Page, grid: GridReading) => {
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    const cookies = await page.context().cookies();
    const choice = readChoice(cookies.map(({ name, value }) => `${name}=${value}`).join("; "));
    await route.fulfill({ response, body: stamp(await response.text(), grid, choice) });
  });
};

const requestsTo = (page: Page, part: string) => {
  const urls: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes(part)) urls.push(request.url());
  });
  return urls;
};

// The width descriptor of the AVIF candidate the browser picked for the post's lead image
const pickedWidth = (page: Page) =>
  page
    .locator("article picture")
    .first()
    .evaluate((picture) => {
      const img = picture.querySelector("img")!;
      const avif = picture.querySelector<HTMLSourceElement>('source[type="image/avif"]')!;
      const name = new URL(img.currentSrc).pathname;
      const candidate = avif.srcset.split(", ").find((entry) => entry.startsWith(name));
      return Number(candidate?.split(" ")[1]?.replace("w", ""));
    });

test.describe("Grid-aware modes", () => {
  test("should report the grid from the API", async ({ request }) => {
    const response = await request.get("/api/grid.json");
    expect(response.ok()).toBe(true);
    expect(response.headers()["netlify-cdn-cache-control"]).toContain("durable");
    const body: GridReading = await response.json();
    expect(body.zone).toBe("GB");
    expect(GRID_MODES).toContain(body.mode);
    if (body.intensity === null) expect(body.mode).toBe("balanced");
  });

  test("should show the reading and the mode in the footer tile", async ({ page }) => {
    await withEdge(page, reading("lean", 312));
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-grid-mode", "lean");

    const tile = page
      .getByRole("contentinfo")
      .getByRole("link", { name: /grid carbon intensity/i });
    await expect(tile).toContainText("312 g CO2/kWh");
    await expect(tile).toContainText("Lean mode");

    await tile.click();
    await expect(page).toHaveURL(/\/grid$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This site follows the grid");
    await expect(page.getByText("So the site is running in Lean mode.")).toBeVisible();
  });

  test("should flag a held-back mode at the top of every page", async ({ page }) => {
    const notice = page.getByRole("complementary", { name: "Energy-saving mode" });

    await withEdge(page, reading("full", 80));
    await page.goto("/");
    await expect(notice).toBeHidden();

    await page.unrouteAll();
    await withEdge(page, reading("lean", 312));
    await page.goto("/about");
    await expect(notice).toContainText("This site is in Lean mode to save energy");
    await expect(notice).toContainText("GB grid: 312 g CO2/kWh");

    await notice.getByRole("link", { name: /see why or change it/i }).click();
    await expect(page).toHaveURL(/\/grid$/);

    // A pick on /grid takes effect at once, notice included
    await page.getByRole("radio", { name: /^full/i }).check();
    await expect(notice).toBeHidden();
    await page.getByRole("radio", { name: /^balanced/i }).check();
    await expect(notice).toContainText("This site is in Balanced mode to save energy");
    await expect(notice).toContainText("Your pick");
  });

  test("should skip the web fonts in lean mode only", async ({ page }) => {
    const fonts = requestsTo(page, "/fonts/");
    await withEdge(page, reading("lean", 312));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(fonts).toEqual([]);

    await page.unrouteAll();
    await withEdge(page, reading("full", 80));
    await page.goto("/about", { waitUntil: "networkidle" });
    expect(fonts.length).toBeGreaterThan(0);
  });

  test("should hold images back in lean mode until asked", async ({ page }) => {
    const images = requestsTo(page, POST_IMAGE);
    await withEdge(page, reading("lean", 312));
    await page.goto(POST, { waitUntil: "networkidle" });

    const image = page.getByRole("img", { name: "analog camera with pictures" });
    await expect(image).toBeHidden();
    expect(images).toEqual([]);

    await page.getByRole("button", { name: "Show image: analog camera with pictures" }).click();
    await expect(image).toBeVisible();
    await expect.poll(() => images.length).toBe(1);
  });

  test("should hold the illustration still outside full mode", async ({ page }) => {
    const blades = page.locator(".blades");
    await withEdge(page, reading("balanced", 190));
    await page.goto("/");
    await expect(blades).toHaveCSS("animation-play-state", "paused");

    await page.unrouteAll();
    await withEdge(page, reading("full", 80));
    await page.goto("/");
    await expect(blades).toHaveCSS("animation-play-state", "running");
  });

  test("should remember the mode picked on /grid", async ({ page, context }) => {
    await page.goto("/grid");
    await expect(page.getByRole("radio", { name: /follow the grid/i })).toBeChecked();

    await page.getByRole("radio", { name: /^lean/i }).check();
    await expect(page.locator("html")).toHaveAttribute("data-grid-mode", "lean");
    expect(await context.cookies()).toContainEqual(
      expect.objectContaining({ name: "grid-mode", value: "lean" })
    );

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-grid-mode", "lean");
    await expect(page.getByRole("radio", { name: /^lean/i })).toBeChecked();

    const { mode } = await (await page.request.get("/api/grid.json")).json();
    await page.getByRole("radio", { name: /follow the grid/i }).check();
    await expect(page.locator("html")).toHaveAttribute("data-grid-mode", mode);
    expect((await context.cookies()).map(({ name }) => name)).not.toContain("grid-mode");
  });
});

test.describe("Grid-aware images on a 2x screen", () => {
  test.use({ deviceScaleFactor: 2 });

  test("should load one smaller image outside full mode", async ({ page }) => {
    const images = requestsTo(page, POST_IMAGE);
    await withEdge(page, reading("full", 80));
    await page.goto(POST, { waitUntil: "networkidle" });
    expect(await pickedWidth(page)).toBe(1344);

    images.length = 0;
    await page.unrouteAll();
    await withEdge(page, reading("balanced", 190));
    await page.goto(POST, { waitUntil: "networkidle" });
    expect(await pickedWidth(page)).toBe(720);
    // Hydration keeps the stamped sizes, so the browser never swaps to a second file
    expect(images).toHaveLength(1);
  });
});

test.describe("Grid edge function", () => {
  test("should change image tags only, not text quoting their attributes", () => {
    const html = readFileSync(
      new URL("../build/blog/fetch-priority.html", import.meta.url),
      "utf8"
    );
    const page = stamp(html, reading("lean", 312), null);

    expect(page).toMatch(/^<!doctype html>\s*<html data-grid-mode="lean" data-grid-auto="lean"/);
    expect(page).toContain('<code>fetchpriority="high"</code>');
    expect(page.match(/<img\b[^>]*>/g)?.join("")).not.toContain('fetchpriority="high"');
  });

  test("should apply the visitor's pick over the grid", () => {
    const page = stamp('<html lang="en"><body></body></html>', reading("lean", 312), "full");
    expect(page).toContain('data-grid-mode="full" data-grid-auto="lean"');
  });

  test("should pass anything but HTML pages through", async () => {
    const json = Response.json({ ok: true });
    const next = async () => json;
    expect(await edge(new Request("http://localhost:4173/x.json"), { next })).toBe(json);
    expect(
      await edge(new Request("http://localhost:4173/", { method: "POST" }), { next })
    ).toBeUndefined();
  });
});
