'use strict'

const DB = require('../../../components/lib/postgresConnect')
const uuid = require('uuid')
const utils = require('../../../components/lib/postgresConnect')
const UserModel = require('../../../components/models/users')
const RolesModel = require('../../../components/models/roles')
const bcrypt = require('bcrypt')

const db = new DB()
const connection = db.postgres()
const userModel = UserModel(connection)
const rolesModel = RolesModel(connection)
const time = Date.now()

const createUser = async (params) => {
  try {
    return await userModel.create({
      document: params.document,
      pass: await bcrypt.hash(params.pass, 3),
      id: uuid.v1(),
      last_name: params.last_name,
      name: params.name,
      roles_id: params.roles_id,
      rolesid: params.roles_id,
      createdAt: time,
      updatedAt: time
    })
  } catch (error) {
    return error
  }
}

const listUser = async () => {
  try {
    return await userModel.findAll({})
  } catch (error) {
    return error
  }
}

const deleteUser = async (params) => {
  try {
    return await userModel.destroy({
      where: {
        document: params.document
      }
    })
  } catch (error) {
    return error
  }
}

const updateUser = async (params) => {
  try {
    return await userModel.update({
      roles_id: params.roles_id
    }, {
      where: {
        document: params.document
      }
    })
  } catch (error) {
    return error
  }
}

const createRoles = async (params) => {
  try {
    return await rolesModel.create({
      id: params.roles_id,
      name: params.name,
      createdAt: time,
      updatedAt: time
    })
  } catch (error) {
    return error
  }
}

module.exports = {
  createUser,
  listUser,
  deleteUser,
  updateUser,
  createRoles
}
