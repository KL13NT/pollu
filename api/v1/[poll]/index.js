const express = require('express')
const joi = require('joi')

const { Types } = require('mongoose')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Poll = require('../../../models/Poll')

const responses = require('../../../utils/responses')
const middleware = require('../../../utils/middleware')

const { Id } = require('../../../utils/general')
const { captureException } = require('../../../utils/sentry')
const { connectToDatabase } = require('../../../utils/db')

export const getSchema = joi
	.object({
		poll: Id.required()
	})
	.required()

const app = express()

// For edge-caching on all Vercel zones
// Read more https://vercel.com/docs/serverless-functions/edge-caching
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate')
	next()
})

middleware(app)

module.exports = app.get('/api/v1/:poll', async (req, res) => {
	try {
		const validationError = getSchema.validate(req.params).error

		if (validationError)
			return responses.BAD_REQUEST(res, validationError.details[0].message)

		await connectToDatabase()

		const _id = Types.ObjectId(req.params.poll)

		const found = await Poll.findOne({ _id }, { author: 0 }).lean().exec()

		if (!found) return responses.NOT_FOUND(res)

		return res.status(200).json(found)
	} catch (err) {
		captureException(err)
		return responses.INTERNAL(res)
	}
})

app.all('*', (req, res) => {
	res
		.status(StatusCodes.METHOD_NOT_ALLOWED)
		.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED })
})
