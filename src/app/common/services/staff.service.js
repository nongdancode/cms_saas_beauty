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
            return HttpService.post(HttpService.generateUrl(`schedules/${id}/tasks`), schedules)
                .then(res => {
                    if (res.code === 0) {
                        ModalService.success('Update schedules successfully!');
                    } else {
                        ModalService.error('Update schedules failed!');
                    }

                    return res.data;
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

        service.createShift = function(data) {
            return HttpService.post(HttpService.generateUrl('shifts'), data)
                .then(res => {
                    if (res.code === 0) {
                        ModalService.success('Create shift successfully!');
                    } else {
                        ModalService.error('Create shift failed!');
                    }

                    return res.data;
                });
        };

        service.deleteShift = function(id, employeeId) {
            return HttpService.delete(HttpService.generateUrl(`shifts/${id}?employeeId=${employeeId}`));
        };

        return service;
    }
})();
