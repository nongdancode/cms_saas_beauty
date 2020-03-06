(function(){
    const module = angular.module('module.staff.containers.staff-schedule', []);

    class StaffScheduleComponent {
        constructor($scope, $compile, $state, $stateParams, $resolve, StaffService) {
            this.$scope = $scope;
            this.$compile = $compile;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$resolve = $resolve;
            this.StaffService = StaffService;
        }

        $onInit() {
            this.data = {
                staff: {},
                events: [],
                tasks: [],
                eventSources: []
            };

            this.data.staff = this.$resolve.staff;

            this.data.events = this.$resolve.shifts;

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
                    header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    minTime: moment(),
                    defaultView: 'agendaDay'
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

                this.uiConfig.calendar = {
                    ...this.uiConfig.calendar,
                    events: [
                        ...(this.uiConfig.calendar.events || []),
                        ...events
                    ]
                };
            });
        };

        formatElement(event, element) {
            const el = angular.element(element);
            el.attr('context-menu', 'menuOptions');

            return this.$compile(el)(
                angular.extend(this.$scope.$new(), {
                    menuOptions: [
                        {
                            text: 'View Detail',
                            click: () => {
                            }
                        },
                        {
                            text: 'Delete',
                            click: () => {
                                this.StaffService.deleteShift(event.id).then(res => {
                                    this.deleteEvent(event);
                                });
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

        submit() {};
    }

    module.component('staffSchedule', {
        bindings: {
            '$resolve': '<'
        },
        controller: StaffScheduleComponent,
        templateUrl: 'app/modules/staff/containers/staff-schedule/staff-schedule.component.html'
    });
})();
