const express = require('express')
const cors = require('cors')
const joi = require('joi')
const Poll = require('../../../../models/Poll')
const Vote = require('../../../../models/Vote')

const { getIp } = require('../../../../utils/general')

const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const body = joi
	.object({
		option: joi.number().min(0).required()
	})
	.required()

const query = joi
	.object({
		poll: joi.string().required()
	})
	.required()

const { connectToDatabase } = require('../../../../utils/db')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/v1/:poll/vote', async (req, res) => {
	try {
		await connectToDatabase()

		//TODO: test

		const validationError =
			body.validate(req.body).error || query.validate(req.query).error

		if (validationError)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: validationError, type: 'USER_INPUT' })

		const ip = getIp(req)

		const { poll } = req.query
		const { option } = req.body

		const voteDoc = await Vote.findOne({ ip, poll }).exists().exec()

		if (voteDoc)
			return res
				.status(StatusCodes.CONFLICT)
				.json({ error: 'You already voted this poll' })

		const pollDoc = await Poll.findOne({ _id: req.query.poll_id }).lean().exec()

		if (pollDoc && option && pollDoc.options.length > option && option >= 0) {
			const newVote = await Vote.create({
				ip,
				option,
				poll
			}).exec()

			return res.status(201).json(newVote)
		} else
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: ReasonPhrases.NOT_FOUND })
	} catch (err) {
		console.log(err)
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
	}
})

app.all('*', (req, res) => {
	res
		.status(StatusCodes.METHOD_NOT_ALLOWED)
		.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED })
})

module.exports = app
