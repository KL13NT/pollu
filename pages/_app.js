import * as Sentry from '@sentry/react'

import { Layout } from '../src/components/Layout'

import '../src/styles.css'

Sentry.init({ dsn: process.env.SENTRY_KEY })

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
