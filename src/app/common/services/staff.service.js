(function(){
  angular.module('service.staff', [])
         .factory('StaffService', StaffService);
  function StaffService(HttpService, ModalService) {
    var service = {};

    service.getStaffs = function() {
      return HttpService.get(HttpService.generateUrl('staffs'), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.getStaffTasks = function(id) {
      return HttpService.get(HttpService.generateUrl(`staffs/${id}/tasks`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.getStaffSchedules = function(id) {
      return HttpService.get(HttpService.generateUrl(`staffs/${id}/schedules`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.updateSchedules = function(id, schedules) {
      return HttpService.post(HttpService.generateUrl(`schedules/${id}/tasks`), schedules, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.getTasks = function(id) {
      return HttpService.get(HttpService.generateUrl(`shifts/${id}/tasks`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.deleteTask = function(id) {
      return HttpService.delete(HttpService.generateUrl(`tasks/${id}`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.getShifts = function(id) {
      return HttpService.get(HttpService.generateUrl(`schedules/${id}/shifts`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.getAllShifts = function(id) {
      return HttpService.get(HttpService.generateUrl(`shifts`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.createShift = function(data) {
      return HttpService.post(HttpService.generateUrl('shifts'), data, {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.deleteShift = function(id, employeeId) {
      return HttpService.delete(HttpService.generateUrl(`shifts/${id}?employeeId=${employeeId}`), {} , {
        errorHandleStrategy: HttpService.strategy.show
      });
    };

    service.deleteShiftMultiple = function({ ids, employeeId }) {
      return HttpService.post(
        HttpService.generateUrl(`shifts/delete-entire`),
        { ids, employeeId } ,
        {
          errorHandleStrategy: HttpService.strategy.show
        }
      );
    };

    return service;
  }
})();
