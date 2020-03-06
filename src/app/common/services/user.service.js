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
      return HttpService.post(HttpService.generateUrl(`password-change`), data)
        .then(res => {
          if (res.code === 0) {
            ModalService.success('Change password successfully!');
          } else {
            ModalService.error('Change password failed!');
          }

          return res.data;
        });
    };

    return service;
  }
})();
