(function(){
  const module = angular.module('module.staff.containers.task-management', []);

  class TaskManagementComponent {
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
        eventSources: []
      };

      this.data.events = this.$resolve.tasks;

      self = this;

      this.uiConfig = {
        calendar: {
          schedulerLicenseKey: window.calendar.key,
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
          header: false,
          views: {
				    listDay: { buttonText: 'day' },
				    listWeek: { buttonText: 'week' },
            listMonth: { buttonText: 'month' }
			    },
          minTime: moment(),
          defaultView: 'listYear'
        }
      };

      this.$scope.$watch('$ctrl.data.events', (newValue, oldValue) => {
        const events = newValue.map(event => {
          event = {
            ...event,
            id: event.id,
            title: this.generateTitleElement(event),
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

    generateTitleElement(event) {
      let el = `Service: ${event.name}`;

      if (event.cus_name) {
        el += `\nCustomer Name: ${event.cus_name}`;
      }

      if (event.cus_phone) {
        el += `\nCustomer Phone: ${event.cus_phone}`;
      }

      if (event.cus_note) {
        el += `\nCustomer Note: ${event.cus_note}`;
      }

      return el;
    }

    getEventColor(type) {
      return window.models.TaskType[type] ? window.models.TaskType[type].color : '#1976d2';
    }

    formatElement(event, element) {
      const el = angular.element(element);
      el.attr('context-menu', 'menuOptions');

      return this.$compile(el)(
        angular.extend(this.$scope.$new(), {
          menuOptions: [
            {
              text: 'Delete',
              click: () => {
                this.ModalService.confirm({
                  title: 'Delete Task',
                  message: 'Delete task: ' + event.id
                }).then((confirm => {
                  this.StaffService.deleteTask(event.id)
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
  }

  module.component('taskManagement', {
    bindings: {
      '$resolve': '<'
    },
    controller: TaskManagementComponent,
    templateUrl: 'app/modules/staff/containers/task-management/task-management.component.html'
  });
})();
