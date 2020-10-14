import { server } from '../../config.routes'

import Link from 'next/link'

import { useState } from 'react'

import { Option, Radio } from '../../src/components/Option'
import { Button } from '../../src/components/Button'
import { Toast, useToasts } from '../../src/components/Toast'
import { SEO } from '../../src/components/SEO'
import { Loader } from '../../src/components/Loader'

import Error from '../_error'

const Multiple = ({ state, ...props }) => {
	return state.options.map(option => (
		<Option
			className='mt-4'
			name='selected'
			label={option}
			value={option}
			{...props}
		>
			{option}
		</Option>
	))
}

const Single = ({ state, ...props }) => {
	return state.options.map((option, i) => (
		<Radio
			className='mt-4'
			name='selected'
			value={i}
			id={option}
			label={option}
			{...props}
		>
			{option}
		</Radio>
	))
}

const PollPage = props => {
	if (props.error) return <Error {...props} />

	const [toast, setToast] = useToasts(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = e => {
		e.preventDefault()

		let body = {
			selected: null
		}

		if (props.multiple) {
			const boxes = document.querySelectorAll('input[type="checkbox"]')

			console.log(boxes)

			body.selected = Array.from(boxes)
				.filter(option => option.checked)
				.map(option => props.options.indexOf(option.value))
		} else {
			body.selected = [new FormData(e.target).get('selected')]
		}

		setToast('Voting...')
		setLoading(true)
		fetch(`/api/v1/${props._id}/vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) return setToast(res.error)
				else window.location.href = `/poll/${props._id}/results`
			})
			.catch(err => {
				console.log(err)
				setToast('Something went wrong')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const onSingleToggle = e => {
		console.log(e.target)
		return true
	}

	const onMultipleToggle = e => {
		console.log(e.target)
		return true
	}

	const description = `Click the link to view the results of this poll!`
	return (
		<>
			<SEO title={props.question} description={description} />
			{toast ? <Toast>{toast}</Toast> : null}

			<h1 className='mt-4 text-4xl'>{props.question}</h1>

			<form className='mt-8' onSubmit={onSubmit}>
				<fieldset disabled={loading}>
					{props.multiple ? (
						<Multiple state={props} onChange={onMultipleToggle} />
					) : (
						<Single state={props} onChange={onSingleToggle} />
					)}

					<span className='text-left mt-4 block text-base text-alternative'>
						{props.multiple
							? 'You can select multiple answers'
							: 'You can select only one answer'}
					</span>

					<Button type='submit' className='mt-4'>
						{loading ? <Loader /> : 'Vote'}
					</Button>

					<Link href={`/poll/${props._id}/results`}>
						<a className='mt-4 block text-base'>See results instead</a>
					</Link>
				</fieldset>
			</form>
		</>
	)
}

export async function getServerSideProps({ res, params }) {
	try {
		const data = await (await fetch(`${server}/${params.poll}`)).json()
		res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

		return {
			props: {
				...data
			}
		}
	} catch (err) {
		return {
			props: {
				error: err.message,
				code: 'GENERIC'
			}
		}
	}
}
export default PollPage
