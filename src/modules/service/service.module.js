(function(){
    const module = angular.module('module.service', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('service');

        const listView = entity.listView();

        listView
            .title('Service')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('cost', 'number'),
            nga.field('stepping', 'number'),
            nga.field('users', 'reference_many')
                .targetEntity(nga.entity('user'))
                .targetField(nga.field('name'))
                .singleApiCall(function (ids) {
                    return { ids };
                })
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('cost', 'number'),
            nga.field('stepping', 'number'),
        ]);

        const creationView = entity.creationView();

        creationView.fields([
            nga.field('name'),
            nga.field('cost', 'number'),
            nga.field('stepping', 'number'),
            nga.field('users', 'reference_many')
                .targetEntity(nga.entity('user'))
                .targetField(nga.field('name'))
        ]);

        window.addEntity('service', entity);
    });

    module.config(function(RestangularProvider) {
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
            if (operation === "getList" && what === 'service') {
                return [
                    {
                        id: 1,
                        name: 'Service 1',
                        cost: 100,
                        stepping: 30,
                        users: [1, 2]
                    },
                    {
                        id: 2,
                        name: 'Service 2',
                        cost: 200,
                        stepping: 60,
                        users: [1, 2]
                    }
                ];
            }
            return data;
        });
    });
})();
