'use strict';

/**
 * Imports
 */
let express = require('express');
let controller = require('./dashboard.controller');
import * as auth from '../../auth/auth.service';

let router = express.Router();

/**
 * Routes
 */

router.get('/', controller.listAll);

router.get('/my', auth.isAuthenticated(), controller.load);
router.post('/my', auth.isAuthenticated(), controller.save);

router.get('/publish', auth.isAuthenticated(), controller.list);
router.post('/publish', auth.isAuthenticated(), controller.publish);
router.delete('/publish/:widgetId', auth.isAuthenticated(), controller.unpublish);

/**
 * Exports
 */
module.exports = router;
