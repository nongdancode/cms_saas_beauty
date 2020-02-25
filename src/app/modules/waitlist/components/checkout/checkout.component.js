(function(){
    const module = angular.module('module.waitlist.components.checkout', []);

    class CheckoutComponent {
        constructor($scope, $uibModal, UtilityService, BookingService) {
            this.$scope = $scope;
            this.$uibModal = $uibModal;
            this.UtilityService = UtilityService;
            this.BookingService = BookingService;
        }

        $onInit() {
            this.data = {
                invoice: this.entry.values.invoice,
                viewType: 'view',
                paymentType: 'cash'
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
                const { id, name, status, phone, deposit, invoice } = this.entry.values;

                const checkout = { id, name, status, phone, deposit, invoice };

                this.BookingService
                    .confirmCheckout(checkout)
                    .finally(() => this.modal.close());
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
