(function(){
    const module = angular.module('module.promotion', [
        'module.promotion.components.promotion-active'
    ]);

    module.config(function (NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('promotion');

        const listView = entity.listView();

        listView
            .title('Promotion')
            .perPage(20);

        listView.fields([
            nga.field('name'),
            nga.field('description'),
            nga.field('status'),
            nga.field('discount_rate'),
            nga.field('active')
                .template('<ma-promotion-active entry="entry"></ma-promotion-active>')
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('description'),
            nga.field('status'),
            nga.field('discount_rate')
        ]);

        nga.addEntity('promotion', entity);
    });
})();
