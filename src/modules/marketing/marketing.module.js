(function(){
    const module = angular.module('module.marketing', [
        'module.marketing.components.send-sms'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('marketing');

        const listView = entity.listView();

        listView
            .title('Marketing')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('last_visit', 'date'),
            nga.field('birthday', 'date'),
            nga.field('image')
                .template('<img src="{{ entry.values.image }}" height="42" width="42" />'),
            nga.field('email', 'email'),
            nga.field('visit_count', 'number'),
            nga.field('amount_paid', 'number')
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('phone_number'),
            nga.field('last_visit', 'template')
                .template('<ma-daterange-filter ng-model="value"></ma-daterange-filter>'),
            nga.field('birthday', 'template')
                .template('<ma-daterange-filter ng-model="value"></ma-daterange-filter>'),
            nga.field('email', 'email'),
            nga.field('visit_count', 'number'),
            nga.field('amount_paid', 'number')
        ]);

        var template = '<ma-send-sms selection="selection" entity="entity"></ma-send-sms>' +
            '<ma-filter-button filters="filters()" enabled-filters="enabledFilters" enable-filter="enableFilter()"></ma-filter-button>' +
            '<ma-export-to-csv-button entity="entity" datastore="datastore"></ma-export-to-csv-button>';
        listView.actions(template);

        window.addEntity('marketing', entity);
    });
})();
