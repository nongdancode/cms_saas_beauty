(function(){
  angular.module('service.marketing', [])
    .factory('MarketingService', MarketingService);
  function MarketingService(HttpService, ModalService) {
    var service = {};

    service.sendSms = function(data) {
      const endpoint = data.type === 'sms' ? 'sms_sending' : 'mms_sending';

      return HttpService.post(window.config.baseApiUrl + endpoint, data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.sendSmsBill = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'sms-bill', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.historyCustomer = function(id) {
      return HttpService.get(window.config.baseApiUrl + 'history-customer/' + id);
    };

    return service;
  }
})();
