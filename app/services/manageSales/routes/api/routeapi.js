'use-strict'

const { Router } = require('express')
const router = Router()
const UserRecords = require('../../services')
const secure = require('../../auth/secure')
const utils = require('../../../../components/utils/response')

const userRecords = new UserRecords()

router.post('/adminSales', secure('sales'), sales)
router.post('/adminProduct', secure('product'), product)
router.post('/adminUser', secure('user'), user)
router.post('/dailyClosings', secure('closings'), closings)
router.post('/monthlyBalance', secure('balance'), balance)
router.post('/login', login)
router.post('/register', register)

async function register (req, res, next) {
  const { body: user } = req
  try {
    const usersRegister = await userRecords.createRegister({ user })
    if (usersRegister !== undefined) {
      return utils.success(req, res, { messages: 'create' })
    }
  } catch (error) {
    throw utils.error(error, req, res, 'Falla', 401)
  }
}

async function login (req, res) {
  const { body: dataLogin } = req
  try {
    const logins = await userRecords.login({ dataLogin })
    if (logins !== undefined) {
      return res.json({ messages: true, token: logins })
    }
  } catch (error) {
    return utils.error(error, req, res, 'Falla', 401)
  }
}

async function pokemonAll (req, res, next) {
  const { body: allPokemon } = req
  try {
    const listAllPokemon = await userRecords.allPokemons({ allPokemon })
    if (listAllPokemon !== undefined) {
      return res.json({ messages: usersGet })
    }
  } catch (err) {
    return utils.error(err, req, res, 'Falla', 401)
  }
}

async function pokemonId (req, res, next) {
  const { body: idPokemon } = req
  try {
    const usersGet = await userRecords.idPokemons({ idPokemon })
    res.json({ messages: usersGet })
  } catch (err) {
    return utils.error(err, req, res, 'Falla', 401)
  }
}

async function shipping (req, res, next) {
  try {
    const dataShipping = await userRecords.shipping()
    if (dataShipping !== undefined) {
      return utils.success(req, res, { messages: dataShipping }, 200)
    }
  } catch (error) {
    return utils.error(error, req, res, 'No se puede obtener datos', 401)
  }
}

module.exports = router
