(function(){
  const module = angular.module('module.transaction.components.review', []);

  class ReviewComponent {
    constructor($scope, ModalService, MarketingService) {
      this.$scope = $scope;
      this.ModalService = ModalService;
      this.MarketingService = MarketingService;
    }

    $onInit() {
    }

    review() {
      this.ModalService.confirm({
        title: 'Confirm',
        message: 'Review this bill?'
      }).then((confirm => {
        this.MarketingService.reviewBill(this.entry.values);
      }));
    }
  }

  module.component('maReview', {
    bindings: {
      entry: '<'
    },
    controller: ReviewComponent,
    templateUrl: 'app/modules/transaction/components/review/review.component.html'
  });
})();
