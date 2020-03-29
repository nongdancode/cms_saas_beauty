(function(){
    const module = angular.module('module.income', [
        'module.income.components.history-income'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('income')
              .identifier(nga.field('employee_id'));

        const listView = entity.listView();

        listView
            .title('Income')
            .perPage(20);

        listView.fields([
            nga.field('employee_name'),
            nga.field('payment_type'),
            nga.field('commission_type'),
            nga.field('base_salary', 'number')
                .format('$0,0.00'),
            nga.field('salary_total', 'number')
                .format('$0,0.00'),
            nga.field('income_service', 'number')
                .format('$0,0.00')
        ]);

        listView.listActions(
            '<ma-history-income id="entry.values.id"></ma-history-income>'
        );

        nga.addEntity('income', entity);
    });
})();
