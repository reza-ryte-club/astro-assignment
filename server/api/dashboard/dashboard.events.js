'use strict';

/**
 * Imports
 */
import {EventEmitter} from 'events';

/**
 * Emitter
 */
let DashboardEvents = new EventEmitter();

/**
 * Options
 */
DashboardEvents
  .setMaxListeners(0);

/**
 * Exports
 */
export default DashboardEvents;
