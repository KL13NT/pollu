const { Schema, model, Types } = require('mongoose')

const Vote = new Schema({
	author: {
		type: String,
		required: true
	},
	poll: { type: Types.ObjectId, required: true },
	selected: { type: [Number], required: true }
})

Vote.index({ author: 1, poll: 1 })

module.exports = model('Vote', Vote)
