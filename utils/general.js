const joi = require('joi')
const { isValidObjectId } = require('mongoose')



module.exports = {
	getIp: req => {
		const forwarded = req.headers['x-forwarded-for']
		return (ip =
			(Array.isArray(forwarded) ? forwarded.shift() : forwarded || '')
				.split(',')
				.pop()
				.trim() ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress)
	},

	Id: joi
		.string()
		.trim()
		.min(1)
		.custom((value, helpers) => {
			try {
				return isValidObjectId(value)
					? value
					: helpers.message('ID must conform to an ObjectId')
			} catch (err) {
				return helpers.message('ID must conform to an ObjectId')
			}
		})
}
