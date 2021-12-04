<script>
  import Calendar from '$lib/components/icons/Calendar.svelte';
  import Database from '$lib/components/icons/Database.svelte';
  import Desktop from '$lib/components/icons/Desktop.svelte';
  import Location from '$lib/components/icons/Location.svelte';
  import Server from '$lib/components/icons/Server.svelte';
  import User from '$lib/components/icons/User.svelte';

  export let company;
  const { name, from, to, position, techStack, description, location, logo } =
    company;
  const { frontEnd, backEnd, tools } = techStack;
</script>

<div
  class="flex pb-20 border-l-2 border-spaceGray dark:border-white boder-solid"
>
  <div class="flex w-10">
    <div
      class="w-3 h-3 rounded-full bg-spaceGrey dark:bg-white career-step-dot"
    />
  </div>
  <div class="career-step-container w-full">
    <div class="flex mb-2 items-center">
      <div class="flex flex-row">
        <User />
        <p class="text-black dark:text-white ml-1 mr-3">
          <span>{position} </span><span>@ {name}</span>
        </p>
      </div>
      <div class="w-8 h-8 ">
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
    <div class="flex flex-row">
      <Location />
      <p class="ml-1 mb-4 text-black dark:text-white">{`${location}`}</p>
    </div>
    <div class="flex flex-row">
      <Calendar />
      <p class="ml-1 mb-4 text-black dark:text-white">{`${from} - ${to}`}</p>
    </div>
    <div class="flex flex-row justify-between flex-wrap mb-4">
      {#if frontEnd.length}
        <div class="flex-1">
          <div class="flex flex-row">
            <Desktop />
            <p class="icon-text ml-1 text-black dark:text-white">Front End</p>
          </div>
          <ul class="flex">
            {#each frontEnd as tech}
              <li class="mr-3 mt-2 text-black dark:text-white ">{tech}</li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if backEnd.length}
        <div class="flex-1">
          <div class="flex flex-row">
            <Server />
            <p class="backend-icon-text ml-1 text-black dark:text-white">
              Back End
            </p>
          </div>
          <ul class="flex">
            {#each backEnd as tech}
              <li class="mr-3 mt-2 text-black dark:text-white">{tech}</li>
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
          <ul class="flex">
            {#each tools as tech}
              <li class="mr-3 mt-2 text-black dark:text-white">{tech}</li>
            {/each}
          </ul>
        </divc>
      {/if}
    </div>
    <!-- <p class="text-black dark:text-white">{description}</p> -->
  </div>
</div>

<style>
  .backend-icon-text {
    margin-top: 1px;
  }
  .tools-icon-text {
    margin-top: 2px;
  }
  .career-step-container {
    margin-top: -9px;
  }
  .career-step-dot {
    margin-left: -7px;
  }
</style>
