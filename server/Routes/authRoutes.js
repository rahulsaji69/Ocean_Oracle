const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')

router.post('/register',authController.registerUser );

router.post('/login', authController.loginUser);

// router.post('/send-otp-forget-password', authController.forGetPassWord);

// router.post('/forget-password', authController.)

module.exports = router