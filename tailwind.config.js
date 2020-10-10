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

	//FIXME: There's a bug with this configuration that makes utilities like
	//'max-w-screen-sm' and 'relative' not work, while 'absolute' works. This is
	//the case with the Toggle component. To reproduce: Set purge.layers to
	//['utilities'] and run the production & serve commands `yarn build && yarn
	//start` then navigate to localhost:3000. This will greet you with a 100%
	//screen width container Layout instead of the `max-w-screen-sm` and a broken
	//`Toggle`.

	//The `layers=['utilities']` purge option produces an output initial load of 296.68 KB while with purging completely disabled like the following produces 297.09 KB. Execuse me? Also check https://nextjs.org/docs/advanced-features/customizing-postcss-config
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
			primary: '#FFFFFF',
			secondary: '#000000',
			alternative: '#B8B8B8',
			action: '#FFBD69',
			background: '#202040',
			border: '#543864',
			focus: '#793A9D',
			progress: '#FF6363'
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
