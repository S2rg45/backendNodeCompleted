'use strict'

const UserRecords = require('../../services')
const utils = require('../../../../components/utils/response')

const userRecords = new UserRecords()

async function listUser (req, res) {
  const { body: user } = req
  try {
    const users = await userRecords.listUser({ user })
    if (users.messages.includes("Listado")) {
      return utils.success(req, res, { messages: users })
    }
    return utils.success(req, res, users, 200)
  } catch (error) {
    throw utils.error(error, req, res, 'Falla', 401)
  }
}

async function deleteUser (req, res) {
  const { body: user } = req
  try {
    const deleteUser = await userRecords.deleteUser({ user })
    if (deleteUser.messages.includes("Borrado")) {
      return utils.success(req, res, { messages: deleteUser })
    }
    return utils.success(req, res, deleteUser, 200)
  } catch (error) {
    throw utils.error(error, req, res, 'Falla', 401)
  }
}

async function createRoles (req, res) {
  const { body: user } = req
  try {
    const createRoles = await userRecords.createRole({ user })
    if (createRoles.messages.includes("Rol")) {
      return utils.success(req, res, { messages: createRoles.messages })
    }
    return utils.success(req, res, { messages: createRoles.messages })
  } catch (error) {
    throw utils.error(error, req, res, 'Falla', 401)
  }
}

async function updateUser (req, res) {
  const { body: user } = req
  try {
    const updatesUsers = await userRecords.updateUser({ user })
    if (updatesUsers !== undefined) {
      return utils.success(req, res, { messages: updatesUsers })
    }
  } catch (error) {
    throw utils.error(error, req, res, 'Falla', 401)
  }
}

async function register (req, res, next) {
  const { body: user } = req
  try {
    const usersRegister = await userRecords.createUser({ user })
    if (usersRegister.messages.includes("Creado")) {
      return utils.success(req, res, { messages: 'create' })
    } 
    return utils.success(req, res, usersRegister.messages , 200) 
  } catch (error) {
    throw utils.error(error, req, res, "Falla" , 401)
  }
}

async function login (req, res) {
  const { body: dataLogin } = req
  try {
    const logins = await userRecords.login({ dataLogin })
    if (logins.messages) {
      return utils.success(req, res,{ token: logins.token }, 200)
    }
    return utils.success(req, res,{ messages: logins.reponse }, 200)
  } catch (error) {
    console.log(error)
    return utils.error(error, req, res, 'Falla', 401)
  }
}

module.exports = {
  listUser,
  login,
  register,
  updateUser,
  createRoles,
  deleteUser
}
