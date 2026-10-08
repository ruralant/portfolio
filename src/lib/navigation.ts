import type { Path } from "$app/types";

export interface NavLink {
  text: string;
  url: Path;
}

export const navigation: NavLink[] = [
  { text: "Blog", url: "blog" },
  { text: "Career", url: "career" },
  { text: "About", url: "about" },
  { text: "Now", url: "now" },
  { text: "Colophon", url: "colophon" }
];
