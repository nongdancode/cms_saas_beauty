(function(){
  angular.module('service.marketing', [])
    .factory('MarketingService', MarketingService);
  function MarketingService(HttpService, notification) {
    var service = {};

    service.sendSms = function(ids, message) {
      return HttpService.post(window.config.baseApiUrl + 'sms_sending', {
        customerIds: ids,
        message: message
      }).then(res => {
        if (res.code === 0) {
          notification.log('Send SMS successfully!', { addnCls: 'humane-flatty-success' });
        } else {
          notification.log('Send SMS failed!', { addnCls: 'humane-flatty-error' });
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
