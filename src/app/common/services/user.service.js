(function(){
  angular.module('service.user', [])
    .factory('UserService', UserService);
  function UserService(HttpService, $localStorage, notification) {
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
            notification.log('Change password successfully!', { addnCls: 'humane-flatty-success' });
          } else {
            notification.log('Change password failed!', { addnCls: 'humane-flatty-error' });
          }

          return res.data;
        });
    };

    return service;
  }
})();
