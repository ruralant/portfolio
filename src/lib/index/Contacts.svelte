<script>
  import Email from "$lib/components/icons/Email.svelte";
  import Instagram from "$lib/components/icons/Instagram.svelte";
  import LinkedIn from "$lib/components/icons/LinkedIn.svelte";
  import Rss from "$lib/components/icons/Rss.svelte";
</script>

<div class="bg-space-white dark:bg-space-grey flex flex-col flex-wrap items-center justify-center">
  <div class="flex">
    <h2
      class="font-Cormorant via-hero-color-2 via-hero-color-5 from-hero-color-1 to-hero-color-6 dark:from-hero-color-1 dark:via-hero-color-2 dark:via-hero-color-3 dark:to-hero-color-4 m-0 bg-gradient-to-l from-30% via-50% via-70% to-94% bg-clip-text text-center text-[2.5rem] leading-[1.15] text-transparent md:text-5xl dark:from-30% dark:via-50% dark:via-70% dark:to-94%"
    >
      I'm always up for a chat.
    </h2>
  </div>
  <div
    class="font-Poppins mt-5 text-center text-2xl leading-[1.7] font-light text-neutral-800 md:text-3xl dark:text-neutral-100"
  >
    <p>
      Pop me an email at{" "}
      <a
        class="text-[1.7rem] font-extrabold text-neutral-800 dark:text-neutral-100"
        href="mailto:hello@antoniorossi.net">hello@antoniorossi.net</a
      >
    </p>
    {" "}
    <p>or give me a shout on social media</p>
    <div class="mt-5 flex justify-center">
      <a
        class="mr-4 text-neutral-800 dark:text-neutral-100"
        href="https://www.linkedin.com/in/antoniorossii/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn logo"
      >
        <LinkedIn />
      </a>
      <a
        class="-mt-[1px] mr-4 text-neutral-800 dark:text-neutral-100"
        href="mailto:hello@antoniorossi.net"
        aria-label="mail icon"
      >
        <Email />
      </a>
      <a
        class="-mt-[1px] -ml-[2px] text-neutral-800 dark:text-neutral-100"
        href="https://www.antoniorossi.net/rss.xml"
        aria-label="rss feed icon"
      >
        <Rss />
      </a>
    </div>
  </div>
  <div class="mt-10 text-5xl md:text-4xl">😃</div>
</div>
