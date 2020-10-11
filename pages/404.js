import { Button } from '../src/components/Button'
import { SEO } from '../src/components/SEO'

const reload = () => window.location.reload()

function Four0Four() {
	return (
		<>	
			<SEO />
			<img src='/assets/doge_sad.jpg' className='h-64 m-auto mt-12' />
			<h1 className='sm: text-2xl lg:text-6xl md:text-4xl font-bold text-center mt-4 leading-none'>{`<404>`}</h1>
			<p className='text-lg mt-2'>
				I couldn't find the requested page, sorry... 🥺
			</p>
			<Button className='mt-8' onClick={reload}>
				Reload
			</Button>
		</>
	)
}

export default Four0Four
