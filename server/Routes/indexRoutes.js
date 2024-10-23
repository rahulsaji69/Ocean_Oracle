const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const shipRoutes = require('./shipRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth', authRoutes);

router.use('/ships', shipRoutes);

router.use('/admin', adminRoutes);

module.exports = router