'use strict';

/**
 * Imports
 */
import angular from 'angular';

import homeRoutes from './home.routes';

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.pages')
  .config(homeRoutes)
  .name;
