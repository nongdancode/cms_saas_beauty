(function(){
    const module = angular.module('module.auth.containers.login', []);

    class LoginComponent {
        constructor($scope, $location, notification, AuthService, UserService) {
            this.$scope = $scope;
            this.$location = $location;
            this.notification = notification;
            this.AuthService = AuthService;
            this.UserService = UserService;
        }

        $onInit() {
            this.state = {
                username: '',
                password: ''
            };
        }

        login(username, password) {
            this.AuthService.login(username, password)
                .then(res => {
                    this.UserService.setUser(username);
                    this.notification.log('Login successfully !');
                    this.$location.path('/dashboard');
                }, err => {
                    this.notification.log('Username or password is incorrect !');
                });
        };
    }

    module.component('appLogin', {
        controller: LoginComponent,
        templateUrl: 'src/modules/auth/containers/login/login.component.html'
    });
})();
