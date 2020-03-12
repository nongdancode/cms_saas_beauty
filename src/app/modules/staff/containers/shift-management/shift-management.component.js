(function(){
    const module = angular.module('module.staff.containers.shift-management', []);

    class ShiffManagementComponent {
        constructor($scope, $compile, $state, $stateParams, $resolve, ModalService, StaffService) {
            this.$scope = $scope;
            this.$compile = $compile;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$resolve = $resolve;
            this.ModalService = ModalService;
            this.StaffService = StaffService;
        }

        $onInit() {
            this.data = {
                staff: {},
                events: [],
                tasks: [],
                eventSources: [],
            };

            this.data.staff = this.$resolve.staff;

            this.data.events = this.$resolve.shifts;

            if (this.viewAll) {
                this.initViewAll();
            }

            self = this;

            this.uiConfig = {
                calendar: {
                    timezone: 'local',
                    editable: true,
                    droppable: true,
                    eventOverlap: false,
                    eventRender: function(event, element) {
                        return self.formatElement(event, element);
                    },
                    eventConstraint: {
                        start: moment(),
                        end: '2100-01-01'
                    },
                    businessHours: {
                        start: moment().format('HH:mm'),
                        end: '23:59',
                        daysOfWeek: [0,1,2,3,4,5,6]
                    },
                    allDaySlot: false,
                    customButtons: {
                        addShift: {
                            text: 'Add Shift',
                            click: () => {
                                this.add();
                            }
                        }
                    },
                    header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next, addShift'
                    },
                    minTime: moment(),
                    defaultView: 'month'
                }
            };

            this.$scope.$watch('$ctrl.data.events', (newValue, oldValue) => {
                const events = newValue.map(event => {
                    event = {
                        ...event,
                        id: event.id,
                        title: `Tasks: ${event.count.booking}`,
                        description: `Tasks: ${event.count.booking}`,
                        start: moment.unix(event.start).valueOf(),
                        end: moment.unix(event.end).valueOf(),
                        editable: false,
                        durationEditable: false,
                        backgroundColor: this.getEventColor(event.type)
                    };

                    event._id = `${event.id}-${event.start}-${event.end}`;

                    return event;
                });

                this.data.eventSources.length = 0;

                this.data.eventSources.push(events);
            });
        };

        initViewAll() {
            this.data = {
                ...this.data,
                filter: {
                    employee_id: -1
                },
                options: {},
                staffs: this.$resolve.staffs
            };

            this.data.options.staffs = [
                {
                    id: -1,
                    name: 'All'
                },
                ...this.data.staffs
            ];

            this.$scope.$watch('$ctrl.data.filter.employee_id', (newValue, oldValue) => {
                if (newValue === -1) {
                    this.data.events = this.$resolve.shifts;

                    return;
                }

                this.data.events = this.$resolve.shifts.filter(shift => shift.employee_id === newValue);
            });
        }

        formatElement(event, element) {
            const el = angular.element(element);
            el.attr('context-menu', 'menuOptions');

            return this.$compile(el)(
                angular.extend(this.$scope.$new(), {
                    menuOptions: [
                        {
                            text: 'View Detail',
                            click: () => {
                                this.$state.go('task-management', { id: event.id });
                            }
                        },
                        {
                            text: 'Delete',
                            click: () => {
                                this.ModalService.confirm({
                                    title: 'Delete Shift',
                                    message: 'Delete shift: ' + event.id
                                }).then((confirm => {
                                    this.StaffService.deleteShift(event.id, this.$stateParams.id)
                                        .then(res => this.deleteEvent(event));
                                }));
                            }
                        }
                    ]
                })
            );
        }

        deleteEvent(event) {
            $('.calendar').fullCalendar('removeEvents', event._id);
        }

        getEventColor(type) {
            return window.models.TaskType[type] ? window.models.TaskType[type].color : '#1976d2';
        }

        isInvalidEvent(event){
            const array = $('.calendar').fullCalendar('clientEvents');

            if (event.start < moment()) {
                return true;
            }

            for (let i in array){
                if ((event.end > array[i].start && event.end < array[i].end)
                    || (event.start > array[i].start && event.start < array[i].end)
                    || (event.start < array[i].start && event.end > array[i].end)){
                    return true;
                }
            }

            return false;
        };

        add() {
            const self = this;

            const scope = {
                shift: {
                    date: moment(),
                    duration: 4
                }
            };

            const modal = this.ModalService.prompt({
                template: 'add-shift.html',
                title: 'Add Shift',
                textOK: 'Add',
                textCancel: 'Cancel',
                scope: scope
            });

            modal.then(res => {
                return this.StaffService.createShift({
                    employeeId: this.$stateParams.id,
                    date: moment(scope.shift.date).unix(),
                    duration: scope.shift.duration
                });
            }).then(res => {
                this.$state.reload();
            });
        }

        submit() {};
    }

    module.component('shiftManagement', {
        bindings: {
            '$resolve': '<',
            'viewAll': '<'
        },
        controller: ShiffManagementComponent,
        templateUrl: 'app/modules/staff/containers/shift-management/shift-management.component.html'
    });
})();
