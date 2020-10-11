const express = require('express')
const joi = require('joi')

const { Types } = require('mongoose')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Poll = require('../../../models/Poll')
const Vote = require('../../../models/Vote')

const responses = require('../../../utils/responses')
const middleware = require('../../../utils/middleware')

const { Id, getIp } = require('../../../utils/general')
const { captureException } = require('../../../utils/sentry')
const { connectToDatabase } = require('../../../utils/db')

const voteSchema = joi
	.object({
		params: joi.object({ poll: Id.required() }).required(),
		body: joi
			.object({
				selected: joi.array().min(1).max(20).required()
			})
			.required()
	})
	.required()

const app = express()

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
	next()
})

middleware(app)

module.exports = app.post('/api/v1/:poll/vote', async (req, res) => {
	try {
		const validationError = voteSchema.validate({
			params: req.params,
			body: req.body
		}).error

		if (validationError)
			return responses.BAD_REQUEST(res, validationError.details[0].message)

		await connectToDatabase()

		const author = getIp(req)

		const { poll } = req.params
		const { selected } = req.body

		const _id = Types.ObjectId(poll)
		const found = await Poll.findOne({ _id }).lean().exec()

		if (!found) return responses.NOT_FOUND(res)
		if (await Vote.exists({ author, poll: _id }))
			return responses.CONFLICT(res, 'You already voted this poll')

		if (
			Array.isArray(selected) &&
			selected.find(op => op > found.options.length - 1)
		)
			return responses.NOT_FOUND(res, 'Selected option not found')

		await Vote.create({
			author,
			selected,
			poll
		})

		return res.status(201).json({})
	} catch (err) {
		captureException(err)
		console.log(err)
		return responses.INTERNAL(res)
	}
})

app.all('*', (req, res) => {
	res
		.status(StatusCodes.METHOD_NOT_ALLOWED)
		.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED })
})
