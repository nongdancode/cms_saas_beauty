(function(){
  angular
    .module('service.config', [])
    .factory('ConfigService', ConfigService);

  function ConfigService(HttpService, ModalService) {
    const service = {};

    service.getConfig = function() {
      return HttpService.get(HttpService.generateUrl(`configs`));
    };

    service.save = function(data) {
      return HttpService.post(HttpService.generateUrl(`configs`), { data: JSON.stringify(data) })
        .then(res => {
          if (res.code === 0) {
            ModalService.success('Save config successfully!');
          } else {
            ModalService.error('Save config failed!');
          }
        });
    };

    return service;
  }
})();
