(function(){
  angular
    .module('service.auth', [])
    .factory('AuthService', AuthService);

  function AuthService(HttpService) {
    const service = {};

    service.login = function(username, password) {
      return HttpService.get(window.config.baseApiUrl + 'dendivsfaker')
        .then(res => {
          const match = res.find(user => user.email === username && user.password === password);

          return {
            code: match ? 0 : 1,
            data: match
          };
        });
    };

    service.logout = function() {
      return HttpService.get(window.config.baseApiUrl + 'logout')
        .catch(err => {});
    };

    return service;
  }
})();
