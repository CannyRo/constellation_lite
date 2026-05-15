const mongoose = require('mongoose')

const connectTestDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI_TEST
    )

    console.log('Test DB connected')
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectTestDB