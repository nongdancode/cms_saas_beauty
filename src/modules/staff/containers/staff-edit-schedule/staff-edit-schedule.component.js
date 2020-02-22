(function(){
    const module = angular.module('module.staff.containers.staff-edit-schedule', []);

    class StaffEditScheduleComponent {
        data = {
            staff: {},
            events: [],
            tasks: [],
            eventSources: []
        };

        constructor($scope, $resolve, StaffService) {
            this.$scope = $scope;
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
                    editable: true,
                    droppable: true,
                    eventOverlap: false,
                    drop: function(date) {
                        const item = $(this).data('item');
                        let event = $(this).data('event-object');

                        event = {
                            ...event,
                            start: date.valueOf(),
                            end: date.add(item.stepping, 'minutes').valueOf(),
                            durationEditable: false
                        };

                        event._id = `${event.id}-${event.start}-${event.end}`;

                        if (!self.isOverlapping(event)) {
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

        isOverlapping(event){
            const array = $('.calendar').fullCalendar('clientEvents');

            const offset = new Date().getTimezoneOffset();

            for (let i in array){
                let start = event.start;
                let end = event.end;

                if (array[i].type === 'disable') {
                    start = moment(event.start).add(offset, 'minutes');
                    end = moment(event.end).add(offset, 'minutes');
                }

                if ((end >= array[i].start && end <= array[i].end)
                    || (start >= array[i].start && start <= array[i].end)
                    || (start < array[i].start && end > array[i].end)){
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

            console.log('Submit: ', events);
        };
    }

    module.component('staffEditSchedule', {
        bindings: {
            '$resolve': '<'
        },
        controller: StaffEditScheduleComponent,
        templateUrl: 'src/modules/staff/containers/staff-edit-schedule/staff-edit-schedule.component.html'
    });
})();
