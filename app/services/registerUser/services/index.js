'use stritct'

const bcrypt = require('bcrypt')
const https = require('https')
const auth = require('../auth/index')
const { config } = require('../../../config/index')
const storage = require('../store/user')
const roles = require('../../../components/roles/roles')
const userLogin = require('../../../components/login/login')

class RegisterUser {
  constructor () {

  }

  async createUser ({ user }) {
    try {
      const verificationRole = await roles.queryRoles(user)
      console.log(verificationRole.toJSON().roles_id)
      if (verificationRole !== null) {
        if (verificationRole.toJSON().roles_id === 0){
          const createUser = await storage.createUser(user.data)
          const responseCreate = createUser.toJSON()
          responseCreate.messages = "Creado correctamente"
          return responseCreate
        } else {
          return { messages: 'No tiene privilegios para crear' }
        }
      }
      return { messages: 'Usuario no encontrado'}
    } catch (error) {
      return { messages: 'Error en la creacion' }
    }
  }

  async listUser ({ user }) {
    try {
      const verificationRole = await roles.queryRoles(user)
      if (verificationRole !== null) {
        if (verificationRole.toJSON().roles_id === 0) {
          const createUser = await storage.listUser()
          const listUser = createUser
          listUser.messages = "Listado correctamente"
          return listUser
        } else {
          return { messages: 'No tiene privilegios para listar' }
        }
      }
      return { messages: 'Usuario no encontrado' }
    } catch (error) {
      return { messages: 'No tiene privilegios para listar' }
    }
  }

  async deleteUser ({ user }) {
    try {
      const verificationRole = await roles.queryRoles(user)
      if (verificationRole !== null) {
        if (verificationRole.toJSON().roles_id === 0) {
          const deleteUser = await storage.deleteUser(user.data)
          if (deleteUser === 0){
            return {messages: "Usuario ya ha sido borrado"}
          }
          return { messages : "Borrado correctamente" }
        } else {
          return { messages: 'No tiene privilegios para crear' }
        }
      }
      return { messages : 'Usuario no encontrado' }
    } catch (error) {
      return { messages: 'No tiene privilegios para eliminar' }
    }
  }

  async updateUser ({ user }) {
    try {
      const verificationRole = await roles.queryRoles(user)
      if(verificationRole !== null){
        if (verificationRole.toJSON().roles_id === 0) {
          const updateUser = await storage.updateUser(user.data)
          if (updateUser[0] === 0){
            return {messages: "Usuario no encontrado para actualizar"}
          }
          return { messages : "Actualizado correctamente" }
        } else {
          return { messages: 'No tiene privilegios para actualizar' }
        }
      } 
      return { messages : 'Usuario no encontrado' }
    } catch (error) {
      return { messages: 'No tiene privilegios para actualizar' }
    }
  }

  async createRole ({ user }) {
    try {
      const verificationRole = await roles.queryRoles(user)
      if (verificationRole !== null){
        if (verificationRole.roles_id === 0) {
          const createRoles = await storage.createRoles(user.data)
          const responseCreateRol = createRoles.toJSON()
          responseCreateRol.messages = "Rol creado correctamente"
          return responseCreateRol
        }
        return { messages: 'No tiene privilegios para crear un nuevo ROL' }
      }
      return { messages : 'Usuario no encontrado' }
    } catch (error) {
      return { messages: 'Error al crear un nuevo rol' }
    }
  }

  async login ({ dataLogin }) {
    const dataUser = await userLogin.queryLogin(dataLogin)
    if (dataUser !== null){
      const match = await bcrypt.compare(dataLogin.pass, dataUser.toJSON().pass)
      if (match === true) {
        const tokenResponse = auth.sign(dataUser.toJSON())
        return {messages: true, token: tokenResponse}
      } else {
        throw new Error('Informacion invalidas')
      }
    }
    return {messages: false, reponse: "Usuario no encontrado"}
  }
}

module.exports = RegisterUser
