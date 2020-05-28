(function(){
  const module = angular.module('module.setting.containers.config', []);

  class ConfigComponent {
    defaultConfig = {
      promotion: {
        'banner-text': {
          type: 'text',
          value: ''
        },
        'banner-color': {
          type: 'color',
          value: 'blue'
        },
      },
      client: {
        'enable-client': {
          type: 'boolean',
          value: true
        },
        'disable-client-text': {
          type: 'text',
          value: 'We are temporary closed , sorry and see you soon'
        },
        'timezone': {
          type: 'timezone',
          value: ''
        }
      },
      general: {
        'logo': {
          type: 'image',
          value: ''
        }
      },
      information: {
        'store-name': {
          type: 'text',
          value: ''
        },
        'store-address': {
          type: 'text',
          value: ''
        },
        'store-logo': {
          type: 'image',
          value: ''
        },
        'store-tax': {
          type: 'text',
          value: ''
        },
        'store-phone': {
          type: 'text',
          value: ''
        },
      }
    };

    moment = moment;

    constructor($scope, $compile, $state, $stateParams, $resolve, ModalService, ConfigService) {
      this.$scope = $scope;
      this.$compile = $compile;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$resolve = $resolve;
      this.ModalService = ModalService;
      this.ConfigService = ConfigService;
    }

    $onInit() {
      this.data = {};

      this.data.config = this.merge(this.defaultConfig, this.$resolve.config);

      this.data.categories = Object.keys(this.data.config);

      this.data.active = this.data.categories && this.data.categories[0];
    };

    merge(defaultConfig, config) {
      return _.merge({}, defaultConfig, config);
    }

    select(category) {
      this.data.active = category;
    }

    name(key) {
      return key.toCamelCase();
    }

    save() {
      this.ConfigService.save(this.data.config);
    }
  }

  module.component('config', {
    bindings: {
      '$resolve': '<'
    },
    controller: ConfigComponent,
    templateUrl: 'app/modules/setting/containers/config/config.component.html'
  });
})();
