const express = require('express')
const UserControl = require('../controls/user_control.js')
const router = express.Router()

router.post('/api/user/login',UserControl.login)
.post('/api/user/loginOut',UserControl.loginOut)
.post('/api/user/register',UserControl.register)

module.exports = router