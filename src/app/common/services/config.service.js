(function(){
  angular
    .module('service.config', [])
    .factory('ConfigService', ConfigService);

  function ConfigService(HttpService, ModalService) {
    const service = {};

    service.getConfig = function() {
      return HttpService.get(HttpService.generateUrl(`configs`), {}, {
        errorHandleStrategy: HttpService.strategy.show
      }).then(JSON.parse).catch(err => {});
    };

    service.getConfigObject = function() {
      return service.getConfig()
        .then(config => {
          return config.reduce((result, row) => {
            return {
              ...result,
              [row.key]: row
            };
          }, {});
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
