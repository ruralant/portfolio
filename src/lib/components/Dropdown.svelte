<script>
  import ClickOutside from 'svelte-click-outside';
  import { fly } from 'svelte/transition';
  import ChevronDown from './icons/ChevronDown.svelte';

  export let menuVisible = false;
  export let title;
  export let items;
  let modalButtonRef;

  function toggleDropDown() {
    menuVisible = !menuVisible;
  }
  function closeModal() {
    menuVisible = false;
  }
</script>

<div class="relative inline-block text-left">
  <div>
    <button
      bind:this={modalButtonRef}
      type="button"
      class="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium "
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      on:click={toggleDropDown}
    >
      {title}
      <ChevronDown />
    </button>
  </div>
  {#if menuVisible}
    <ClickOutside on:clickoutside={closeModal} exclude={[modalButtonRef]}>
      <div
        transition:fly={{ y: -20, duration: 200 }}
        class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          {#each items as item}
            <a
              on:click={toggleDropDown}
              href={item.url}
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2">{item.title}</a
            >
          {/each}
        </div>
      </div>
    </ClickOutside>
  {/if}
</div>
