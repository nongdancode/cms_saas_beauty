(function(){
    const module = angular.module('module.auth.containers.change-password', []);

    class ChangePasswordComponent {
        constructor($scope, $location, notification, UserService) {
            this.$scope = $scope;
            this.$location = $location;
            this.notification = notification;
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
                        this.notification.log('Change password successfully!', { addnCls: 'humane-flatty-success' });
                    } else {
                        this.notification.log('Change password failed!', { addnCls: 'humane-flatty-error' });
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
