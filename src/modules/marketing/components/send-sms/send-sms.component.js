(function(){
    const module = angular.module('module.marketing.components.send-sms', []);

    class SendSmsComponent {
        constructor($scope, $uibModal, notification, MarketingService) {
            this.$scope = $scope;
            this.$uibModal = $uibModal;
            this.notification = notification;
            this.MarketingService = MarketingService;
        }

        $onInit() {
            this.data = {
                message: ''
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
            if (confirm('Send SMS to: ' + this.names)) {
                const ids = this.selection.map(function (entry) {
                    return entry.identifierValue;
                });

                this.MarketingService.sendSms(ids, this.data.message).then(res => {
                    this.notification.log('Send SMS Successful!');

                    this.modal.close();
                });
            }
        };

        cancel() {
            this.modal.close();
        };

        get isShow() {
            return this.selection.length;
        };
    }

    module.component('maSendSms', {
        bindings: {
            selection: '<'
        },
        controller: SendSmsComponent,
        templateUrl: 'src/modules/marketing/components/send-sms/send-sms.component.html'
    });
})();
