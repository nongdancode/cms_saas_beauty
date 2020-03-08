angular.module('app.third-party', [
    'ng-admin',
    'ui.bootstrap',
    'ui.bootstrap.contextMenu',
    'ui.calendar',
    'ui.select',
    'ui.mask',
    'ui-datetimepicker',
    'daterangepicker',
    'highcharts-ng',
    'angularFileUpload',
    'ngStorage'
]);

try {
    angular.module("app.templates");
} catch (e) {
    angular.module("app.templates", []);
}

angular.module('app.core', [
    'core.ng-admin-customizer'
]);

angular.module('app.resources', []);

angular.module('app.services', [
    'service.http',
    'service.modal',
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
    'module.transaction',
    'module.report',
    'module.staff',
    'module.promotion',
    'module.user',
    'module.income',
    'module.service',
    'module.waitlist',
    'module.group'
]);

angular.module('app', [
    'app.templates',
    'app.third-party',
    'app.mock',
    'app.core',
    'app.resources',
    'app.services',
    'app.directives',
    'app.components',
    'app.run',
    'app.modules',
    'app.config'
]);
