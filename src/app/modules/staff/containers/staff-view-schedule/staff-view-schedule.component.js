(function(){
  const module = angular.module('module.staff.containers.staff-view-schedule', []);

  class StaffViewScheduleComponent {
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
          schedulerLicenseKey: window.calendar.key,
          drop: function(date) {
            const item = $(this).data('item');
            let event = $(this).data('event-object');

            event = {
              ...event,
              start: date.valueOf(),
              end: date.add(item.stepping, 'minutes').valueOf(),
              durationEditable: false
            };

            if (!self.isOverlapping(event)) {
              $('.calendar').fullCalendar('renderEvent', event, true);
              self.data.tasks.find(task => task.id === item.id).selected = true;
              $(this).remove();
            }
          },
          eventClick: function(calEvent, jsEvent, view) {
            if (jsEvent.target.id === 'delete-event') {
              self.data.tasks.find(task => task.id === calEvent.id).selected = false;
              $('.calendar').fullCalendar('removeEvents', calEvent.id);
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
        const events = newValue.filter(event => event.type !== 'disable').map(event => {
          return {
            ...event,
            title: (event.task || {}).name,
            start: moment.unix(event.start),
            end: moment.unix(event.end),
            editable: false,
            durationEditable: false,
            backgroundColor: window.models.TaskType[event.type].color
          };
        });

        this.uiConfig.calendar = {
          ...this.uiConfig.calendar,
          events: [
            ...(this.uiConfig.calendar.events || []),
            ...events
          ]
        };
      });

    }

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
  }

  module.component('staffViewSchedule', {
    bindings: {
      '$resolve': '<'
    },
    controller: StaffViewScheduleComponent,
    templateUrl: 'app/modules/staff/containers/staff-view-schedule/staff-view-schedule.component.html'
  });
})();
