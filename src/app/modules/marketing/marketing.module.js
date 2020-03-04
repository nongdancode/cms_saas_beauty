(function(){
    const module = angular.module('module.marketing', [
        'module.marketing.components.send-sms',
        'module.marketing.components.history-customer'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('marketing');

        entity.url(nga.entityUrl('marketing'));

        const listView = entity.listView();

        listView
            .title('Customer Management')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('last_visit', 'date'),
            nga.field('birthday', 'date'),
            nga.field('email', 'email'),
            nga.field('visit_count', 'number'),
            nga.field('amount_paid', 'number')
                .format('$0,0.00')
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('last_visit', 'daterange').pinned(true),
            nga.field('birthday', 'daterange'),
            nga.field('email', 'email'),
            nga.field('visit_count', 'number'),
            nga.field('amount_paid', 'number'),
            nga.field('__custom', 'custom')
                .label('Custom')
                .defaultValue('Ali')
                .field('name')
        ]);

        listView.actions(
            '<ma-send-sms selection="selection" entity="entity"></ma-send-sms>' +
                '<ma-filter-button filters="filters()" enabled-filters="enabledFilters" enable-filter="enableFilter()"></ma-filter-button>' +
                '<ma-export-to-csv-button entity="entity" datastore="datastore"></ma-export-to-csv-button>'
        );

        listView.listActions(
            '<ma-history-customer id="entry.values.id"></ma-history-customer>' +
                '<ma-edit-button entry="entry" entity="entity" size="xs"></ma-edit-button>'
        );

        const editionView = entity.editionView();

        editionView
            .title('Edit Customer: {{ entry.values.name }}');

        editionView.fields([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('birthday', 'date'),
            nga.field('email', 'email')
        ]);

        nga.addEntity('marketing', entity);
    });
})();
