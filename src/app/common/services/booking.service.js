(function(){
  angular.module('service.booking', [])
         .factory('BookingService', BookingService);

  function BookingService(ModalService, HttpService) {
    var service = {};

    service.getWaitList = function() {
      return HttpService.get(window.config.baseApiUrl + 'staffs');
    };

    service.getCheckinGroups = function() {
      return HttpService.get(window.config.baseUrl + 'api/booking/list_groups');
    };

    service.getCheckinServices = function() {
      return HttpService.get(window.config.baseUrl + 'api/booking/list_services');
    };

    service.getCheckinEmployees = function() {
      return HttpService.get(window.config.baseUrl + 'api/booking/list_employee')
                        .then(res => {
                          return res.map(row => {
                            return {
                              ...row,
                              employee_id: row.id,
                              id: row.id + '_' + row.service_id,
                              service_id: +row.service_id
                            };
                          });
                        });
    };

    service.confirmCheckin = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'checkin/confirm', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.confirmCheckout = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'checkout/confirm', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.checkoutPayment = function(data) {
      return service.confirmCheckout({
        ...data,
        paymentBy: 'card'
      });
    }

    return service;
  }
})();
