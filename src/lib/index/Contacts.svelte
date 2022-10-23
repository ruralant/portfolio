<script>
  import Email from "$lib/components/icons/Email.svelte";
  import Rss from "$lib/components/icons/Rss.svelte";
</script>

<div
  class="flex flex-col justify-center items-center flex-wrap bg-spaceWhite dark:bg-spaceGrey  pb-10 lg:pb-16"
>
  <div class="flex">
    <h3
      class="text-center font-Cormorant text-[2.5rem] md:text-5xl bg-gradient-271 from-darkFromColor via-darkViaColor1 via-darkViaColor2 to-lightToColor dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor m-0 leading-standard"
    >
      I'm always up for a chat.
    </h3>
  </div>
  <div
    class="font-Poppins text-2xl md:text-3xl text-center font-light leading-extraRelaxed text-neutral-800 dark:text-white mt-10"
  >
    <p>
      Pop me an email at{" "}
      <a
        class="text-[1.7rem] font-extrabold text-neutral-800 dark:text-white"
        href="mailto:hello@antoniorossi.net">hello@antoniorossi.net</a
      >
    </p>
    {" "}
    <p>or give me a shout on social media</p>
    <div class="flex justify-center mt-5">
      <a
        class="text-neutral-800 dark:text-white mr-4"
        href="https://twitter.com/ruralant"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter logo"
      >
        <svg
          class="h-[1.2rem]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -2 33.4 29.5"
          overflow="visible"
        >
          <path
            d="M33.3 3.3c-1.1.5-2.2.8-3.4 1 .5-.1 1.3-1.1 1.7-1.5.5-.6.9-1.3 1.1-2 0-.1.1-.1 0-.2h-.2c-1.3.7-2.6 1.2-4 1.5-.1 0-.2 0-.3-.1-.1-.1-.2-.3-.4-.4-.6-.5-1.2-.9-1.9-1.2-.9-.4-2-.5-3-.5-1 .1-2 .3-2.8.8-.9.5-1.7 1.1-2.3 1.9-.6.8-1.1 1.7-1.4 2.7-.2 1-.2 1.9-.1 2.9 0 .2 0 .2-.1.2-5.5-.8-10.1-2.8-13.8-7-.2-.2-.2-.2-.4 0-1.5 2.5-.7 6.4 1.3 8.3.3.3.5.5.8.7-.1 0-1.5-.1-2.7-.7-.2-.1-.2 0-.3.1v.8c.3 2.5 2 4.7 4.4 5.6l.9.3c-.5.1-1.1.2-2.6.1-.2 0-.3.1-.2.2 1.1 3.1 3.6 4.1 5.5 4.6.2 0 .5 0 .7.1-.6.9-2.7 1.6-3.7 2-1.8.6-3.8.9-5.7.7h-.5c-.1.1 0 .1.1.2.4.3.8.5 1.2.7 1.2.6 2.5 1.2 3.8 1.5 6.8 1.9 14.5.5 19.6-4.6 4-4 5.4-9.5 5.4-15 0-.2.3-.3.4-.4 1-.8 1.9-1.7 2.7-2.8.2-.2.2-.4.2-.5.1-.1.1-.1 0 0z"
            fill="currentcolor"
          />
        </svg>
      </a>
      <a
        class="text-neutral-800 dark:text-white mr-4"
        href="https://www.linkedin.com/in/antoniorossii/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn logo"
      >
        <svg
          class="h-[1.2rem]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30.2 28.9"
          overflow="visible"
        >
          <path
            fill="currentcolor"
            d="M30.2 17.7v10.7c0 .3-.2.5-.5.5h-5.5c-.3 0-.5-.2-.5-.5v-9.9c0-2.6-.9-4.4-3.3-4.4-1.8 0-2.8 1.2-3.3 2.4-.2.4-.2 1-.2 1.6v10.4c0 .3-.2.5-.5.5h-5.5c-.3 0-.5-.2-.5-.5 0-2.6.1-15.5 0-18.5 0-.3.2-.5.5-.5h5.5c.3 0 .5.2.5.5v2.4-.1c.9-1.3 2.4-3.2 5.8-3.2 4.3-.2 7.5 2.6 7.5 8.6zM.9 28.9h5.5c.3 0 .5-.2.5-.5V9.9c0-.3-.2-.5-.5-.5H.9c-.3 0-.5.2-.5.5v18.5c0 .2.2.5.5.5zM6.9 3.5C6.9 5.4 5.3 7 3.4 7S0 5.4 0 3.5 1.6 0 3.5 0s3.4 1.6 3.4 3.5z"
          />
        </svg>
      </a>
      <a
        class="text-neutral-800 dark:text-white mr-4"
        href="mailto:hello@antoniorossi.net"
        aria-label="mail icon"
      >
        <Email />
      </a>
      <a
        class="text-neutral-800 dark:text-white -ml-[2px]"
        href="https://www.antoniorossi.net/rss.xml"
        aria-label="rss feed icon"
      >
        <Rss />
      </a>
    </div>
  </div>
  <div class="text-5xl md:text-4xl mt-10">😃</div>
</div>
