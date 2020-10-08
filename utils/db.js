const { DB_PATH } = process.env

const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

let cachedClient = null

async function connectToDatabase() {
	if (cachedClient) {
		return cachedClient
	}

	const client = await mongoose.connect(DB_PATH, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	cachedClient = client
	return cachedClient
}

module.exports = {
	connectToDatabase
}
