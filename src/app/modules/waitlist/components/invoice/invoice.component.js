(function(){
    const module = angular.module('module.waitlist.components.invoice', []);

    class InvoiceComponent {
        $onInit() {
            this.data = {
                items: this.invoice.services,
                today: moment().format('LL'),
                leftInfo: `${this.invoice.about.address.streetAddress}\n${this.invoice.about.address.city}\n${this.invoice.about.address.state}`,
                rightInfo: `${this.customer.name}\n${this.customer.phone}`
            };
        }

        total() {
            const total = this.invoice.services.reduce((result, service) => {
                return result + (service.price - (service.price * +service.discount / 100));
            }, 0);

            const tax = total * this.invoice.tax / 100;

            return this.invoice.total = total + tax - this.invoice.deposit;
        };

        add() {
            this.data.items.push({
                name: '',
                price: ''
            });
        };

        remove(index) {
            this.data.items.splice(index, 1);
        };
    }

    module.component('appInvoice', {
        bindings: {
            invoice: '<',
            customer: '<',
            viewType: '<'
        },
        controller: InvoiceComponent,
        templateUrl: 'app/modules/waitlist/components/invoice/invoice.component.html'
    });
})();
