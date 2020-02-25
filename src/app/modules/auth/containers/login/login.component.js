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
                    this.UserService.setUser({
                        id: 1,
                        username: username
                    });
                    this.notification.log('Login successfully !', { addnCls: 'humane-flatty-success' });
                    this.$location.path('/dashboard');
                }, err => {
                    this.notification.log('Username or password is incorrect !', { addnCls: 'humane-flatty-error' });
                });
        };
    }

    module.component('appLogin', {
        controller: LoginComponent,
        templateUrl: 'app/modules/auth/containers/login/login.component.html'
    });
})();
