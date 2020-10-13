const { Schema, model } = require('mongoose')

const Poll = new Schema({
	question: {
		type: String,
		required: true
	},
	options: [{ type: String, unique: true }, { required: true }],
	author: { type: String, required: true },
	multiple: {
		type: Boolean,
		required: true
	}
})

module.exports = model('Poll', Poll)
