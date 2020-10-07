const { Schema, model, Types } = require("mongoose")

const Vote = new Schema({
  ip: {
    type: String,
    required: true,
  },
  poll: { type: Types.ObjectId, required: true },
  option: { type: Number, required: true },
})

Vote.index({ ip: 1, poll: 1 })

module.exports = model("Vote", Vote)
