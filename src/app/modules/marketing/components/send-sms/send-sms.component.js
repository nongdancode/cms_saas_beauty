(function(){
    const module = angular.module('module.marketing.components.send-sms', []);

    class SendSmsComponent {
        constructor($scope, $timeout, $uibModal, notification, UtilityService, MarketingService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$uibModal = $uibModal;
            this.notification = notification;
            this.UtilityService = UtilityService;
            this.MarketingService = MarketingService;
        }

        $onInit() {
            this.uploader = new this.UtilityService.upload('mms');

            this.form = {
                message: '',
                type: 'sms'
            };

        }

        showModal() {
            this.names = this.selection.map(entry => entry.values.name).join(', ');

            this.modal = this.$uibModal.open({
                animation: true,
                templateUrl: 'send-sms-modal.html',
                size: 'md',
                scope: this.$scope
            });

        };

        send() {
            if (confirm('Send Message to: ' + this.names)) {
                this.uploader.__uploadAll().then((result) => {
                    const ids = this.selection.map(function (entry) {
                        return entry.identifierValue;
                    });

                    this.MarketingService.sendSms({
                        customerIds: ids,
                        images: result,
                        ...this.form
                    }).then(res => {
                        this.close();
                    });
                });
            }
        };

        cancel() {
            this.close();
        };

        close() {
            this.modal.close();
            this.reset();
        }

        reset() {
            this.form = {
                message: '',
                type: 'sms',
            };

            this.uploader.clearQueue();
        }

        get isShow() {
            return this.selection.length;
        };
    }

    module.component('maSendSms', {
        bindings: {
            selection: '<'
        },
        controller: SendSmsComponent,
        templateUrl: 'app/modules/marketing/components/send-sms/send-sms.component.html'
    });
})();
