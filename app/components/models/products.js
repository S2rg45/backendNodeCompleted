'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSalesModel (config) {
  console.log(config)
  const sequelize = setupDatabase(config)

  return sequelize.define('product', {
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    salesId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'products_id'
      }
    }
  })
}
