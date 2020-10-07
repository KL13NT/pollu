const express = require("express")
const app = express()

const v1 = require("./v1.router")

app.use("/api/v1", v1)

app.get("/api/v1", (req, res) => res.json({ res: "hello" }))
app.get("/api", (req, res) => res.json({ res: "hello" }))

module.exports = app
