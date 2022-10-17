require('dotenv').config()
const config = {
  dev: process.env.NODE_ENV,
  port: process.env.PORT,
  local: {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    pass: process.env.PASS_DB,
    namedb: process.env.NAME_DB,
    dialect: process.env.DIALECT
  },
  development: {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    pass: process.env.PASS_DB,
    namedb: process.env.NAME_DB,
    dialect: process.env.DIALECT
  },
  test: {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    pass: process.env.PASS_DB,
    namedb: process.env.NAME_DB,
    dialect: process.env.DIALECT
  },
  jwt: {
    secret: process.env.JWTSECRET
  }
}

module.exports = { config }
