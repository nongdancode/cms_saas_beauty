(function() {
  const module = angular.module('app.config', []);

  module.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  });

  module.config(function (NgAdminConfigurationProvider, $injector) {
    const nga = NgAdminConfigurationProvider;

    const app = nga.application('Lash Admin')
          .baseApiUrl(window.config.baseApiUrl); // main API endpoint

    const { marketing, payment, staff, promotion, user, service, waitlist, group } = nga.entities;

    app.addEntity(marketing);
    app.addEntity(payment);
    app.addEntity(staff);
    app.addEntity(promotion);
    app.addEntity(user);
    app.addEntity(service);
    app.addEntity(waitlist);
    app.addEntity(group);

    app.dashboard(
      nga.dashboard()
        .addCollection(nga.collection(marketing))
        .addCollection(nga.collection(payment))
    );

    const currentUser = (JSON.parse(window.localStorage.getItem('ngStorage-user')) || {});

    app.menu(
      nga.generateMenu(window.menu.refMap, window.menu.tree, [currentUser.role])
    );

    nga.configure(app);
  });
})();
