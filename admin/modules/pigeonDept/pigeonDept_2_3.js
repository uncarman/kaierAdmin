define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_2_3', ['$scope', function ($scope) {

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
                state: "100",  // 默认全部
            },
            query: "",
        };
        $scope.datas = { ...settings.default_datas, ...datas };


        $scope.ajax_data = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallStaticPigeonList,
                _param: {
                    page: $scope.datas.cur_page,
                    state: $scope.datas.opt.state,
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
                sex: 0,
            };
            $('#pigeonChange').modal('show');
            $scope.auction_pigeon_list($scope, $scope.datas.selected_item);
        }

        // 修改状态
        $scope.ajax_item_ch_state = function ($scope, pk, state) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mallAuctionState,
                _param: {
                    pk: pk,
                    state: state
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_ch_state = function ($scope, pk, state) {
            $scope.ajax_item_ch_state($scope, pk, state)
                .then(function (data) {
                    $scope.reset_datas($scope);
                }).catch($scope.ajax_catch);
        };

        // // 获取单个商品详情
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
        $scope.item_view = function ($scope, item) {
            $scope.datas.selected_item = item;
            $('#goodEdit').modal('show');
        }
        $scope.item_edit = function ($scope, item) {
            $scope.datas.selected_item = item;
            $('#goodEdit').modal('show');
        }

        // 单个商品更新
        $scope.ajax_item_update = function() {
            var g = $scope.datas.selected_item;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mallAuction,
                _param: {
                    pk: g.pk,
                    cover: g.cover,
                    name: g.name,
                    deadline: g.deadline,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_update_callback = function (data) {
            $scope.reset_datas($scope);
            $('#goodEdit').modal('hide');
        }

        // 删除单个商品
        // $scope.ajax_remove_data = function(pk) {
        //     var param = {
        //         _method: 'delete',
        //         _url: settings.ajax_func.mallPigeon,
        //         _param: {
        //             pk: pk,
        //         }
        //     };
        //     return global.return_promise($scope, param);
        // }
        // $scope.item_remove_callback = function (data) {
        //     $scope.reset_datas($scope);
        // }

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
        $scope.remove_cover = function () {
            if($scope.datas.selected_item) {
                try {
                    $scope.datas.selected_item["cover"] = "";
                } catch (e) {
                    // pass
                }
            }
        }

        // 查看场次鸽列表
        $scope.ajax_auction_pigeon_list = function ($scope, item) {
            $scope.datas.selected_item = item;
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallAuctionPigeonList,
                _param: {
                    pk: item.pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.auction_pigeon_list = function ($scope, item) {
            $scope.ajax_auction_pigeon_list($scope, item)
                .then($scope.auction_pigeon_list_callback)
                .catch($scope.ajax_catch);
        }
        $scope.auction_pigeon_list_callback = function(data) {
            $scope.$apply(function () {
                $scope.datas.selected_item_pigeon = data.data;
                //$('#pigeonList').modal('show');
            });
        }

        // 添加场次鸽子
        $scope.pigeon_add = function ($scope, pigeon) {
            $scope.datas.selected_pigeon = pigeon;
            $scope.datas.selected_item_pigeon_gid = typeof pigeon == "object" ? pigeon.gid : 0;
            $('#pigeonChange').modal('show');
            $scope.get_pigeon_list($scope);
        }
        $scope.get_pigeon_list = function($scope){
            $scope.ajax_pigeon_list($scope)
                .then($scope.ajax_pigeon_list_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_pigeon_list = function ($scope) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallGoodsList,
                _param: {
                    query: $scope.datas.opt.query,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.ajax_pigeon_list_callback = function (data) {
            $scope.$apply(function(){
                $scope.datas.pigeon_list = data.data.items;
            });
        }

        $scope.ajax_pigeon_change = function ($scope, operate) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mallSuggestGoods,
                _param: {
                    gid: $scope.datas.selected_item_pigeon_gid,
                    operate: operate
                }
            };
            if(operate == "save") {
                param._param.sn = 0; // 保存时需要序号
            }
            return global.return_promise($scope, param);
        }
        $scope.pigeon_update = function($scope){
            if($scope.datas.selected_pigeon["pk"] > 0) {
                $scope.ajax_pigeon_change($scope, "save")
                    .then($scope.pigeon_update_callback)
                    .catch($scope.ajax_catch);
            }
        }
        $scope.pigeon_update_callback = function (data) {
            $('#pigeonChange').modal('hide');
            $scope.reset_datas($scope);
        }
        $scope.pigeon_remove = function ($scope) {
            if($scope.datas.selected_pigeon["pk"] > 0) {
                $scope.ajax_pigeon_change($scope, "del")
                    .then($scope.pigeon_update_callback)
                    .catch($scope.ajax_catch);
            }
        }

        ////// 执行函数
        $scope.get_datas($scope);

    }])
});
