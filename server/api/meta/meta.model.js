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

  function allChannels() {
  return new Promise(function(fullfil, reject){
    request('http://ams-api.astro.com.my/ams/v3/getChannelList', function(error, response, body) {
      fullfil(response);
    })
  });
}
