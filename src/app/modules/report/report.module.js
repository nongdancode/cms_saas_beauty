(function(){
    const module = angular.module('module.report', [
        'module.report.containers.report-payment',
        'module.report.containers.report-customer'
    ]).config(routes);

    function routes($stateProvider) {
        $stateProvider
            .state('report-payment', {
                parent: 'ng-admin',
	            url: '/report/payment',
                template: '<report-payment $resolve="$resolve"></report-payment>'
            })
            .state('report-customer', {
                parent: 'ng-admin',
	            url: '/report/customer',
                template: '<report-customer $resolve="$resolve"></report-customer>'
            });
    };
})();
