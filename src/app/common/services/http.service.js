(function(){
  const module = angular.module('service.http', []);

  module.factory('HttpInterceptor', function(){
    var service = {};

    service.request = function(config) {
      return config;
    };

    service.responseError = function(response) {
      return response;
    };

    return service;
  });

  module.config(function($httpProvider) {
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

    service.upload = function(url, field) {
      console.log(field);
      return function(file) {
        const fd = new FormData();
        fd.append(field, file);

        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
      };
    };

    return service;
  }
})();
