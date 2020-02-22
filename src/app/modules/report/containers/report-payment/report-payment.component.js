(function(){
    const module = angular.module('module.report.containers.report-payment', []);

    class ReportPaymentComponent {
        data = {
            paymentType: window.models.PaymentType.SUCCESS,
            dateType: window.models.ReportDateType.DAY,
            chartData: {}
        };

        barChart = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Amount group by time'
            },
            xAxis: {
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'Amount'
                }            },
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

        pieChart = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Amount percentage each status'
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
        constructor($scope, ReportService) {
            this.$scope = $scope;
            this.ReportService = ReportService;
        }

        $onInit() {
            this.paymentList = window.models.metadata(window.models.PaymentType);

            this.ReportService.payment().then(res => {
                this.data.chartData = res;
                this.updateBarChart();
                this.updatePieChart();
            });

            this.$scope.$watch('$ctrl.data.dateType', (newValue, oldValue) => {
                this.updateBarChart();
            });


            this.$scope.$watch('$ctrl.data.paymentType', (newValue, oldValue) => {
                this.updateBarChart();
            });
        };

        updateBarChart() {
            let chartData = this.data.chartData;

            switch (this.data.dateType) {
            case window.models.ReportDateType.WEEK: {
                chartData = Object.keys(chartData).reduce((chart, timestamp) => {
                    const week = moment.unix(timestamp).weeks();
                    const date = moment().startOf('year').add(week - 1, 'weeks').unix();

                    chart[date] = chart[date] || {};

                    return {
                        ...chart,
                        [date]: Object.values(window.models.PaymentType).reduce((result, type) => {
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
                        [date]: Object.values(window.models.PaymentType).reduce((result, type) => {
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

            this.barChart = {
                ...this.barChart,
                xAxis: {
                    ...this.barChart.xAxis,
                    categories: Object.keys(chartData).map(timestamp => moment.unix(+timestamp).format('MM/DD/YYYY'))
                },
                series: [{
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    colorByPoint: true,
                    name: 'Amount',
                    data: Object.keys(chartData).map(timestamp => chartData[timestamp][this.data.paymentType])
                }]
            };
        };

        updatePieChart() {
            let chartData = this.data.chartData;

            chartData = Object.keys(chartData).reduce((chart, timestamp) => {
                chart[timestamp] = chart[timestamp] || {};

                return Object.values(window.models.PaymentType).reduce((result, type) => {
                    return {
                        ...result,
                        [type]: (chart[timestamp][type] || 0) + chartData[timestamp][type]
                    };
                }, {});
            }, {});

            this.pieChart.series = [{
                name: 'Amount',
                colorByPoint: true,
                data: Object.keys(chartData).reduce((result, type) => {
                    return [
                        ...result,
                        {
                            name: type[0].toUpperCase() + type.slice(1),
                            y: chartData[type]
                        }
                    ];
                }, [])
            }];
        };
    }

    module.component('reportPayment', {
        bindings: {
            '$resolve': '<'
        },
        controller: ReportPaymentComponent,
        templateUrl: 'app/modules/report/containers/report-payment/report-payment.component.html'
    });
})();
