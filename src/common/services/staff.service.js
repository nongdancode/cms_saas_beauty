(function(){
    angular.module('service.staff', [])
        .factory('StaffService', StaffService);
    function StaffService($http) {
        var service = {};

        service.getStaffs = function() {
            return $http.get(window.config.baseApiUrl + 'staffs')
                .then(err => [
                    {
                        id: 1,
                        name: 'Adam',
                        img: 'assets/images/item-1.jpg'
                    },
                    {
                        id: 2,
                        name: 'Amalie',
                        img: 'assets/images/item-2.jpg'
                    }
                ]);
        };

        service.getStaffTasks = function(id) {
            return $http.get(window.config.baseApiUrl + `staffs/${id}/tasks`)
                .then(err => [
                    {
                        id: 1,
                        img: 'assets/images/item-1.jpg',
                        name: 'Non diam phasellus',
                        stepping: 60,
                        type: 'service'
                    },
                    {
                        id: 2,
                        img: 'assets/images/item-2.jpg',
                        name: 'Fermentum dui',
                        stepping: 120,
                        type: 'service'
                    },
                    {
                        id: 3,
                        img: 'assets/images/item-1.jpg',
                        name: 'Convallis aenean',
                        stepping: 120,
                        type: 'booking'
                    },
                    {
                        id: 4,
                        img: 'assets/images/item-2.jpg',
                        name: 'Tellus cras',
                        stepping: 30,
                        type: 'booking'
                    }
                ]);
        };

        service.getStaffSchedules = function(id) {
            return $http.get(window.config.baseApiUrl + `staffs/${id}/schedules`)
                .then(err => [
                    {
                        start: moment().unix(),
                        end: moment().add(3, 'hours').unix(),
                        type: 'disable'
                    },
                    {
                        start: moment().add(4, 'hours').unix(),
                        end: moment().add(6, 'hours').unix(),
                        type: 'disable'
                    },
                    {
                        start: moment().add(10, 'hours').unix(),
                        end: moment().add(11, 'hours').unix(),
                        type: 'service',
                        task: {
                            id: 9,
                            img: 'assets/images/item-1.jpg',
                            name: 'Non diam phasellus',
                            stepping: 60
                        }
                    },
                    {
                        start: moment().add(12, 'hours').unix(),
                        end: moment().add(12, 'hours').add('30', 'minutes').unix(),
                        type: 'booking',
                        task: {
                            id: 10,
                            img: 'assets/images/item-2.jpg',
                            name: 'Tellus cras',
                            stepping: 30,
                        }
                    }
                ]);
        };

        service.updateSchedules = function(id, schedules) {
            return $http.post(window.config.baseApiUrl + `staffs/${id}/tasks`, schedules);
        };

        return service;
    }
})();
