const dev = process.env.NODE_ENV !== 'production'

export const server = dev
	? 'http://localhost:3000/api/v1'
	: 'https://pollu.vercel.app/api/v1'
