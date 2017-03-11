'use strict';

/**
 * Imports
 */
import angular from 'angular';

/**
 * Random Quote Component
 */
class SimpleEmbedController {
  /** @ngInject */
  constructor($sce) {
    this.$sce = $sce;
  }

  $onInit() {
    if (this.config.src == undefined)
      this.config.src = '';

    this._customizeStart();
    this._customizeEnd();
  }

  customize(isCustomizing) {
    isCustomizing ? this._customizeStart() : this._customizeEnd();
  }

  customizeCheck(event) {
    if (event.keyCode == 13)
      this._customizeEnd();
  }

  _customizeStart() {
    this.srcTrustedList = [];
  }

  _customizeEnd() {
    if (this.config.src)
      this.srcTrustedList = [ this.$sce.trustAsResourceUrl(this.config.src) ];
  }
}

/**
 * Angular Configuration
 */
export default angular.module('projotnoDashboard.widgets')
  .component('simpleEmbed', {
    template: require('./simple-embed.html'),
    controller: SimpleEmbedController,
    bindings: {
      id: '@',
      config: '='
    }
  })
  .name;
