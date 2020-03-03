(function(){
    const module = angular.module('module.waitlist', [
        'module.waitlist.components.checkin',
        'module.waitlist.components.checkout',
        'module.waitlist.components.invoice'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('waitlist');

        const listView = entity.listView();

        listView
            .title('Wait List')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('phone'),
            nga.field('status'),
            nga.field('invoice', 'template')
                .label('Action')
                .template(
                    `<ma-checkout ng-if="entry.values.status === 'booking'" entry="entry"></ma-checkout>` +
                        `<ma-checkin ng-if="entry.values.status === 'checkin'" entry="entry"></ma-checkin>`
                )
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('type')
        ]);

        window.addEntity('waitlist', entity);
    });
})();
