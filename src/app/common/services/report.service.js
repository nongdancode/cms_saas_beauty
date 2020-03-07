(function(){
    angular.module('service.report', [])
        .factory('ReportService', ReportService);
    function ReportService(HttpService) {
        var service = {};

        service.payment = function() {
            return HttpService.get(window.config.baseApiUrl + 'payment_report');
        };

        service.customerByDate = function() {
            return HttpService.get(window.config.baseApiUrl + 'customer_report_by_date');
        };

        service.customerByAge = function() {
            return HttpService.get(window.config.baseApiUrl + 'customer_report_by_age');
        };

        return service;
    }
})();
