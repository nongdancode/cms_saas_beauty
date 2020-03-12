(function(){
    const module = angular.module('module.group', []);

    module.config(function ($stateProvider) {
        $stateProvider
            .state('service-by-group-id', {
                url: '/group/:id/services',
                controller: function($stateParams, $location) {
                    const { id } = $stateParams;

                    $location.path('/service/list').search({
                        search: `{"groupIds":{"type":"custom","data":{"field":"groupIds","operator":"$in","value":"${id}"}}}`
                    });
                }
            });
    });

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('group');

        entity.url(nga.entityUrl('groups'));

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

        listView.listActions(
            '<a class="btn btn-default btn-xs" ui-sref="service-by-group-id({ id: entry.values.id })">' +
                '<span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>&nbsp;' +
                '<span class="hidden-xs ng-scope">Detail</span>' +
                '</a>' +
                '<ma-edit-button entry="entry" entity="entity" size="xs"></ma-edit-button>' +
                '<ma-delete-button entry="entry" entity="entity" size="xs"></ma-delete-button>'
        );

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

        nga.addEntity('group', entity);
    });
})();
