const { ReasonPhrases, StatusCodes } = require('http-status-codes')

module.exports = {
	NOT_FOUND: (res, error) =>
		res
			.status(StatusCodes.NOT_FOUND)
			.json({
				error: error || "I can't find this page anywhere. Give it back!",
				code: 'NOT_FOUND'
			}),

	BAD_REQUEST: (res, error) =>
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: error || 'Gimme a proper request!', code: 'BAD_REQUST' }),

	INTERNAL: (res, error) =>
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: error || ReasonPhrases.INTERNAL_SERVER_ERROR,
			code: 'INTERNAL_SERVER_ERROR'
		}),

	CONFLICT: (res, error) =>
		res.status(StatusCodes.CONFLICT).json({ error, code: 'CONFLICT' })
}
