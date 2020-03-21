(function(){
    const module = angular.module('module.waitlist.components.checkout', []);

    class CheckoutComponent {
        constructor($scope, $state, ModalService, UtilityService, BookingService) {
            this.$scope = $scope;
            this.$state = $state;
            this.ModalService = ModalService;
            this.UtilityService = UtilityService;
            this.BookingService = BookingService;
        }

        $onInit() {
            this.title = this.title || 'Checkout';

            this.data = {
                invoice: this.entry.values.invoice,
                viewType: 'view',
                paymentType: 'cash',
                note: ''
            };
        }

        toggleViewType() {
            this.data.viewType = this.data.viewType === 'view' ? 'edit' : 'view';
        };

        showModal() {
            this.modal = this.ModalService.create({
                animation: true,
                templateUrl: 'invoice-modal.html',
                size: 'lg',
                scope: this.$scope
            });

        };

        get disablePrint() {
            return this.data.viewType !== 'view'
                || this.data.invoice.services.some(
                    service => ['name', 'price', 'discount'].some(field => typeof service[field] === 'undefined')
                );
        };

        get disableToggle() {
            return this.data.invoice.services.length === 0
                || this.data.invoice.services.some(
                    service => ['name', 'price', 'discount'].some(field => typeof service[field] === 'undefined')
                );
        };

        print() {
            this.UtilityService.print('app-invoice').then(res => {
                if (this.printOnly) {
                    this.$state.reload();
                    return;
                }

                const { id, name, status, phone, deposit, invoice } = this.entry.values;

                const { paymentType, note } = this.data;

                const checkout = { id, name, status, phone, deposit, invoice, paymentType, note };

                this.BookingService
                    .confirmCheckout(checkout)
                    .finally(() => this.$state.reload());
            });
        };

        cancel() {
            this.modal.close();
        };
    }

    module.component('maCheckout', {
        bindings: {
            entry: '<',
            title: '@',
            printOnly: '<'
        },
        controller: CheckoutComponent,
        templateUrl: 'app/modules/waitlist/components/checkout/checkout.component.html'
    });
})();
