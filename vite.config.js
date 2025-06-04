import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sentrySvelteKit } from "@sentry/sveltekit";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "ar-x2",
        project: "ar-x2",
        // store your auth token in an environment variable
        authToken: process.env.SENTRY_AUTH_TOKEN
      }
    }),
    ,
    enhancedImages(),
    sveltekit()
  ],
  build: {
    modulePreload: false
  }
};

export default config;
