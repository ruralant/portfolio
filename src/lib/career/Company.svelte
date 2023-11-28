<script>
  import Database from "$lib/components/icons/Database.svelte";
  import Desktop from "../components/icons/Desktop.svelte";
  import Server from "$lib/components/icons/Server.svelte";

  export let company;
  export let index;
  const even = index % 2 == 0;
  const { name, from, to, position, techStack, location, logo, image } = company;
  const { frontEnd, backEnd, tools } = techStack;
</script>

<div
  class="subtitle m-auto mb-24 flex w-4/5 items-center justify-between overflow-hidden rounded-md bg-white p-8 font-Poppins shadow-md dark:bg-neutral-900 {even
    ? ''
    : 'flex-row-reverse'}"
>
  <div>
    <div>
      <div class="flex items-center">
        <span class="title-text font-Poppins text-neutral-800 dark:text-neutral-100">{name}</span>
        <div class="ml-4 h-11 w-11">
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
      <p class="text-neutral-800 dark:text-neutral-100">
        {position}, {location}
      </p>
      <p class="mb-6 text-xl text-neutral-800 dark:text-neutral-100">
        {from} - {to}
      </p>
    </div>
    <div class="flex flex-col text-base">
      {#if frontEnd.length}
        <div class="mb-4 flex-1">
          <div class="flex flex-row">
            <Desktop />
            <p class="icon-text ml-1 text-neutral-800 dark:text-neutral-100">Front End</p>
          </div>
          <ul class="flex flex-wrap">
            {#each frontEnd as tech}
              <li class="ml-1 mr-3 mt-2 text-neutral-800 dark:text-neutral-100">
                <div class="rounded-lg bg-slate-200 px-2 py-0.5 dark:bg-slate-700">
                  {tech}
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if backEnd.length}
        <div class="mb-4 flex-1">
          <div class="flex flex-row">
            <Server />
            <p class="backend-icon-text ml-1 text-neutral-800 dark:text-neutral-100">Back End</p>
          </div>
          <ul class="flex flex-wrap">
            {#each backEnd as tech}
              <li class="mr-3 mt-2 text-neutral-800 dark:text-neutral-100">
                <div class="rounded-lg bg-slate-200 px-2 py-0.5 dark:bg-slate-700">
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
            <p class="tools-icon-text ml-1 text-neutral-800 dark:text-neutral-100">Other Tools</p>
          </div>
          <ul class="flex flex-wrap">
            {#each tools as tech}
              <li class="mr-3 mt-2 text-neutral-800 dark:text-neutral-100">
                <div class="rounded-lg bg-slate-200 px-2 py-0.5 dark:bg-slate-700">
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
      class="rounded-lg align-middle shadow-sm"
      src={image}
      alt={`${name} logo`}
      width={450}
      height={450}
      placeholder="blur"
    />
  </div>
</div>
