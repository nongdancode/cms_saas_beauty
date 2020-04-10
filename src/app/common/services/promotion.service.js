(function(){
    angular.module('service.promotion', [])
        .factory('PromotionService', PromotionService);
    function PromotionService(HttpService, ModalService) {
        var service = {};

        service.getPromotions = function() {
            return HttpService.get(window.config.baseApiUrl + 'promotions');
        };

        service.updatePromotionById = function(id, data) {
            return HttpService.post(window.config.baseApiUrl + `promotions/${id}`, data, {
                errorHandleStrategy: HttpService.strategy.show
            });
        };

        return service;
    }
})();
