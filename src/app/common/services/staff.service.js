(function(){
    angular.module('service.staff', [])
        .factory('StaffService', StaffService);
    function StaffService(HttpService) {
        var service = {};

        service.getStaffs = function() {
            return HttpService.get(HttpService.generateUrl('staffs'))
                .then(res => res.data);
        };

        service.getStaffTasks = function(id) {
            return HttpService.get(HttpService.generateUrl(`staffs/${id}/tasks`))
                .then(res => res.data);
        };

        service.getStaffSchedules = function(id) {
            return HttpService.get(HttpService.generateUrl(`staffs/${id}/schedules`))
                .then(res => res.data);
        };

        service.updateSchedules = function(id, schedules) {
            return HttpService.post(HttpService.generateUrl(`staffs/${id}/tasks`), schedules)
                .then(res => res.data);
        };

        return service;
    }
})();
