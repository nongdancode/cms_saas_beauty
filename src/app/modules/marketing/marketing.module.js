(function(){
  const module = angular.module('module.marketing', [
    'module.marketing.containers.connect-review'
  ]);

  module.config(function($stateProvider) {
    $stateProvider
      .state('connect-review', {
        parent: 'ng-admin',
	      url: '/marketing/connect-review',
	      template: '<connect-review $resolve="$resolve"></connect-review>',
        resolve: {
          config: function(MarketingService) {
            return MarketingService.getConnectReview();
          }
        }
      });
  });
})();
