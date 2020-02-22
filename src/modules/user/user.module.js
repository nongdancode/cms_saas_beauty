(function(){
    const module = angular.module('module.user', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('user');

        const listView = entity.listView();

        listView
            .title('User')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('role', 'number'),
            nga.field('salary_type', 'number'),
            nga.field('services', 'reference_many')
                .targetEntity(nga.entity('service'))
                .targetField(nga.field('name'))
                .singleApiCall(function (ids) {
                    return { ids };
                })
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('role', 'number'),
            nga.field('salary_type', 'number')
        ]);

        const creationView = entity.creationView();

        creationView.fields([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('role', 'number'),
            nga.field('salary_type', 'number'),
            nga.field('services', 'reference_many')
                .targetEntity(nga.entity('service'))
                .targetField(nga.field('name'))
        ]);

        window.addEntity('user', entity);
    });

    module.config(function(RestangularProvider) {
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
            if (operation === "getList" && what === 'user') {
                return [
                    {
                        id: 1,
                        name: 'User 1',
                        phone_number: '111-111-1111',
                        role: 1,
                        salary_type: 1,
                        services: [1, 2]
                    },
                    {
                        id: 2,
                        name: 'User 2',
                        phone_number: '222-222-2222',
                        role: 2,
                        salary_type: 2,
                        services: [1, 2]
                    }
                ];
            }
            return data;
        });
    });
})();
