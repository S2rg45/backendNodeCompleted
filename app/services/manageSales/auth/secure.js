const check = require('./index')
const error = require('../../../components/utils/response')

function checkAuth (action) {
  function middlewares (req, res, next) {
    try {
      const actionMiddleware = check.check.own(req)
      const notActionError = false
      const authRegisterId = actionMiddleware || notActionError
      if (authRegisterId.messages !== false) {
        next()
      } else {
        throw new Error('No se puede validar')
      }
    } catch (err) {
      console.log(err)
      return error.error(err, req, res, 'Falla', 401)
    }
  }
  return middlewares
}

module.exports = checkAuth
