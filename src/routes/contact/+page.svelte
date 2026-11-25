<script lang="ts">
  import { resolve } from "$app/paths";
  import PageHeader from "#lib/components/PageHeader.svelte";
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
  <meta property="og:image" content="https://www.antoniorossi.net/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="The monogram AR beside the name Antonio Rossi and the line: software engineer writing about green software and climate adaptation"
  />
</svelte:head>

<PageHeader eyebrow="Contact" title="Get in touch">
  Fill in the form and your message lands straight in my inbox. I read everything and I reply to
  anything that is not a sales pitch. If you would rather talk somewhere else, I am on
  <a
    href="https://www.linkedin.com/in/antoniorossii/"
    target="_blank"
    rel="noopener noreferrer"
    class="link text-ink">LinkedIn<span class="sr-only"> (opens in a new tab)</span></a
  >
  too.
</PageHeader>

<div class="border-line max-w-2xl border-t pt-10">
  <ContactForm />
  <p class="text-muted mt-8 text-sm leading-relaxed">
    Your message is stored by Netlify, which hosts this site, and used only so I can reply.
    <a href={resolve("terms")} class="link text-ink">How messages are handled</a>.
  </p>
</div>
