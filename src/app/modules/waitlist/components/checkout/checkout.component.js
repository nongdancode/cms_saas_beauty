(function(){
  const module = angular.module('module.waitlist.components.checkout', []);

  class CheckoutComponent {
    constructor($scope, $state, ModalService, UtilityService, BookingService, MarketingService) {
      this.$scope = $scope;
      this.$state = $state;
      this.ModalService = ModalService;
      this.UtilityService = UtilityService;
      this.BookingService = BookingService;
      this.MarketingService = MarketingService;
    }

    $onInit() {
      this.title = this.title || 'Checkout';

      this.data = {
        invoice: this.entry.values.invoice,
        viewType: 'view',
        paymentType: 'cash',
        note: '',
        paymentForm: {},
        showPayment: false
      };
    }

    toggleViewType() {
      this.data.viewType = this.data.viewType === 'view' ? 'edit' : 'view';
    };

    togglePayment() {
      this.data.showPayment = !this.data.showPayment;
      this.data.paymentType = this.data.showPayment ? 'check' : 'cash';
    }

    showModal() {
      this.modal = this.ModalService.create({
        animation: true,
        templateUrl: 'invoice-modal.html',
        size: 'lg',
        scope: this.$scope
      });

    };

    get disablePrint() {
      return this.data.viewType !== 'view'
          || this.data.invoice.services.some(
            service => ['name', 'price', 'discount'].some(field => typeof service[field] === 'undefined')
          );
    };

    get disableToggle() {
      return this.data.invoice.services.length === 0
          || this.data.invoice.services.some(
            service => ['name', 'price', 'discount'].some(field => typeof service[field] === 'undefined')
          );
    };

    get disableFinish() {
      return this.data.showPayment && this.data.paymentForm.$invalid
    }

    sendSms() {
      this.MarketingService.sendSmsBillCheckout(this.entry.values.invoice);
    }

    checkPayment(next) {
      if (!this.data.showPayment) {
        next();
      } else {
        this.data.paymentType = 'check';

        this.BookingService.checkoutPayment(this.data.paymentForm).then(next);
      }
    }

    print() {
      this.checkPayment(this._print.bind(this));
    }

    finish() {
      this.checkPayment(this._finish.bind(this));
    }

    _print() {
      this.UtilityService.print('print-content').then(res => {
        if (this.printOnly) {
          this.$state.reload();
          return;
        }

        this._finish();
      });
    };

    _finish() {
      const { id, name, status, phone, deposit, invoice } = this.entry.values;

      const { paymentType, note } = this.data;

      const checkout = { id, name, status, phone, deposit, invoice, paymentType, note };

      this.BookingService
          .confirmCheckout(checkout)
          .finally(() => this.$state.reload());
    }

    cancel() {
      this.modal.close();
    };
  }

  module.component('maCheckout', {
    bindings: {
      entry: '<',
      title: '@',
      printOnly: '<'
    },
    controller: CheckoutComponent,
    templateUrl: 'app/modules/waitlist/components/checkout/checkout.component.html'
  });
})();
