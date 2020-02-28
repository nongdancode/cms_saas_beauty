(function(){
    const module = angular.module('module.waitlist.components.checkin', []);

    class CheckinComponent {
        constructor($scope, $state, $uibModal, progression, notification, BookingService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$uibModal = $uibModal;
            this.progression = progression;
            this.notification = notification;
            this.BookingService = BookingService;
        }

        $onInit() {
            this.util = {
                keys: Object.keys,
                toInt: s => +s,
                toMoment: s => moment(+s),
            };

            this.form = {
                serviceIds: [],
                employees: {},
                dates: {},
                times: {}
            };

            this.data = {
                services: [],
                servicesMap: {},
                employees: [],
                employeesMap: {},
                availableTimes: {}
            };

            this.init();
        }

        init() {
            Promise.all([
                this.BookingService.getCheckinServices(),
                this.BookingService.getCheckinEmployees()
            ]).then(([services, employees]) => {
                this.data.services = services;

                this.data.servicesMap = this.data.services.reduce((result, item) => {
                    return {
                        ...result,
                        [item.id]: item
                    };
                }, {});

                this.data.employees = employees;

                this.data.employeesMap = this.data.employees.reduce((result, item) => {
                    return {
                        ...result,
                        [item.id]: item
                    };
                }, {});

                const employeeIds = this.data.employees.map(employee => employee.id);

                employeeIds.forEach(id => {
                    this.data.availableTimes[id] = Object.keys((this.data.employeesMap[id].available || {}))
                        .filter(timestamp => timestamp > moment().unix())
                        .reduce((result, timestamp) => {
                            const availableOptions = [];

                            this.data.employeesMap[id].available[timestamp].forEach(({start_time, end_time}) => {
                                const serviceStepping = this.data.servicesMap[this.data.employeesMap[id].service_id].stepping;

                                let start = moment.unix(start_time);
                                let end = moment.unix(end_time);

                                while (moment(start).add(serviceStepping, 'minutes') <= end) {
                                    let _start = moment(start);
                                    let _end = moment(start).add(serviceStepping, 'minutes');

                                    availableOptions.push({
                                        text: `${_start.format('hh:mm A')}`,
                                        value: {
                                            start: _start,
                                            end: _end
                                        }
                                    });

                                    start = moment(start).add(serviceStepping, 'minutes');
                                }
                            });

                            return {
                                ...result,
                                [moment.unix(timestamp).startOf('day').valueOf()]: availableOptions
                            };
                        }, {});


                    this.form.dates[this.data.employeesMap[id].service_id] = moment(+Object.keys(this.data.availableTimes[id])[0]);
                });

                this.data.employees = employees
                    .reduce((result, employee) => {
                        if (!Object.keys(employee.available || {}).length) {
                            return result;
                        }

                        const stepping = this.data.servicesMap[employee.service_id].stepping;
                        const times = this.data.availableTimes[employee.id];

                        if (!Object.keys(times || {}).length) {
                            return result;
                        }

                        return [ ...result, employee ];
                    }, []);
            });
        };

        showModal() {
            this.modal = this.$uibModal.open({
                animation: true,
                templateUrl: 'checkin-modal.html',
                size: 'md',
                scope: this.$scope
            });

        };

        get isDisabledCheckin() {
            return this.form.serviceIds.length === 0 || this.form.serviceIds.some(id => {
                return !(this.form.employees[id] && this.form.dates[id] && this.form.times[id]);
            });
        };

        checkin() {
            this.modal.close();

            this.progression.start();

            const data = {
                id: this.entry.values.id,
                services: this.form.serviceIds.map(id => {
                    return {
                        serviceId: id,
                        employeeId: this.form.employees[id].split('_')[0],
                        timeRange: {
                            start: this.form.times[id].start.valueOf(),
                            end: this.form.times[id].end.valueOf()
                        }
                    };
                })
            };

            this.BookingService.confirmCheckin(data)
                .finally(() => {
                    this.init();
                    this.progression.done();
                    this.reset();
                    this.$state.reload();
                });
        };

        cancel() {
            this.reset();
            this.modal.close();
        };

        reset() {
            this.form = {
                serviceIds: [],
                employees: {},
                dates: {},
                times: {}
            };
        };
    }

    module.component('maCheckin', {
        bindings: {
            entry: '<'
        },
        controller: CheckinComponent,
        templateUrl: 'app/modules/waitlist/components/checkin/checkin.component.html'
    });

    module.filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function(item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }

            return out;
        };
    });
})();
