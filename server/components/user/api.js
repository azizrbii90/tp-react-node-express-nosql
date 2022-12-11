const express = require('express');
const router = express.Router()

const userController = require('./controller')

const authenticate = require('../../utils').authUtils.authUtils.authenticate

router
.post('/register/', userController.register)
.get('/verify-account/', userController.verifyAccount)
.post('/login/', userController.login)
.get('/get-info-from-token/', authenticate, userController.getInfoFromToken)
.get('/recover-password-request/:email', userController.recoverPasswordRequest)
.get('/recover-password', userController.verifyRecoverPasswordRequest)
.put('/recover-password/', userController.recoverPassword)

module.exports = router