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
        'banner-checkin-text': {
          type: 'text',
          value: ''
        },
        'banner-checkin-color': {
          type: 'color',
          value: 'blue'
        }
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
          value: '',
          mask: '99'
        },
        'store-phone': {
          type: 'text',
          value: '',
          mask: '9999999999'
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

      this.customCategories = {
        'open-hours': {
          timeToDate: time => {
            const [hour, min] = time.split(':');

            return moment().set('hour', hour).set('minutes', min);
          },
          dateToTime: function(date) {
            const formatNumber = num => {
              return ("0" + num).slice(-2);
            };

            return `${formatNumber(date.hours())}:${formatNumber(date.minutes())}`;
          },
          format: function(data, fn=this.timeToDate) {
            data = _.cloneDeep(data);

            Object.values(data).forEach(config => {
              config.from = fn(config.from);
              config.to = fn(config.to);
            })

            return data;
          },
          data: {
            mon: {
              from: '08:00',
              to: '17:00'
            },
            tue: {
              from: '08:00',
              to: '17:00'
            },
            wed: {
              from: '08:00',
              to: '17:00'
            },
            thu: {
              from: '08:00',
              to: '17:00'
            },
            fri: {
              from: '08:00',
              to: '17:00'
            },
            sat: {
              from: '08:00',
              to: '17:00'
            },
            sun: {
              from: '08:00',
              to: '17:00'
            }
          }
        }
      }
    }

    $onInit() {
      this.data = {};

      this.data.config = this.merge(this.defaultConfig, this.$resolve.config);

      this.customCategories['open-hours'].data =
        this.customCategories['open-hours'].format({
          ...this.customCategories['open-hours'].data,
          ...this.$resolve.openHours
        });

      this.data.categories = [
        ...Object.keys(this.data.config),
        ...Object.keys(this.customCategories)
      ];

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
      this.ConfigService.save(this.data.config)
          .then(res => {
            this.ModalService.success('Update config successfully!');
          });
    }

    saveOpenHours() {
      this.ConfigService.saveOpenHours(
        this.customCategories['open-hours'].format(
          this.customCategories['open-hours'].data,
          this.customCategories['open-hours'].dateToTime
        )
      ).then(res => {
        this.ModalService.success('Update open hours successfully!');
      });
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
