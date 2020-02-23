angular.module('app.third-party', [
    'ng-admin',
    'ui.bootstrap',
    'ui.calendar',
    'ui.select',
    'ui.mask',
    'ui-datetimepicker',
    'daterangepicker',
    'highcharts-ng',
    'ngStorage'
]);

try {
    angular.module("app.templates");
} catch (e) {
    angular.module("app.templates", []);
}

angular.module('app.resources', []);

angular.module('app.services', [
    'service.utility',
    'service.user',
    'service.auth',
    'service.marketing',
    'service.report',
    'service.staff',
    'service.promotion',
    'service.booking'
]);

angular.module('app.directives', [
    'directive.draggable'
]);

angular.module('app.components', [
    'component.filter.daterange'
]);

angular.module('app.modules', [
    'module.auth',
    'module.marketing',
    'module.payment',
    'module.report',
    'module.staff',
    'module.promotion',
    'module.user',
    'module.service',
    'module.waitlist'
]);

angular.module('app', [
    'app.templates',
    'app.third-party',
    'app.resources',
    'app.services',
    'app.directives',
    'app.components',
    'app.run',
    'app.modules',
    'app.config'
]);
