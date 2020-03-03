(function() {
  const module = angular.module('app.config', []);

  module.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  });

  module.config(function (NgAdminConfigurationProvider, $injector) {
    const nga = NgAdminConfigurationProvider;

    const app = nga.application('Lash Admin')
          .baseApiUrl(window.config.baseApiUrl); // main API endpoint

    const { marketing, payment, staff, promotion, user, service, waitlist, group } = window.entities;

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

    let menu;

    switch (currentUser.role) {
    case window.models.Role.STAFF: {
      menu = nga.menu()
        .addChild(
          nga.menu(waitlist)
            .title('Check-in & Waiting List')
            .icon('<span class="glyphicon glyphicon-oil"></span>')
        )
        .addChild(
          nga.menu(marketing)
            .title('Customer Management')
            .icon('<span class="glyphicon glyphicon-shopping-cart"></span>')
        )
        .addChild(
          nga.menu().title('Schedule Management')
            .active(path => path.includes('/staff/'))
            .icon('<span class="glyphicon glyphicon-time"></span>')
            .addChild(
              nga.menu()
                .title('Schedule View')
                .link('/staff/schedule')
                .active(path => path == '/staff/schedule')
                .icon('<span class="glyphicon glyphicon-eye-open"></span>')
            )
        )
        .addChild(
          nga.menu().title('Setting').icon('<span class="glyphicon glyphicon-cog"></span>')
            .active(path => path.includes('/auth/'))
            .addChild(
              nga.menu()
                .title('Change password')
                .link('/auth/change-password')
                .active(path => path == '/auth/change-password')
                .icon('<span class="glyphicon glyphicon-user"></span>')
            )
            .addChild(
              nga.menu()
                .title('Logout')
                .link('/auth/logout')
                .active(path => path == '/auth/logout')
                .icon('<span class="glyphicon glyphicon-log-out"></span>')
            )
        );

      break;
    }
    default: {
      menu = nga.menu()
        .addChild(
          nga.menu(waitlist)
            .title('Check-in & Waiting List')
            .icon('<span class="glyphicon glyphicon-oil"></span>')
        )
        .addChild(
          nga.menu(marketing)
            .title('Customer Management')
            .icon('<span class="glyphicon glyphicon-shopping-cart"></span>')
        )
        .addChild(
          nga.menu().title('Management')
            .active(path => path.includes('/staff/'))
            .icon('<span class="glyphicon glyphicon-time"></span>')
            .addChild(
              nga.menu()
                .title('Schedule Management')
                .link('/staff/list')
                .active(path => path == '/staff/list')
                .icon('<span class="glyphicon glyphicon-calendar"></span>')
            )
            .addChild(
              nga.menu()
                .title('Schedule View')
                .link('/staff/schedule')
                .active(path => path == '/staff/schedule')
                .icon('<span class="glyphicon glyphicon-eye-open"></span>')
            )
        )
        .addChild(
          nga.menu(payment)
            .title('Transaction History')
            .icon('<span class="glyphicon glyphicon-usd"></span>')
        )
        .addChild(
          nga.menu(promotion)
            .title('Promotion')
            .icon('<span class="glyphicon glyphicon-flash"></span>')
            .addChild(
              nga.menu()
                .title('Loyalty (upgrade)')
                .icon('<span class="glyphicon glyphicon-eye-close"></span>')
            )
        )
        .addChild(
          nga.menu().title('Report')
            .active(path => path.includes('/report/'))
            .icon('<span class="glyphicon glyphicon-stats"></span>')
            .addChild(
              nga.menu()
                .title('Payment Report')
                .link('/report/payment')
                .active(path => path == '/report/payment')
                .icon('<span class="glyphicon glyphicon-stats"></span>')
            )
            .addChild(
              nga.menu()
                .title('Customer Report')
                .link('/report/customer')
                .active(path => path == '/report/customer')
                .icon('<span class="glyphicon glyphicon-equalizer"></span>')
            )
            .addChild(
              nga.menu()
                .title('Employee Statistic')
                .link('/report/employee-statistic')
                .active(path => path == '/report/employee-statistic')
                .icon('<span class="glyphicon glyphicon-user"></span>')
            )
        )
        .addChild(
          nga.menu(user)
            .title('Employee Management')
            .icon('<span class="glyphicon glyphicon-user"></span>')
        )
        .addChild(
          nga.menu()
            .title('Service Management')
            .icon('<span class="glyphicon glyphicon-tasks"></span>')
            .addChild(
              nga.menu(group)
                .title('Service Group Management')
                .icon('<span class="glyphicon glyphicon-tasks"></span>')
            )
            .addChild(
              nga.menu(service)
                .title('Service Management')
                .icon('<span class="glyphicon glyphicon-tasks"></span>')
            )
        )
        .addChild(
          nga.menu().title('Setting').icon('<span class="glyphicon glyphicon-cog"></span>')
            .active(path => path.includes('/auth/'))
            .addChild(
              nga.menu()
                .title('Change password')
                .link('/auth/change-password')
                .active(path => path == '/auth/change-password')
                .icon('<span class="glyphicon glyphicon-user"></span>')
            )
            .addChild(
              nga.menu()
                .title('Logout')
                .link('/auth/logout')
                .active(path => path == '/auth/logout')
                .icon('<span class="glyphicon glyphicon-log-out"></span>')
            )
        );
    }
    }
    app.menu(menu);

    nga.configure(app);
  });
})();
