/*
  Grid-aware modes, shared by the grid endpoint, the client and the Netlify edge function
  (netlify/edge-functions/grid-mode.ts imports this file directly, so keep it free of imports).
*/

/** How much the site asks of the visitor's device and the network */
export type GridMode = "full" | "balanced" | "lean";

/** What a visitor picked on /grid; `auto` follows the grid */
export type GridChoice = GridMode | "auto";

export const GRID_MODES: readonly GridMode[] = ["full", "balanced", "lean"];

export const MODE_LABELS: Record<GridMode, string> = {
  full: "Full",
  balanced: "Balanced",
  lean: "Lean"
};

/** The free Electricity Maps plan covers a single zone */
export const GRID_ZONE = { code: "GB", name: "Great Britain" } as const;

/** Lifecycle gCO₂eq/kWh: below `full` the site runs in full, below `balanced` in balanced */
export const THRESHOLDS = { full: 150, balanced: 250 } as const;

/** Used whenever the grid can't be read */
export const FALLBACK_MODE: GridMode = "balanced";

export const CHOICE_COOKIE = "grid-mode";

/** What /api/grid.json answers */
export interface GridReading {
  zone: string;
  /** gCO₂eq/kWh, or null when the grid couldn't be read */
  intensity: number | null;
  mode: GridMode;
  /** ISO time the reading refers to */
  datetime: string | null;
}

export const isGridMode = (value: unknown): value is GridMode =>
  typeof value === "string" && (GRID_MODES as readonly string[]).includes(value);

export const modeFor = (intensity: number | null): GridMode => {
  if (intensity === null) return FALLBACK_MODE;
  if (intensity < THRESHOLDS.full) return "full";
  if (intensity < THRESHOLDS.balanced) return "balanced";
  return "lean";
};

/** The mode a visitor picked, read from a Cookie header or `document.cookie` */
export const readChoice = (cookies: string | null | undefined): GridMode | null => {
  const value = cookies?.match(new RegExp(`(?:^|;\\s*)${CHOICE_COOKIE}=([a-z]+)`))?.[1];
  return isGridMode(value) ? value : null;
};

/** The article column (Longform): 42rem wide from `lg`, beside a 12rem column from `md3` */
export const IMAGE_SIZES =
  "(min-width: 1000px) 672px, (min-width: 800px) calc(100vw - 272px), (min-width: 600px) calc(100vw - 64px), calc(100vw - 40px)";

/*
  The same column at half its width on 2x and 3x screens, so they pick a candidate of about
  one image pixel per CSS pixel: a phone downloads the 540w file instead of the 1080w one.
*/
export const IMAGE_SIZES_1X = `(min-resolution: 2dppx) and (min-width: 1000px) 336px, (min-resolution: 2dppx) and (min-width: 800px) calc(50vw - 136px), (min-resolution: 2dppx) and (min-width: 600px) calc(50vw - 32px), (min-resolution: 2dppx) calc(50vw - 20px), ${IMAGE_SIZES}`;
