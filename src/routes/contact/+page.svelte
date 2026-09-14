<script lang="ts">
  import LinkedIn from "$lib/components/icons/LinkedIn.svelte";
  import ContactForm from "./ContactForm.svelte";
</script>

<svelte:head>
  <title>Contact Antonio Rossi</title>
  <meta
    name="description"
    content="Send Antonio Rossi a message about green software, climate adaptation, open source or anything else you would like to talk about."
  />
  <meta property="og:title" content="Contact Antonio Rossi" />
  <meta
    property="og:description"
    content="Send Antonio Rossi a message about green software, climate adaptation, open source or anything else you would like to talk about."
  />
  <meta property="og:url" content="https://www.antoniorossi.net/contact" />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/antonio-rossi/image/upload/v1633877706/myself.jpg"
  />
</svelte:head>

<h1
  class="font-Cormorant m-0 pt-10 pb-8 text-5xl text-neutral-800 md:pt-0 md:text-6xl dark:text-neutral-100"
>
  Get in touch
</h1>

<div class="font-Roboto max-w-2xl">
  <p class="mb-10 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
    Fill in the form and your message lands straight in my inbox. I read everything and I reply to
    anything that is not a sales pitch. If you would rather talk somewhere else, I am on
    <a
      href="https://www.linkedin.com/in/antoniorossii/"
      target="_blank"
      rel="noopener noreferrer"
      class="font-medium text-teal-600 underline decoration-teal-600/30 underline-offset-4 transition-colors hover:text-teal-500 hover:decoration-teal-500/50 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:text-teal-300 dark:hover:decoration-teal-300/50"
    >
      LinkedIn
    </a>
    too.
  </p>

  <ContactForm />

  <div
    class="mt-12 flex items-center gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800"
  >
    <a
      class="text-neutral-800 dark:text-neutral-100"
      href="https://www.linkedin.com/in/antoniorossii/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn logo"
    >
      <LinkedIn />
    </a>
    <p class="font-Poppins text-sm text-neutral-600 dark:text-neutral-400">
      Messages are checked for spam by Cloudflare Turnstile. No tracking cookies are set.
    </p>
  </div>
</div>
