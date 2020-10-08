const express = require('express')
const cors = require('cors')
const joi = require('joi')

const { Types } = require('mongoose')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Poll = require('../models/Poll')
const Vote = require('../models/Vote')

const responses = require('../utils/responses')

const { Id, getIp } = require('../utils/general')
const { connectToDatabase } = require('../utils/db')

const schemas = {
	get: joi
		.object({
			poll: Id.required()
		})
		.required(),

	create: joi
		.object({
			multiple: joi.boolean().required(),
			question: joi.string().trim().min(6).max(280).required(),
			options: joi
				.array()
				.items(joi.string().trim().min(6).max(160).required())
				.min(2)
				.max(20)
				.required()
		})
		.required(),

	vote: joi
		.object({
			params: joi.object({ poll: Id.required() }).required(),
			body: joi
				.object({
					option: joi.number().min(0).max(19).required()
				})
				.required()
		})
		.required()
}

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/v1/:poll/results', async (req, res) => {
	try {
		const validationError = schemas.get.validate(req.params).error

		if (validationError) return responses.BAD_REQUEST(res, validationError)

		await connectToDatabase()

		const _id = Types.ObjectId(req.params.poll)

		const found = await Poll.findOne({ _id }).lean().exec()
		if (!found) return responses.NOT_FOUND(res)

		const results = await Vote.aggregate([
			{ $match: { poll: _id } },
			{ $sortByCount: '$option' },
			{ $project: { option: '$_id', _id: 0, count: 1 } }
		])

		const votes = results.reduce((t, c) => c.count + t, 0)

		return res.status(200).json({
			...found,
			options: found.options.map((option, i) => ({
				value: option.value,
				votes: results[i].count
			})),
			votes
		})
	} catch (err) {
		console.log(err)
		return responses.INTERNAL(res)
	}
})

app.post('/api/v1/:poll/vote', async (req, res) => {
	try {
		const validationError = schemas.get.validate({
			params: req.params,
			body: req.body
		}).error

		if (validationError) return responses.BAD_REQUEST(res, validationError)

		await connectToDatabase()

		const author = getIp(req)

		const { poll } = req.params
		const { option } = req.body

		const _id = Types.ObjectId(poll)
		const found = await Poll.findOne({ _id }).lean().exec()

		if (!found) return responses.NOT_FOUND(res)
		if (await Vote.exists({ author, poll: _id }))
			return responses.CONFLICT(res, 'You already voted this poll')

		if (option > found.options.length - 1)
			return responses.NOT_FOUND(res, 'Selected option not found')

		await Vote.create({
			author,
			option,
			poll
		})

		return res.status(201).json({})
	} catch (err) {
		console.log(err)
		return responses.INTERNAL(res)
	}
})

app.get('/api/v1/:poll', async (req, res) => {
	try {
		const validationError = schemas.get.validate(req.params).error

		if (validationError) return responses.BAD_REQUEST(res, validationError)

		await connectToDatabase()

		const _id = Types.ObjectId(req.params.poll)

		const found = await Poll.findOne({ _id }).lean().exec()

		if (!found) return responses.NOT_FOUND(res)

		return res.status(200).json(found)
	} catch (err) {
		console.log(err)
		return responses.INTERNAL(res)
	}
})

app.post('/api/v1/', async (req, res) => {
	try {
		const validationError = schemas.create.validate(req.body).error

		if (validationError) return responses.BAD_REQUEST(res, validationError)

		await connectToDatabase()

		const author = getIp(req)
		// TODO: add rate-limit per IP
		// TODO: encrypt

		const poll = req.body

		const created = await Poll.create({ ...poll, author })

		return res.status(201).json({ poll: created._id })
	} catch (err) {
		console.log(err)
		return responses.INTERNAL(res)
	}
})

app.all('*', (req, res) => {
	res
		.status(StatusCodes.METHOD_NOT_ALLOWED)
		.json({ error: ReasonPhrases.METHOD_NOT_ALLOWED })
})

module.exports = app
