'use strict';

/**
 * Imports
 */
import angular from 'angular';
import moment from 'moment-timezone';

/**
 * Footer Component
 */
export class FooterComponent {
  $onInit() {
    this.year = moment().year();
  }
}

/**
 * Angular Configuration
 */
export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
