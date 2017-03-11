'use strict';

/**
 * Imports
 */
import angular from 'angular';
import tableify from 'tableify';

/**
 * JSON Table Component
 *
 * Usage: <json-table table-data="ARRAY_DATA" table-class="HTML_CLASSES"></json-table>
 *
 * table-data is a one-way binding to an angular expression/variable of array data.
 * table-class is a string.
 */
class JsonTableController  {
  tableClass = '';
  tableHtml = '';

  /** @ngInject */
  constructor($element, $timeout) {
    this.$element = $element;
    this.$timeout = $timeout;
  }

  $onChanges(changes) {
    if (changes.tableClass) {
      this.tableClass = changes.tableClass.currentValue;
    }

    if (changes.tableData) {
      this.tableHtml = tableify(changes.tableData.currentValue);
      this.$timeout(() => {
        this.$element.find('table').addClass(this.tableClass);
      });
    }
  }
}

/**
 * Angular Configuration
 */
export default angular
  .module('projotnoDashboard.ui')
  .component('jsonTable', {
    template: require('./json-table.html'),
    controller: JsonTableController,
    bindings: {
      tableClass: '@',
      tableData: '<'
    }
  })
  .name;
