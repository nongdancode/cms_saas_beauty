(function(){
    const module = angular.module('module.setting.components.image-upload', []);

    class ImageUploadComponent {
        constructor($scope, $timeout, progression, UtilityService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.progression = progression;
            this.UtilityService = UtilityService;
            this.uploader = this.UtilityService.upload('user');
            this.loading = false;
        }

        $onInit() {
            this.ngModel = this.ngModel || 'assets/images/logo-2.png';
            this.ngModelChange = this.ngModelChange || (() => {});
        }

        upload() {
            this.loading = true;

            this.uploader.__upload().then((result) => {
                this.$timeout(() => {
                    this.ngModel = result;
                    this.ngModelChange({ $event: result });

                    this.loading = false;
                });
            });
        };
    }

    module.component('maImageUpload', {
        bindings: {
            ngModel: '=',
            ngModelChange: '&'
        },
        controller: ImageUploadComponent,
        templateUrl: 'app/modules/setting/components/image-upload/image-upload.component.html'
    });
})();
