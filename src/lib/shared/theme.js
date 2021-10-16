export function toggleTheme(theme, $theme) {
	if ($theme.mode === 'light') {
		theme.set({ ...$theme, mode: 'dark' });
		updateDocument('theme', 'dark', 'light');
	} else {
		theme.set({ ...$theme, mode: 'light' });
		updateDocument('theme', 'light', 'dark');
	}
}

function updateDocument(name, mode, other) {
	document.getElementById('core').classList.remove(other);
	document.documentElement.classList.remove(other);
	document.getElementById('core').classList.add(mode);
	document.documentElement.classList.add(mode);
}
