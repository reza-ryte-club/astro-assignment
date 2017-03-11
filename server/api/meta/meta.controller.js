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


/**
 * Reports
 *
 * @param req
 * @param res
 */
