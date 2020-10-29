import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { ErrorBoundary } from '@sentry/react'
import { Toast } from './Toast'
import { Toggle } from './Toggle'
import { themeSwitch } from '../../utils/themeswitch'

import Error from '../../pages/_error'

export function Layout({ children }) {
  // sets default theme as dark on page load unless "themeLight" value in local storage
  const [themeLight, setThemeLight] = useState()
  useEffect(() => {
    const initialTheme = JSON.parse(localStorage.getItem('themeLight')) || false
    setThemeLight(initialTheme)
    themeSwitch(initialTheme)
	}, [])

  // on toggle, sets theme state, alters theme using DOM manipulation and sets
  // theme to local storage
  const onToggleThemeLight = () => {
    setThemeLight(!themeLight)
    themeSwitch(!themeLight)
    localStorage.setItem('themeLight', JSON.stringify(!themeLight))
	}

	return (
		<div className='text-center text-lg p-8 max-w-screen-sm m-auto'>
			<noscript>
				<Toast>Creating polls and voting require JavaScript.</Toast>
			</noscript>
			<ErrorBoundary fallback={Error}>
				<Link href='/'>
					<a>
						<img
							src='/assets/logo_standalone.svg'
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
        
        <div className='flex w-full justify-between items-center mt-8'>
          <p>Toggle light theme</p>
          <Toggle
            label='Toggle light theme'
            id='theme'
            name='theme'
            onChange={onToggleThemeLight}
            value={themeLight}
          />
				</div>

				<p className='mt-8 text-base'>
					Created by{' '}
					<a
						href='https://iamnabil.netlify.app'
						className='underline'
						target='_blank'
						referrerPolicy='origin-when-cross-origin'
					>
						Nabil Tharwat
					</a>
					.{' '}
					<a
						href='https://github.com/KL13NT/pollu'
						className='underline'
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
