import { Button } from '../src/components/Button'

const reload = () => window.location.reload()

function Error({ code, error }) {
	return (
		<>
			<img src='/assets/doge.png' className='h-64 m-auto mt-12' />
			<h1 className='sm: text-2xl lg:text-6xl md:text-4xl font-bold text-center mt-4 leading-none'>{`${
				code || 'BEEP_BOOP_ERROR'
			}`}</h1>
			<p className='text-lg mt-2'>{error}</p>
			<Button className='mt-8' onClick={reload}>
				Reload
			</Button>
		</>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const code = res ? res.statusCode : err ? err.statusCode : 404
	return { code }
}

export default Error
