(function(){
    angular.module('service.promotion', [])
        .factory('PromotionService', PromotionService);
    function PromotionService(HttpService, ModalService) {
        var service = {};

        service.getPromotions = function() {
            return HttpService.get(window.config.baseApiUrl + 'promotions');
        };

        service.updatePromotionById = function(id, data) {
            return HttpService.post(window.config.baseApiUrl + `promotions/${id}`, data)
                .then(res => {
                    if (res.code === 0) {
                        ModalService.success('Update promotion successfully!');
                    } else {
                        ModalService.error('Update promotion failed!');
                    }

                    return res.data;
                });
        };

        return service;
    }
})();
