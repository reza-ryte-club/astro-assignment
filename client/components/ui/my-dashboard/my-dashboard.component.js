'use strict';

/**
 * Imports
 */
import angular from 'angular';
import jquery from 'jquery';

import './my-dashboard.service';

/**
 * My Dashboard Component
 */
class MyDashboardController {
  isReady = true;

  /** @ngInject */
  constructor($scope, $element, $compile, dragularService, myDashboardService) {
    this.$scope = $scope;
    this.$element = jquery($element);
    this.$compile = $compile;

    this.dragular = dragularService;
    this.myDashboard = myDashboardService;
  }

  $onInit() {
    this.myWidgets = this.$element.find('.my-widgets');

    this.dragular(this.myWidgets, {});

    this._load();
  }

  createTop(widget) {
    let widgetTag = widget.tag;
    let widgetConfig = widget.config || {};

    widget = this.myDashboard.createTop(widgetTag, widgetConfig);

    let myWidget = this._generate(widget);
    this.myWidgets.prepend(myWidget);
  }

  createBottom(widget) {
    let widgetTag = widget.tag;
    let widgetConfig = widget.config || {};

    widget = this.myDashboard.createBottom(widgetTag, widgetConfig);

    let myWidget = this._generate(widget);
    this.myWidgets.append(myWidget);
  }

  removeAll() {
    this.myDashboard.removeAll();
    this.myWidgets.empty();
  }

  _generate(widget) {
    let widgetTemplate = `<${widget.tag} id="${widget.id}" 
                                         config="$ctrl.myDashboard.find('${widget.id}').config"/>`;
    return this.$compile(widgetTemplate)(this.$scope);
  }

  _load() {
    this.isReady = false;
    this.myDashboard.findAll()
      .then(widgets => {
        widgets.forEach(widget => {
          let myWidget = this._generate(widget);
          this.myWidgets.append(myWidget);
        });
      })
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
}

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.widgets')
  .component('myDashboard', {
    template: require('./my-dashboard.html'),
    controller: MyDashboardController
  })
  .name;
