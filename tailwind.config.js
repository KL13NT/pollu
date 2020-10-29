const defaultTheme = require('tailwindcss/defaultTheme')
const {
	fontFamily: defaultFonts,
	colors,
	maxWidth
} = require('tailwindcss/defaultTheme')

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: false
	},

	//FIXME: see issue#5 https://github.com/KL13NT/pollu/issues/5
	purge: {
		enabled: false,
		mode: 'layers',
		layers: [],
		content: [
			'./components/**/*.{js,ts,jsx,tsx}',
			'./pages/**/*.{js,ts,jsx,tsx}'
		],
		options: {}
	},

	theme: {
		colors: {
			transparent: 'transparent',
			primary: 'var(--color-primary)',
			secondary: 'var(--color-secondary)',
			alternative: 'var(--color-alternative)',
			action: 'var(--color-action)',
			background: 'var(--color-background)',
			border: 'var(--color-border)',
			focus: 'var(--color-focus)',
			progress: 'var(--color-progress)',
			white: 'var(--color-white)'
		},
		extend: {
			spacing: {
				7: '1.75rem',
				10: '2.5rem',
				12: '3rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				28: '7rem',
				32: '8rem',
				80: '20rem',
				128: '32rem',
				'(screen-16)': 'calc(100vh - 4rem)'
			},
			maxWidth: {
				'screen-sm': '576px',
				'screen-md': '768px',
				'screen-lg': '992px',
				'screen-xl': '1280px'
			},
			fontFamily: {
				...defaultFonts,
				sans:
					'Catamaran, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
			}
		}
	}
}
