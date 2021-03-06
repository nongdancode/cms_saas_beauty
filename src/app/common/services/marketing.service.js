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

    service.sendSmsBillCheckout = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'send-billsms', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.historyCustomer = function(id) {
      return HttpService.get(window.config.baseApiUrl + 'history-customer/' + id);
    };

    service.refund = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'refund', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.importBulkCustomer = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'customers/bulk', data, {
        errorHandleStrategy: HttpService.strategy.rest
      });
    };

    service.getConnectReview = function() {
      return HttpService.get(window.config.baseApiUrl + 'marketing/reviews');
    }

    service.saveConnectReview = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'marketing/reviews', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    }

    service.reviewBill = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'reviews', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    }

    service.deleteCustomer = function(data) {
      return HttpService.post(window.config.baseApiUrl + 'marketing/delete-customer', data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    return service;
  }
})();
