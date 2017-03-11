'use strict';

/**
 * Imports
 */
import DashboardEvents from './dashboard.events';

/**
 * Socket Initialization
 *
 * @param socket
 */
export function initialize(socket) {
  publish(socket);
  unpublish(socket);
}

/**
 * Socket Messages
 */

/**
 * Publish Widget Message
 *
 * @param socket
 */
function publish(socket) {
  let listener = widget => {
    socket.emit('dashboard:publish', {
      timestamp: Date.now(),
      widget: widget
    });
  };

  DashboardEvents.on('dashboard:publish', listener);

  socket.on('disconnect', () => {
    DashboardEvents.removeListener('dashboard:publish', listener);
  });
}

/**
 * Unpublish Widget Message
 *
 * @param socket
 */
function unpublish(socket) {
  let listener = () => {
    socket.emit('dashboard:unpublish', {
      timestamp: Date.now()
    });
  };

  DashboardEvents.on('dashboard:unpublish', listener);

  socket.on('disconnect', () => {
    DashboardEvents.removeListener('dashboard:unpublish', listener);
  });
}
