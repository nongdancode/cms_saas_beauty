(function(){
  const module = angular.module('module.customer.components.delete-customer', []);

  class DeleteCustomerComponent {
    constructor($scope, $timeout, ModalService, UtilityService, MarketingService) {
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.ModalService = ModalService;
      this.UtilityService = UtilityService;
      this.MarketingService = MarketingService;
    }

    $onInit() {
    }

    delete() {
      const names = this.selection.map(entry => entry.values.name).join(', ');


      if (confirm('Delete customers: : ' + names)) {
        const ids = this.selection.map(function (entry) {
          return entry.identifierValue;
        });

        this.MarketingService.deleteCustomer({
          customerIds: ids,
        }).then(res => {
          this.close();
        });
      }
    }

    get isShow() {
      return this.selection.length;
    }
  }

  module.component('maDeleteCustomer', {
    bindings: {
      selection: '<'
    },
    controller: DeleteCustomerComponent,
    templateUrl: 'app/modules/customer/components/delete-customer/delete-customer.component.html'
  });
})();
