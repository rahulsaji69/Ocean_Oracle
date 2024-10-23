const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/users', adminController.getUsers);

module.exports = router;