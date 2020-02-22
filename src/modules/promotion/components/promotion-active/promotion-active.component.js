(function(){
    const module = angular.module('module.promotion.components.promotion-active', []);

    class PromotionActiveComponent {
        constructor($scope, progression, PromotionService) {
            this.$scope = $scope;
            this.progression = progression;
            this.PromotionService = PromotionService;
        }

        change(state) {
            this.progression.start();

            this.PromotionService.updatePromotionById(this.entry.values.id, {
                active: state
            }).finally(() => {
                this.progression.done();
            });
        };
    }

    module.component('maPromotionActive', {
        bindings: {
            entry: '<'
        },
        controller: PromotionActiveComponent,
        templateUrl: 'src/modules/promotion/components/promotion-active/promotion-active.component.html'
    });
})();
