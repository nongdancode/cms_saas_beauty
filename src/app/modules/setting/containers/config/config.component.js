(function(){
    const module = angular.module('module.setting.containers.config', []);

    class ConfigComponent {
        constructor($scope, $compile, $state, $stateParams, $resolve, ModalService) {
            this.$scope = $scope;
            this.$compile = $compile;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$resolve = $resolve;
            this.ModalService = ModalService;
        }

        $onInit() {
            this.data = {};

            this.data.config = this.$resolve.config;

            this.data.categories = [...new Set(this.data.config.map(row => row.category))];

            this.data.active = this.data.categories && this.data.categories[0];
        };

        select(category) {
            this.data.active = category;
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
