(function(){
    const module = angular.module('module.user', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const serviceEntity = nga.entity('service').url(nga.entityUrl('services'));

        const entity = nga.entity('user');

        entity.url(nga.entityUrl('employees'));

        const listView = entity.listView();

        listView
            .title('Employee')
            .perPage(20);

        listView.fields([
            nga.field('name'),
            nga.field('social_sn')
                .label('Social SN'),
            nga.field('email'),
            nga.field('phone_number'),
            // nga.field('base_salary', 'number'),
            // nga.field('commission_type'),
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
            nga.field('commission_type'),
            nga.field('payment_type')
        ]);

        listView.listActions(['edit', 'delete']);

        const creationView = entity.creationView();

        creationView
            .title('Employee');

        creationView.fields([
            nga.field('name')
                .validation({ required: true }),
            nga.field('password', 'password')
                .validation({ required: true }),
            nga.field('social_sn')
                .label('Social SN')
                .validation({ required: true }),
            nga.field('email')
                .validation({ required: true }),
            nga.field('phone_number')
                .validation({ required: true }),
            nga.field('base_salary', 'number')
                .validation({ required: true }),
            nga.field('image', 'file')
                .uploadInformation({
                    url: window.config.baseApiUrl + 'upload-image',
                    apifilename: 'data',
                    accept: 'image/*',
                    data: {
                        type: 'user'
                    }
                })
                .validation({ required: true }),
            nga.field('commission_type', 'number')
                .validation({ required: true, maxlength: 2 }),
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
            nga.field('name')
                .validation({ required: true }),
            nga.field('social_sn')
                .label('Social SN')
                .validation({ required: true }),
            nga.field('email')
                .validation({ required: true }),
            nga.field('phone_number')
                .validation({ required: true }),
            nga.field('image', 'file')
                .uploadInformation({
                    url: window.config.baseApiUrl + 'upload-image',
                    apifilename: 'data',
                    accept: 'image/*',
                    data: {
                        type: 'user'
                    }
                })
                .validation({ required: true }),
            nga.field('base_salary', 'number')
                .validation({ required: true }),
            nga.field('commission_type', 'number')
                .validation({ required: true, maxlength: 2 }),
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

        nga.addEntity('user', entity);
    });
})();
