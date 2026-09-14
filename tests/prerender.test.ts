import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test, type APIRequestContext } from "@playwright/test";

const PAGES = ["/", "/about", "/blog", "/blog/tags", "/career", "/colophon", "/contact", "/now"];

// Prerendered HTML uses relative links, so resolve every match against the page it came from.
const pathsLinkedFrom = async (request: APIRequestContext, page: string, pattern: RegExp) => {
  const body = await (await request.get(page)).text();
  const base = new URL(page, "http://localhost");
  const paths = Array.from(body.matchAll(pattern), ([, href]) => new URL(href, base).pathname);
  return [...new Set(paths)];
};

// SvelteKit only sends this header when it renders a page on request.
const expectPrerendered = async (request: APIRequestContext, path: string) => {
  const response = await request.get(path);
  expect(response.ok(), `${path} responded ${response.status()}`).toBe(true);
  expect(response.headers()["x-sveltekit-page"], `${path} was rendered on request`).toBeUndefined();
};

test.describe("Prerendering", () => {
  test("should serve every page as static HTML", async ({ request }) => {
    for (const path of PAGES) await expectPrerendered(request, path);
  });

  test("should serve every published post as static HTML", async ({ request }) => {
    const posts = await pathsLinkedFrom(
      request,
      "/rss.xml",
      /<link>(https:\/\/www\.antoniorossi\.net\/blog\/[^<]+)<\/link>/g
    );
    expect(posts.length).toBeGreaterThan(0);
    for (const path of posts) await expectPrerendered(request, path);
  });

  test("should serve every tag page as static HTML", async ({ request }) => {
    const tags = await pathsLinkedFrom(request, "/blog/tags", /href="([^"]*\/blog\/tags\/[^"]+)"/g);
    expect(tags.length).toBeGreaterThan(0);
    for (const path of tags) await expectPrerendered(request, path);
  });

  // Endpoint responses look the same over HTTP either way, so check what the build wrote.
  test("should write the JSON API as static files", () => {
    const api = fileURLToPath(new URL("../build/api/", import.meta.url));
    expect(existsSync(join(api, "posts.json"))).toBe(true);
    expect(existsSync(join(api, "tags.json"))).toBe(true);
    expect(existsSync(join(api, "tags")) && readdirSync(join(api, "tags")).length > 0).toBe(true);
  });
});
