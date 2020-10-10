import React from 'react'
import Link from 'next/link'

import { ErrorBoundary } from '@sentry/react'

import Error from '../../pages/_error'

export function Layout({ children }) {
	return (
		<div className='bg-background text-center text-lg p-8 max-w-screen-sm m-auto'>
			<ErrorBoundary fallback={Error}>
				<Link href='/'>
					<a>
						<img
							src='/assets/logo.svg'
							alt='Pollu logo'
							className='block m-auto h-16'
						/>
					</a>
				</Link>
				{children}
				<p className='mt-12 text-base text-alternative'>
					I don’t store any private data but your IP address. This is to detect
					spam and prevent duplications. This also helps me improve the service.
				</p>

				<p className='mt-4 text-base text-alternative'>
					An IP address in isolation is not personal data under the UK Data
					Protection Act. But an IP address can become personal data when
					combined with other information or when used to build a profile of an
					individual, even if that individual's name is unknown.
				</p>

				<p className='mt-8 text-base'>
					Created by{' '}
					<a
						href='https://iamnabil.netlify.app'
						className='text-action'
						target='_blank'
						referrerPolicy='origin-when-cross-origin'
					>
						Nabil Tharwat
					</a>
					.{' '}
					<a
						href='https://github.com/KL13NT/pollu'
						className='text-action'
						target='_blank'
						referrerPolicy='origin-when-cross-origin'
					>
						Open source
					</a>{' '}
					currently licensed under GNU GPLv3.
				</p>
			</ErrorBoundary>
		</div>
	)
}
