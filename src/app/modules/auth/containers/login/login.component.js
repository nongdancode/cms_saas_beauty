(function(){
    const module = angular.module('module.auth.containers.login', []);

    class LoginComponent {
        constructor($scope, $location, ModalService, AuthService, UserService) {
            this.$scope = $scope;
            this.$location = $location;
            this.ModalService = ModalService;
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
                    if (res.code === 0) {
                        this.UserService.setUser({
                            id: res.data.id,
                            username: res.data.username,
                            role: res.data.role
                        });

                        this.ModalService.success('Login successfully !');

                        window.location.href = '/#/dashboard';
                        window.location.reload();
                    } else {
                        this.ModalService.error('Username or password is incorrect !');
                    }
                });
        };
    }

    module.component('appLogin', {
        controller: LoginComponent,
        templateUrl: 'app/modules/auth/containers/login/login.component.html'
    });
})();
