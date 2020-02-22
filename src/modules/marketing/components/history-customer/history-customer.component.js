(function(){
    const module = angular.module('module.marketing.components.history-customer', []);

    class HistoryCustomerComponent {
        constructor($scope, $timeout, $uibModal, notification, MarketingService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$uibModal = $uibModal;
            this.notification = notification;
            this.MarketingService = MarketingService;
        }

        $onInit() {
            this.data = {};
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
        bindings: {},
        controller: HistoryCustomerComponent,
        templateUrl: 'src/modules/marketing/components/history-customer/history-customer.component.html'
    });
})();
