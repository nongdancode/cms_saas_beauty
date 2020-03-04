(function(){
    const module = angular.module('module.staff.containers.staff-edit-schedule-v2', []);

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

            this.data.events = [
                ...(this.$resolve.shifts),
                ...(this.$resolve.tasks_v2)
            ];

            this.data.shifts = [
                {
                    id: 1,
                    name: "2h",
                    stepping: 2 * 60,
                    type: "shift"
                },
                {
                    id: 2,
                    name: "4h",
                    stepping: 4 * 60,
                    type: "shift"
                },
                {
                    id: 3,
                    name: "8h",
                    stepping: 8 * 60,
                    type: "shift"
                }
            ];

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
                        id: event.id,
                        title: event.name,
                        start: moment.unix(event.start).valueOf(),
                        end: moment.unix(event.end).valueOf(),
                        editable: event.type !== 'disable',
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

        getEventColor(type) {
            return window.models.TaskType[type] ? window.models.TaskType[type].color : '#3ea';
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

        getEvents() {
            return $('.calendar').fullCalendar('clientEvents').filter(event => event.type !== 'disable');
        };

        submit() {
            const originalEvents = this.data.events
                  .filter(event => event.task)
                  .map(event => {
                      return {
                          id: +event.task.id,
                          start: event.start,
                          end: event.end,
                          type: event.type
                      };
                  });

            const submitEvents = this.getEvents()
                  .map(event => {
                      return {
                          id: +event.id,
                          start: event.start.unix(),
                          end: event.end.unix(),
                          type: event.type
                      };
                  });

            const addedEvents = submitEvents
                  .filter(event => {
                      return originalEvents.every(
                          e => !['id', 'start', 'end', 'type'].every(field => event[field] === e[field])
                      );
                  });

            const deletedEvents = originalEvents
                  .filter(event => {
                      return submitEvents.every(
                          e => !['id', 'start', 'end', 'type'].every(field => event[field] === e[field])
                      );
                  });

            this.StaffService.updateSchedules(+this.$stateParams.id, {
                add: addedEvents,
                delete: deletedEvents
            }).finally(() => this.$state.reload());
        };
    }

    module.component('staffEditScheduleV2', {
        bindings: {
            '$resolve': '<'
        },
        controller: StaffEditScheduleComponent,
        templateUrl: 'app/modules/staff/containers/staff-edit-schedule/staff-edit-schedule.component.html'
    });
})();
