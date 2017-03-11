'use strict';

/**
 * Imports
 */
import UserPicker from './user-picker.model';

/**
 * Actions
 */

/**
 * List of all RMPs
 *
 * @param req
 * @param res
 */
export function rmps(req, res) {
  UserPicker.findAllRMPs()
    .then(users => {
      res.json({
        timestamp: Date.now(),
        rmps: users
      });
    });
}

/**
 * List of all HPOs
 *
 * @param req
 * @param res
 */
export function hpos(req, res) {
  UserPicker.findAllHPOs()
    .then(users => {
      res.json({
        timestamp: Date.now(),
        hpos: users
      });
    });
}

/**
 * List of all TEs
 *
 * @param req
 * @param res
 */
export function tes(req, res) {
  UserPicker.findAllTEs()
    .then(users => {
      res.json({
        timestamp: Date.now(),
        tes: users
      });
    });
}

/**
 * List of all Doctors
 *
 * @param req
 * @param res
 */
export function doctors(req, res) {
  UserPicker.findAllDoctors()
    .then(users => {
      res.json({
        timestamp: Date.now(),
        doctors: users
      });
    });
}

/**
 * List of all Admins
 *
 * @param req
 * @param res
 */
export function admins(req, res) {
  UserPicker.findAllAdmins()
    .then(users => {
      res.json({
        timestamp: Date.now(),
        admins: users
      });
    });
}
