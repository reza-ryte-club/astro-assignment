'use strict';

/**
 * Imports
 */
import angular from 'angular';
import moment from 'moment-timezone';
import jquery from 'jquery';
import daterangepicker from 'bootstrap-daterangepicker';

/**
 * Date Range Picker Component
 *
 * Usage: <date-range-picker start-date="ANGULAR_EXPR" end-date="ANGULAR_EXPR" options="ANGULAR_EXPR">
 *        </date-range-picker>
 *
 * start-date is a two-way binding to an angular expression/variable of a Date.
 * end-date is a two-way binding to an angular expression/variable of a Date.
 * options is a one-way binding to an angular expression/variable.
 * on-change is an output binding triggered when the dates change.
 */
class DateRangePickerController {
  /** @ngInject */
  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = jquery($element);
  }

  $onInit() {
    if (!this.startDate)
      this.startDate = moment().startOf('day');
    if (!this.endDate)
      this.endDate = moment().endOf('day');
    if (!this.options)
      this.options = {};

    this._initOptions();
    this._initPicker();
  }

  $onChanges(changes) {
    if (changes.options)
      this._initOptions();
  }

  _initOptions() {
    this.options = Object.assign({
      startDate: moment(this.startDate).startOf('day'),
      endDate: moment(this.endDate).endOf('day'),

      showDropdowns: true,
      showWeekNumbers: true,
      alwaysShowCalendars: true,
      showCustomRangeLabel: false,
      linkedCalendars: false,

      locale: {
        format: 'YYYY-MM-DD',
        separator: ' to '
      },
      ranges: {
        'Today': [moment().startOf('day'), moment().endOf('day')],
        'This Week': [moment().startOf('week'), moment().endOf('week')],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'This Year': [moment().startOf('year'), moment().endOf('year')],
        'Yesterday': [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')],
        'Last Week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
      }
    }, this.options);
  }

  _initPicker() {
    let inputElem = this.$element.find('input');

    // Initialize DateRangePicker Jquery plugin
    inputElem.daterangepicker(this.options);
    let dateRangePicker = inputElem.data('daterangepicker');

    // Change angular variables when jquery plugin changes dates
    inputElem.on('apply.daterangepicker', (ev, picker) => {
      this.$scope.$apply(() => {
        this.startDate = moment(picker.startDate).startOf('day').toDate();
        this.endDate = moment(picker.endDate).endOf('day').toDate();
      });
      this.$scope.$apply(() => {
        this.onChange({
          $startDate: this.startDate,
          $endDate: this.endDate
        });
      });
    });

    // Change jquery plugin dates when angular variables change
    this.$scope.$watch(() => this.startDate, () => {
      dateRangePicker.setStartDate(moment(this.startDate).startOf('day'));
    });
    this.$scope.$watch(() => this.endDate, () => {
      dateRangePicker.setEndDate(moment(this.endDate).endOf('day'));
    });
  }
}

/**
 * Angular Configuration
 */
export default angular
  .module('projotnoDashboard.ui')
  .component('dateRangePicker', {
    template: require('./date-range-picker.html'),
    controller: DateRangePickerController,
    bindings: {
      startDate: '=',
      endDate: '=',
      options: '<',
      onChange: '&'
    }
  })
  .name;
