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

        service.deleteTask = function(id) {
            return HttpService.delete(HttpService.generateUrl(`tasks/${id}`));
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
