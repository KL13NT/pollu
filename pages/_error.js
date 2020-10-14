import { Button } from '../src/components/Button'

import { SEO } from '../src/components/SEO'

const reload = () => window.location.reload()
const defaults = {
	code: 'BEEP_BOOP_ERROR',
	error: 'Something went wrong, sorry... 🥺'
}

function Error({ code, error } = defaults) {
	return (
		<>
			<SEO title={code} description={error} />
			<img src='/assets/doge_sad.jpg' className='h-64 m-auto mt-12' />
			<h1 className='sm:text-2xl text-4xl md:text-4xl font-bold text-center mt-4 leading-none'>{`<${code}>`}</h1>
			<p className='text-lg mt-2'>{error}</p>
			<Button className='mt-8' onClick={reload}>
				Reload
			</Button>
		</>
	)
}

export default Error
