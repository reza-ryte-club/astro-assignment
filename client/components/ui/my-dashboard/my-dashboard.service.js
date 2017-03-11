'use strict';

/**
 * Imports
 */
import angular from 'angular';
import moment from 'moment-timezone';
import uuid from 'uuid/v4';

/**
 * My Dashboard Service
 *
 * Keeps track of the config of all the widgets
 * in user profile or local storage.
 */
class MyDashboardService {
  /** @ngInject */
  constructor($rootScope, $http, $localStorage, Auth) {
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$storage = $localStorage.$default({
      widgets: []
    });
    this.Auth = Auth;
  }

  createTop(tag, config) {
    let widget = {
      id: 'widget-' + uuid(),
      tag: tag,
      config: _deserialize(_serialize(config))
    };

    this.$storage.widgets.unshift(widget);

    return widget;
  }

  createBottom(tag, config) {
    let widget = {
      id: 'widget-' + uuid(),
      tag: tag,
      config: _deserialize(_serialize(config))
    };

    this.$storage.widgets.push(widget);

    return widget;
  }

  remove(id) {
    this.$storage.widgets = this.$storage.widgets.filter(widget => {
      return widget.id != id;
    });
  }

  removeAll() {
    this.$storage.widgets = [];
  }

  find(id) {
    return this.$storage.widgets.find(widget => {
      return widget.id == id;
    });
  }

  async findAll() {
    await this._pull();

    if (this.widgetsWatcher)
      this.widgetsWatcher();
    this.widgetsWatcher = this.$rootScope.$watch(
      () => this.$storage.widgets,
      () => this._push(),
      true
    );

    return this.$storage.widgets;
  }

  async _pull() {
    if (await this.Auth.isLoggedIn()) {
      let res = await this.$http.get('/api/dashboard/my');
      let widgets = _deserialize(_serialize(res.data.widgets));

      if (widgets.length > 0)
        this.$storage.widgets = widgets;
    }
  }

  async _push() {
    if (await this.Auth.isLoggedIn()) {
      let res = await this.$http.post('/api/dashboard/my', {
        widgets: this.$storage.widgets
      });
    }
  }

  async publish(tag, config) {
    if (await this.Auth.isLoggedIn()) {
      let res = await this.$http.post('/api/dashboard/publish', {
        widget: {
          id: 'widget-' + uuid(),
          tag: tag,
          config: config
        }
      });
    }
  }
}

/**
 * Configure $localStorageProvider to use custom serializers and deserializers.
 *
 * @param $localStorageProvider
 */
function configureStorage($localStorageProvider) {
  'ngInject';

  $localStorageProvider.setSerializer(_serialize);
  $localStorageProvider.setDeserializer(_deserialize);
}


/**
 * This serializer automatically converts between Date objects and strings.
 *
 * @param jsonObject
 * @private
 */
function _serialize(jsonObject) {
  return JSON.stringify(jsonObject, (key, value) => {
    if (angular.isDate(value))
      return moment(value).toISOString();
    return value;
  });
}

/**
 * This deserializer automatically converts between Date objects and strings.
 *
 * @param jsonString
 * @private
 */
function _deserialize(jsonString) {
  try {
    return JSON.parse(jsonString, (key, value) => {
      if (angular.isString(value)) {
        let momentValue = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);
        if (momentValue.isValid())
          return momentValue.toDate();
        return value;
      }
      return value;
    });
  }
  catch (err) {
    console.log('WARNING: Widget list could not be parsed, and was reset.');
    return [];
  }
}

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.widgets')
  .config(configureStorage)
  .service('myDashboardService', MyDashboardService)
  .name;
