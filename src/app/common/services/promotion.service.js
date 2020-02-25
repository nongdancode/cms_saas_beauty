(function(){
    angular.module('service.promotion', [])
        .factory('PromotionService', PromotionService);
    function PromotionService(HttpService, notification) {
        var service = {};

        service.getPromotions = function() {
            return HttpService.get(window.config.baseApiUrl + 'promotions');
        };

        service.updatePromotionById = function(id, data) {
            return HttpService.post(window.config.baseApiUrl + `promotions/${id}`, data)
                .then(res => {
                    if (res.code) {
                        notification.log('Update promotion failed!', { addnCls: 'humane-flatty-error' });
                    }

                    notification.log('Update promotion successfully!', { addnCls: 'humane-flatty-success' });

                    return res.data;
                });
        };

        return service;
    }
})();
