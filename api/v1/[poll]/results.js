const express = require('express')
const joi = require('joi')

const { Types } = require('mongoose')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Poll = require('../../../models/Poll')
const Vote = require('../../../models/Vote')

const responses = require('../../../utils/responses')
const middleware = require('../../../utils/middleware')

const { captureException } = require('../../../utils/sentry')
const { connectToDatabase } = require('../../../utils/db')
const { Id } = require('../../../utils/general')

export const getSchema = joi
	.object({
		poll: Id.required()
	})
	.required()

const app = express()

// For edge-caching on all Vercel zones
// Read more https://vercel.com/docs/serverless-functions/edge-caching
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
	next()
})

middleware(app)

module.exports = app.get('/api/v1/:poll/results', async (req, res) => {
	try {
		const validationError = getSchema.validate(req.params).error

		if (validationError)
			return responses.BAD_REQUEST(res, validationError.details[0].message)

		await connectToDatabase()

		const _id = Types.ObjectId(req.params.poll)

		const found = await Poll.findOne({ _id }, { author: 0 }).lean().exec()
		if (!found) return responses.NOT_FOUND(res)

		//TODO: I don't know how to aggregate a 'count' of all votes and append that to the aggregation pipeline to respond with a single query instead of two, if that's even possible. Any help is appreciated! 😅
		const votes = await Vote.find({ poll: _id }).countDocuments().exec()

		if (votes === 0)
			return res.status(200).json({
				...found,
				options: found.options.map((option, i) => ({
					value: option,
					votes: 0
				})),
				votes
			})

		const results = await Vote.aggregate([
			{ $match: { poll: Types.ObjectId(_id) } },
			{ $unwind: '$selected' },
			{ $sortByCount: '$selected' },
			{ $project: { selected: '$_id', _id: 0, count: 1 } }
		])

		//REFACTORME: This should be refactored to be more declarative & readable
		return res.status(200).json({
			...found,
			options: found.options.map((option, i) => ({
				value: option,
				votes: (results.find(op => op.selected === i) || { count: 0 }).count
			})),
			votes
		})
	} catch (err) {
		console.log(err)
		captureException(err)
		return responses.INTERNAL(res)
	}
})

app.all('*', (req, res) => {
	res
		.status(StatusCodes.METHOD_NOT_ALLOWED)
		.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED })
})
