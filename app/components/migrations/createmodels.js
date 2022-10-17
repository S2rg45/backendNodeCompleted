'use strict'

const setupDatabase = require('../lib/db')
const setupRolesModel = require('../models/roles')
const setupProductsModel = require('../models/products')
const setupSalesModel = require('../models/sales')
const setupUsersModel = require('../models/users')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const rolesModel = setupRolesModel(config)
  const productModel = setupProductsModel(config)
  const salesModel = setupSalesModel(config)
  const userModel = setupUsersModel(config)

  rolesModel.hasMany(userModel)
  userModel.belongsTo(rolesModel)

  userModel.hasMany(salesModel)
  salesModel.belongsTo(userModel)

  salesModel.hasMany(productModel)
  productModel.belongsTo(salesModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }
}
