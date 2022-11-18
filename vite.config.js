import { sveltekit } from "@sveltejs/kit/vite";
import { imagetools } from "vite-imagetools";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [imagetools({ removeMetadata: true, force: true }), sveltekit()],
  build: {
    modulePreload: false
  }
};

export default config;
