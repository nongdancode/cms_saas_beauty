(function(){
    const module = angular.module('module.service', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const userEntity = nga.entity('user').url(window.entityUrl('employees'));

        const entity = nga.entity('service');

        entity.url(window.entityUrl('services'));

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
                })
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('price', 'number'),
            nga.field('stepping', 'number')
                .label('Duration')
        ]);

        listView.listActions(['edit', 'delete']);

        const creationView = entity.creationView();

        creationView.fields([
            nga.field('name'),
            nga.field('price', 'number'),
            nga.field('stepping', 'number')
                .label('Duration')
        ]);

        const editionView = entity.editionView();

        editionView
            .title('Edit Service: {{ entry.values.name }}');

        editionView.fields([
            nga.field('name'),
            nga.field('price', 'number'),
            nga.field('stepping', 'number')
                .label('Duration')
        ]);

        window.addEntity('service', entity);
    });
})();
