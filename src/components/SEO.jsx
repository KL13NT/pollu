import React from 'react'
import Head from 'next/head'

const defaults = {
	sitename: 'Pollu',
	title: 'Pollu | Delightful polls a click away!',
	description: 'Pollu is straw poll platform built with privacy in mind.'
}

const Images = ({ image }) => (
	<Head>
		<meta content={image} property='og:image' />
		<meta content={image} property='og:image:url' />
		<meta content={image} property='og:image:secure_url' />
		<meta content={image} property='twitter:image' />
	</Head>
)

function SEO({ title, description = defaults.description, image }) {
	const finalTitle = title ? `${title} | Pollu - ${description}` : defaults.title

	return (
		<>
			<Head>
				<title>{finalTitle}</title>
				<meta content={finalTitle} property='og:title' />
				<meta content={finalTitle} property='twitter:title' />
				<meta content={description} name='description' />
				<meta content={description} property='og:description' />
				<meta content={description} property='twitter:description' />
				<meta content={'image/jpeg'} property='og:image:type' />
				<meta content='summary_large_image' name='twitter:card' />
				<meta content='website' property='og:type' />
				<meta content={defaults.sitename} property='og:site_name' />
				<meta content='@Nabil_Tharwat' property='twitter:creator' />
				<meta content='@Nabil_Tharwat16' property='twitter:site' />
				<meta content='https://pollu.vercel.app' property='og:url' />

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
			</Head>
			<Images image='https://pollu.vercel.app/assets/cover.png' />
		</>
	)
}

export { SEO }