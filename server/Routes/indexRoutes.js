const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const shipRoutes = require('./shipRoutes');
const adminRoutes = require('./adminRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/auth', authRoutes);

router.use('/ships', shipRoutes);

router.use('/admin', adminRoutes);

router.use('/booking', bookingRoutes);

module.exports = router