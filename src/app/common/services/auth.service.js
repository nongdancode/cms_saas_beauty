(function(){
  angular
    .module('service.auth', [])
    .factory('AuthService', AuthService);

  function AuthService($http, $q) {
    const service = {};

    const users = [
      {
        id: 1,
        username: 'thelashsystem@gmail.com',
        password: '123123@',
        role: window.models.Role.ADMIN
      },
      {
        id: 2,
        username: 'tramwindy@gmail.com',
        password: '123123@',
        role: window.models.Role.STAFF
      },
      {
        id: 3,
        username: 'Santhai_1989@yahoo.com',
        password: '123123@',
        role: window.models.Role.STAFF
      }
    ];

    service.login = function(username, password) {
      return $http.get(window.config.baseApiUrl + 'login')
        .then(res => {
          const match = users.find(user => user.username === username && user.password === password);

          return {
            code: match ? 0 : 1,
            data: match
          };
        });
    };

    service.logout = function() {
      return $http.get(window.config.baseApiUrl + 'logout')
        .catch(err => {});
    };

    return service;
  }
})();
