<script>
  import Email from "$lib/components/icons/Email.svelte";
  import Instagram from "$lib/components/icons/Instagram.svelte";
  import LinkedIn from "$lib/components/icons/LinkedIn.svelte";
  import Rss from "$lib/components/icons/Rss.svelte";
  import Twitter from "$lib/components/icons/Twitter.svelte";
</script>

<div class="flex flex-col justify-center items-center flex-wrap bg-space-white dark:bg-space-grey">
  <div class="flex">
    <h2
      class="text-center font-Cormorant text-[2.5rem] md:text-5xl bg-gradient-271 from-darkFromColor via-darkViaColor1 via-darkViaColor2 to-lightToColor dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor m-0 leading-standard"
    >
      I'm always up for a chat.
    </h2>
  </div>
  <div
    class="font-Poppins text-2xl md:text-3xl text-center font-light leading-extraRelaxed text-neutral-800 dark:text-neutral-50 mt-5"
  >
    <p>
      Pop me an email at{" "}
      <a
        class="text-[1.7rem] font-extrabold text-neutral-800 dark:text-neutral-50"
        href="mailto:hello@antoniorossi.net">hello@antoniorossi.net</a
      >
    </p>
    {" "}
    <p>or give me a shout on social media</p>
    <div class="flex justify-center mt-5">
      <a
        class="text-neutral-800 dark:text-neutral-50 mr-4"
        href="https://twitter.com/antoniorossidev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter logo"
      >
        <Twitter />
      </a>
      <a
        class="text-neutral-800 dark:text-neutral-50 mr-4"
        href="https://www.linkedin.com/in/antoniorossii/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn logo"
      >
        <LinkedIn />
      </a>
      <a
        class="text-neutral-800 dark:text-neutral-50 mr-4"
        href="https://www.instagram.com/antoniorossidigital/"
        aria-label="instagram logo"
      >
        <Instagram />
      </a>
      <a
        class="text-neutral-800 dark:text-neutral-50 mr-4 -mt-[1px]"
        href="mailto:hello@antoniorossi.net"
        aria-label="mail icon"
      >
        <Email />
      </a>
      <a
        class="text-neutral-800 dark:text-neutral-50 -ml-[2px] -mt-[1px]"
        href="https://www.antoniorossi.net/rss.xml"
        aria-label="rss feed icon"
      >
        <Rss />
      </a>
    </div>
  </div>
  <div class="text-5xl md:text-4xl mt-10">😃</div>
</div>
