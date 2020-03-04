(function(){
    const module = angular.module('module.service', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const userEntity = nga.entity('user').url(nga.entityUrl('employees'));
        const groupEntity = nga.entity('group').url(nga.entityUrl('groups'));

        const entity = nga.entity('service');

        entity.url(nga.entityUrl('services'));

        const listView = entity.listView();

        listView
            .title('Service')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('price', 'number')
                .format('$0,0.00'),
            nga.field('stepping', 'number')
                .label('Duration'),
            nga.field('userIds', 'reference_many')
                .label('Employees')
                .targetEntity(userEntity)
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
            nga.field('name'),
            nga.field('img', 'file')
                .uploadInformation({ 'url': window.config.baseApiUrl + 'upload-image', 'apifilename': 'service_{{ entry.values.id }}' }),
            nga.field('price', 'number'),
            nga.field('stepping', 'number')
                .label('Duration'),
            nga.field('userIds', 'reference_many')
                .targetEntity(userEntity)
                .targetField(nga.field('name'))
        ]);

        const editionView = entity.editionView();

        editionView
            .title('Edit Service: {{ entry.values.name }}');

        editionView.fields([
            nga.field('name'),
            nga.field('img', 'file')
                .uploadInformation({ 'url': window.config.baseApiUrl + 'upload-image', 'apifilename': 'service_{{ entry.values.id }}' }),
            nga.field('price', 'number'),
            nga.field('stepping', 'number')
                .label('Duration'),
            nga.field('userIds', 'reference_many')
                .targetEntity(userEntity)
                .targetField(nga.field('name'))
        ]);

        nga.addEntity('service', entity);
    });
})();
