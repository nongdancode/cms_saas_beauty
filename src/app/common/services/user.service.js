(function(){
  angular.module('service.user', [])
    .factory('UserService', UserService);
  function UserService(HttpService, $localStorage, ModalService) {
    var service = {};

    service.getUser = function() {
      return $localStorage.user;
    };

    service.setUser = function(user) {
      return $localStorage.user = user;
    };

    service.clearUser = function() {
      delete $localStorage.user;
    };

    service.changePassword = function(data) {
      return HttpService.post(HttpService.generateUrl(`password-change`), data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.historyIncome = function(id) {
      return HttpService.get(HttpService.generateUrl(`history-income/${id}`));
    };

    return service;
  }
})();
