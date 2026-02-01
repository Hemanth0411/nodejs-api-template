const express = require('express');
const welcomeController = require('../controllers/welcomeController');

const router = express.Router();

router.get('/', welcomeController.getWelcome);

module.exports = router;
