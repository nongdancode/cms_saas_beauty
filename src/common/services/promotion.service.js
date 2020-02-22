(function(){
    angular.module('service.promotion', [])
        .factory('PromotionService', PromotionService);
    function PromotionService($http) {
        var service = {};

        service.getPromotions = function() {
            return $http.get(window.config.baseApiUrl + 'promotions');
        };

        service.updatePromotionById = function(id, data) {
            return $http.post(window.config.baseApiUrl + `promotions/${id}`, data);
        };

        return service;
    }
})();
