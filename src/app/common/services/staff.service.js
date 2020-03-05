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
            return HttpService.get(HttpService.generateUrl(`shifts/${id}/tasks`))
                .then(res => res.data || [
                    {
                        id: 1,
                        name: "Hybrid Lash 1",
                        stepping: 60,
                        img: "",
                        start: moment().unix(),
                        end: moment().add(2, 'hours').unix(),
                        type: "active"
                    },
                    {
                        id: 2,
                        name: "Hybrid Lash 2",
                        stepping: 60,
                        img: "",
                        start: moment().add(2, 'hours').unix(),
                        end: moment().add(4, 'hours').unix(),
                        type: "booking"
                    },
                    {
                        id: 3,
                        name: "Hybrid Lash 3",
                        stepping: 60,
                        img: "",
                        start: moment().add(4, 'hours').unix(),
                        end: moment().add(6, 'hours').unix(),
                        type: "disable"
                    }
                ]);
        };

        service.getShifts = function(id) {
            return HttpService.get(HttpService.generateUrl(`schedules/${id}/shifts`))
                .then(res => res.data || [
                    {
                        id: 1,
                        start: moment().unix(),
                        end: moment().add(8, 'hours').unix(),
                        count: {
                            booking: 10
                        }
                    },
                    {
                        id: 2,
                        start: moment().add(1, 'days').unix(),
                        end: moment().add(1, 'days').add(8, 'hours').unix(),
                        count: {
                            booking: 20
                        }
                    }
                ]);
        };

        return service;
    }
})();
