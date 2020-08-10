(function(){
  const module = angular.module('module.marketing.containers.connect-review', []);

  class ConnectReviewComponent {
    config = {
      'google': {
        type: 'text',
        value: ''
      },
      'yelp': {
        type: 'text',
        value: ''
      },
      'facebook': {
        type: 'text',
        value: ''
      }
    }

    constructor($scope, $compile, $state, $stateParams, $resolve, ModalService, MarketingService) {
      this.$scope = $scope;
      this.$compile = $compile;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$resolve = $resolve;
      this.ModalService = ModalService;
      this.MarketingService = MarketingService;
    }

    $onInit() {
      this.data = {};
      this.data.config = this.merge(this.config, this.$resolve.config);
    };

    merge(a, b) {
      return _.merge({}, a, b);
    }

    name(key) {
      return key.toCamelCase();
    }

    save() {
      const config = Object.keys(this.data.config).reduce((result, key) => {
        return {
          ...result,
          [key]: this.data.config[key].value
        };
      }, {});

      console.log(config);

      this.MarketingService.saveConnectReview(config)
          .then(res => {
            this.ModalService.success('Update successfully!');
          });
    }
  }

  module.component('connectReview', {
    bindings: {
      '$resolve': '<'
    },
    controller: ConnectReviewComponent,
    templateUrl: 'app/modules/marketing/containers/connect-review/connect-review.component.html'
  });
})();
