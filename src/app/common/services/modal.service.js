(function() {
  angular.module('service.modal', [])
    .factory('ModalService', ModalService);

  function ModalService($uibModal, notification) {
    const service = {};

    service.success = message => {
      notification.log(message, { addnCls: 'humane-flatty-success' });
    };

    service.error = message => {
      notification.log(message, { addnCls: 'humane-flatty-error' });
    };

    service.create = config => {
      return $uibModal.open({
        size: 'md',
        ...config
      });
    };

    return service;
  }
})();
