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
                this.entry.values.active = !this.entry.values.active;
                this.progression.done();
            });
        };
    }

    module.component('maPromotionActive', {
        bindings: {
            entry: '<'
        },
        controller: PromotionActiveComponent,
        templateUrl: 'app/modules/promotion/components/promotion-active/promotion-active.component.html'
    });
})();
