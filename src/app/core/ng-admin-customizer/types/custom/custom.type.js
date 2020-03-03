(function() {
  const module = angular.module('core.ng-admin-customizer.types.custom', []);

  class CustomFilterComponent {
    $onInit() {
      this.ngModel = {
        ..._.pickBy(this.ngModel, (value, key) => ['type', 'data'].includes(key)),
        ...this.default
      };
    }

    change() {

    }
  }

  module.component('maCustomFilter', {
    bindings: {
      default: '=',
      ngModel: '='
    },
    controller: CustomFilterComponent,
    template: '<div style="display:flex; justify-content: space-between;">' +
      '<input type="text" class="form-control" style="display:inline-block; width: 48%;" ng-model="$ctrl.ngModel.data.field" />' +
      '<input type="text" class="form-control" style="display:inline-block; width: 48%;" ng-model="$ctrl.ngModel.data.value" />' +
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
