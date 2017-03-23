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
router.get('/getAllEvents', controller.getAllEvents);

/**
 * Exports
 */
module.exports = router;
