const express = require('express')
const cors = require('cors')
const joi = require('joi')

const { Types } = require('mongoose')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Poll = require('../models/Poll')
const Vote = require('../models/Vote')

const responses = require('../utils/responses')

const { Id, getIp } = require('../utils/general')
const { captureException } = require('../utils/sentry')
const { connectToDatabase } = require('../utils/db')

export const schemas = {
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
				.items(joi.string().trim().min(1).max(160).required())
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
					selected: joi.array().min(1).max(20).required()
				})
				.required()
		})
		.required()
}

const app = express()

// For edge-caching on all Vercel zones
// Read more https://vercel.com/docs/serverless-functions/edge-caching
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
	next()
})
app.use(express.json())
app.use(cors())

app.get('/api/v1/:poll/results', async (req, res) => {
	try {
		const validationError = schemas.get.validate(req.params).error

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

app.post('/api/v1/:poll/vote', async (req, res) => {
	try {
		const validationError = schemas.vote.validate({
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

app.get('/api/v1/:poll', async (req, res) => {
	try {
		const validationError = schemas.get.validate(req.params).error

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

app.post('/api/v1/', async (req, res) => {
	try {
		const validationError = schemas.create.validate(req.body).error

		if (validationError)
			return responses.BAD_REQUEST(res, validationError.details[0].message)

		await connectToDatabase()

		const author = getIp(req)
		// TODO: add rate-limit per IP
		// TODO: encrypt

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

module.exports = app
