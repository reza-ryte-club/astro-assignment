'use strict';

/**
 * Imports
 */

import tableSort from 'angular-tablesort';


class AllChannelsComponent {
  isReady = false;
  isError = false;

  /** @ngInject */
  constructor($http, $uibModal) {
    this.$http = $http;
    this.$uibModal = $uibModal;
  }

  $onInit() {
    if(this.config.channels == undefined) {
      this.config.channelExists = false;
    } else {
      this.config.channelExists = true;
    }
    // this.selectedChannel =  [{favorite: true, channelStbNumber: 101, channelTitle: "TV 1", channelId: 95, $$hashKey: "object:215"}];
    this.selectedChannel = [5,4,2];


    this.refresh();
  }


  refresh() {
    this._fetch()
      .then(data => {
        this._process(data);
      });
  }

  _fetch() {
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
    if(!this.config.channelExists) {
      this.config.channels = channels;
      this.config.channels.forEach(theChannel => {
        theChannel.favorite = false;
      });
    }
  }

  makeFav(channel) {
    if(!channel.favorite)
      channel.favorite = true;
  }

  removeFav(channel) {
    if(channel.favorite)
      channel.favorite = false;
  }

  showInformation(channel){
    this.selectedChannel = channel
    this.$uibModal.selectedChannel = this.selectedChannel;
    this.$uibModal.open({
      templateUrl: 'channelDescription.html',
      scope: this.$scope
    })
    .result
    .then(() => 0)
    .catch(() => {
      });
  }
}
/**
 * Angular Configuration
 */

export default angular.module('projotnoDashboard.widgets')
    .component('allChannels', {
      template: require('./all-channels.html'),
      controller: AllChannelsComponent,
      bindings: {
        id: '@',
        config: '='
      }
    })
    .name;
