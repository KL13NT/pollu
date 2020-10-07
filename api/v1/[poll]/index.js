const express = require("express")
const Poll = require("../../../models/Poll")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const app = express()

const { connectToDatabase } = require("../../../utils/db")

app.get("/api/v1/:poll_id", async (req, res) => {
  await connectToDatabase()

  const poll = await Poll.findOne({ _id: req.query.poll_id }).lean().exec()

  if (poll) return res.json({ poll })
  else
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND })
})

module.exports = app
