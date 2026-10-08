import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { defineConfig, loadEnv } from "vite";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig(({ mode }) => {
  const { PUBLIC_TURNSTILE_SITE_KEY } = loadEnv(mode, process.cwd(), "PUBLIC_");

  // Without the key the contact form falls back to Cloudflare's "testing only" widget.
  if (process.env.CONTEXT === "production" && !PUBLIC_TURNSTILE_SITE_KEY) {
    throw new Error(
      "PUBLIC_TURNSTILE_SITE_KEY is missing. Add it to Netlify's environment variables with the Builds scope."
    );
  }

  return {
    plugins: [
      tailwindcss(),
      enhancedImages(),
      sveltekit({
        extensions: [".svelte", ...mdsvexConfig.extensions],
        preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
        adapter: adapter(),
        prerender: { crawl: true, entries: ["*"] }
      })
    ],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __TURNSTILE_SITE_KEY__: JSON.stringify(PUBLIC_TURNSTILE_SITE_KEY ?? "")
    },
    build: {
      modulePreload: false
    }
  };
});
