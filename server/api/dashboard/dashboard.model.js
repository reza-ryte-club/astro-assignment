'use strict';

/**
 * Imports
 */
import mongoose, {Schema} from 'mongoose';

import DashboardEvents from './dashboard.events';

/**
 * Schemas
 */
let DashboardUserSchema = new Schema({
  fullname: String,
  dashboard: {
    type: {
      savedWidgets: [{
        id: String,
        tag: String,
        config: Object
      }],
      publishedWidgets: [{
        id: String,
        tag: String,
        config: Object
      }]
    },
    default: {
      savedWidgets: [],
      publishedWidgets: []
    }
  }
});

/**
 * Options
 */

/**
 * Statics
 */
DashboardUserSchema.static('saveWidgets', saveWidgets);
DashboardUserSchema.static('findSavedWidgets', findSavedWidgets);
DashboardUserSchema.static('publishWidget', publishWidget);
DashboardUserSchema.static('unpublishWidget', unpublishWidget);
DashboardUserSchema.static('findPublishedWidgets', findPublishedWidgets);
DashboardUserSchema.static('findAllPublishedWidgets', findAllPublishedWidgets);

/**
 * Functions
 */
async function saveWidgets(userId, widgets) {
  return this.findByIdAndUpdate(userId, {
    'dashboard.savedWidgets': widgets
  })
    .exec();
}

async function findSavedWidgets(userId) {
  let user = await this.findOne({
    _id: userId,
    'dashboard.savedWidgets': {$exists: true}
  })
    .select('dashboard.savedWidgets')
    .exec();

  if (user)
    return user.dashboard.savedWidgets;
  return [];
}

async function publishWidget(userId, widget) {
  widget.publishedAt = new Date();

  await this.findByIdAndUpdate(userId, {
    $push: {
      'dashboard.publishedWidgets': widget
    }
  })
    .exec();

  DashboardEvents.emit('dashboard:publish', widget);
}

async function unpublishWidget(userId, widgetId) {
  await this.findByIdAndUpdate(userId, {
    $pull: {
      'dashboard.publishedWidgets': {
        id: widgetId
      }
    }
  })
    .exec();

  DashboardEvents.emit('dashboard:unpublish');
}

async function findPublishedWidgets(userId) {
  let user = await this.findOne({
    _id: userId,
    'dashboard.publishedWidgets': {$exists: true}
  })
    .select('dashboard.publishedWidgets')
    .exec();

  if (user)
    return user.dashboard.publishedWidgets;
  return [];
}

async function findAllPublishedWidgets() {
  let users = await this.find({
    'dashboard.publishedWidgets': {$exists: true}
  })
    .select('fullname dashboard.publishedWidgets')
    .exec();

  let publishedWidgetGroups = users.map(user => {
    return user.dashboard.publishedWidgets.map(widget => {
      widget.publishedBy = user.fullname;
      return widget;
    });
  });

  return [].concat(...publishedWidgetGroups);
}

/**
 * Models
 */
export let User = mongoose.model('DashboardUser', DashboardUserSchema, 'users');

/**
 * Exports
 */
export default User;
