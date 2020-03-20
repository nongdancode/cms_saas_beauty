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
      'field': '&',
      'value': '='
    },
    controller: ImageFieldComponent,
    template: '<img ng-show="$ctrl.value" src="{{ $ctrl.value }}" height="42" width="42" ng-click="$ctrl.upload()" />' +
      '<ma-file-field ng-hide="$ctrl.value" id="uploader" field="$ctrl.field()" value="$ctrl.value"></ma-file-field>'
  });

  class Type extends Field {
    constructor(name) {
      super(name);
      this._type = 'image';
      this._uploadInformation = {
        url: '/upload',
        accept: 'image/*'
      };
    }

    uploadInformation(information) {
      if (!arguments.length) return this._uploadInformation;
      this._uploadInformation = information;
      return this;
    }
  }

  const View = {
    getReadWidget: () => '<img src="{{ value }}" height="42" width="42" />',
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
