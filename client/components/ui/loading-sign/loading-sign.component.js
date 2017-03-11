'use strict';

/**
 * Imports
 */
import angular from 'angular';

/**
 * Angular Configuration
 */
export default angular
  .module('projotnoDashboard.ui')
  .component('loadingSign', {
    template: require('./loading-sign.html'),
    transclude: true
  })
  .name;
