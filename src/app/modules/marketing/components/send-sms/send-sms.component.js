(function(){
    const module = angular.module('module.marketing.components.send-sms', []);

    class SendSmsComponent {
        constructor($scope, $timeout, $uibModal, notification, MarketingService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$uibModal = $uibModal;
            this.notification = notification;
            this.MarketingService = MarketingService;
        }

        $onInit() {
            this.form = {
                message: '',
                type: 'sms',
                file: null
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

        upload(e) {
            this.$timeout(() => {
                this.form.file = e.files[0];
            });
        }

        send() {
            if (confirm('Send SMS to: ' + this.names)) {
                const ids = this.selection.map(function (entry) {
                    return entry.identifierValue;
                });

                console.log(this.form);

                // this.MarketingService.sendSms(ids, this.form.message).then(res => {
                //     this.notification.log('Send SMS Successful!');

                //     this.close();
                // });
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
                file: null
            };
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