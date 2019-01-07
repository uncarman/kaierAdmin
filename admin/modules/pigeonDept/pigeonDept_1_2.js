define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_1_2', ['$scope', function ($scope) {

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
                query: "", // 商品列表
            },
        };
        $scope.datas = { ...settings.default_datas, ...datas };


        $scope.ajax_data = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallPigeonList,
                _param: {
                    page: $scope.datas.cur_page,
                    query: $scope.datas.opt.query
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

        $scope.item_create = function() {
            $scope.datas.item_view_type = "edit";
            $scope.datas.selected_item = {
                pk: 0,
                thumbnail: "",
                posters:[],
                sex: 0,
            };
            $('#goodDetail').modal('show');
        }

        // 获取单个商品详情
        $scope.ajax_item_detail = function(id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallPigeon,
                _param: {
                    pk: id,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_view_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.item_view_type = "view";
                $scope.datas.selected_item = data.data;
                $('#goodDetail').modal('show');
            });
        }
        $scope.item_edit_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.item_view_type = "edit";
                $scope.datas.selected_item = data.data;
                $('#goodDetail').modal('show');
            });
        }

        // 单个商品更新
        $scope.ajax_item_update = function() {
            var g = $scope.datas.selected_item;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mailPigeonUpdate,
                _param: {
                    pk: g.pk,
                    thumbnail: g.thumbnail,
                    posters: g.posters,
                    name: g.name,
                    price: g.price,
                    deadline: g.deadline,
                    selltype: g.selltype,
                    transtype: g.transtype,
                    sid: g.sid,
                    count: g.count,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_update_callback = function (data) {
            $scope.reset_datas($scope);
            $('#goodDetail').modal('hide');
        }

        // 删除单个商品
        $scope.ajax_remove_data = function(pk) {
            var param = {
                _method: 'delete',
                _url: settings.ajax_func.mallPigeon,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_remove_callback = function (data) {
            $scope.reset_datas($scope);
        }

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
                } else {
                    $scope.datas.selected_item["posters"].push({
                        kind: $scope.datas.upload_file_file_kind,
                        url: data.data.url,
                    });
                    if($scope.datas.selected_item["thumbnail"] == "" && file_kind == 0) {
                        $scope.datas.selected_item["thumbnail"] = data.data.url;
                    }
                }
                $("#poster_file").val("");
            });
        }
        $scope.remove_poster = function (ind) {
            if($scope.datas.selected_detail && $scope.datas.selected_detail["posters"].length > 0) {
                try {
                    $scope.datas.selected_detail["posters"].splice(ind, 1);
                    if($scope.datas.selected_detail["posters"].length <= 0) {
                        $scope.datas.selected_detail["thumbnail"] = "";
                    }
                } catch (e) {
                    // pass
                }
            }
        }


        ////// 执行函数
        $scope.get_datas($scope);

    }]);
});
