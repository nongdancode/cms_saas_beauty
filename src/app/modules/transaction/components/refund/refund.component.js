(function(){
  const module = angular.module('module.transaction.components.refund', []);

  class RefundComponent {
    constructor($scope, ModalService, MarketingService) {
      this.$scope = $scope;
      this.ModalService = ModalService;
      this.MarketingService = MarketingService;
    }

    $onInit() { }

    send() {
      this.ModalService.confirm({
        title: 'Confirm',
        message: 'Refund?'
      }).then((confirm => {
        this.MarketingService.refund(this.entry.values);
      }));
    };
  }

  module.component('maRefund', {
    bindings: {
      entry: '<'
    },
    controller: RefundComponent,
    templateUrl: 'app/modules/transaction/components/refund/refund.component.html'
  });
})();
