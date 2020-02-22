(function(){
    const module = angular.module('module.marketing.components.history-customer', []);

    class HistoryCustomerComponent {
        data = {};

        constructor($scope, $timeout, $uibModal, notification, MarketingService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$uibModal = $uibModal;
            this.notification = notification;
            this.MarketingService = MarketingService;
        }

        $onInit() {
            this.data.history = [
                {
                    id: 1,
                    service_name: 'Lash 1',
                    count: 10,
                    note: 'Pick Jenny'
                },
                {
                    id: 2,
                    service_name: 'Lash 2',
                    count: 6,
                    note: 'Pick Alice'
                }
            ];

            this.MarketingService.historyCustomer(this.id);
        }

        showModal() {
            this.modal = this.$uibModal.open({
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
