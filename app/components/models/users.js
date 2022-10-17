'use-strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('user', {
    document: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pass: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    roles_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rolesid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  })
}
