<script>
	import { theme } from '$lib/shared/store';
	import { toggleTheme } from '$lib/shared/theme';
	import { Sun, Moon } from '$lib/components/icons/index.js';
</script>

<header class="flex flex-row justify-between mx-8">
	<div class="flex">
		<p class="mr-8">Logo</p>
		<nav class="flex flex-row">
			<div class="flex space-x-4">
				<a href="/">Home</a>
				<a href="/about">About</a>
			</div>
		</nav>
	</div>
	<div class="flex-0">
		<a
			href="/app/theme"
			class="block"
			aria-label="Toggle Light and Dark mode"
			on:click|preventDefault={() => {
				toggleTheme(theme, $theme);
			}}
		>
			<div class="hidden dark:block">
				<Sun />
			</div>
			<div class="dark:hidden">
				<Moon />
			</div>
		</a>
	</div>
</header>
