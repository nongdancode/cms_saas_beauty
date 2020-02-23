(function(){
    angular.module('service.staff', [])
        .factory('StaffService', StaffService);
    function StaffService($http) {
        var service = {};

        service.getStaffs = function() {
            return $http.get(window.config.baseApiUrl + 'staffs')
                .then(res => res.data);
        };

        service.getStaffTasks = function(id) {
            return $http.get(window.config.baseApiUrl + `staffs/${id}/tasks`)
                .then(res => res.data.data);
        };

        service.getStaffSchedules = function(id) {
            return $http.get(window.config.baseApiUrl + `staffs/${id}/schedules`)
                .then(res => res.data.data);
        };

        service.updateSchedules = function(id, schedules) {
            return $http.post(window.config.baseApiUrl + `staffs/${id}/tasks`, schedules)
                .then(res => res.data.data);
        };

        return service;
    }
})();
