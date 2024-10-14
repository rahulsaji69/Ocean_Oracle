const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const shipRoutes = require('./shipRoutes');

router.use('/auth', authRoutes);

router.use('/ships', shipRoutes)

module.exports = router