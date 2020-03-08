(function(){
    const module = angular.module('module.transaction', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('transaction');

        const listView = entity.listView();

        listView
            .title('Transaction')
            .perPage(10);

        listView.fields([
            nga.field('type'),
            nga.field('created', 'date'),
            nga.field('invoice', 'template')
                .label('Action')
                .template(
                    `<ma-checkout entry="entry" title="Print" print-only="true"></ma-checkout>`
                )
        ]);

        nga.addEntity('transaction', entity);
    });
})();
