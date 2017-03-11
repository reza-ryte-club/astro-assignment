'use strict';

/**
 * Imports
 */
import User from './dashboard.model';

/**
 * Actions
 */

/**
 * Save Dashboard Widgets
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function save(req, res) {
  let userId = req.user._id;
  let widgets = req.body.widgets || [];

  User.saveWidgets(userId, widgets);

  return res.json({
    timestamp: Date.now(),
  });
}

/**
 * Load Dashboard Widgets
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function load(req, res) {
  let userId = req.user._id;
  let widgets = await User.findSavedWidgets(userId);

  return res.json({
    timestamp: Date.now(),
    widgets: widgets
  });
}

/**
 * Publish a User Widget
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function publish(req, res) {
  let userId = req.user._id;
  let widget = req.body.widget;

  if (widget)
    User.publishWidget(userId, widget);

  return res.json({
    timestamp: Date.now()
  });
}

/**
 * Unpublish a User Widget
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function unpublish(req, res) {
  let userId = req.user._id;
  let widgetId = req.params.widgetId;

  if (widgetId)
    User.unpublishWidget(userId, widgetId);

  return res.json({
    timestamp: Date.now()
  });
}

/**
 * List published Widgets of a User
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function list(req, res) {
  let userId = req.user._id;
  let widgets = await User.findPublishedWidgets(userId);

  return res.json({
    timestamp: Date.now(),
    widgets: widgets
  });
}

/**
 * List published Widgets of all Users
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function listAll(req, res) {
  let widgets = await User.findAllPublishedWidgets();

  return res.json({
    timestamp: Date.now(),
    widgets: widgets
  });
}
