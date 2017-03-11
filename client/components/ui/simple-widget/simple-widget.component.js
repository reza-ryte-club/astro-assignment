'use strict';

/**
 * Imports
 */
import angular from 'angular';

/**
 * Simple Widget Component
 */
export class SimpleWidgetController {
  /** @ngInject */
  constructor($scope, $element, myDashboardService) {
    this.$scope = $scope;
    this.$element = $element;
    this.myDashboard = myDashboardService
  }

  $onInit() {
    this.tag = this.$element.parent().prop('tagName').toLowerCase();

    if (this.defaultTitle == undefined)
      this.defaultTitle = 'Simple Widget';
    if (this.defaultWidth == undefined)
      this.defaultWidth = 6;
    if (this.isReady == undefined)
      this.isReady = true;
    if (this.isError == undefined)
      this.isError = false;

    if (this.config.title == undefined)
      this.config.title = this.defaultTitle;
    if (this.config.width == undefined)
      this.config.width = this.defaultWidth;
    if (this.config.isMaximized == undefined)
      this.config.isMaximized = false;
    if (this.config.isCollapsed == undefined)
      this.config.isCollapsed = false;
    if (this.config.isCustomizing == undefined)
      this.config.isCustomizing = false;
  }

  moreWidth() {
    if (this.config.width < 12)
      this.config.width++;
  }

  lessWidth() {
    if (this.config.width > 1)
      this.config.width--;
  }

  toggleMaximize() {
    this.config.isMaximized = !this.config.isMaximized;
  }

  toggleCollapse() {
    this.config.isCollapsed = !this.config.isCollapsed;
  }

  toggleCustomize() {
    this.config.isCustomizing = !this.config.isCustomizing;
    if (!this.config.title)
      this.config.title = this.defaultTitle;

    this.onCustomize({
      $isCustomizing: this.config.isCustomizing
    });
  }

  checkCustomize(event) {
    if (event.keyCode == 13)
      this.toggleCustomize();
  }

  publish() {
    this.isReady = false;
    this.myDashboard.publish(this.tag, this.config)
      .catch(() => {
        // FIXME: I don't know why this $apply is needed
        this.$scope.$apply(() => {
          this.isError = true;
        });
      })
      .finally(() => {
        // FIXME: I don't know why this $apply is needed
        this.$scope.$apply(() => {
          this.isReady = true;
        });
      });
  }

  close() {
    if (this.id)
      this.myDashboard.remove(this.id);
    this.$element.parent().remove();
  }
}

/**
 * Angular Configuration
 */
export default angular
  .module('projotnoDashboard.ui')
  .component('simpleWidget', {
    template: require('./simple-widget.html'),
    controller: SimpleWidgetController,
    transclude: true,
    bindings: {
      id: '<',
      config: '=',
      defaultTitle: '@',
      defaultWidth: '@',
      isReady: '<',
      isError: '<',
      onCustomize: '&'
    }
  })
  .name;
