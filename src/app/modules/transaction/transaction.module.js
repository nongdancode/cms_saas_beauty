(function(){
    const module = angular.module('module.transaction', [
        'module.transaction.components.send-sms'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('transaction');

        const listView = entity.listView();

        listView
            .title('Transaction')
            .perPage(20);

        listView.fields([
            nga.field('name').label('Customer Name')
                .template('{{ entry.values.invoice.about.customer.name }}'),
            nga.field('type'),
            nga.field('created', 'datetime'),
            nga.field('invoice', 'template')
                .label('Action')
                .template(
                    `<ma-send-sms-bill entry="entry"></ma-send-sms-bill>` +
                    `<ma-checkout entry="entry" title="Print" print-only="true"></ma-checkout>`
                )
        ]);

        nga.addEntity('transaction', entity);
    });
})();
