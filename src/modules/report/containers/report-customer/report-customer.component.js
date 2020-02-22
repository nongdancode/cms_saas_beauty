(function(){
    const module = angular.module('module.report.containers.report-customer', []);

    class ReportCustomerComponent {
        data = {
            dateType: window.models.ReportDateType.DAY,
            dataByDate: {},
            dataByAge: {}
        };

        chartByDate = {
            title: {
                text: 'Amount & customer number group by time'
            },
            xAxis: {
                title: {
                    text: 'Time'
                }
            },
            yAxis: [
                {
                    title: {
                        text: 'Customer Number'
                    }
                },
                {
                    labels: {
                        style: {
                            color: 'red'
                        }
                    },
                    title: {
                        text: 'Amount'
                    },
                    opposite: true
                }
            ],
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
            series: [],
            credits: false
        };

        chartByAge = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Incoming group by age'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [],
            credits: false
        };

        constructor($scope, $timeout, progression, ReportService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.progression = progression;
            this.ReportService = ReportService;
        }

        $onInit() {
            Promise.all([
                this.ReportService.customerByAge(),
                this.ReportService.customerByDate()
            ]).then(([dataByAge, dataByDate]) => {
                this.$timeout(() => {
                    this.data.dataByAge = dataByAge;
                    this.data.dataByDate = dataByDate;
                    this.updateChartByAge();
                    this.updateChartByDate();
                });
            });

            this.$scope.$watch('$ctrl.data.dateType', (newValue, oldValue) => {
                this.updateChartByDate();
            });
        }

        updateChartByDate() {
            let chartData = this.data.dataByDate;

            switch (this.data.dateType) {
            case window.models.ReportDateType.WEEK: {
                chartData = Object.keys(chartData).reduce((chart, timestamp) => {
                    const week = moment.unix(timestamp).weeks();
                    const date = moment().startOf('year').add(week - 1, 'weeks').unix();

                    chart[date] = chart[date] || {};

                    return {
                        ...chart,
                        [date]: ['customerNumber', 'amount'].reduce((result, type) => {
                            return {
                                ...result,
                                [type]: (chart[date][type] || 0) + chartData[timestamp][type]
                            };
                        }, {})
                    };
                }, {});

                break;
            }
            case window.models.ReportDateType.MONTH: {
                chartData = Object.keys(chartData).reduce((chart, timestamp) => {
                    const month = +moment.unix(timestamp).format('M');
                    const date = moment().startOf('year').add(month - 1, 'months').unix();

                    chart[date] = chart[date] || {};

                    return {
                        ...chart,
                        [date]: ['customerNumber', 'amount'].reduce((result, type) => {
                            return {
                                ...result,
                                [type]: (chart[date][type] || 0) + chartData[timestamp][type]
                            };
                        }, {})
                    };
                }, {});

                break;
            }
            }

            this.chartByDate = {
                ...this.chartByDate,
                xAxis: {
                    ...this.chartByDate.xAxis,
                    categories: Object.keys(chartData).map(timestamp => moment.unix(+timestamp).format('MM/DD/YYYY'))
                },
                series: [{
                    type: 'column',
                    name: 'Customer',
                    data: Object.keys(chartData).map(timestamp => chartData[timestamp].customerNumber),
                    colorByPoint: true,
                    yAxis: 0
                }, {
                    type: 'spline',
                    name: 'Amount',
                    data: Object.keys(chartData).map(timestamp => chartData[timestamp].amount),
                    marker: {
                        lineWidth: 2,
                        fillColor: 'white'
                    },
                    yAxis: 1,
                    color: 'red'
                }]
            };
        };

        updateChartByAge() {
            let chartData = this.data.dataByAge;

            this.chartByAge.series = [{
                name: 'Incoming',
                colorByPoint: true,
                data: Object.keys(chartData).reduce((result, type) => {
                    return [
                        ...result,
                        {
                            name: type.split('_').join(' to '),
                            y: chartData[type]
                        }
                    ];
                }, [])
            }];
        };

    }

    module.component('reportCustomer', {
        bindings: {
            '$resolve': '<'
        },
        controller: ReportCustomerComponent,
        templateUrl: 'src/modules/report/containers/report-customer/report-customer.component.html'
    });
})();
