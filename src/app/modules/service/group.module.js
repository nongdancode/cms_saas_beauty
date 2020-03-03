(function(){
    const module = angular.module('module.group', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('group');

        entity.url(window.entityUrl('groups'));

        const listView = entity.listView();

        listView
            .title('Group')
            .perPage(10);

        listView.fields([
            nga.field('name')
        ]);

        listView.filters([
            nga.field('name')
        ]);

        // listView.listActions(['edit', 'delete']);

        const creationView = entity.creationView();

        creationView.fields([
            nga.field('name')
        ]);

        const editionView = entity.editionView();

        editionView
            .title('Edit Group: {{ entry.values.name }}');

        editionView.fields([
            nga.field('name')
        ]);

        window.addEntity('group', entity);
    });
})();
