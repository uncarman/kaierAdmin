define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_3_1', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        // 当前页面默认值
        var datas = {
            opt: {
                query: "",
            },
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        $scope.ajax_data = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.businessUserList,
                _param: {
                    page: $scope.datas.cur_page,
                    query: $scope.datas.opt.query,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.get_datas_callback = function(data){
            var total_page = data.data.total_page;
            $scope.$apply(function(){
                $scope.ajax_loading = false;
                $scope.datas.dataList = data.data.items;
                $scope.datas.pageList = []
                for(var i = 1; i<=total_page; i++) {
                    $scope.datas.pageList.push(i);
                }
            });
        }


        $scope.item_view = function($scope, item) {
            $scope.datas.item_view_type = "view";
            $scope.datas.selected_item = item;
            $scope.get_user_addr($scope);
            $scope.get_user_order($scope);
            $('#goodDetail').modal('show');
        }

        $scope.get_user_addr = function ($scope) {
            $scope.ajax_get_user_addr()
                .then($scope.get_user_addr_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_get_user_addr = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.businessUserAddress,
                _param: {
                    pk: $scope.datas.selected_item.pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.get_user_addr_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_addr = data.data;
            });
        }

        $scope.get_user_order = function ($scope) {
            $scope.ajax_get_user_order()
                .then($scope.get_user_order_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_get_user_order = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.businessUserOrderList,
                _param: {
                    pk: $scope.datas.selected_item.pk,
                    page: 1 // TODO 添加分页
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.get_user_order_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_order = data.data.items;
            });
        }

        ////// 执行函数
        $scope.get_datas($scope);
    }])
});
