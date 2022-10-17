const jwt = require('jsonwebtoken')
const config = require('../../../config/index')

const secret = config.config.jwt.secret
const buff = new Buffer.alloc(15, secret, 'base64')
const text = buff.toString('ascii')

function sign (data) {
  const token = jwt.sign(JSON.stringify(data[0]), text)
  return token
}

function verify (token) {
  return jwt.verify(token, text)
}

const check = {
  own: function (req) {
    const decoded = decodeHeader(req)
    console.log(decoded)
    if (decoded.messages) {
      return { messages: true }
    } else {
      return { messages: false }
    }
  }
}

function getToken (auth) {
  if (!auth) {
    return { messages: false }
  }

  if (auth.indexOf('Bearer e') !== 0) {
    return { messages: false }
  }

  const token = auth.replace('Bearer ', '')
  return { messages: true, data: token }
}

function decodeHeader (req) {
  try {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    if (token.messages !== false) {
      const decode = verify(token.data)
      const buffers = new Buffer.alloc(15, decode, 'base64')
      return { messages: true, data: buffers }
    }
    return { messages: false }
  } catch (error) {
    return { messages: false }
  }
}

module.exports = {
  sign,
  check
}
