(function(){
    angular.module('service.booking', [])
        .factory('BookingService', BookingService);

    function BookingService($http) {
        var service = {};

        service.getWaitList = function() {
            return $http.get(window.config.baseApiUrl + 'staffs')
                .then(err => [
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
                ]);
        };

        service.getCheckinServices = function() {
            return $http.get(window.config.baseApiUrl + 'checkin/services')
                .then(err => [
	                {
		                "id": 1,
		                "img": "https:\/\/hellobacsi.com\/wp-content\/uploads\/2017\/07\/153749570.jpg",
		                "name": "cat mong",
		                "stepping": 30
	                },
                    {
		                "id": 2,
		                "img": "https:\/\/hellobacsi.com\/wp-content\/uploads\/2017\/07\/153749570.jpg",
		                "name": "lam lash mi",
		                "stepping": 60
	                }
                ]);
        };

        service.getCheckinEmployees = function() {
            return $http.get(window.config.baseApiUrl + 'checkin/employees')
                .then(err => [
                    {
                        "id":2,
                        "name":"user2",
                        "img":"https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn%3AANd9GcTRMDQRP58sturc1K7qmET50-apq5jCgAKbPS6xSGC4LHjvPmJD",
                        "service_id":1,
                        "service_name":"cat mong",
                        "available":{
                            "1580774400":[
                                {
                                    "start_time":1580774400,
                                    "end_time":1580842800
                                }
                            ]
                        }
                    },
                    {
                        "id":3,
                        "name":"user3",
                        "img":"https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn%3AANd9GcTRMDQRP58sturc1K7qmET50-apq5jCgAKbPS6xSGC4LHjvPmJD",
                        "service_id":1,
                        "service_name":"cat mong",
                        "available":{
                            "1580774400":[
                                {
                                    "start_time":1580832540,
                                    "end_time":1580857200
                                }
                            ]
                        }
                    },
                    {
                        "id":4,
                        "name":"staff1",
                        "img":"https:\/\/assets.capitalfm.com\/2018\/23\/lilliya-scarlett-instagram-1528814125-custom-0.png",
                        "service_id":2,
                        "service_name":"lam lash mi",
                        "available":{
                            "1580688000":[
                                {
                                    "start_time":1580720520,
                                    "end_time":1580756640
                                }
                            ]
                        }
                    },
                    {
                        "id":5,
                        "name":"staff2",
                        "img":"https:\/\/image.freepik.com\/free-photo\/hair-style-street-fashion-beautiful-girl_1139-844.jpg",
                        "service_id":2,
                        "service_name":"lam lash mi",
                        "available":{
                            "1580774400":[
                                {
                                    "start_time":1580821500,
                                    "end_time":1580850360
                                }
                            ],
                            "1581206400":[
                                {
                                    "start_time":1581256853,
                                    "end_time":1581287273
                                },
                                {
                                    "start_time":1581231600,
                                    "end_time":1581249600
                                }
                            ]
                        }
                    },
                    {
                        "id":5,
                        "name":"staff2",
                        "img":"https:\/\/image.freepik.com\/free-photo\/hair-style-street-fashion-beautiful-girl_1139-844.jpg",
                        "service_id":2,
                        "service_name":"lam lash mi",
                        "available":{
                            "1580774400":[
                                {
                                    "start_time":1580821500,
                                    "end_time":1580850360
                                }
                            ],
                            "1581206400":[
                                {
                                    "start_time":1581256853,
                                    "end_time":1581287273
                                },
                                {
                                    "start_time":1581231600,
                                    "end_time":1581249600
                                }
                            ]
                        }
                    }
                ]);
        };

        service.confirmCheckin = function(data) {
            return $http.post(window.config.baseApiUrl + 'checkin/confirm', data);
        };

        return service;
    }
})();
