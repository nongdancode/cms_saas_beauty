(function(){
    const module = angular.module('module.customer.components.send-sms', []);

    class SendSmsComponent {
        constructor($scope, $timeout, ModalService, UtilityService, MarketingService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.ModalService = ModalService;
            this.UtilityService = UtilityService;
            this.MarketingService = MarketingService;
        }

        $onInit() {
            this.uploader = new this.UtilityService.upload('mms');

            this.form = {
                message: '',
                type: 'sms'
            };

            this.messageLength = 160;
        }

        showModal() {
            this.names = this.selection.map(entry => entry.values.name).join(', ');

            this.modal = this.ModalService.create({
                animation: true,
                templateUrl: 'send-sms-modal.html',
                size: 'md',
                scope: this.$scope
            });

        };

        send() {
            if (confirm('Send Message to: ' + this.names)) {
                const ids = this.selection.map(function (entry) {
                    return entry.identifierValue;
                });

                if (this.form.type === 'sms') {
                    this.MarketingService.sendSms({
                        customerIds: ids,
                        ...this.form
                    }).then(res => {
                        this.close();
                    });
                } else {
                    this.uploader.__uploadAll().then((result) => {
                        this.MarketingService.sendSms({
                            customerIds: ids,
                            images: result,
                            ...this.form
                        }).then(res => {
                            this.close();
                        });
                    });
                }
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

            this.uploader.__clearQueue();
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
        templateUrl: 'app/modules/customer/components/send-sms/send-sms.component.html'
    });
})();
