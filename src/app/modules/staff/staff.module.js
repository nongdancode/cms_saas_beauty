(function(){
    const module = angular.module('module.staff', [
        'module.staff.containers.staff-view-schedule',
        'module.staff.containers.staff-edit-schedule'
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
            .state('staff-edit-schedule', {
                parent: 'ng-admin',
	        url: '/staff/schedule/:id/edit',
	        template: '<staff-edit-schedule $resolve="$resolve"></staff-edit-schedule>',
                resolve: {
                    schedules: function($stateParams, StaffService) {
                        return StaffService.getStaffSchedules(+$stateParams.id);
                    },
                    tasks: function($stateParams, StaffService) {
                        return StaffService.getStaffTasks(+$stateParams.id);
                    },
                    staff: function ($stateParams, StaffService) {
                        return StaffService.getStaffs().then(staffs => staffs.find(staff => +staff.id === +$stateParams.id));
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
            .title('Staff Manager')
            .perPage(10);

        listView.fields([
            nga.field('name'),
            nga.field('image')
                .template('<img src="{{ entry.values.image }}" height="42" width="42" />'),
            nga.field()
                .label('Action')
                .template('<a class="btn btn-sm btn-primary" ui-sref="staff-edit-schedule({ id: {{ entry.values.id }} })">Schedule</a>')
                .cssClasses('staff-edit-schedule-action')
        ]);

        listView.filters([
            nga.field('name')
        ]);

        window.addEntity('staff', entity);
    });
})();
