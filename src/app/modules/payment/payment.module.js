(function(){
    const module = angular.module('module.payment', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('payment-manager');

        const listView = entity.listView();

        listView
            .title('Payment')
            .perPage(10);

        listView.fields([
            nga.field('card_number'),
            nga.field('card_type'),
            nga.field('name_on_card'),
            nga.field('status'),
            nga.field('amount', 'number'),
            nga.field('charge_at', 'date')
        ]);

        listView.filters([
            nga.field('card_number'),
            nga.field('card_type'),
            nga.field('name_on_card'),
            nga.field('status'),
            nga.field('amount', 'number'),
            nga.field('charge_at', 'date')
        ]);

        nga.addEntity('payment', entity);
    });
})();
