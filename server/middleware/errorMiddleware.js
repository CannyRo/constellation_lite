function errorMiddleware(error, req, res, next) {
  console.error(error)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: error.message || 'Server error',
  })
}

module.exports = errorMiddleware