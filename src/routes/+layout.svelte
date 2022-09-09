<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { theme } from '$lib/shared/store';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { browser } from '$app/environment';
	import lazyload from 'vanilla-lazyload';
	import '../tailwind.css';
	export let data;

	if (browser && !document.lazyloadInstance) {
		document.lazyloadInstance = new lazyload();
	}

	onMount(() => {
		if (!('theme' in localStorage)) {
			theme.useLocalStorage();
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				data.localTheme = 'dark';
				theme.set({ ...$theme, mode: 'dark' });
			} else {
				data.localTheme = 'light';
				theme.set({ ...$theme, mode: 'light' });
			}
		} else {
			theme.useLocalStorage();
		}
	});
</script>

<svelte:head>
	<script>
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		} else {
			let data = localStorage.getItem('theme');
			if (data) {
				data = JSON.parse(data);
				document.documentElement.classList.add(data.mode);
			}
		}
	</script>
</svelte:head>

<div id="core" class={data.localTheme}>
	<Header />

	<main
		in:fade={{ duration: 150, delay: 100 }}
		out:fade={{ duration: 150 }}
		class="min-h-[calc(100vh-210px)] flex flex-col items-center bg-spaceWhite dark:bg-spaceGrey  px-4 md:px-22 lg:px-36"
	>
		<div>
			<slot />
		</div>
	</main>
</div>

<Footer />
