(function() {
  const module = angular.module('app.config', []);

  module.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  });

  module.config(function (NgAdminConfigurationProvider, $injector) {
    const nga = NgAdminConfigurationProvider;

    const app = nga.application('Lash Admin')
          .baseApiUrl(window.config.baseApiUrl); // main API endpoint

    Object.keys(nga.entities).forEach(key => app.addEntity(nga.entities[key]));

    app.dashboard(
      nga.dashboard()
        .addCollection(nga.collection(nga.entities['marketing']))
    );

    const currentUser = (JSON.parse(window.localStorage.getItem('ngStorage-user')) || {});

    app.menu(
      nga.generateMenu(window.menu.refMap, window.menu.tree, [currentUser.role])
    );

    nga.configure(app);
  });
})();
