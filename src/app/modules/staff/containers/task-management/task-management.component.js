(function(){
    const module = angular.module('module.staff.containers.task-management', []);

    class TaskManagementComponent {
        constructor($scope, $state, $stateParams, $resolve, ModalService, StaffService) {
            this.$scope = $scope;
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

            this.data.events = this.$resolve.tasks;

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
                        left: 'listDay, listWeek, listMonth',
                        right: 'today prev,next'
                    },
                    views: {
				                listDay: { buttonText: 'day' },
				                listWeek: { buttonText: 'week' },
                        listMonth: { buttonText: 'month' }
			              },
                    minTime: moment(),
                    defaultView: 'listDay'
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
                        editable: false,
                        durationEditable: false,
                        backgroundColor: this.getEventColor(event.type)
                    };

                    event._id = `${event.id}-${event.start}-${event.end}`;

                    return event;
                });

                this.data.eventSources.push(events);
            });
        };

        getEventColor(type) {
            return window.models.TaskType[type] ? window.models.TaskType[type].color : '#1976d2';
        }

        formatElement(event, element) {
            return element;
        }
    }

    module.component('taskManagement', {
        bindings: {
            '$resolve': '<'
        },
        controller: TaskManagementComponent,
        templateUrl: 'app/modules/staff/containers/task-management/task-management.component.html'
    });
})();
