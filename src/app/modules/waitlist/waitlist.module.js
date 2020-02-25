(function(){
    const module = angular.module('module.waitlist', [
        'module.waitlist.components.checkin',
        'module.waitlist.components.checkout',
        'module.waitlist.components.invoice'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('waitlist');

        const listView = entity.listView();

        listView
            .title('Wait List')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('phone'),
            nga.field('type'),
            nga.field('invoice', 'template')
                .label('Action')
                .template(
                    `<ma-checkout ng-if="entry.values.type === 'booking'" entry="entry"></ma-checkout>` +
                        `<ma-checkin ng-if="entry.values.type === 'walking'" entry="entry"></ma-checkin>`
                )
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('type')
        ]);

        window.addEntity('waitlist', entity);
    });

    module.config(function(RestangularProvider) {
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
            if (operation === "getList" && what === 'waitlist') {
                return [
                    {
                        id: 1,
                        name: 'Name 1',
                        phone: 'Phone 1',
                        type: 'booking',
                        invoice: {
                            id: 1,
                            tax: 10,
                            about: {
                                companyName: '',
                                phone: '',
                                address: {
                                    streetAddress: '',
                                    city: '',
                                    state: ''
                                }
                            },
                            services: [
                                {
                                    name: 'Service 1',
                                    discount: 10,
                                    price: 10
                                },
                                {
                                    name: 'Service 2',
                                    discount: 20,
                                    price: 20
                                }
                            ]
                        }
                    },
                    {
                        id: 2,
                        name: 'Name 2',
                        phone: 'Phone 2',
                        type: 'walking',
                        invoice: {
                            id: 2,
                            tax: 10,
                            about: {
                                companyName: '',
                                phone: '',
                                address: {
                                    streetAddress: '',
                                    city: '',
                                    state: ''
                                }
                            },
                            services: [
                                {
                                    name: 'Service 1',
                                    discount: 10,
                                    price: 10
                                },
                                {
                                    name: 'Service 2',
                                    discount: 20,
                                    price: 20
                                }
                            ]
                        }
                    }
                ];
            }
            return data;
        });
    });
})();
