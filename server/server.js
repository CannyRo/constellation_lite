const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const errorMiddleware = require('./middleware/errorMiddleware')

const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Constellation Lite API is running')
})

app.use(errorMiddleware)

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in .env')
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()