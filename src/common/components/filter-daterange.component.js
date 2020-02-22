(function(){
    const module = angular.module('component.filter.daterange', []);

    class DaterangeFilterComponent {
        $onInit() {
            if (!(this.ngModel && this.ngModel.startDate)) {
                this.ngModel = {
                    type: 'daterange',
                    startDate: moment(),
                    endDate: moment()
                };
            }

        }

        change(event) {
            this.ngModel = {
                type: 'daterange',
                ...this.ngModel,
                ...event.model
            };
        }
    }

    module.component('maDaterangeFilter', {
        bindings: {
            ngModel: '='
        },
        controller: DaterangeFilterComponent,
        template: '<input date-range-picker class="form-control date-picker" type="text"' +
            `ng-model="$ctrl.ngModel" options="{ singleDatePicker: false, timePicker: true, eventHandlers: { 'apply.daterangepicker': $ctrl.change.bind($ctrl) } }" />`
    });
})();
