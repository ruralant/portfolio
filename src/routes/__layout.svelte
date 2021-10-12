<script>
	import Header from '$lib/header.svelte';
	import '../tailwind.css';
</script>

<Header />

<main class="bg-blue-400">
	<slot />
</main>

<footer>Copyright 2021</footer>
