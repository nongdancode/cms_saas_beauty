(function(){
  angular
    .module('service.auth', [])
    .factory('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor);

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

  function AuthInterceptor($location, UserService) {
    var service = {};

    service.request = function(config) {
      return config;
    };

    service.responseError = function(response) {
      if(response.status === 401) {
        UserService.setCurrentUser(null);

	    $location.path('/auth/login');
      }
      return response;
    };
    return service;
  }
})();
