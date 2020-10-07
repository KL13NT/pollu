const { DB_PATH } = process.env

const mongoose = require("mongoose")

let cachedClient = null

async function connectToDatabase() {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedClient) {
    return cachedClient
  }

  // If no connection is cached, create a new one
  const client = await mongoose.connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Cache the database connection and return the connection
  cachedClient = client
  return cachedClient
}

module.exports = {
  connectToDatabase,
}
