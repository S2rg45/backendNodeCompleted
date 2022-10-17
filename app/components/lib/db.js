'use strict'

const Sequelize = require('sequelize')

let sequelize = null

const setupDatabase = (config) => {
  if (!sequelize) {
    sequelize = new Sequelize(config.database,
      config.user,
      config.pass, {
        host: config.host,
        dialect: config.dialect
      })
  }
  return sequelize
}

module.exports = setupDatabase
