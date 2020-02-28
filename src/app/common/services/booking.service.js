(function(){
    angular.module('service.booking', [])
        .factory('BookingService', BookingService);

    function BookingService(notification, HttpService) {
        var service = {};

        service.getWaitList = function() {
            return HttpService.get(window.config.baseApiUrl + 'staffs')
                .then(err => [
                    {
                        id: 1,
                        name: 'Name 1',
                        phone: 'Phone 1',
                        status: 'booking',
                        deposit: 0,
                        invoice: {
                            id: 1,
                            tax: 10,
                            about: {
                                companyName: 'The lash supply',
                                phone: '8327744593',
                                address: {
                                    streetAddress: 'Bellard',
                                    city: 'Houston',
                                    state: 'Texas'
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
                        status: 'checkin',
                        deposit: 0,
                        invoice: {
                            id: 2,
                            tax: 10,
                            about: {
                                companyName: 'The lash supply',
                                phone: '8327744593',
                                address: {
                                    streetAddress: 'Bellard',
                                    city: 'Houston',
                                    state: 'Texas'
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
                ]);
        };

        service.getCheckinServices = function() {
            return HttpService.get(window.config.baseUrl + 'api/booking/list_services');
        };

        service.getCheckinEmployees = function() {
            return HttpService.get(window.config.baseUrl + 'api/booking/list_employee');
        };

        service.confirmCheckin = function(data) {
            return HttpService.post(window.config.baseApiUrl + 'checkin/confirm', data)
                .then(res => {
                    if (res.code === 0) {
                        notification.log('Checkin confirm successfully!', { addnCls: 'humane-flatty-success' });
                    } else {
                        notification.log('Checkin confirm failed!', { addnCls: 'humane-flatty-error' });
                    }

                    return res.data;
                });
        };

        service.confirmCheckout = function(data) {
            return HttpService.post(window.config.baseApiUrl + 'checkout/confirm', data)
                .then(res => {
                    if (res.code === 0) {
                        notification.log('Checkout confirm successfully!', { addnCls: 'humane-flatty-success' });
                    } else {
                        notification.log('Checkout confirm failed!', { addnCls: 'humane-flatty-error' });
                    }

                    return res.data;
                });
        };

        return service;
    }
})();
