// theme.js
(function() {
	const savedTheme = localStorage.getItem('theme');
	const osPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
	const initialTheme = savedTheme || (osPrefersLight ? 'light' : 'dark');
	if (initialTheme === 'light') {
		document.documentElement.setAttribute('data-theme', 'light');
	}
})();

document.addEventListener('DOMContentLoaded', () => {
	const themeToggle = document.getElementById('theme-toggle');
	const root = document.documentElement;

	if (root.getAttribute('data-theme') === 'light') {
		themeToggle.checked = true;
	}

	themeToggle.addEventListener('change', () => {
		if (themeToggle.checked) {
			root.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		} else {
			root.removeAttribute('data-theme');
			localStorage.setItem('theme', 'dark');
		}
	});

	window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
		if (!localStorage.getItem('theme')) {
			if (e.matches) {
				root.setAttribute('data-theme', 'light');
				themeToggle.checked = true;
			} else {
				root.removeAttribute('data-theme');
				themeToggle.checked = false;
			}
		}
	});
});
