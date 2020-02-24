(function(){
  angular
    .module('service.auth', [])
    .factory('AuthService', AuthService);

  function AuthService($http, $q) {
    var service = {};

    service.login = function(username, password) {
      return $http.get(window.config.baseApiUrl + 'login');
    };

    service.logout = function() {
      return $http.get(window.config.baseApiUrl + 'logout')
        .catch(err => {});
    };

    return service;
  }
})();
