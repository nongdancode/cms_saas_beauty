(function(){
  const module = angular.module('module.transaction.components.refund', []);

  class RefundComponent {
    constructor($scope, ModalService, MarketingService) {
      this.$scope = $scope;
      this.ModalService = ModalService;
      this.MarketingService = MarketingService;
    }

    $onInit() {
      // this.entry.values.refund = 'on';

      this.form = {
        services: {}
      };
    }

    showModal() {
      this.modal = this.ModalService.create({
        animation: true,
        templateUrl: 'refund-modal.html',
        size: 'md',
        scope: this.$scope
      });
    };

    cancel() {
      this.close();
    };

    close() {
      this.modal.close();
      this.reset();
    }

    reset() {

    }

    serviceIdentity(service) {
      return `${service.name}-${service.price}-${service.discount}`;
    }

    formValid() {
      return Object.values(this.form.services).some(status => status);
    }

    send() {
      this.ModalService.confirm({
        title: 'Confirm',
        message: 'Refund?'
      }).then((confirm => {
        const data = this.entry.values;

        data.invoice.services = data.invoice.services.filter(service => this.form.services[this.serviceIdentity(service)]);

        this.MarketingService.refund(data);
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
