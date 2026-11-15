import { browser } from "$app/env";
import {
  CHOICE_COOKIE,
  isGridMode,
  readChoice,
  type GridChoice,
  type GridMode,
  type GridReading
} from "./modes.js";

interface GridState {
  /** The mode the page runs in: the visitor's choice, or the grid's */
  mode: GridMode | null;
  /** The mode the grid alone calls for */
  auto: GridMode | null;
  intensity: number | null;
  datetime: string | null;
  choice: GridChoice;
}

/*
  The edge function stamps the reading on <html> before the page leaves Netlify, so it is
  there before this module loads. Prerendering knows nothing, so the server starts empty.
*/
const fromDocument = (): GridState => {
  const data = document.documentElement.dataset;
  const intensity = Number.parseInt(data.gridIntensity ?? "", 10);
  return {
    mode: isGridMode(data.gridMode) ? data.gridMode : null,
    auto: isGridMode(data.gridAuto) ? data.gridAuto : null,
    intensity: Number.isFinite(intensity) ? intensity : null,
    datetime: data.gridTime || null,
    choice: readChoice(document.cookie) ?? "auto"
  };
};

export const grid: GridState = $state(
  browser
    ? fromDocument()
    : { mode: null, auto: null, intensity: null, datetime: null, choice: "auto" }
);

const apply = () => {
  const mode = grid.choice === "auto" ? grid.auto : grid.choice;
  grid.mode = mode;
  if (mode) document.documentElement.dataset.gridMode = mode;
  else delete document.documentElement.dataset.gridMode;
};

/** Without the edge function (dev, preview, or if it failed), ask the endpoint instead */
export async function syncGrid() {
  if (grid.auto) return;
  try {
    const response = await fetch("/api/grid.json");
    const reading: GridReading = await response.json();
    grid.auto = isGridMode(reading.mode) ? reading.mode : null;
    grid.intensity = reading.intensity;
    grid.datetime = reading.datetime;
    apply();
  } catch {
    // The page keeps whatever mode it has
  }
}

/** Saves the visitor's pick for a year, or forgets it for `auto`, and applies it at once */
export function chooseMode(choice: GridChoice) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    choice === "auto"
      ? `${CHOICE_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`
      : `${CHOICE_COOKIE}=${choice}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
  grid.choice = choice;
  apply();
}
