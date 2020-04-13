(function(){
    const module = angular.module('module.setting.containers.config', []);

    class ConfigComponent {
        defaultConfig = {
            'banner-text': {
                category: 'promotion',
                type: 'text',
                value: ''
            },
            'banner-color': {
                category: 'promotion',
                type: 'color',
                value: 'blue'
            },
            'enable-client': {
                category: 'client',
                type: 'boolean',
                value: true
            },
            'disable-client-text': {
                category: 'client',
                type: 'text',
                value: 'We are temporary closed , sorry and see you soon'
            },
            'timezone': {
                category: 'client',
                type: 'timezone',
                value: ''
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

            this.data.config = this.mergeByKey(this.defaultConfig, this.$resolve.config);

            this.data.categories = [...new Set(this.data.config.map(row => row.category))];

            this.data.active = this.data.categories && this.data.categories[0];
        };

        mergeByKey(defaultConfig, config) {
            const result = _.cloneDeep(defaultConfig);

            config.forEach(item => {
                result[item.key] = item;
            });

            return Object.keys(result).map(key => {
                return {
                    ...result[key],
                    key: key
                };
            });
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
