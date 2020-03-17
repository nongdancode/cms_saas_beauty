(function() {
  const module = angular.module('core.ng-admin-customizer.type.daterange', []);

  class DaterangeFilterComponent {
    options = {
      singleDatePicker: false,
      timePicker: true,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last 2 Months': [moment().subtract(2, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Last 4 Months': [moment().subtract(4, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      eventHandlers: {
        'apply.daterangepicker': this.change.bind(this)
      }
    }

    $onInit() {
      if (!(this.ngModel && this.ngModel.startDate)) {
        this.ngModel = {
          type: 'daterange',
          data: {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
          },
          ..._.pickBy(this.ngModel, (value, key) => ['type', 'data'].includes(key)),
          ...this.default
        };
      }

    }

    change(event) {
      this.ngModel = {
        type: 'daterange',
        ...this.ngModel,
        data: event.model
      };
    }
  }

  module.component('maDaterangeFilter', {
    bindings: {
      ngModel: '=',
      default: '='
    },
    controller: DaterangeFilterComponent,
    template: '<input date-range-picker class="form-control date-picker" type="text"' +
      `ng-model="$ctrl.ngModel.data" options="$ctrl.options" />`
  });

  class Type extends Field {
    constructor(name) {
      super(name);

      this._type = 'daterange';

      this._defaultValue = {
        type: 'daterange',
        data: {}
      };
    }

    defaultValue(value) {
      this._defaultValue.data = value;

      return this;
    }
  }

  const View = {
    getReadWidget: () => '',
    getLinkWidget: () => '',
    getFilterWidget: () => '<ma-daterange-filter default="value._defaultValue" ng-model="value"></ma-daterange-filter>',
    getWriteWidget: () => ''
  };

  module.config(function(NgAdminConfigurationProvider, FieldViewConfigurationProvider) {
    const nga = NgAdminConfigurationProvider;
    const fvp = FieldViewConfigurationProvider;

    nga.registerFieldType('daterange', Type);
    fvp.registerFieldView('daterange', View);
  });
})();
