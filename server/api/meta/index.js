'use strict';

/**
 * Imports
 */
let express = require('express');
let controller = require('./meta.controller');
let router = express.Router();

/**
 * Routes
 */

 router.get('/getAllChannels', controller.getAllChannels);

/**
 * Exports
 */
module.exports = router;
