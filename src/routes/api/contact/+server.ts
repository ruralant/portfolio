import { json } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

export const prerender = false;

const FORM_NAME = "contact";
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
/** Cloudflare's "always passes" secret, so `npm run dev` works with no setup. */
const DEV_SECRET_KEY = "1x0000000000000000000000000000000AA";

const MAX_LENGTHS = { name: 100, email: 254, subject: 150, message: 5000 } as const;

type Field = keyof typeof MAX_LENGTHS;

interface ContactPayload {
  name: unknown;
  email: unknown;
  subject: unknown;
  message: unknown;
  botField: unknown;
  token: unknown;
}

interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

const readField = (value: unknown, field: Field) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_LENGTHS[field]) return null;
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return null;
  return trimmed;
};

const fail = (message: string, status: number) => json({ message }, { status });

export const POST: RequestHandler = async ({ request, url, fetch, getClientAddress }) => {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return fail("That message could not be read. Please try again.", 400);
  }

  // A filled honeypot means a bot walked the form: accept and drop it silently.
  if (typeof payload.botField === "string" && payload.botField.trim()) {
    return json({ message: "Thanks, your message is on its way." });
  }

  const name = readField(payload.name, "name");
  const email = readField(payload.email, "email");
  const subject = readField(payload.subject, "subject");
  const message = readField(payload.message, "message");

  if (!name || !email || !subject || !message) {
    return fail("Please check the form: some details are missing or too long.", 400);
  }

  if (typeof payload.token !== "string" || !payload.token) {
    return fail("Please complete the anti-spam check and try again.", 400);
  }

  const secret = env.TURNSTILE_SECRET_KEY || (dev ? DEV_SECRET_KEY : "");

  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set, refusing the submission.");
    return fail("The contact form is temporarily unavailable. Please try again later.", 503);
  }

  let verification: SiteverifyResponse;

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: payload.token,
        remoteip: getClientAddress()
      })
    });
    verification = await response.json();
  } catch (cause) {
    console.error("Turnstile siteverify request failed", cause);
    return fail("The anti-spam check could not be reached. Please try again later.", 502);
  }

  if (!verification.success) {
    return fail("The anti-spam check failed. Please try again.", 403);
  }

  // Netlify collects submissions by intercepting form-encoded POSTs to any page
  // it serves, so hand the verified message to the form registered by
  // static/__forms.html. There is no such interceptor in front of `vite dev`.
  if (dev) {
    console.info(`[dev] contact submission from ${name} <${email}>: ${subject}`);
    return json({ message: "Thanks, your message is on its way." });
  }

  try {
    const response = await fetch(new URL("/__forms.html", url.origin), {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": FORM_NAME, name, email, subject, message })
    });

    if (!response.ok) {
      console.error(`Netlify form submission returned ${response.status}`);
      return fail("Your message could not be delivered. Please try again later.", 502);
    }
  } catch (cause) {
    console.error("Netlify form submission failed", cause);
    return fail("Your message could not be delivered. Please try again later.", 502);
  }

  return json({ message: "Thanks, your message is on its way." });
};
