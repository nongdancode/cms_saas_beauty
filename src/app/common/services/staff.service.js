(function(){
    angular.module('service.staff', [])
        .factory('StaffService', StaffService);
    function StaffService(HttpService, ModalService) {
        var service = {};

        service.getStaffs = function() {
            return HttpService.get(HttpService.generateUrl('staffs'));
        };

        service.getStaffTasks = function(id) {
            return HttpService.get(HttpService.generateUrl(`staffs/${id}/tasks`))
                .then(res => res.data || []);
        };

        service.getStaffSchedules = function(id) {
            return HttpService.get(HttpService.generateUrl(`staffs/${id}/schedules`))
                .then(res => res.data || []);
        };

        service.updateSchedules = function(id, schedules) {
            return HttpService.post(HttpService.generateUrl(`schedules/${id}/tasks`), schedules, {
                errorHandleStrategy: HttpService.strategy.show
            });
        };

        service.getTasks = function(id) {
            return HttpService.get(HttpService.generateUrl(`shifts/${id}/tasks`));
        };

        service.deleteTask = function(id) {
            return HttpService.delete(HttpService.generateUrl(`tasks/${id}`));
        };

        service.getShifts = function(id) {
            return HttpService.get(HttpService.generateUrl(`schedules/${id}/shifts`));
        };

        service.getAllShifts = function(id) {
            return HttpService.get(HttpService.generateUrl(`shifts`));
        };

        service.createShift = function(data) {
            return HttpService.post(HttpService.generateUrl('shifts'), data, {
                errorHandleStrategy: HttpService.strategy.show
            });
        };

        service.deleteShift = function(id, employeeId) {
            return HttpService.delete(HttpService.generateUrl(`shifts/${id}?employeeId=${employeeId}`));
        };

        return service;
    }
})();
