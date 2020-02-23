(function(){
  angular.module('service.user', [])
    .factory('UserService', UserService);
  function UserService($window) {
    var service = {};

    service.getUser = function() {
      return JSON.parse($window.localStorage.getItem('user'));
    };

    service.setUser = function(user) {
      return $window.localStorage.setItem('user', JSON.stringify(user));
    };

    service.clearUser = function() {
      return $window.localStorage.removeItem('user');
    };

    return service;
  }
})();
