(function(){
    const module = angular.module('module.income.components.history-income', []);

    class HistoryIncomeComponent {
        data = {
            history: []
        };

        constructor($scope, $timeout, ModalService, UserService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.ModalService = ModalService;
            this.UserService = UserService;
        }

        $onInit() {

        }

        showModal() {
            this.UserService.historyIncome(this.id)
                .then(history => {
                    this.data.history = history;
                });

            this.modal = this.ModalService.create({
                animation: true,
                templateUrl: 'history-income-modal.html',
                size: 'md',
                scope: this.$scope
            });

        };

        close() {
            this.modal.close();
        }
    }

    module.component('maHistoryIncome', {
        bindings: {
            id: '<'
        },
        controller: HistoryIncomeComponent,
        templateUrl: 'app/modules/user/components/history-income/history-income.component.html'
    });
})();
