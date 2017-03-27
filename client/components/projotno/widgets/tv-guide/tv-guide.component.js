'use strict';

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
    this.dayStartFrom = moment().startOf('day')
      .format('YYYY-MM-DD');
    this.dayEnd = moment().startOf('day')
      .add(7, 'd')
      .format('YYYY-MM-DD');
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
    this.channelIds = [];
    this.paginatedChannels.forEach(chnl => this.channelIds.push(chnl.channelId));
    this._getEvents();
  }

  previous() {
    if(this.paginationStart > 0) {
      this.paginationStart = this.paginationStart - 10;
      this.paginationEnd = this.paginationEnd - 10;
      this._getPaginatedChannels();
    }
    console.log(this.channelIds);
  }

  next() {
    console.log('tv channels');
    console.log(this.tvChannels.length);
    if(this.paginationEnd != this.tvChannels.length - 1) {
      this.paginationStart = this.paginationStart + 10;
      this.paginationEnd = this.paginationEnd + 10;
      this._getPaginatedChannels();
    }
    console.log(this.channelIds);
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
    this.tvChannels = channels;
    this._getPaginatedChannels();
  }
  _getEvents() {
    this._fetchTheEvents()
    .then(response => {
      if(response.body) {
        this.eventData = JSON.parse(response.body);
        this.events = this.eventData.getevent;
      }
      console.log(response);
      if(this.eventData) {
        console.log(this.eventData);
        console.log('events');
        console.log(this.events);
      }
    });
  }

  _fetchTheEvents() {
    console.log('in the fetchevents');
    this.isReady = false;
    let requestURL = `api/meta/getAllEvents?channelId=${this.channelIds}&periodStart=${this.dayStartFrom} 00:00&periodEnd=${this.dayEnd} 23:59`;
    console.log(requestURL);
    return this.$http.get(requestURL)
      .then(res => res.data.reports)
      .catch(() => {
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
    .component('tvGuide', {
      template: require('./tv-guide.html'),
      controller: TvGuideComponent,
      bindings: {
        id: '@',
        config: '='
      }
    })
    .name;
