const express = require('express')
const cors = require('cors')
const joi = require('joi')

const Poll = require('../../../../models/Poll')
const Vote = require('../../../../models/Vote')

const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { Id } = require('../../../../utils/general')

const query = joi
	.object({
		poll: Id.required()
	})
	.required()

const { connectToDatabase } = require('../../../../utils/db')
const { Types, isValidObjectId } = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/v1/:poll/results', async (req, res) => {
	try {
		await connectToDatabase()

		const validationError = query.validate(req.query).error

		if (validationError)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: validationError, type: 'USER_INPUT' })

		const { poll } = req.query

		if (!(await Poll.exists({ _id: poll })))
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: ReasonPhrases.NOT_FOUND })

		const results = await Vote.aggregate([
			{ $match: { poll: Types.ObjectId(poll) } },
			{ $sortByCount: '$option' },
			{ $project: { option: '$_id', _id: 0, count: 1 } }
		])

		const votes = results.reduce((t, c) => c.count + t, 0)
		const pollDoc = await Poll.findOne({ _id: poll }).lean().exec()

		console.log(pollDoc)
		return res.status(200).json({
			...pollDoc,
			options: pollDoc.options.map((option, i) => ({
				value: option.value,
				votes: results[i].count
			})),
			votes
		})
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
