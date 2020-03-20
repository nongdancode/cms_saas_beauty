(function(){
    const module = angular.module('module.staff', [
        'module.staff.containers.staff-view-schedule',
        'module.staff.containers.shift-management',
        'module.staff.containers.task-management'
    ]);

    module.config(function($stateProvider) {
        $stateProvider
            .state('staff-view-schedule', {
                parent: 'ng-admin',
	              url: '/staff/schedule',
	              template: '<staff-view-schedule $resolve="$resolve"></staff-view-schedule>',
                resolve: {
                    schedules: function($stateParams, StaffService, UserService) {
                        return StaffService.getStaffSchedules(UserService.getUser().id);
                    },
                    tasks: function($stateParams, StaffService, UserService) {
                        return StaffService.getStaffTasks(UserService.getUser().id);
                    },
                    staff: function ($stateParams, StaffService, UserService) {
                        return StaffService.getStaffs().then(staffs => staffs.find(staff => +staff.id === UserService.getUser().id));
                    }
                }
            })
            .state('shift-management', {
                parent: 'ng-admin',
	              url: '/staff/shift',
	              template: '<shift-management $resolve="$resolve" view-all="true"></shift-management>',
                resolve: {
                    shifts: function($stateParams, StaffService) {
                        return StaffService.getAllShifts();
                    },
                    staffs: function (StaffService) {
                        return StaffService.getStaffs();
                    }
                }
            })
            .state('shift-management-by-id', {
                parent: 'ng-admin',
	              url: '/staff/schedule/:id/shift',
	              template: '<shift-management $resolve="$resolve"></shift-management>',
                resolve: {
                    shifts: function($stateParams, StaffService) {
                        return StaffService.getShifts($stateParams.id);
                    },
                    staff: function ($stateParams, StaffService) {
                        return StaffService.getStaffs().then(staffs => staffs.find(staff => +staff.id === +$stateParams.id));
                    }
                }
            })
            .state('task-management', {
                parent: 'ng-admin',
	              url: '/staff/shift/:id',
	              template: '<task-management $resolve="$resolve"></task-management>',
                resolve: {
                    tasks: function($stateParams, StaffService, UserService) {
                        return StaffService.getTasks($stateParams.id);
                    }
                }
            });
    });

    module.config(function(NgAdminConfigurationProvider) {
        const nga = NgAdminConfigurationProvider;

        const entity = nga.entity('staff');

        entity.url(() => {
            return 'staffs';
        });

        const listView = entity.listView();

        listView
            .title('Staff Management')
            .perPage(20);

        listView.fields([
            nga.field('name'),
            nga.field('image', 'image'),
            nga.field()
                .label('Action')
                .template('<a class="btn btn-sm btn-primary" ui-sref="shift-management-by-id({ id: {{ entry.values.id }} })">Schedule</a>')
                .cssClasses('staff-edit-schedule-action')
        ]);

        listView.filters([
            nga.field('name')
        ]);

        nga.addEntity('staff', entity);
    });
})();
