import type { LayoutLoad } from "./$types";
import type { ThemeState } from "$lib/types";

export const load: LayoutLoad = async () => {
  return { localTheme: undefined as ThemeState["mode"] | undefined };
};
