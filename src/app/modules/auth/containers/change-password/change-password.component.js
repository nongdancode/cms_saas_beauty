(function(){
    const module = angular.module('module.auth.containers.change-password', []);

    class ChangePasswordComponent {
        constructor($scope, $location, ModalService, UserService) {
            this.$scope = $scope;
            this.$location = $location;
            this.ModalService = ModalService;
            this.UserService = UserService;
        }

        $onInit() {
            this.user = this.UserService.getUser();

            this.state = {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            };
        }

        submit() {
            this.UserService.changePassword(this.state)
                .then(res => {
                    if (res.code === 0) {
                        this.ModalService.success('Change password successfully!');
                    } else {
                        this.ModalService.error('Change password failed!');
                    }

                    return res.data;
                });
        };
    }

    module.component('changePassword', {
        controller: ChangePasswordComponent,
        templateUrl: 'app/modules/auth/containers/change-password/change-password.component.html'
    });
})();
