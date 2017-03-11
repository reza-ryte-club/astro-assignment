'use strict';

/**
 * Imports
 */
import angular from 'angular';
import moment from 'moment-timezone';

/**
 * Widget Picker Component
 */
class WidgetPickerController {
  isReady = false;
  isError = false;

  systemWidgets = [];
  publishedWidgets = [];

  widget = null;

  /** @ngInject */
  constructor($http, socket) {
    this.$http = $http;
    this.socket = socket.socket;
  }

  $onInit() {
    this.systemWidgets = require('./system-widgets.json');
    this.systemWidgets.sort((w1, w2) => w1.title.localeCompare(w2.title));

    this.refresh();
    this.socket.on('dashboard:publish', msg => {
      this.refresh();
    });
    this.socket.on('dashboard:unpublish', msg => {
      this.refresh();
    });
  }

  $onDestroy() {
    this.socket.removeAllListeners('dashboard:publish');
    this.socket.removeAllListeners('dashboard:unpublish');
  }

  refresh() {
    this._fetch()
      .then(widgets => {
        this.publishedWidgets = widgets.map(widget => {
          widget.publishedAt = moment(widget.publishedAt).fromNow();
          widget.title = `${widget.config.title}, published by ${widget.publishedBy} ${widget.publishedAt}`;
          return widget;
        });
        this.publishedWidgets.sort((w1, w2) => w1.title.localeCompare(w2.title));
      });
  }

  onSelect() {
    this.onChange({
      $widget: this.widget
    });

    this.widget = null;
  }

  _fetch() {
    return this.$http.get('/api/dashboard')
      .then(res => {
        return res.data.widgets;
      })
      .catch(err => {
        this.isError = true;
        return [];
      })
      .finally(() => {
        this.isReady = true;
      });
  }
}

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.widgets')
  .component('widgetPicker', {
    template: require('./widget-picker.html'),
    controller: WidgetPickerController,
    bindings: {
      title: '@',
      onChange: '&',
      onReset: '&'
    }
  })
  .name;
