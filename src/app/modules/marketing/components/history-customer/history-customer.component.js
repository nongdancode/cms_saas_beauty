(function(){
    const module = angular.module('module.marketing.components.history-customer', []);

    class HistoryCustomerComponent {
        data = {
            history: []
        };

        constructor($scope, $timeout, ModalService, MarketingService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.ModalService = ModalService;
            this.MarketingService = MarketingService;
        }

        $onInit() {

        }

        showModal() {
            this.MarketingService.historyCustomer(this.id)
                .then(history => {
                    this.$timeout(() => {
                        this.data.history = history;
                    });
                });

            this.modal = this.ModalService.create({
                animation: true,
                templateUrl: 'history-customer-modal.html',
                size: 'md',
                scope: this.$scope
            });

        };

        close() {
            this.modal.close();
        }
    }

    module.component('maHistoryCustomer', {
        bindings: {
            id: '<'
        },
        controller: HistoryCustomerComponent,
        templateUrl: 'app/modules/marketing/components/history-customer/history-customer.component.html'
    });
})();
