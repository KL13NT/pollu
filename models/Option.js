const { Schema, Model, Types } = require("mongoose")

const Option = new Schema({
  value: { type: String, required: true },
  poll: { type: Types.ObjectId, required: true },
})

module.exports = Model("Option", Option)
