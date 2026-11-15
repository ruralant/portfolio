import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  TURNSTILE_SECRET_KEY: {
    description: "Cloudflare Turnstile secret, read by the contact endpoint on each request",
    // Missing in production makes the endpoint answer 503; `npm run dev` falls back to the test key.
    schema: (input) => input ?? ""
  },
  ELECTRICITY_MAPS_API_KEY: {
    description: "Electricity Maps API key, read by /api/grid.json on each request",
    // Without it the endpoint reports no reading and the site runs in its fallback mode.
    schema: (input) => input ?? ""
  }
});
