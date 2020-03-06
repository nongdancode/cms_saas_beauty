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

    service.prompt = ({template, title, textOK, textCancel, scope}) => {
      const modal = service.create({
        size: 'sm',
        template: '<div class="modal-header">\
                            <h4 class="modal-title" ng-bind="title"></h4>\
                        </div>\
                        <div class="modal-body" ng-include="template"></div>\
                        <div class="modal-footer">\
                            <button class="btn btn-default" ng-click="modal.dismiss()">{{ textCancel }}</button>\
                            <button class="btn btn-primary" ng-click="modal.close()">{{ textOK }}</button>\
                        </div>',
        controller: function ($scope, $uibModalInstance) {
          angular.extend($scope, scope);

          $scope.modal = $uibModalInstance;

          $scope.title = title || 'Confirm';
          $scope.template = template;
          $scope.textOK = textOK || 'OK';
          $scope.textCancel = textCancel || '';
        }
      });

      return modal.result;
    };

    service.confirm = ({message, title}) => {
      const modal = service.create({
        size: 'sm',
        template: '<div class="modal-header">\
                            <h4 class="modal-title" ng-bind="title"></h4>\
                        </div>\
                        <div class="modal-body" ng-bind="message"></div>\
                        <div class="modal-footer">\
                            <button class="btn btn-default" ng-click="modal.dismiss()">No</button>\
                            <button class="btn btn-primary" ng-click="modal.close()">Yes</button>\
                        </div>',
        controller: function ($scope, $uibModalInstance) {
          $scope.modal = $uibModalInstance;

          $scope.title = title || 'Confirm';
          $scope.message = message || '';
        }
      });

      return modal.result;
    };

    service.alert = message => {
      const modal = service.create({
        size: 'sm',
        template: '<div class="modal-header">\
                        <h4 class="modal-title" ng-bind="title"></h4></div>\
                        <div class="modal-body" ng-bind="message"></div>\
                        <div class="modal-footer">\
                            <button class="btn btn-primary" ng-click="modal.close()">OK</button>\
                        </div>',
        controller: function ($scope, $uibModalInstance) {
          $scope.modal = $uibModalInstance;

          $scope.message = message || '';
        }
      });

      return modal.result;
    };

    return service;
  }
})();
