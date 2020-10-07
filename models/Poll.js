const { Schema, Model } = require("mongoose")

const Option = new Schema({
  value: { type: String, required: true },
})

const Poll = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: { type: [Option], required: true, default: [] },
})

Poll.index({ question: 1 })

module.exports = Model("Poll", Poll)
