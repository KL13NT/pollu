import React, { useState } from 'react'
const { Redirect } = require('@reach/router')

import '../styles.css'

import Logo from '../assets/logo.svg'

import { Input } from '../components/Input'
import { Toggle } from '../components/Toggle'
import { Button } from '../components/Button'
import { useToasts, Toast } from '../components/Toast'

const DynamicFields = ({ onChange: changeHandler, options }) => {
	const [fields, setFields] = useState(['', '', ''])

	const shouldAdd = () => {
		const n = fields.filter(field => field === '').length

		if (n === 0 && fields.length < 20) setFields([...fields, ''])
	}

	const onChange = e => {
		const index = e.target.dataset.index

		const copy = Array.from(fields)
		copy[index] = e.target.value.trim()

		setFields(copy)
		shouldAdd()
		changeHandler(fields)
	}

	return (
		<div>
			{fields.map((option, i) => (
				<Input
					id={`option${i + 1}`}
					name={`option${i + 1}`}
					placeholder={`Option ${i + 1}`}
					maxLength={`160`}
					label={`Option ${i + 1}`}
					className={`mt-4`}
					value={option.value}
					onChange={onChange}
					key={i}
					data-type='option'
					data-index={i}
				/>
			))}
		</div>
	)
}

const IndexPage = () => {
	const [notification, setNotification] = useToasts()
	const [disabled, toggle] = useState(false)
	const [state, setState] = useState({
		question: '',
		multiple: false,
		options: []
	})

	const onToggleMultiple = value => {
		console.log('toggled', value)
		setState({ ...state, multiple: value })
	}

	const onFieldsChange = fields => {
		setState({ ...state, options: fields })
	}

	const onChange = e => {
		return setState({ ...state, question: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()

		console.log(state)

		const poll = {
			...state,
			options: state.options.filter(option => option.length > 0)
		}

		if (poll.options.length < 2)
			return setNotification('You must create at least 2 options')

		toggle(true)
		setNotification('Creating poll, please wait')

		fetch('/api/v1', {
			body: JSON.stringify(poll),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(({ poll }) => {
				window.location.href = `/${poll}`
			})
			.catch(err => {
				console.log(err)
				setNotification(err.error)
			})
			.finally(() => {
				toggle(false)
				setNotification('Created poll successfully, redirecting you.')
			})
	}

	return (
		<div className='bg-background text-center text-lg p-8 max-w-screen-sm m-auto'>
			{notification ? <Toast>{notification}</Toast> : null}

			<img src={Logo} alt='Pollu logo' className='block m-auto h-16' />
			<h1 className='mt-4'>Delightful anonymous polls a click away!</h1>

			<form className='mt-8' onSubmit={onSubmit}>
				<fieldset disabled={disabled}>
					<Input
						id='question'
						name='question'
						placeholder="What's on your mind?"
						maxLength='280'
						label='question'
						className='mt-4'
						type='text'
						value={state.question}
						onChange={onChange}
						data-type='question'
						required
					/>

					<DynamicFields options={state.options} onChange={onFieldsChange} />
					<span className='text-left mt-4 block text-base text-alternative'>
						20 options at most, added automatically.
					</span>

					<div className='flex w-full justify-between items-center mt-4'>
						<p>Allow multiple poll answers</p>
						<Toggle
							label='Allow multiple poll answers'
							id='multiple'
							name='multiple'
							onChange={onToggleMultiple}
						/>
					</div>

					<Button type='submit' className='mt-4'>
						Creat Poll
					</Button>
				</fieldset>
			</form>
			<p className='mt-4 text-base text-alternative'>
				I don’t store any private data but your encrypted IP address. This is to
				detect spam and prevent duplications. This also helps me improve the
				service.
			</p>

			<p className='mt-4 text-base text-alternative'>
				An IP address in isolation is not personal data under the UK Data
				Protection Act. But an IP address can become personal data when combined
				with other information or when used to build a profile of an individual,
				even if that individual's name is unknown.
			</p>

			<p className='mt-8 text-base'>
				Created by{' '}
				<a href='https://iamnabil.netlify.app' className='text-action'>
					Nabil Tharwat
				</a>
				.{' '}
				<a href='https://github.com/KL13NT/pollu' className='text-action'>
					Open source
				</a>{' '}
				currently licensed under GNU GPLv3.
			</p>
		</div>
	)
}
export default IndexPage
