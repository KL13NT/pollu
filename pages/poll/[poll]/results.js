import { server } from '../../../config.routes'

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
	if (props.error) return <Error {...props} />

	const [toast, setToast] = useToasts()

	const { question, url, options } = props
	const description = `Click the link to see the results now!`

	const onShare = () =>
		navigator.clipboard
			.writeText(window.location.href.replace('results', ''))
			.then(() => setToast('Copied link to clipboard'))
			.catch(() => setToast('Failed to copy link to clipboard!'))

	const calcPercentage = votes => (votes ? (votes / props.votes) * 100 : 0)

	return (
		<>
			<SEO title={question} description={description} url={url} />
			{toast ? <Toast>{toast}</Toast> : null}

			<h1 className='mt-4 text-4xl'>{question}</h1>

			<div className='mt-8'>
				{options.map(op => (
					<Result className='mt-4' percentage={calcPercentage(props.votes)}>
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

/**
 *
 * @param {object} param0
 * @param {NextApiResponse} param0.res
 * @param {NextApiRequest} param0.req
 */
export async function getServerSideProps({ req, res, params }) {
	try {
		const data = await (await fetch(`${server}/${params.poll}/results`)).json()

		res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

		return {
			props: {
				url: req.url,
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

export default ResultsPage
