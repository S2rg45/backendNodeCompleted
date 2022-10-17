'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSalesModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sales', {
    id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    products_id: {
      type: Sequelize.UUID,
      allowNull: true,
      primaryKey: true
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sales_at: {
      type: Sequelize.TIME,
      allowNull: false
    },
    users_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    userId:{
      type: Sequelize.UUID,
      allowNull: false,
      reference: {
        model: 'user',
        key: 'id'
      }
    }
  })
}
