'use-strict'

exports.success = (req, res, message, status) => {
  const statusCode = status || 200
  const statusMessage = message || ''
  res.status(statusCode).send({
    body: statusMessage
  })
}

exports.error = (err, req, res, message, status) => {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'
  res.status(statusCode).send({
    error: err,
    body: statusMessage
  })
}
