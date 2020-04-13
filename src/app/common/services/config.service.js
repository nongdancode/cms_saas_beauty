(function(){
  angular
    .module('service.config', [])
    .factory('ConfigService', ConfigService);

  function ConfigService(HttpService, ModalService) {
    const service = {};

    service.getConfig = function() {
      return HttpService.get(HttpService.generateUrl(`configs`), {}, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.save = function(data) {
      return HttpService.post(HttpService.generateUrl(`configs`), { data: JSON.stringify(data) }, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    return service;
  }
})();
