(function(){
    const module = angular.module('module.user', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('user');

        const listView = entity.listView();

        entity.url(() => {
            return 'employees';
        });

        listView
            .title('Employee')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('social_sn')
                .label('Social SN'),
            nga.field('email'),
            nga.field('phone_number'),
            nga.field('role', 'number'),
            nga.field('base_salary', 'number'),
            nga.field('commision_type'),
            nga.field('payment_type'),
            nga.field('services', 'reference_many')
                .targetEntity(nga.entity('service'))
                .targetField(nga.field('name'))
                .singleApiCall(function (ids) {
                    return { ids };
                })
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('social_sn')
                .label('Social SN'),
            nga.field('email'),
            nga.field('phone_number'),
            nga.field('role', 'number'),
            nga.field('base_salary', 'number'),
            nga.field('commision_type'),
            nga.field('payment_type')
        ]);

        const creationView = entity.creationView();

        creationView
            .title('Employee');

        creationView.fields([
            nga.field('name'),
            nga.field('social_sn')
                .label('Social SN'),
            nga.field('email'),
            nga.field('phone_number'),
            nga.field('role', 'number'),
            nga.field('base_salary', 'number'),
            nga.field('commision_type', 'choice')
                .choices(
                    window.models.arrayMetadata(window.models.EmployeeCommissionType).map(row => {
                        return {
                            label: row.text,
                            value: row.key
                        };
                    })
                ),
            nga.field('payment_type', 'choice')
                .choices(
                    window.models.arrayMetadata(window.models.EmployeePaymentType).map(row => {
                        return {
                            label: row.text,
                            value: row.key
                        };
                    })
                ),
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
                        social_sn: '123456789',
                        email: 'test@abc.com',
                        role: 1,
                        base_salary: 200,
                        commision_type: '50check_50cash',
                        payment_type: '50/50',
                        services: [1, 2]
                    },
                    {
                        id: 2,
                        name: 'User 2',
                        phone_number: '222-222-2222',
                        social_sn: '123456789',
                        email: 'test@abc.com',
                        role: 2,
                        base_salary: 300,
                        commision_type: '100_check',
                        payment_type: '70/30',
                        services: [1, 2]
                    }
                ];
            }
            return data;
        });
    });
})();
