(function(){
    angular.module('service.staff', [])
        .factory('StaffService', StaffService);
    function StaffService(HttpService, notification) {
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
                        notification.log('Update schedules successfully!', { addnCls: 'humane-flatty-success' });
                    } else {
                        notification.log('Update schedules failed!', { addnCls: 'humane-flatty-error' });
                    }

                    return res.data;
                });
        };

        service.getTasks = function(id) {
            return HttpService.get(HttpService.generateUrl(`schedules/${id}/tasks`))
                .then(res => res.data || [
                    {
                        id: "2",
                        name: "Hybrid Lash",
                        stepping: 60,
                        img: "",
                        start: 1582914600,
                        end: 1582918200,
                        type: "active"
                    },
                    {
                        id: "2",
                        name: "Hybrid Lash",
                        stepping: 60,
                        img: "",
                        start: 1582914600,
                        end: 1582918200,
                        type: "booking"
                    },
                    {
                        id: "2",
                        name: "Hybrid Lash",
                        stepping: 60,
                        img: "",
                        start: 1582914600,
                        end: 1582918200,
                        type: "disable"
                    }
                ]);
        };

        service.getShifts = function(id) {
            return HttpService.get(HttpService.generateUrl(`schedules/${id}/shifts`))
                .then(res => res.data || [
                    {
                        start: 1582914600,
                        end: 1582918200,
                    },
                    {
                        start: 1582914600,
                        end: 1582918200,
                    }
                ]);
        };

        return service;
    }
})();
