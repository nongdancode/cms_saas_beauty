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
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('description'),
            nga.field('status'),
            nga.field('active')
                .template('<ma-promotion-active entry="entry"></ma-promotion-active>')
        ]);

        listView.filters([
            nga.field('name'),
            nga.field('description'),
            nga.field('status')
        ]);

        window.addEntity('promotion', entity);
    });

    module.config(function(RestangularProvider) {
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
            if (operation === "getList" && what === 'promotion') {
                return [
                    {                        id: 1,
                        name: 'Promotion 1',
                        description: 'Id velit ut tortor pretium.',
                        status: 'Status 1',
                        active: true
                    },
                    {
                        id: 2,
                        name: 'Promotion 2',
                        description: 'Scelerisque eleifend donec pretium vulputate.',
                        status: 'Status 2',
                        active: false
                    }
                ];
            }
            return data;
        });
    });
})();
