(function() {
  const module = angular.module('core.ng-admin-customizer.type.custom', []);

  class CustomFieldComponent {
    $onInit() {
      this.ngModel = {
        ..._.pickBy(this.ngModel, (value, key) => ['type', 'data'].includes(key)),
        ...this.default
      };

      this.operators = [
        {
          key: '$in',
          text: 'in'
        },
        {
          key: '$eq',
          text: '='
        },
        {
          key: '$lt',
          text: '<'
        },
        {
          key: '$lte',
          text: '<='
        },
        {
          key: '$gt',
          text: '>'
        },
        {
          key: '$gte',
          text: '>='
        }
      ];
    }

    change() {

    }
  }

  module.component('maCustomField', {
    bindings: {
      default: '=',
      ngModel: '='
    },
    controller: CustomFieldComponent,
    template: '<div style="display:flex; justify-content: space-between;">' +
      '<input type="text" class="form-control" style="display:inline-block; width: 32%;" ng-model="$ctrl.ngModel.data.field" />' +
      '<select ng-options="operator.key as operator.text for operator in $ctrl.operators" class="form-control" style="display:inline-block; width: 32%;" ng-model="$ctrl.ngModel.data.operator"><select/>' +
      '<input type="text" class="form-control" style="display:inline-block; width: 32%;" ng-model="$ctrl.ngModel.data.value" />' +
      '</div>'
  });

  class Type extends Field {
    constructor(name) {
      super(name);

      this._type = 'custom';

      this._defaultValue = {
        type: 'custom',
        data: {}
      };
    }

    field(field) {
      this._defaultValue.data.field = field;

      return this;
    }

    operator(operator) {
      this._defaultValue.data.operator = operator;

      return this;
    }

    defaultValue(value) {
      this._defaultValue.data.value = value;

      return this;
    }
  }

  const View = {
    getReadWidget: () => '',
    getLinkWidget: () => '',
    getFilterWidget: () => '<ma-custom-filter default="value._defaultValue" ng-model="value"></ma-custom-filter>',
    getWriteWidget: () => ''
  };

  module.config(function(NgAdminConfigurationProvider, FieldViewConfigurationProvider) {
    const nga = NgAdminConfigurationProvider;
    const fvp = FieldViewConfigurationProvider;

    nga.registerFieldType('custom', Type);
    fvp.registerFieldView('custom', View);
  });
})();
