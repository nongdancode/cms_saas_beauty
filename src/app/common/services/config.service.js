(function(){
  angular
    .module('service.config', [])
    .factory('ConfigService', ConfigService);

  function ConfigService(HttpService) {
    const service = {};

    service.getConfig = function() {
      return HttpService.get(HttpService.generateUrl(`configs`));
    };

    service.save = function(data) {
      return HttpService.post(HttpService.generateUrl(`configs`), data);
    };

    return service;
  }
})();
