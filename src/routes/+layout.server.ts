import type { LayoutServerLoad } from "./$types";
import type { ThemeState } from "#lib/types.js";

export const prerender = true;

export const load: LayoutServerLoad = async () => {
  return { localTheme: undefined as ThemeState["mode"] | undefined };
};
