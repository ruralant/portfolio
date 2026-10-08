import type { Pathname } from "$lib/types";

export interface NavLink {
  text: string;
  url: Pathname;
}

export const navigation: NavLink[] = [
  { text: "Blog", url: "/blog" },
  { text: "Career", url: "/career" },
  { text: "About", url: "/about" },
  { text: "Now", url: "/now" },
  { text: "Colophon", url: "/colophon" }
];
