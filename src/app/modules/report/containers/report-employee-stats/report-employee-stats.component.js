(function(){
    const module = angular.module('module.report.containers.report-employee-stats', []);

    class ReportCustomerComponent {
        chartByIncome = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Income Statistic'
            },
            xAxis: {
                title: {
                    text: 'Employee'
                },
                categories: ['Alice', 'Bob', 'Foo', 'Bar', 'Boo']
            },
            yAxis: {
                title: {
                    text: 'Income'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}$'
                    },
                    colorByPoint: true,
                    name: 'Income',
                    data: [1000, 5000, 2000, 700, 900]
                }
            ],
            credits: false
        }

        chartByComeback = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Comeback Statistic'
            },
            xAxis: {
                title: {
                    text: 'Employee'
                },
                categories: ['Alice', 'Bob', 'Foo', 'Bar', 'Boo']
            },
            yAxis: {
                title: {
                    text: 'Comeback rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}%'
                    },
                    colorByPoint: true,
                    name: 'Comeback',
                    data: [70, 50, 20, 60, 30]
                }
            ],
            credits: false
        };

        constructor($scope, $timeout, progression, ReportService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.progression = progression;
            this.ReportService = ReportService;
        }

        $onInit() {

        }
    }

    module.component('reportEmployeeStats', {
        bindings: {
            '$resolve': '<'
        },
        controller: ReportCustomerComponent,
        templateUrl: 'app/modules/report/containers/report-employee-stats/report-employee-stats.component.html'
    });
})();
