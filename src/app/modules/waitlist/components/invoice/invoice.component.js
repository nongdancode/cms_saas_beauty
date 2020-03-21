(function(){
    const module = angular.module('module.waitlist.components.invoice', []);

    class InvoiceComponent {
        constructor($scope, CrudService) {
            this.$scope = $scope;
            this.CrudService = CrudService;
        }

        $onInit() {
            this.data = {
                items: this.invoice.services,
                today: moment().format('LL'),
                leftInfo: `${this.invoice.about.address.streetAddress}\n${this.invoice.about.address.city}\n${this.invoice.about.address.state}`,
                rightInfo: `${this.invoice.about.customer.name}\n${this.invoice.about.customer.phone}`,
                services: [],
                employees: []
            };

            this.CrudService.find('service').then(res => {
                this.data.services = res;
                this.data.servicesMap = this.data.services.reduce((result, item) => {
                    return {
                        ...result,
                        [item.id]: item
                    };
                }, {});
            });

            this.CrudService.find('employee').then(res => {
                this.data.employees = res;
                this.data.employeesMap = this.data.employees.reduce((result, item) => {
                    return {
                        ...result,
                        [item.id]: item
                    };
                }, {});
            });

            this.$scope.$watch('$ctrl.data.items', (newVal, oldVal) => {
                newVal.forEach(item => {
                    if (item.service_id) {
                        item.service = this.data.servicesMap[item.service_id].name;
                    }

                    if (item.employee_id) {
                        item.employee = this.data.employeesMap[item.employee_id].name;
                    }

                    if (item.service && item.employee) {
                        item.name = item.service + ' - ' + item.employee;
                    }
                });
            }, true);
        }

        round(num) {
            return Math.round((num + Number.EPSILON) * 100) / 100;
        }

        total() {
            const total = this.invoice.services.reduce((result, service) => {
                return result + (service.price - (service.price * +service.discount / 100));
            }, 0);

            const tax = total * this.invoice.tax / 100;

            return this.invoice.total = this.round(total + tax - this.invoice.deposit);
        };

        add() {
            this.data.items.push({
                name: '',
                price: '',
                discount: '00'
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
