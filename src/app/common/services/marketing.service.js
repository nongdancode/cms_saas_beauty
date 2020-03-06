(function(){
  angular.module('service.marketing', [])
    .factory('MarketingService', MarketingService);
  function MarketingService(HttpService, ModalService) {
    var service = {};

    service.sendSms = function(data) {
      const endpoint = data.type === 'sms' ? 'sms_sending' : 'mms_sending';

      return HttpService.post(window.config.baseApiUrl + endpoint, data).then(res => {
        if (res.code === 0) {
          ModalService.success('Send SMS successfully!');
        } else {
          ModalService.error('Send SMS failed!');
        }

        return res.data;
      });
    };

    service.historyCustomer = function(id) {
      return HttpService.get(window.config.baseApiUrl + 'history-customer/' + id);
    };

    return service;
  }
})();
