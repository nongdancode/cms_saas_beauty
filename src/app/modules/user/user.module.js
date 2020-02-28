(function(){
    const module = angular.module('module.user', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const serviceEntity = nga.entity('service').url(window.entityUrl('services'));

        const entity = nga.entity('user');

        entity.url(window.entityUrl('employees'));

        const listView = entity.listView();

        listView
            .title('Employee')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('social_sn')
                .label('Social SN'),
            nga.field('email'),
            nga.field('phone_number'),
            // nga.field('base_salary', 'number'),
            // nga.field('commision_type'),
            // nga.field('payment_type'),
            nga.field('services', 'reference_many')
                .targetEntity(serviceEntity)
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
            nga.field('base_salary', 'number'),
            nga.field('commision_type'),
            nga.field('payment_type')
        ]);

        listView.listActions(['edit', 'delete']);

        const creationView = entity.creationView();

        creationView
            .title('Employee');

        creationView.fields([
            nga.field('name'),
            nga.field('password', 'password'),
            nga.field('social_sn')
                .label('Social SN'),
            nga.field('email'),
            nga.field('phone_number'),
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
                )
        ]);

        const editionView = entity.editionView();

        editionView
            .title('Edit Employee: {{ entry.values.name }}');

        editionView.fields([
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
                )
        ]);

        window.addEntity('user', entity);
    });
})();
