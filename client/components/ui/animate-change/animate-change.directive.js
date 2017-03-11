'use strict';

/**
 * Imports
 */
import angular from 'angular';

/**
 * Animate Change Directives
 *
 * Usage: <any animate-change-model="ANGULAR_EXPRESSION" animate-change-class="HTML CLASSES"></any>
 *
 * animate-change-model is a one-way binding to an angular expression/variable.
 * animate-change-class is a string.
 */
class AnimateChangeModelDirective {
  restrict = 'A';

  /** @ngInject */
  constructor($animate) {
    this.$animate = $animate;
  }

  link(scope, element, attributes) {
    let ngModel = attributes.animateChangeModel;
    let ngClass = attributes.animateChangeClass;

    scope.$watch(ngModel, (newVal, oldVal) => {
      if (newVal == oldVal)
        return;

      this.$animate.addClass(element, ngClass)
        .then(() => {
          element.removeClass(ngClass);
        });
    });
  }
}

class AnimateChangeClassDirective {
  restrict = 'A';
}

/**
 * Animate Change Directive functions
 */
function animateChangeModelDirective($animate) {
  'ngInject';
  return new AnimateChangeModelDirective($animate);
}

function animateChangeClassDirective($animate) {
  'ngInject';
  return new AnimateChangeClassDirective($animate);
}

/**
 * Angular Configuration
 */
export default angular
  .module('projotnoDashboard.ui')
  .directive('animateChangeModel', animateChangeModelDirective)
  .directive('animateChangeClass', animateChangeClassDirective)
  .name;
