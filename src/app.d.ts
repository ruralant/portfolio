import type { Component } from "svelte";
import type { Picture } from "vite-imagetools";
import type { PostMetadata } from "$lib/types";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  declare module "*.md" {
    export const metadata: PostMetadata;
    const component: Component;
    export default component;
  }

  // `@sveltejs/enhanced-img` only ships an ambient declaration for the bare
  // `*?enhanced` specifier, which TypeScript cannot match once sizing/quality
  // directives are appended to the query. Cover those imports here.
  declare module "$lib/assets/images/*" {
    const value: Picture;
    export default value;
  }
}

export {};
