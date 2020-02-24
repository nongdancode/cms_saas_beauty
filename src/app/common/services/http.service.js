(function(){
  const module = angular.module('service.http', []);

  module.factory('HttpInterceptor', function($location, UserService){
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
  });

  module.config(function($httpProvider) {
    $httpProvider.defaults.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };

    $httpProvider.interceptors.push('HttpInterceptor');
  });

  module.factory('HttpService', HttpService);

  function HttpService($http) {
    var service = {};

    service.generateUrl = function(endpoint) {
      return window.config.baseApiUrl + endpoint;
    };

    service.get = function(url, params) {
      return $http.get(url, params)
        .then(res => res.data);
    };

    service.post = function(url, body) {
      return $http.post(url, body)
        .then(res => res.data);
    };

    return service;
  }
})();
