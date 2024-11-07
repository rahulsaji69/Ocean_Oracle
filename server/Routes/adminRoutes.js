const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController.js');

router.get('/users', adminController.getUsers);

router.put('/users/:userId/status', adminController.changeStatus);

module.exports = router;