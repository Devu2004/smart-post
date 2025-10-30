const express = require('express')
const userModel = require('../models/user.model')
const {registerController, loginController} = require('../controllers/auth.controller')
const router = express.Router()

router.post('/register' , registerController)
router.post('/login',loginController)

module.exports = router