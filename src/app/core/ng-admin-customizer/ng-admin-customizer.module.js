(function() {
  const module = angular.module('core.ng-admin-customizer', [
    'core.ng-admin-customizer.type.custom',
    'core.ng-admin-customizer.type.daterange',
    'core.ng-admin-customizer.type.image',
    'core.ng-admin-customizer.service.crud'
  ]);

  module.config(function (NgAdminConfigurationProvider) {
    window.nga = NgAdminConfigurationProvider;
  });

  module.config(function (NgAdminConfigurationProvider, $injector) {
    const nga = NgAdminConfigurationProvider;

    nga.addEntity = (name, entity) => {
      nga.entities = {
        ...(nga.entities || {}),
        [name]: entity
      };
    };

    nga.entityUrl = base => (entityName, viewType, identifierValue, identifierName) => {
      switch(viewType) {
      case 'ListView': {
        return base;
      }
      case 'EditView': {
        return base + '?id=' + identifierValue;
      }
      case 'DeleteView': {
        return base + '?id=' + identifierValue;
      }
      default: {
        return base;
      }
      }
    };

    nga.generateMenu = (ref, tree, roles) => {
      const _generateMenu = (root, _tree) => {
        const filterRole =
              menu => menu.role ? roles.some(role => menu.role.includes(role)) : true;

        _tree
          .filter(node => filterRole(ref[node.key]))
          .forEach(node => {
            const metadata = ref[node.key];

            let menu = nga.menu()
                .title(metadata.name)
                .link(metadata.src)
                .icon(`<span class="${metadata.icon}"></span>`);

            metadata.active && menu.active(metadata.active);

            _generateMenu(menu, (node.children || []));

            root.addChild(menu);
          });

        return root;
      };

      return _generateMenu(nga.menu(), tree);
    };
  });

  module.config(function($httpProvider, RestangularProvider) {
    window.httpCache = {};

    $httpProvider.interceptors.push(function() {
      return {
        request: function(config) {
          if (config.method === 'DELETE') {
            const url = new URL(window.resolveUrl(config.url));
            const id = url.searchParams.get('id');

            if (id) {
              config.url = url.origin + url.pathname + '/' + id;
            }
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
      data = data && data.data;

      if (operation === 'getList') {
        const key = `${operation}-${what}`;

        let dataList = [];

        if (Array.isArray(response.data)) {
          dataList = response.data;
        }

        if (Array.isArray(data)) {
          dataList = data;
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
                return (row[field] || '').toLowerCase().includes(value.toLowerCase());
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
                  const filter = value.data;
                  const original = row[filter.field];

                  switch (filter.operator) {
                  case '$in': {
                    if (Array.isArray(original)) {
                      const array = original.map(row => row.toString().toLowerCase());
                      const filterValue = (filter.value || '').toLowerCase();

                      return array.includes(filterValue);
                    }

                    return false;
                  }
                  case '$gte': {
                    return original >= filter.value;
                  }
                  case '$lte': {
                    return original <= filter.value;
                  }
                  case '$gt': {
                    return original > filter.value;
                  }
                  case '$lt': {
                    return original < filter.value;
                  }
                  case '$eq': {
                    return original === filter.value;
                  }
                  default: {
                    return original === filter.value;
                  }
                  }
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
        const id = new URLSearchParams('?' + url.split('?')[1]).get('id');

        return (data.find && data.find(row => +row.id === +id)) || {};
      }

      return data;
    });
  });
})();
