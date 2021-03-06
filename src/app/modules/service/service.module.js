(function(){
    const module = angular.module('module.service', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const employeeEntity = nga.entity('employee').url(nga.entityUrl('employees'));
        const groupEntity = nga.entity('group').url(nga.entityUrl('groups'));

        const entity = nga.entity('service');

        entity.url(nga.entityUrl('services'));

        const listView = entity.listView();

        listView
            .title('Service')
            .perPage(20);

        listView.fields([
            nga.field('name'),
            nga.field('price', 'number')
                .format('$0,0.00'),
            nga.field('stepping', 'number')
                .label('Duration'),
            nga.field('userIds', 'reference_many')
                .label('Employees')
                .targetEntity(employeeEntity)
                .targetField(nga.field('name'))
                .singleApiCall(function (ids) {
                    return { ids };
                }),
            nga.field('groupIds', 'reference_many')
                .label('Groups')
                .targetEntity(groupEntity)
                .targetField(nga.field('name'))
                .singleApiCall(function (ids) {
                    return { ids };
                })
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('price', 'number'),
            nga.field('stepping', 'number')
                .label('Duration'),
            nga.field('groupIds', 'custom')
                .label('Group')
                .field('groupIds')
                .operator('$in')
                .defaultValue(1)
        ]);

        listView.listActions(['edit', 'delete']);

        const creationView = entity.creationView();

        creationView.fields([
            nga.field('name')
                .validation({ required: true }),
            nga.field('img', 'image')
                .uploadInformation({
                    url: window.config.baseApiUrl + 'upload-image',
                    apifilename: 'data',
                    data: {
                        type: 'service'
                    }
                })
                .validation({ required: true }),
            nga.field('price', 'number')
                .validation({ required: true }),
            nga.field('stepping', 'number')
                .label('Duration')
                .validation({ required: true }),
            nga.field('userIds', 'reference_many')
                .label('Employees')
                .targetEntity(employeeEntity)
                .targetField(nga.field('name'))
                .validation({ required: true }),
            nga.field('groupIds', 'reference_many')
                .label('Groups')
                .targetEntity(groupEntity)
                .targetField(nga.field('name'))
                .validation({ required: true })
        ]);

        const editionView = entity.editionView();

        editionView
            .title('Edit Service: {{ entry.values.name }}');

        editionView.fields([
            nga.field('name')
                .validation({ required: true }),
            nga.field('img', 'image')
                .uploadInformation({
                    url: window.config.baseApiUrl + 'upload-image',
                    apifilename: 'data',
                    data: {
                        type: 'service'
                    }
                })
                .validation({ required: true }),
            nga.field('price', 'number')
                .validation({ required: true }),
            nga.field('stepping', 'number')
                .label('Duration')
                .validation({ required: true }),
            nga.field('userIds', 'reference_many')
                .label('Employees')
                .targetEntity(employeeEntity)
                .targetField(nga.field('name'))
                .validation({ required: true }),
            nga.field('groupIds', 'reference_many')
                .label('Groups')
                .targetEntity(groupEntity)
                .targetField(nga.field('name'))
                .validation({ required: true })
        ]);

        nga.addEntity('service', entity);
    });
})();
