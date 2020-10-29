// DOM manipulation for switching color mode theme
export const themeSwitch = themeLight => {
	const root = document.documentElement

	if (!themeLight) {
		if (root.classList.contains('theme-light'))
			root.classList.remove('theme-light')
	}

	if (themeLight) {
		root.classList.add('theme-light')
	}
}
