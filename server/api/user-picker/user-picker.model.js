'use strict';

/**
 * Imports
 */
import mongoose, {Schema} from 'mongoose';

/**
 * Schemas
 */
let UserPickerSchema = new Schema({
  fullname: String,
  usertype: {
    type: String,
    enum: ['doctor', 'rmp', 'fieldstaff', 'mpo', 'admin', 'cca', 'te']
  },
  center: String
});

/**
 * Options
 */

/**
 * Statics
 */
UserPickerSchema
  .static('findAllRMPs', findAllRMPs)
  .static('findAllHPOs', findAllHPOs)
  .static('findAllTEs', findAllTEs)
  .static('findAllDoctors', findAllDoctors)
  .static('findAllAdmins', findAllAdmins);

/**
 * Models
 */
let User = mongoose.model('UserPicker', UserPickerSchema, 'users');

/**
 * Functions for User Picker
 */

function findAllRMPs() {
  return findAllByType('rmp');
}

function findAllHPOs() {
  return findAllByType('mpo');
}

function findAllTEs() {
  return findAllByType('te');
}

function findAllDoctors() {
  return findAllByType('doctor');
}

function findAllAdmins() {
  return findAllByType('admin');
}

function findAllByType(type) {
  return User.find({
    'usertype': type
  })
    .select('_id fullname')
    .sort('fullname _id')
    .exec();
}

/**
 * Exports
 */
export default User;
