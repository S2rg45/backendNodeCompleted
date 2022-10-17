'use strict'

const Sequelize = require('sequelize')
const configdb = require('../../config/index')

class ConnectDB {
  constructor () {
    this.params = configdb.config.development
  }

  postgres() {
    const sequelize = {
      host: this.params.host,
      database: this.params.namedb,
      user: this.params.user,
      pass: this.params.pass,
      dialect: this.params.dialect,
      setup: true
    }
    return sequelize
  }
}

module.exports = ConnectDB
