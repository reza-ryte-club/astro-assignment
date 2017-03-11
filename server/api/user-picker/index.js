'use strict';

/**
 * Imports
 */
let express = require('express');
let controller = require('./user-picker.controller');

let router = express.Router();

/**
 * Routes
 */
router.get('/rmps', controller.rmps);
router.get('/tes', controller.tes);
router.get('/hpos', controller.hpos);
router.get('/doctors', controller.doctors);
router.get('/admins', controller.admins);

/**
 * Exports
 */
module.exports = router;
