define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_3_2', ['$scope', function ($scope) {

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
                state: 100,  // 默认全部
                query: "",
            },
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        $scope.ajax_data = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.businessOrderList,
                _param: {
                    page: $scope.datas.cur_page,
                    query: $scope.datas.opt.query,
                    kind: $scope.datas.opt.state,
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


        $scope.ajax_item_detail = function(pk){
            $scope.datas.item_view_type = "view";
            var param = {
                _method: 'get',
                _url: settings.ajax_func.businessOrder,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_view_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_item = data.data;
                $("#goodDetail").modal("show");
            });
        }
        

        $scope.edit_addr = function ($scope) {
            $scope.datas.selected_item._address = angular.copy($scope.datas.selected_item.address);
            $("#addrEdit").modal("show");
        }
        $scope.ch_addr = function ($scope) {
            $scope.ajax_ch_addr()
                .then($scope.ch_addr_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_ch_addr = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.businessOrderAddress,
                _param: {
                    pk: $scope.datas.selected_item.pk,
                    name: $scope.datas.selected_item._address.name,
                    phone: $scope.datas.selected_item._address.phone,
                    area: $scope.datas.selected_item._address.area,
                    street: $scope.datas.selected_item._address.street,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.ch_addr_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_item.address = angular.copy($scope.datas.selected_item._address);
                $("#addrEdit").modal("hide");
            });
        }



        $scope.edit_post = function ($scope) {
            $scope.datas.selected_item._freight = $scope.datas.selected_item.freight;
            $("#postEdit").modal("show");
        }
        $scope.ch_post = function ($scope) {
            $scope.ajax_ch_post()
                .then($scope.ch_post_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_ch_post = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.businessOrderFreight,
                _param: {
                    pk: $scope.datas.selected_item.pk,
                    freight: $scope.datas.selected_item._freight,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.ch_post_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_item.freight = $scope.datas.selected_item._freight;
                $("#postEdit").modal("hide");
            });
        }



        ////// 执行函数
        $scope.get_datas($scope);
    }])
});
