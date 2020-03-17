(function(){
  angular.module('core.ng-admin-customizer.service.crud', [])
    .factory('CrudService', CrudService);
  function CrudService(HttpService, ModalService, ReadQueries) {
    const service = {};

    const nga = window.nga;

    service.find = function(entity, ...args) {
      if (typeof entity === 'string') {
        entity = nga.entities[entity];
      }

      const view = entity.views.ListView;

      return ReadQueries.getAll(view, ...args)
        .then(res => res.data);
    };

    return service;
  }
})();
