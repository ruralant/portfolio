import { ELECTRICITY_MAPS_API_KEY } from "$app/env/private";
import { GRID_ZONE, modeFor, type GridReading } from "#lib/grid/modes.js";
import type { RequestHandler } from "./$types";

// Read on request by the edge function and, without it (dev, preview), by the browser.
export const prerender = false;

const API_URL = "https://api.electricitymaps.com/v3/carbon-intensity/latest";

interface LatestCarbonIntensity {
  carbonIntensity?: unknown;
  datetime?: unknown;
}

/*
  Netlify's CDN keeps one copy for every visitor and edge node (`durable`), so Electricity Maps
  is asked at most every 15 minutes, and a stale reading is served while a fresh one loads.
  A failed reading is kept for a minute only.
*/
const reply = (reading: GridReading, seconds: number) =>
  Response.json(reading, {
    headers: {
      "cache-control": `public, max-age=${Math.min(seconds, 300)}`,
      "netlify-cdn-cache-control": `public, durable, s-maxage=${seconds}, stale-while-revalidate=3600`
    }
  });

const unavailable = (): GridReading => ({
  zone: GRID_ZONE.code,
  intensity: null,
  mode: modeFor(null),
  datetime: null
});

export const GET: RequestHandler = async ({ fetch }) => {
  if (!ELECTRICITY_MAPS_API_KEY) return reply(unavailable(), 60);

  try {
    const response = await fetch(`${API_URL}?zone=${GRID_ZONE.code}`, {
      headers: { "auth-token": ELECTRICITY_MAPS_API_KEY },
      signal: AbortSignal.timeout(4000)
    });
    if (!response.ok) throw new Error(`Electricity Maps answered ${response.status}`);

    const body: LatestCarbonIntensity = await response.json();
    if (typeof body.carbonIntensity !== "number" || !Number.isFinite(body.carbonIntensity)) {
      throw new Error("Electricity Maps sent no carbon intensity");
    }

    const intensity = Math.round(body.carbonIntensity);
    return reply(
      {
        zone: GRID_ZONE.code,
        intensity,
        mode: modeFor(intensity),
        datetime: typeof body.datetime === "string" ? body.datetime : null
      },
      900
    );
  } catch (error) {
    console.error("Could not read the grid's carbon intensity", error);
    return reply(unavailable(), 60);
  }
};
