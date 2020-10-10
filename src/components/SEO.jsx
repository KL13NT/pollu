import React from 'react'
import Head from 'next/head'

const defaults = {
	sitename: 'Pollu',
	title: 'Pollu - Delightful polls a click away!',
	description:
		'Pollu is an anonymous straw polls platform built by Nabil Tharwat with a focus on accessibility and privacy.'
}

const Images = ({ image }) => {
	const ogImageUrl = `${hostname}/${image}`

	return (
		<>
			<meta content={ogImageUrl} property='og:image' />
			<meta content={ogImageUrl} property='og:image:url' />
			<meta content={ogImageUrl} property='og:image:secure_url' />
			<meta content={ogImageUrl} property='twitter:image' />
		</>
	)
}

function SEO({ title, description = defaults.description, image }) {
	const finalTitle = title ? `${title} | Pollu` : defaults.title

	return (
		<Head>
			<title>{finalTitle}</title>
			<meta content={finalTitle} property='og:title' />
			<meta content={finalTitle} property='twitter:title' />
			<meta content={description} name='description' />
			<meta content={description} property='og:description' />
			<meta content={description} property='twitter:description' />
			<meta content={'image/jpeg'} property='og:image:type' />
			<meta content='summary_large_image' name='twitter:card'></meta>
			<meta content='website' property='og:type' />
			<meta content={defaults.sitename} property='og:site_name' />
			<meta content='@Nabil_Tharwat' property='twitter:creator' />
			<meta content='@Nabil_Tharwat16' property='twitter:site' />

			<link rel='manifest' href='/manifest.webmanifest' />

			<meta name='msapplication-TileColor' content='#202040' />
			<meta name='msapplication-config' content='/icons/browserconfig.xml' />
			<meta name='theme-color' content='#202040' />
			<link rel='shortcut icon' href='/icons/favicon.ico' />

			<link
				rel='apple-touch-icon'
				sizes='180x180'
				href='/icons/apple-touch-icon.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='/icons/favicon-32x32.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href='/icons/favicon-16x16.png'
			/>
			<link
				rel='mask-icon'
				href='/icons/safari-pinned-tab.svg'
				color='#5bbad5'
			/>
			<meta
				name='msapplication-TileImage'
				content='/icons/mstile-144x144.png'
			/>

			{image ? <Images image={image} /> : null}
		</Head>
	)
}

export { SEO }
