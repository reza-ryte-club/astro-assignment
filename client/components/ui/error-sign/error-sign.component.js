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
  .component('errorSign', {
    template: require('./error-sign.html'),
    transclude: true
  })
  .name;
