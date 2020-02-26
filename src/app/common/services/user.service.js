(function(){
  angular.module('service.user', [])
    .factory('UserService', UserService);
  function UserService($localStorage) {
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

    return service;
  }
})();
