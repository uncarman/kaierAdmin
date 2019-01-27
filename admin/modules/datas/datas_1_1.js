define(function (require) {
    var app = require('../../js/app').app;

    app.controller('datas_1_1', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        $scope.get_datas = function ($scope) {
            $scope.chartSale = echarts.init(document.getElementById("chartSale"));
            $scope.chartAnlisys = echarts.init(document.getElementById("chartAnlisys"));
        };


        $scope.drawSale = function () {
            var opt = {
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'蒸发量',
                        type:'bar',
                        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    }
                ]
            };
            $scope.chartSale.setOption(opt, true);
            $scope.chartSale.resize();
        }

        $scope.drawAnlisys = function () {
            var opt = {
                legend: {
                    orient: 'vertical',
                    x: '72.5%',
                    y: "center",
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                calculable: true,
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center : ['35%', '50%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ]
                    }
                ]
            };
            $scope.chartAnlisys.setOption(opt, true);
            $scope.chartAnlisys.resize();
        }


        ////// 执行函数
        $scope.get_datas($scope);
        $scope.drawSale();
        $scope.drawAnlisys();

        $('.J-datepicker-range-day').datePicker({
            format: 'YYYY-MM-DD',
            isRange: true,
        });
    }])
});
