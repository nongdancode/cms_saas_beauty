(function() {
  const module = angular.module('core.ng-admin-customizer', [
    'core.ng-admin-customizer.types.custom',
    'core.ng-admin-customizer.types.daterange'
  ]);

  module.config(function($httpProvider, RestangularProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        request: function(config) {
          if (config.method === 'DELETE') {
            const url = new URL(config.url);
            const id = url.searchParams.get('id');

            config.url = url.origin + url.pathname + '/' + id;
          }
          return config;
        },
      };
    });

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
      const key = `${operation}-${what}`;

      if (window.httpCache[key]) {
        // httpConfig.timeout = 1;
      }

      switch(operation) {
      default: {
        return { element: element };
      }
      }
    });

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation === 'getList') {
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
                  return moment(row[field]) >= moment(value.data.startDate)
                    && moment(row[field]) <= moment(value.data.endDate);
                }
                case 'custom': {
                  return row[value.data.field] === value.data.value;
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

      if (operation === 'get') {
        const id = new URL(url).searchParams.get('id');

        return data.find(row => +row.id === +id) || {};
      }

      return data;
    });
  });
})();
