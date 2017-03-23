'use strict';

/**
 * Imports
 */
import * as Meta from './meta.model';

/**
 * Actions
 */
export function getAllChannels(req, res) {
  Meta.getAllChannels()
     .then(reports => {
       res.json({
         timestamp: Date.now(),
         reports
       });
     });
}

export function getAllEvents(req, res) {
  console.log("Hello");
  console.log(req.query.channelId);
  let channelId = req.query.channelId;
  console.log(req.query.periodStart);
  let periodStart = req.query.periodStart;
  console.log(req.query.periodEnd);
  let periodEnd = req.query.periodEnd;
  Meta.getAllEvents(channelId, periodStart, periodEnd)
     .then(reports => {
       res.json({
         timestamp: Date.now(),
         reports
       });
     });
}


/**
 * Reports
 *
 * @param req
 * @param res
 */
