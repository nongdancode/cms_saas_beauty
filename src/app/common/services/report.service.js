(function(){
    angular.module('service.report', [])
        .factory('ReportService', ReportService);
    function ReportService($http) {
        var service = {};

        service.payment = function() {
            return $http.get(window.config.baseApiUrl + 'payment_report')
                .then(err => {
                    return {
                        [moment().startOf('day').unix()]: {
                            'return': 10,
                            'chargeback': 20,
                            'success': 30,
                            'failed': 40
                        },
                        [moment().startOf('day').add('1', 'days').unix()]: {
                            'return': 15,
                            'chargeback': 25,
                            'success': 35,
                            'failed': 45
                        },
                        [moment().startOf('day').add('10', 'days').unix()]: {
                            'return': 15,
                            'chargeback': 25,
                            'success': 35,
                            'failed': 45
                        },
                        [moment().startOf('day').add('15', 'days').unix()]: {
                            'return': 15,
                            'chargeback': 25,
                            'success': 35,
                            'failed': 45
                        },
                        [moment().startOf('day').add('20', 'days').unix()]: {
                            'return': 15,
                            'chargeback': 25,
                            'success': 35,
                            'failed': 45
                        },
                        [moment().startOf('day').add('25', 'days').unix()]: {
                            'return': 15,
                            'chargeback': 25,
                            'success': 35,
                            'failed': 45
                        }
                    };
                });
        };

        service.customerByDate = function() {
            return $http.get(window.config.baseApiUrl + 'payment_report')
                .then(err => {
                    return {
                        [moment().startOf('day').unix()]: {
                            'customerNumber': 10,
                            'amount': 20
                        },
                        [moment().startOf('day').add('1', 'days').unix()]: {
                            'customerNumber': 15,
                            'amount': 25
                        },
                        [moment().startOf('day').add('10', 'days').unix()]: {
                            'customerNumber': 15,
                            'amount': 50
                        },
                        [moment().startOf('day').add('15', 'days').unix()]: {
                            'customerNumber': 15,
                            'amount': 80
                        },
                        [moment().startOf('day').add('20', 'days').unix()]: {
                            'customerNumber': 15,
                            'amount': 30
                        },
                        [moment().startOf('day').add('25', 'days').unix()]: {
                            'customerNumber': 15,
                            'amount': 5
                        }
                    };
                });
        };

        service.customerByAge = function() {
            return $http.get(window.config.baseApiUrl + 'payment_report')
                .then(err => {
                    return {
                        '20_35': 50,
                        '35_50': 20,
                        '50_60': 30
                    };
                });
        };

        return service;
    }
})();
