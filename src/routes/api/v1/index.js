const express = require('express');
const welcomeRoutes = require('../../welcomeRoutes');
const itemRoutes = require('../../itemRoutes');

const router = express.Router();

router.use('/', welcomeRoutes);
router.use('/items', itemRoutes);

module.exports = router;
