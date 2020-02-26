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
                    console.log(res);
                    if (res.code === 0) {
                        this.UserService.setUser({
                            id: res.data.id,
                            username: res.data.username,
                            role: res.data.role
                        });

                        this.notification.log('Login successfully !', { addnCls: 'humane-flatty-success' });

                        window.location.href = '/#/dashboard';
                        window.location.reload();
                    } else {
                        this.notification.log('Username or password is incorrect !', { addnCls: 'humane-flatty-error' });
                    }
                });
        };
    }

    module.component('appLogin', {
        controller: LoginComponent,
        templateUrl: 'app/modules/auth/containers/login/login.component.html'
    });
})();
