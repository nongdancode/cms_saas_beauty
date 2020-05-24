(function(){
  const module = angular.module('module.waitlist.components.payment', []);

  class PaymentComponent {
    constructor($scope, $state, ModalService, UtilityService, BookingService, MarketingService) {
      this.$scope = $scope;
      this.$state = $state;
      this.ModalService = ModalService;
      this.UtilityService = UtilityService;
      this.BookingService = BookingService;
      this.MarketingService = MarketingService;
    }

    $onInit() { }
  }

  module.component('maPayment', {
    bindings: {
      ngModel: '=',
      ngModelChange: '&'
    },
    controller: PaymentComponent,
    templateUrl: 'app/modules/waitlist/components/payment/payment.component.html'
  });
})();
