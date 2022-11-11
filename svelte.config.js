import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter(),
    prerender: {
      crawl: true,
      enabled: true,
      handleHttpError: "warn",
      entries: ["*"]
    }
  }
};

export default config;
