(function() {
  const module = angular.module('app.config', []);

  module.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  });

  module.config(function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
      const key = `${operation}-${what}`;

      if (window.httpCache[key]) {
        // httpConfig.timeout = 1;
      }

      return { element: element };
    });

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation === "getList") {
        const key = `${operation}-${what}`;

        let dataList = [];

        if (Array.isArray(data)) {
          dataList = data;
        }

        if (Array.isArray(response.data)) {
          dataList = response.data;
        }

        // if (Array.isArray(window.httpCache[key])) {
        //   dataList = window.httpCache[key];
        // }

        window.httpCache[key] = dataList;

        const { _page, _perPage, _sortDir, _sortField, _filters } = response.config.params;

        dataList = dataList
          .filter(row => (_filters || {}).ids ? _filters.ids.includes(row.id.toString()) : true)
          .filter(row => {
            return Object.keys(_filters || {}).filter(field => field !== 'ids').every(field => {
              const value = _filters[field];

              switch (typeof value){
              case 'string' : {
                return row[field].toLowerCase().includes(value.toLowerCase());
              }
              case 'number': {
                return row[field] === value;
              }
              case 'object': {
                switch (value.type) {
                case 'daterange': {
                  return moment(row[field]) >= moment(value.startDate)
                    && moment(row[field]) <= moment(value.endDate);
                }
                default: {
                  return row[field] === value;
                }
                }
              }
              default: {
                return row[field] === value;
              }
              }
            });
          });

        response.totalCount = dataList.length;

        if (typeof _page !== 'undefined' && typeof _perPage !== 'undefined') {
          dataList = dataList.slice((_page - 1) * _perPage, _page * _perPage);
        }

        return dataList;
      }

      return data;
    });
  });

  module.config(function (NgAdminConfigurationProvider, $injector) {
    const nga = NgAdminConfigurationProvider;

    const app = nga.application('Lash Admin')
          .baseApiUrl(window.config.baseApiUrl); // main API endpoint

    const { marketing, payment, staff, promotion, user, service, waitlist } = window.entities;

    app.addEntity(marketing);
    app.addEntity(payment);
    app.addEntity(staff);
    app.addEntity(promotion);
    app.addEntity(user);
    app.addEntity(service);
    app.addEntity(waitlist);

    app.dashboard(
      nga.dashboard()
        .addCollection(nga.collection(marketing))
        .addCollection(nga.collection(payment))
    );

    const menu = nga.menu()
          .addChild(
            nga.menu(waitlist)
              .title('Check-in & Waiting List')
              .icon('<span class="glyphicon glyphicon-oil"></span>')
          )
          .addChild(
            nga.menu(marketing)
              .title('Marketing Management')
              .icon('<span class="glyphicon glyphicon-shopping-cart"></span>')
          )
          .addChild(
            nga.menu().title('Schedule Management')
              .active(path => path.includes('/staff/'))
              .icon('<span class="glyphicon glyphicon-time"></span>')
              .addChild(
                nga.menu()
                  .title('Schedule Manager')
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
            nga.menu(service)
              .title('Service Management')
              .icon('<span class="glyphicon glyphicon-tasks"></span>')
          )
          .addChild(
            nga.menu().title('Setting').icon('<span class="glyphicon glyphicon-cog"></span>')
              .active(path => path.includes('/auth/'))
              .addChild(
                nga.menu()
                  .title('Logout')
                  .link('/auth/logout')
                  .active(path => path == '/auth/logout')
                  .icon('<span class="glyphicon glyphicon-log-out"></span>')
              )
          );

    app.menu(menu);

    nga.configure(app);
  });
})();
