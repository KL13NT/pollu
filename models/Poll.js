const { Schema, model } = require("mongoose")

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

module.exports = model("Poll", Poll)
