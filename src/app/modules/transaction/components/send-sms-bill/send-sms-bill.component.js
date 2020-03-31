(function(){
    const module = angular.module('module.transaction.components.send-sms', []);

    class SendSmsBillComponent {
        constructor($scope, ModalService, MarketingService) {
            this.$scope = $scope;
            this.ModalService = ModalService;
            this.MarketingService = MarketingService;
        }

        $onInit() { }

        send() {
            this.ModalService.confirm({
                title: 'Confirm',
                message: 'Send Sms?'
            }).then((confirm => {
                this.MarketingService.sendSmsBill(this.entry.values.invoice);
            }));
        };
    }

    module.component('maSendSmsBill', {
        bindings: {
            entry: '<'
        },
        controller: SendSmsBillComponent,
        templateUrl: 'app/modules/transaction/components/send-sms-bill/send-sms-bill.component.html'
    });
})();
