define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_3_4', ['$scope', function ($scope) {

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
                _url: settings.ajax_func.businessVialotionList,
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

        $scope.ch_vialotion = function ($scope, item) {
            $scope.ajax_ch_vialotion(item.pk)
                .then($scope.ch_vialotion_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_ch_vialotion = function(pk){
            var param = {
                _method: 'post',
                _url: settings.ajax_func.businessVialotion,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.ch_vialotion_callback = function (data) {
            $scope.$apply(function () {
                $scope.reset_datas($scope);
            });
        }
        

        $scope.edit_addr = function ($scope) {
            $scope.datas.selected_item._name = angular.copy($scope.datas.selected_item.name);
            $scope.datas.selected_item._phone = angular.copy($scope.datas.selected_item.phone);
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
                    name: $scope.datas.selected_item._name,
                    phone: $scope.datas.selected_item._phone,
                    area: $scope.datas.selected_item._address,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.ch_addr_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_item.address = angular.copy($scope.datas.selected_item._address);
                $scope.datas.selected_item.phone = angular.copy($scope.datas.selected_item._phone);
                $scope.datas.selected_item.name = angular.copy($scope.datas.selected_item._name);
                $("#addrEdit").modal("hide");
            });
        }



        $scope.confirm_consignment = function ($scope) {
            $("#confirmEdit").modal("show");
        }
        $scope.ch_post = function () {
            $scope.ajax_confirm_consignment()
                .then($scope.confirm_consignment_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_confirm_consignment = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.businessConsignment,
                _param: {
                    pk: $scope.datas.selected_item.pk,
                    carriage: $scope.datas.selected_item.carriage,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.confirm_consignment_callback = function (data) {
            $("#confirmEdit").modal("hide");
            $scope.reset_datas($scope);
        }


        ////// 执行函数
        $scope.get_datas($scope);
    }])
});
