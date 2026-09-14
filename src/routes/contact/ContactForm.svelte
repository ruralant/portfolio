<script lang="ts">
  import { env } from "$env/dynamic/public";
  import Turnstile from "./Turnstile.svelte";

  /** Cloudflare's "always passes" site key, so `npm run dev` works with no setup. */
  const DEV_SITE_KEY = "1x00000000000000000000AA";
  const siteKey = env.PUBLIC_TURNSTILE_SITE_KEY || DEV_SITE_KEY;

  const fieldClass =
    "font-Poppins w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-800 shadow-xs transition-colors outline-none placeholder:text-neutral-400 focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus-visible:border-teal-400 dark:focus-visible:ring-teal-400/40";
  const labelClass =
    "font-Poppins mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

  let name = $state("");
  let email = $state("");
  let subject = $state("");
  let message = $state("");
  let botField = $state("");
  let token = $state("");
  let sending = $state(false);
  let failed = $state(false);
  let feedback = $state("");
  let turnstile: ReturnType<typeof Turnstile> | undefined = $state();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (sending) return;

    if (!token) {
      failed = true;
      feedback = "Please complete the anti-spam check before sending.";
      return;
    }

    sending = true;
    failed = false;
    feedback = "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, botField, token })
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        failed = true;
        feedback = result.message ?? "Your message could not be sent. Please try again.";
        return;
      }

      feedback = result.message ?? "Thanks, your message is on its way.";
      name = "";
      email = "";
      subject = "";
      message = "";
    } catch {
      failed = true;
      feedback = "Your message could not be sent. Please check your connection and try again.";
    } finally {
      sending = false;
      // Cloudflare burns the token on verification, so the widget needs a fresh
      // challenge before a second message can be sent.
      turnstile?.reset();
    }
  };
</script>

<form class="relative flex max-w-2xl flex-col gap-6" onsubmit={handleSubmit}>
  <div class="absolute -left-[9999px]" aria-hidden="true">
    <label for="contact-bot-field">Leave this field empty</label>
    <input
      id="contact-bot-field"
      type="text"
      bind:value={botField}
      tabindex="-1"
      autocomplete="off"
    />
  </div>

  <div class="md2:flex-row flex flex-col gap-6">
    <div class="flex-1">
      <label class={labelClass} for="contact-name">Your name</label>
      <input
        id="contact-name"
        class={fieldClass}
        type="text"
        bind:value={name}
        required
        maxlength="100"
        autocomplete="name"
      />
    </div>
    <div class="flex-1">
      <label class={labelClass} for="contact-email">Your email</label>
      <input
        id="contact-email"
        class={fieldClass}
        type="email"
        bind:value={email}
        required
        maxlength="254"
        autocomplete="email"
      />
    </div>
  </div>

  <div>
    <label class={labelClass} for="contact-subject">Subject</label>
    <input
      id="contact-subject"
      class={fieldClass}
      type="text"
      bind:value={subject}
      required
      maxlength="150"
    />
  </div>

  <div>
    <label class={labelClass} for="contact-message">Message</label>
    <textarea
      id="contact-message"
      class="{fieldClass} min-h-40 resize-y"
      bind:value={message}
      required
      maxlength="5000"></textarea>
  </div>

  <Turnstile bind:this={turnstile} {siteKey} onToken={(value) => (token = value)} />

  <div class="md2:flex-row md2:items-center flex flex-col gap-4">
    <button
      class="font-Poppins inline-flex cursor-pointer items-center justify-center rounded-md bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-xs transition-colors hover:bg-teal-500 focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:text-neutral-900 dark:hover:bg-teal-400"
      type="submit"
      disabled={sending}
    >
      {sending ? "Sending…" : "Send message"}
    </button>

    <p
      class="font-Poppins text-sm {failed
        ? 'text-red-600 dark:text-red-400'
        : 'text-teal-700 dark:text-teal-300'}"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {feedback}
    </p>
  </div>
</form>
