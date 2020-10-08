const { fontFamily: defaultFonts } = require('tailwindcss/defaultTheme')

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	},
	purge: [],
	theme: {
		extend: {
			colors: {
				primary: '#FFFFFF',
				secondary: '#000000',
				alternative: '#B8B8B8',
				action: '#FFBD69',
				background: '#202040',
				border: '#543864',
				focus: '#793A9D',
				progress: '#FF6363'
			},
			fontFamily: {
				...defaultFonts,
				sans:
					'Catamaran, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
			}
		}
	},
	variants: {}
	// plugins: [require("tailwindcss-pseudo-elements")],
}
