const express = require('express')
const cors = require('cors')

const errorMiddleware = require('./middleware/errorMiddleware')

const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const pledgeRoutes = require('./routes/pledgeRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Constellation Lite API is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/pledges', pledgeRoutes)


app.use(errorMiddleware)

module.exports = app