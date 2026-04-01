import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [tailwindcss(), enhancedImages(), sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  build: {
    modulePreload: false
  }
};

export default config;
