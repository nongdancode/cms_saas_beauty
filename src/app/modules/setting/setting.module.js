(function(){
  const module = angular.module('module.setting', [
    'module.setting.components.image-upload',
    'module.setting.containers.config'
  ]);

  module.config(function($stateProvider) {
    $stateProvider
      .state('config', {
        parent: 'ng-admin',
	      url: '/setting/config',
	      template: '<config $resolve="$resolve"></config>',
        resolve: {
          config: function(ConfigService) {
            return ConfigService.getConfig();
          },
          openHours: function(ConfigService) {
            return ConfigService.getOpenHours();
          }
        }
      });
  });
})();
