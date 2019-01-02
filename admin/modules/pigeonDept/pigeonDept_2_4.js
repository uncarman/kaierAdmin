define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_2_4', ['$scope', function ($scope) {

        global.on_load_func();

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        $scope.datas = {};

        // 执行函数
        (function(){
            //$scope.data = global.read_storage('session'); // 加载缓存数据
            //get_user_profile();

            $scope.get_datas = get_datas;
            $scope.get_datas_prev = get_datas_prev;
            $scope.get_datas_next = get_datas_next;

            $scope.get_datas();
        })();

        function get_datas (page) {
            if(!$scope.is_loading) {
                $scope.datas.cur_page = typeof page != "undefined" ? page : settings.page_default;
                $scope.is_loading = true;

                ajax_data(page).then(function(data){
                    let total_page = Math.ceil(data.total / settings.items_per_page);
                    $scope.$apply(function(){
                        $scope.is_loading = false;
                        $scope.datas.dataList = data.data;
                        $scope.datas.pageList = []
                        for(let i = 1; i<total_page; i++) {
                            $scope.datas.pageList.push(i);
                        }
                    });
                }).catch(function (data) {
                    alert("获取数据失败(ajax_code):"+data.error);
                });

            }
        }

        function ajax_data(page) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.getList,
                _param: {
                    page: page,
                    per_page: settings.items_per_page
                }
            };
            return global.return_promise($scope, param);
        }

        function get_datas_prev () {
            let page = Math.max(1,($scope.datas.cur_page-1));
            if(page != $scope.datas.cur_page) {
                $scope.get_datas(page);
            }
        }
        function get_datas_next () {
            let page = Math.min($scope.datas.pageList.length,($scope.datas.cur_page+1));
            if(page != $scope.datas.pageList.length) {
                $scope.get_datas(page);
            }
        }

    }])
});
