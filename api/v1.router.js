const express = require("express")
const { connectToDatabase } = require("../utils/db")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({ hello: "test" })
})

router.get("/:poll_id", (req, res) => {
  res.json({ ...req.query, ...req.body })
})

module.exports = router
