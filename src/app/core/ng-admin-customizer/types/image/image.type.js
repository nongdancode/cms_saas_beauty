(function() {
  const module = angular.module('core.ng-admin-customizer.type.image', []);

  class ImageFieldComponent {
    constructor($timeout) {
      this.$timeout = $timeout;
    }

    $onInit() {

    }

    change() {

    }

    upload() {
      const input = angular.element(document.querySelector('#uploader')).find('input')[0];

      input.click();
    }
  }

  module.component('maImageField', {
    bindings: {
      'field': '=',
      'value': '='
    },
    controller: ImageFieldComponent,
    template: '<img ng-show="$ctrl.value" src="{{ $ctrl.value }}" height="{{ $ctrl.field._size.height }}" width="{{ $ctrl.field._size.width }}" ng-click="$ctrl.upload()" />' +
      '<ma-file-field ng-hide="$ctrl.value" id="uploader" field="$ctrl.field" value="$ctrl.value"></ma-file-field>'
  });

  class Type extends Field {
    constructor(name) {
      super(name);

      this._type = 'image';

      this._size = {
        width: 64,
        height: 64
      };

      this._uploadInformation = {
        accept: 'image/*'
      };
    }

    size(size) {
      this._size = size;
    }

    uploadInformation(information) {
      if (!arguments.length) return this._uploadInformation;
      this._uploadInformation = {
        ...this._uploadInformation,
        ...information
      };
      return this;
    }
  }

  const View = {
    getReadWidget: () => '<img src="{{ value }}" height="{{ field._size.height }}" width="{{ field._size.width }}" />',
    getLinkWidget: () => '',
    getFilterWidget: () => '',
    getWriteWidget: () => '<ma-image-field field="field" value="value"></ma-image-field>'
  };

  module.config(function(NgAdminConfigurationProvider, FieldViewConfigurationProvider) {
    const nga = NgAdminConfigurationProvider;
    const fvp = FieldViewConfigurationProvider;

    nga.registerFieldType('image', Type);
    fvp.registerFieldView('image', View);
  });
})();
