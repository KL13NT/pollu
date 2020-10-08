const { ReasonPhrases, StatusCodes } = require('http-status-codes')

module.exports = {
	NOT_FOUND: (res, error) =>
		res
			.status(StatusCodes.NOT_FOUND)
			.json({ error: error || ReasonPhrases.NOT_FOUND, code: 'NOT_FOUND' }),

	BAD_REQUEST: (res, error) =>
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: error || ReasonPhrases.BAD_REQUEST, code: 'BAD_REQUSET' }),

	INTERNAL: (res, error) =>
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error || ReasonPhrases.INTERNAL_SERVER_ERROR,
			code: 'INTERNAL_SERVER_ERROR'
		}),

	CONFLICT: (res, error) =>
		res.status(StatusCodes.CONFLICT).json({ error, code: 'CONFLICT' })
}
