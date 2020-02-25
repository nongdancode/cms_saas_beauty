(function(){
    const module = angular.module('module.staff.containers.staff-edit-schedule', []);

    class StaffEditScheduleComponent {
        data = {
            staff: {},
            events: [],
            tasks: [],
            eventSources: []
        };

        constructor($scope, $state, $stateParams, $resolve, StaffService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$resolve = $resolve;
            this.StaffService = StaffService;
        }

        $onInit() {
            this.data.staff = this.$resolve.staff;

            this.data.events = this.$resolve.schedules;

            this.data.tasks = this.$resolve.tasks.map(task => {
                return {
                    ...task,
                    color: window.models.TaskType[task.type].color
                };
            });

            self = this;

            this.uiConfig = {
                calendar: {
                    timezone: 'local',
                    editable: true,
                    droppable: true,
                    eventOverlap: false,
                    drop: function(date) {
                        const item = $(this).data('item');
                        let event = $(this).data('event-object');

                        event = {
                            ...event,
                            start: moment(date).valueOf(),
                            end: moment(date).add(item.stepping, 'minutes').valueOf(),
                            durationEditable: false
                        };

                        event._id = `${event.id}-${event.start}-${event.end}`;

                        if (!self.isInvalidEvent(event)) {
                            $('.calendar').fullCalendar('renderEvent', event, true);
                        }
                    },
                    eventRender: function(event, element) {
                        if (event.type !== 'disable') {
                            $(element).append(
                                '<span style="font-size: 12px;" class="delete-event glyphicon glyphicon-remove" id="delete-event"></span>'
                            );
                        }

                        return element;
                    },
                    eventClick: function(calEvent, jsEvent, view) {
                        if (jsEvent.target.id === 'delete-event') {
                            $('.calendar').fullCalendar('removeEvents', calEvent._id);
                        }
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
                        id: event.task ? event.task.id : -1,
                        title: (event.task || {}).name,
                        start: moment.unix(event.start).valueOf(),
                        end: moment.unix(event.end).valueOf(),
                        editable: event.type !== 'disable',
                        durationEditable: false,
                        backgroundColor: window.models.TaskType[event.type].color
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

        getEvents() {
            return $('.calendar').fullCalendar('clientEvents').filter(event => event.type !== 'disable');
        };

        submit() {
            const events = this.getEvents().map(event => {
                return {
                    id: event.id,
                    start: event.start.unix(),
                    end: event.end.unix()
                };
            });

            this.StaffService.updateSchedules(+this.$stateParams.id, events)
                .finally(() => this.$state.reload());
        };
    }

    module.component('staffEditSchedule', {
        bindings: {
            '$resolve': '<'
        },
        controller: StaffEditScheduleComponent,
        templateUrl: 'app/modules/staff/containers/staff-edit-schedule/staff-edit-schedule.component.html'
    });
})();
