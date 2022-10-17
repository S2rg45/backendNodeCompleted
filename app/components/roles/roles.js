'use strict'

const DB = require('../lib/postgresConnect')
const UserModel = require('../models/users')

const db = new DB()
const config = db.postgres()
const userModel = UserModel(config)

const queryRoles = async (params) => {
  try {
    return await userModel.findOne({
      where: {
        document: params.document
      }
    })
  } catch (error) {
    return error
  }
}

module.exports = {
  queryRoles
}
