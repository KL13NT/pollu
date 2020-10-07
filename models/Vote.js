const { Schema, Model, Types } = require("mongoose")

const Vote = new Schema({
  ip: {
    type: String,
    required: true,
  },
  poll: { type: Types.ObjectId, required: true },
})

Vote.index({ ip: 1, poll: 1 })

module.exports = Model("Vote", Vote)
