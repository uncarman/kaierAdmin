define(function (require) {
    var app = require('../../js/app').app;

    app.controller('stock_2_1', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        // 当前页面默认值
        let datas = {
            opt: {
                query: "", // 商品列表
            }
        };
        $scope.datas = { ...settings.default_datas, ...datas };


        $scope.ajax_data = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storeGoodsList,
                _param: {
                    page: $scope.datas.cur_page,
                    query: $scope.datas.opt.query
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.get_datas_callback = function(data) {
            var total_page = data.data.total_page;
            $scope.$apply(function(){
                $scope.ajax_loading = false;
                $scope.datas.dataList = data.data.items;
                $scope.datas.pageList = []
                for(var i = 1; i<=total_page; i++) {
                    $scope.datas.pageList.push(i);
                }
            });
        };

        $scope.item_create = function() {
            $scope.datas.item_view_type = "edit";
            $scope.datas.selected_item = {
                pk: 0,
                thumbnail: "",
            };
            $('#goodCreate').modal('show');
        };
        // 上传文件
        $scope.add_files = function (tp) {
            if($scope.datas.selected_item["pk"] >= 0 ) {
                var fileId = "poster_file";
                global.base_add_files($scope, fileId, tp);
            }
        };
        $scope.add_file_callback = function (data) {
            $scope.$apply(function () {
                if(typeof $scope.datas.upload_file_type == "string" && $scope.datas.upload_file_type != "") {
                    $scope.datas.selected_item[$scope.datas.upload_file_type] = data.data.url;
                }
                $("#poster_file").val("");
            });
        }
        $scope.remove_thumbnail = function (ind) {
            if($scope.datas.selected_item && $scope.datas.selected_item["thumbnail"] != "") {
                try {
                    $scope.datas.selected_item["thumbnail"] = "";
                } catch (e) {
                    // pass
                }
            }
        }
        // 新建库存
        $scope.ajax_item_update = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.storeGoods,
                _param: {
                    name: $scope.datas.selected_item["name"],
                    thumbnail: $scope.datas.selected_item["thumbnail"],
                    count: $scope.datas.selected_item["count"],
                    price: $scope.datas.selected_item["price"],
                    location: $scope.datas.selected_item["location"],
                    weight: $scope.datas.selected_item["weight"],
                    capacity: $scope.datas.selected_item["capacity"],
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.item_update_callback = function (data) {
            $scope.reset_datas($scope);
            $('#goodCreate').modal('hide');
        };

        // 查看库存
        $scope.item_view = function ($scope, item) {
            $scope.datas.item_view_type = "view";
            $scope.datas.selected_item = item;
            $('#goodDetail').modal('show');
            $scope.get_stock_record($scope);
        };

        // 删除库存物品
        $scope.ajax_remove_data = function (id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storeGoodsDel,
                _param: {
                    pk: id
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.item_remove_callback = function (data) {
            $scope.reset_datas($scope);
        };


        // 获取库存购买记录
        $scope.get_stock_record = function($scope) {
            $scope.ajax_get_stock_record()
                .then($scope.get_stock_record_callback)
                .catch($scope.ajax_catch);
        };
        $scope.ajax_get_stock_record = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storeGoodsRecord,
                _param: {
                    page: 1,
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.get_stock_record_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.selected_item_total_num = data.data.total_num;
                $scope.datas.selected_item_total_page = data.data.total_page;
                $scope.datas.selected_item_record = data.data.items;
            });
        };

        
        // 入库 -- 更新物品库存
        $scope.item_in_stock = function ($scope, item) {
            $scope.datas.item_view_type = "view";
            $scope.datas.selected_item = item;
            $('#stockIn').modal('show');
        };
        $scope.item_in_stock_submit = function ($scope) {
            $scope.ajax_item_in_stock_submit()
                .then($scope.item_in_stock_submit_callback)
                .catch($scope.ajax_catch);
        };
        $scope.ajax_item_in_stock_submit = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storeGoodsUpdate,
                _param: {
                    sid: $scope.datas.selected_item["sid"],
                    count: $scope.datas.selected_item["count"],
                    price: $scope.datas.selected_item["price"],
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.item_in_stock_submit_callback = function (data) {
            $scope.reset_datas($scope);
            $('#stockIn').modal('hide');
        };
        
        
        ////// 执行函数
        $scope.get_datas($scope);

    }])
});