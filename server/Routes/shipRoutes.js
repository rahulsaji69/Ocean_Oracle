const express = require('express');
const router = express.Router();
const shipController = require('../Controllers/shipController');

router.post('/', shipController.createShip);

router.get('/', shipController.getShips);

router.delete('/:id', shipController.deleteShip);

module.exports = router;