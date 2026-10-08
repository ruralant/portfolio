import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  TURNSTILE_SECRET_KEY: {
    description: "Cloudflare Turnstile secret, read by the contact endpoint on each request",
    // Missing in production makes the endpoint answer 503; `npm run dev` falls back to the test key.
    schema: (input) => input ?? ""
  }
});
