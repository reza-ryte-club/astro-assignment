'use strict';

/**
 * Imports
 */
import angular from 'angular';

import ngNvd3 from 'angular-nvd3';
import dragular from 'dragular';
import ngMoment from 'angular-moment';
import ngChart from 'angular-chart.js';
import tableSort from 'angular-tablesort';
import moment from 'moment-timezone';

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.pages', [
  ngNvd3,
  dragular,
  ngMoment,
  ngChart,
  tableSort
])
  .constant('moment', moment)
  .name;
