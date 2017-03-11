'use strict';

/**
 * Imports
 */
import angular from 'angular';

import dashboardRoutes from './dashboard.routes';

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.pages')
  .config(dashboardRoutes)
  .name;
