(function(){
    const module = angular.module('module.income', []);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('income');

        const listView = entity.listView();

        listView
            .title('Income')
            .perPage(20);

        listView.fields([
            nga.field('name'),
            nga.field('currentIncome', 'number')
                .label('Current Income')
                .format('$0,0.00'),
            nga.field('paymentType')
                .label('Payment Type'),
            nga.field('commissionType')
                .label('Commission Type'),
            nga.field('baseSalary', 'number')
                .label('Base Salary')
                .format('$0,0.00')
        ]);

        nga.addEntity('income', entity);
    });
})();
