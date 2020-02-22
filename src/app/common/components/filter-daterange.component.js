(function(){
    const module = angular.module('component.filter.daterange', []);

    class DaterangeFilterComponent {
        options = {
            singleDatePicker: false,
            timePicker: true,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last 2 Months': [moment().subtract(2, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 4 Months': [moment().subtract(4, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            eventHandlers: {
                'apply.daterangepicker': this.change.bind(this)
            }
        }

        $onInit() {
            if (!(this.ngModel && this.ngModel.startDate)) {
                this.ngModel = {
                    type: 'daterange',
                    startDate: moment().subtract(29, 'days'),
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
            `ng-model="$ctrl.ngModel" options="$ctrl.options" />`
    });
})();
