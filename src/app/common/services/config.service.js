(function(){
  angular
    .module('service.config', [])
    .factory('ConfigService', ConfigService);

  function ConfigService(HttpService) {
    const service = {};

    service.getConfig = function() {
      return HttpService.get(HttpService.generateUrl(`configs`));
    };

    return service;
  }
})();
