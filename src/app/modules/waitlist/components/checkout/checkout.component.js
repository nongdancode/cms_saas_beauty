(function(){
    const module = angular.module('module.waitlist.components.checkout', []);

    class CheckoutComponent {
        constructor($scope, $uibModal, UtilityService) {
            this.$scope = $scope;
            this.$uibModal = $uibModal;
            this.UtilityService = UtilityService;
        }

        $onInit() {
            this.data = {
                invoice: this.entry.values.invoice,
                viewType: 'view',
                paymentType: 'cash',
                discount: '00'
            };
        }

        toggleViewType() {
            this.data.viewType = this.data.viewType === 'view' ? 'edit' : 'view';
        };

        showModal() {
            this.modal = this.$uibModal.open({
                animation: true,
                templateUrl: 'invoice-modal.html',
                size: 'lg',
                scope: this.$scope
            });

        };

        get disablePrint() {
            return this.data.viewType !== 'view'
                || this.data.invoice.services.some(service => !service.name || typeof service.price !== 'number');
        };

        get disableToggle() {
            return this.data.invoice.services.length === 0
                || this.data.invoice.services.some(service => !service.name || typeof service.price !== 'number');
        };

        print() {
            this.UtilityService.print('app-invoice').then(res => {
                this.modal.close();
            });
        };

        cancel() {
            this.modal.close();
        };
    }

    module.component('maCheckout', {
        bindings: {
            entry: '<'
        },
        controller: CheckoutComponent,
        templateUrl: 'app/modules/waitlist/components/checkout/checkout.component.html'
    });
})();
