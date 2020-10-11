import { server } from '../../../config.routes'

import Link from 'next/link'

import { Result } from '../../../src/components/Result'
import { Button } from '../../../src/components/Button'
import { useToasts, Toast } from '../../../src/components/Toast'
import { SEO } from '../../../src/components/SEO'
import Error from '../../_error'

const Votes = ({ votes }) => {
	if (votes > 0) return `${votes} Votes`

	return 'This poll has no votes yet'
}

const ResultsPage = props => {
	const [toast, setToast] = useToasts()

	const onShare = () =>
		navigator.clipboard
			.writeText(window.location.href.replace('results', ''))
			.then(() => setToast('Copied link to clipboard'))
			.catch(() => setToast('Failed to copy link to clipboard!'))

	const calcPercentage = votes => (votes ? (votes / props.votes) * 100 : 0)

	if (props.error) return <Error {...props} />

	return (
		<>
			<SEO />
			{toast ? <Toast>{toast}</Toast> : null}

			<h1 className='mt-4 text-4xl'>{props.question}</h1>

			<div className='mt-8'>
				{props.options.map(op => (
					<Result className='mt-4' percentage={calcPercentage(op.votes)}>
						{op.value}
					</Result>
				))}

				<span className='text-left mt-4 block text-lg flex items-center justify-between'>
					<Votes votes={props.votes} setToast={setToast} />
					<Button onClick={onShare} auto className='inline-block w-auto'>
						Share poll
					</Button>
				</span>

				<span className='mt-4 block text-base'>
					This page updates every 60 seconds.
				</span>
			</div>
		</>
	)
}

export async function getServerSideProps({ res, params }) {
	const data = await (await fetch(`${server}/${params.poll}/results`)).json()

	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

	return {
		props: {
			...data
		}
	}
}

export default ResultsPage
