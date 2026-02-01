const welcomeService = require('../services/welcomeService');

/**
 * Controller to handle requests to the welcome endpoint.
 */
const getWelcome = (req, res) => {
    const message = welcomeService.getWelcomeMessage();
    res.send(message);
};

module.exports = {
    getWelcome,
};