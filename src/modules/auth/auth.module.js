(function() {
    const module = angular.module('module.auth', [
        'module.auth.containers.login',
    ]);

    module.config(function ($stateProvider, $httpProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/auth/login',
                template: '<app-login></app-login>'
            })
            .state('logout', {
                url: '/auth/logout',
                controller: function($location, AuthService, UserService) {
                    return AuthService.logout().finally(() => {
                        UserService.clearUser();

                        $location.path('/auth/login');
                    });
                }
            });


        $httpProvider.defaults.withCredentials = true;
    });

    module.run(function($rootScope, $location, Restangular, UserService){
        // Redirect to login when error code == 401
        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            if (response.status === 401) {
                UserService.clearUser();
                $location.path('/auth/login');
                return false;
            }

            return true;
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (!UserService.getUser()) {
                $location.path('/auth/login');
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (UserService.getUser() && toState.name === 'login') {
                $location.path('/dashboard');
            }
        });

        if (!UserService.getUser()) {
            $location.path('/auth/login');
        }
    });
})();
