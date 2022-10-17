'use strict'
const { Router } = require('express')
const router = Router()

const secure = require('../../auth/secure')
const route = require('./routes')

router.post('/login', route.login)
router.post('/register', route.register)
router.post('/listUser', secure('create'), route.listUser)
router.post('/deleteUser', secure('delete'), route.deleteUser)
router.post('/updateUser', secure('update'), route.updateUser)
router.post('/createRole', secure('role'), route.createRoles)

module.exports = router
