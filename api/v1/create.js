const express = require('express')
const joi = require('joi')

const { Types } = require('mongoose')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Poll = require('../../models/Poll')
const Vote = require('../../models/Vote')

const responses = require('../../utils/responses')
const middleware = require('../../utils/middleware')

const { Id, getIp } = require('../../utils/general')
const { captureException } = require('../../utils/sentry')
const { connectToDatabase } = require('../../utils/db')

export const createSchema = joi
	.object({
		multiple: joi.boolean().required(),
		question: joi.string().trim().min(6).max(280).required(),
		options: joi
			.array()
			.items(joi.string().trim().min(1).max(160).required())
			.min(2)
			.max(20)
			.required()
			.unique()
	})
	.required()

const app = express()

middleware(app)

module.exports = app.post('/api/v1/create', async (req, res) => {
	try {
		const validationError = createSchema.validate(req.body).error

		if (validationError)
			return responses.BAD_REQUEST(res, validationError.details[0].message)

		await connectToDatabase()

		const author = getIp(req)
		// TODO: add rate-limit per IP

		const poll = req.body

		const created = await Poll.create({ ...poll, author })

		return res.status(201).json({ poll: created._id })
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
