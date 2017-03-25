'use strict';

/**
 * Imports
 */

import tableSort from 'angular-tablesort';

class TvGuideComponent {
  isReady = false;
  isError = false;

  /** @ngInject */
  constructor($http, $uibModal) {
    this.$http = $http;
    this.$uibModal = $uibModal;
  }

  $onInit() {
    this.paginationStart = 0;
    this.paginationEnd = this.paginationStart + 10;
    this.paginatedChannels = [];
    this.tvChannels = [];
    this.refresh();

  }


  refresh() {
    this._fetch()
      .then(data => {
        this._process(data);
      });
  }

  _getPaginatedChannels() {
    this.paginatedChannels = [];
    for(var i = this.paginationStart; i < this.paginationEnd; i++) {
      this.paginatedChannels.push(this.tvChannels[i]);
    }
  }

  previous() {
    console.log('previous');
    console.log(this.paginationStart);
    if(this.paginationStart > 0) {
      this.paginationStart = this.paginationStart - 10;
      this.paginationEnd = this.paginationEnd - 10;
      this._getPaginatedChannels();
    }
  }

  next() {
    console.log('next');
    console.log(this.paginationEnd);
    console.log(this.config.channels.length);
    if(this.paginationEnd != this.config.channels.length - 1) {
      this.paginationStart = this.paginationStart + 10;
      this.paginationEnd = this.paginationEnd + 10;
      this._getPaginatedChannels();
    }
  }
  _fetch() {
    console.log('in the fetch');
    this.isReady = false;
    return this.$http.get('api/meta/getAllChannels')
      .then(res => res.data.reports)
      .catch(() => {
        this.isError = true;
        return [];
      })
      .finally(() => {
        this.isReady = true;
      });
  }

  _process(data) {
    let channelData = JSON.parse(data.body);
    let channels = channelData.channels;
    console.log('channels');
    this.tvChannels = channels;
    this._getPaginatedChannels();
  }
}
/**
 * Angular Configuration
 */

export default angular.module('projotnoDashboard.widgets')
    .component('tvGuide', {
      template: require('./tv-guide.html'),
      controller: TvGuideComponent,
      bindings: {
        id: '@',
        config: '='
      }
    })
    .name;
