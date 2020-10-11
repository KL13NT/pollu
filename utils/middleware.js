const express = require('express')

// Shared middleware for all routes
module.exports = app => {
	app.use(express.json())
}
