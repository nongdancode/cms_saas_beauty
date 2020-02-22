(function(){
  angular.module('service.marketing', [])
         .factory('MarketingService', MarketingService);
  function MarketingService($http) {
    var service = {};

      service.sendSms = function(ids, message) {
          return $http.post(window.config.baseApiUrl + 'sms_sending', {
              customerIds: ids,
              message: message
          });
      };

    return service;
  }
})();
