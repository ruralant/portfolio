<script>
  import Calendar from '../components/icons/Calendar.svelte';
  import Database from '$lib/components/icons/Database.svelte';
  import Desktop from '../components/icons/Desktop.svelte';
  import Location from '$lib/components/icons/Location.svelte';
  import Server from '$lib/components/icons/Server.svelte';
  import User from '$lib/components/icons/User.svelte';

  export let company;
  export let index;
  const even = index % 2 == 0;
  const {
    name,
    from,
    to,
    position,
    techStack,
    description,
    location,
    logo,
    image,
  } = company;
  const { frontEnd, backEnd, tools } = techStack;
</script>

<div
  class="flex w-4/5 justify-between items-center subtitle m-auto mb-24 p-8 rounded-md overflow-hidden shadow-md bg-white dark:bg-neutral-900 {even
    ? ''
    : 'flex-row-reverse'}"
>
  <div>
    <div>
      <div class="flex items-center">
        <span class="title-text text-black dark:text-white">{name}</span>
        <div class="w-11 h-11 ml-4">
          <img
            src={logo}
            alt=""
            class="w-full rounded-full"
            height={20}
            width={20}
            placeholder="blur"
          />
        </div>
      </div>
      <p class="text-black dark:text-white transition duration-300 ease-in-out">
        {position}, {location}
      </p>
      <p
        class="text-black dark:text-white transition duration-300 ease-in-out text-xl mb-6"
      >
        {from} - {to}
      </p>
    </div>
    <div class="flex flex-col text-base">
      {#if frontEnd.length}
        <div class="flex-1 mb-4">
          <div class="flex flex-row">
            <Desktop />
            <p class="icon-text ml-1 text-black dark:text-white">Front End</p>
          </div>
          <ul class="flex flex-wrap">
            {#each frontEnd as tech}
              <li class="ml-1 mr-3 mt-2 text-black dark:text-white">
                <div
                  class="bg-slate-200 dark:bg-slate-700 rounded-lg py-0.5 px-2"
                >
                  {tech}
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if backEnd.length}
        <div class="flex-1 mb-4">
          <div class="flex flex-row">
            <Server />
            <p class="backend-icon-text ml-1 text-black dark:text-white">
              Back End
            </p>
          </div>
          <ul class="flex flex-wrap">
            {#each backEnd as tech}
              <li class="mr-3 mt-2 text-black dark:text-white">
                <div
                  class="bg-slate-200 dark:bg-slate-700 rounded-lg py-0.5 px-2"
                >
                  {tech}
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if tools.length}
        <divc class="flex-1">
          <div class="flex flex-row items-center">
            <Database />
            <p class="tools-icon-text ml-1 text-black dark:text-white">
              Other Tools
            </p>
          </div>
          <ul class="flex flex-wrap">
            {#each tools as tech}
              <li class="mr-3 mt-2 text-black dark:text-white">
                <div
                  class="bg-slate-200 dark:bg-slate-700 rounded-lg py-0.5 px-2"
                >
                  {tech}
                </div>
              </li>
            {/each}
          </ul>
        </divc>
      {/if}
    </div>
  </div>
  <div>
    <img
      class="align-middle rounded-lg shadow-sm"
      src={image}
      alt="myself speaking in public"
      width={450}
      height={450}
      placeholder="blur"
    />
  </div>
</div>

<!-- <div class="w-1/3 h-0.5 m-auto bg-spaceGrey dark:bg-white mb-20" /> -->
<style>
  .title-text {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    /* font-family: 'Cormorant Garamond', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif; */
    /* background: linear-gradient(
      271deg,
      #8797e8 30%,
      #a162e8 50%,
      #f093b0 70%,
      #dab56c 94%
    ); */
    /* -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    font-weight: 500;
    margin: 0;
    line-height: 1.15;
    font-size: 3rem;
    /* padding-left: 10%; */
  }
  .subtitle {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-weight: 500;
    margin-top: 10px;
    line-height: 1.7;
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out;
  }
</style>
