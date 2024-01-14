<script>
  import Email from "$lib/components/icons/Email.svelte";
  import Instagram from "$lib/components/icons/Instagram.svelte";
  import LinkedIn from "$lib/components/icons/LinkedIn.svelte";
  import Rss from "$lib/components/icons/Rss.svelte";
  import Twitter from "$lib/components/icons/Twitter.svelte";
</script>

<div class="flex flex-col flex-wrap items-center justify-center bg-space-white dark:bg-space-grey">
  <div class="flex">
    <h2
      class="m-0 from-darkFromColor via-darkViaColor1 via-darkViaColor2 to-lightToColor text-center font-Cormorant text-[2.5rem] leading-standard bg-gradient-271 dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor md:text-5xl"
    >
      I'm always up for a chat.
    </h2>
  </div>
  <div
    class="mt-5 text-center font-Poppins text-2xl font-light leading-extraRelaxed text-neutral-800 dark:text-neutral-100 md:text-3xl"
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
        href="https://twitter.com/antoniorossidev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter logo"
      >
        <Twitter />
      </a>
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
        class="mr-4 text-neutral-800 dark:text-neutral-100"
        href="https://www.instagram.com/antoniorossidigital/"
        aria-label="instagram logo"
      >
        <Instagram />
      </a>
      <a
        class="-mt-[1px] mr-4 text-neutral-800 dark:text-neutral-100"
        href="mailto:hello@antoniorossi.net"
        aria-label="mail icon"
      >
        <Email />
      </a>
      <a
        class="-ml-[2px] -mt-[1px] text-neutral-800 dark:text-neutral-100"
        href="https://www.antoniorossi.net/rss.xml"
        aria-label="rss feed icon"
      >
        <Rss />
      </a>
    </div>
  </div>
  <div class="mt-10 text-5xl md:text-4xl">😃</div>
</div>
