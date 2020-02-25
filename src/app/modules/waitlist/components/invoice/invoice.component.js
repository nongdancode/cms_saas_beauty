(function(){
    const module = angular.module('module.waitlist.components.invoice', []);

    class InvoiceComponent {
        $onInit() {
            this.data = {
                items: this.invoice.services,
                today: moment().format('LL'),
                leftInfo: 'Sparksuite, Inc.<br/>12345 Sunny Road<br/>Sunnyville, CA 12345',
                rightInfo: 'Acme Corp.<br/>John Doe<br/>john@example.com'
            };
        }

        total() {
            return this.invoice.services.reduce((result, service) => {
                return result + (service.price - (service.price * +service.discount / 100));
            }, 0);
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
            viewType: '<'
        },
        controller: InvoiceComponent,
        templateUrl: 'app/modules/waitlist/components/invoice/invoice.component.html'
    });
})();
