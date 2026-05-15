const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = require('./app')

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing')
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      )
    })
  } catch (error) {
    console.error(
      'Server startup error:',
      error.message
    )

    process.exit(1)
  }
}

startServer()