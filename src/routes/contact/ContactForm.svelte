<script lang="ts">
  import Turnstile from "./Turnstile.svelte";

  /** Cloudflare's "always passes" site key, for local, preview and CI builds without a real key. */
  const DEV_SITE_KEY = "1x00000000000000000000AA";
  const siteKey = __TURNSTILE_SITE_KEY__ || DEV_SITE_KEY;

  const fieldClass =
    "w-full rounded-xl border border-field bg-transparent px-4 py-3 text-base text-ink transition-[border-color,box-shadow] placeholder:text-muted hover:border-ink focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15 focus-visible:outline-none";
  const labelClass = "mb-2 block text-sm font-medium text-ink";

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

  <div class="md2:flex-row md2:items-center flex flex-col items-start gap-4">
    <button class="btn group" type="submit" disabled={sending}>
      {sending ? "Sending…" : "Send message"}
      <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
    </button>

    <p
      class={["text-sm", failed ? "text-red-700 dark:text-red-400" : "text-ink"]}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {feedback}
    </p>
  </div>
</form>
