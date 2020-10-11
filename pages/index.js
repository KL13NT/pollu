import React, { useEffect, useState } from 'react'

import { Input } from '../src/components/Input'
import { Toggle } from '../src/components/Toggle'
import { Button } from '../src/components/Button'
import { useToasts, Toast } from '../src/components/Toast'
import { SEO } from '../src/components/SEO'
import { Loader } from '../src/components/Loader'

const DynamicFields = ({ onChange: changeHandler }) => {
	const [fields, setFields] = useState(['', '', ''])

	const shouldAddField = () => {
		const nOfEmptyFields = fields.filter(field => field === '').length

		if (nOfEmptyFields === 0 && fields.length < 20) setFields([...fields, ''])
	}

	const onChange = e => {
		const index = Number(e.target.dataset.index)

		const copy = Array.from(fields)
		copy[index] = e.target.value

		setFields(copy)
		changeHandler(fields)
	}

	useEffect(shouldAddField, [fields])

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
					value={option}
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
	const [toast, setToast] = useToasts()
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
		question: '',
		multiple: false,
		options: []
	})

	const onToggleMultiple = value => {
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

		const poll = {
			...state,
			options: state.options.filter(option => option.length > 0)
		}

		if (poll.options.length < 2)
			return setToast('You must create at least 2 options')

		setLoading(true)
		setToast('Creating poll, please wait')

		fetch('/api/v1/create', {
			body: JSON.stringify(poll),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) return setToast(res.error)

				setToast('Created poll successfully, redirecting you.')
				window.location.href = `/poll/${res.poll}`
			})
			.catch(err => {
				console.log(err)
				setToast('Something went wrong')
			})
			.finally(() => {
				console.log('FINALLY')
				setLoading(false)
			})
	}

	return (
		<>
			<SEO />
			{toast ? <Toast>{toast}</Toast> : null}

			<h1 className='mt-4'>Delightful anonymous polls a click away!</h1>

			<form className='mt-8' onSubmit={onSubmit}>
				<p className='mt-4 text-alternative text-base'>
					Fill these boxes to create a poll right away!
				</p>
				<fieldset disabled={loading}>
					<Input
						id='question'
						name='question'
						placeholder="What's on your mind?"
						maxLength='280'
						minLength='6'
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

					<Button
						type='submit'
						className='mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{loading ? <Loader /> : 'Create Poll'}
					</Button>
				</fieldset>
			</form>
		</>
	)
}

export default IndexPage
