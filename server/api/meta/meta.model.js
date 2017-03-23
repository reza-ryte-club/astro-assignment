'use strict';

/**
 * Imports
 */
import mongoose, {Schema} from 'mongoose';
var objectId = require('mongoose').Types.ObjectId;
import request from 'request';

export function getAllChannels() {
  return allChannels();
}
export function getAllEvents(channelId, periodStart, periodEnd) {
  return allEvents(channelId, periodStart, periodEnd);
}

function allChannels() {
  return new Promise(function(fullfil, reject) {
    request('http://ams-api.astro.com.my/ams/v3/getChannelList',
      function(error, response) {
        fullfil(response);
      });
  });
}

function allEvents(channelId, periodStart, periodEnd) {
  let requestURL = `http://ams-api.astro.com.my/ams/v3/getEvents?channelId=${channelId}&periodStart=${periodStart}&periodEnd=${periodEnd}`;
  return new Promise(function(fullfil, reject) {
    request(requestURL,
     function(error, response) {
       fullfil(response);
     });
  });
}
