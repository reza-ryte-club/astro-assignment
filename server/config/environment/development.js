'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/mDoc',
    options: {
      server: {
        socketOptions: {
          keepAlive: 300000,
          connectTimeoutMS: 30000
        }
      }
    }
  },

  // Seed database on startup
  seedDB: false

};
