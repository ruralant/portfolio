/*
  Marks every page with the grid-aware mode before it leaves Netlify, so the first paint
  already skips what the mode leaves out (web fonts, images, motion). The pages stay
  prerendered: this only adds attributes to <html> and to a post's images.
*/
import {
  FALLBACK_MODE,
  GRID_ZONE,
  IMAGE_SIZES,
  IMAGE_SIZES_1X,
  isGridMode,
  readChoice,
  type GridMode,
  type GridReading
} from "../../src/lib/grid/modes.ts";

interface Context {
  next: () => Promise<Response>;
}

/** Each edge isolate reuses a reading for 5 minutes; /api/grid.json is cached for 15 */
const TTL = 5 * 60 * 1000;
const FAILED_TTL = 60 * 1000;

let cached: { reading: GridReading; expires: number } | undefined;

const unavailable: GridReading = {
  zone: GRID_ZONE.code,
  intensity: null,
  mode: FALLBACK_MODE,
  datetime: null
};

async function readGrid(origin: string): Promise<GridReading> {
  if (cached && cached.expires > Date.now()) return cached.reading;

  let reading = unavailable;
  let ttl = FAILED_TTL;
  try {
    const response = await fetch(new URL("/api/grid.json", origin), {
      signal: AbortSignal.timeout(1500)
    });
    if (!response.ok) throw new Error(`/api/grid.json answered ${response.status}`);
    const body: Partial<GridReading> = await response.json();
    if (isGridMode(body.mode)) {
      reading = {
        zone: typeof body.zone === "string" ? body.zone : GRID_ZONE.code,
        intensity: typeof body.intensity === "number" ? body.intensity : null,
        mode: body.mode,
        datetime: typeof body.datetime === "string" ? body.datetime : null
      };
      ttl = TTL;
    }
  } catch (error) {
    console.error("Could not read the grid", error);
  }

  cached = { reading, expires: Date.now() + ttl };
  return reading;
}

const escapeAttribute = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/**
 * Stamps the reading and the mode on <html>, and changes the image attributes the mode
 * depends on. `Image.svelte` derives the same attributes from the stamped mode, so
 * hydration leaves them as they are.
 */
export function stamp(html: string, reading: GridReading, choice: GridMode | null): string {
  const mode = choice ?? reading.mode;
  const attributes = Object.entries({
    "data-grid-mode": mode,
    "data-grid-auto": reading.mode,
    "data-grid-zone": reading.zone,
    "data-grid-intensity": reading.intensity?.toString(),
    "data-grid-time": reading.datetime
  })
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(([name, value]) => `${name}="${escapeAttribute(value)}"`)
    .join(" ");

  let page = html.replace(/<html\b/, `<html ${attributes}`);
  if (mode === "full") return page;

  // Only inside image tags: a post about fetchpriority quotes the attribute in its text
  page = page.replace(/<(?:img|source)\b[^>]*>/g, (tag) => {
    let next = tag.replace(`sizes="${IMAGE_SIZES}"`, `sizes="${IMAGE_SIZES_1X}"`);
    // Hidden images load only when they are lazy, and the lead image of a post is not
    if (mode === "lean") next = next.replace(' fetchpriority="high"', ' loading="lazy"');
    return next;
  });
  return page;
}

export default async (request: Request, context: Context) => {
  if (request.method !== "GET") return;

  const response = await context.next();
  if (!response.headers.get("content-type")?.includes("text/html")) return response;

  const [html, reading] = await Promise.all([response.text(), readGrid(request.url)]);
  const headers = new Headers(response.headers);
  // The page now depends on the grid and the visitor's cookie, so it can't be revalidated
  headers.delete("content-length");
  headers.delete("etag");
  headers.set("cache-control", "public, max-age=0, must-revalidate");

  return new Response(stamp(html, reading, readChoice(request.headers.get("cookie"))), {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = {
  path: "/*",
  excludedPath: [
    "/_app/*",
    "/api/*",
    "/admin/*",
    "/fonts/*",
    "/__forms.html",
    "/*.json",
    "/*.xml",
    "/*.txt",
    "/*.svg",
    "/*.png",
    "/*.ico",
    "/*.webmanifest"
  ],
  // If this function fails, serve the page as it was built
  onError: "bypass"
};
