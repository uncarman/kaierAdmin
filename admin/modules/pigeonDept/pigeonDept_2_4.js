define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_2_4', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        // 当前页面默认值
        var datas = {
            cur_cat: -1,  // 默认横幅编辑
            opt: {
                state: "100",  // 默认全部
            },
            query: "",
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        $scope.ajax_get_cat_list = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallCatList,
                _param: {}
            };
            return global.return_promise($scope, param);
        }
        // 页面加载, 获取所有分类
        $scope.get_cat_list = function ($scope) {
            $scope.ajax_get_cat_list()
                .then($scope.get_cat_list_callback)
                .catch($scope.ajax_catch);
        };
        $scope.get_cat_list_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.cat_list = data.data;
                $scope.get_cat_datas($scope);
            });
        }

        // 点击, 切换分类, 获取选中分类内数据
        $scope.change_cat = function (pk) {
            $scope.datas.cur_cat = pk;
            $scope.get_cat_datas($scope);
        }

        // 分类内容
        $scope.ajax_get_cat_datas = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallCatGoodsList,
                _param: {
                    page: $scope.datas.cur_page,
                    state: $scope.datas.opt.state,
                }
            };
            return global.return_promise($scope, param);
        }
        // banner 内容
        $scope.ajax_get_banner_datas = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallBannerList,
                _param: {
                }
            };
            return global.return_promise($scope, param);
        }

        // 根据选中分类, 获取分类内容
        $scope.get_cat_datas = function ($scope, state) {
            if($scope.datas.cur_cat > 0 ){
                $scope.datas.opt.state = typeof state != "undefined" ? state : $scope.datas.opt.state;
                $scope.ajax_get_cat_datas()
                    .then($scope.get_cat_datas_callback)
                    .catch($scope.ajax_catch);
            } else {
                $scope.ajax_get_banner_datas()
                    .then($scope.get_banner_datas_callback)
                    .catch($scope.ajax_catch);
            };
        }
        $scope.get_cat_datas_callback = function(data){
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
        $scope.get_banner_datas_callback = function(data){
            $scope.$apply(function(){
                $scope.ajax_loading = false;
                $scope.datas.dataList = data.data;
            });
        }

        $scope.item_create = function() {
            $scope.datas.item_view_type = "edit";
            if($scope.datas.cur_cat < 0) {
                $scope.datas.selected_item = {
                    pk: 0,
                    poster: "",
                };
                $('#bannerEdit').modal('show');
            } else {
                $scope.datas.selected_item = {
                    pk: 0,
                    thumbnail: "",
                };
                $('#itemEdit').modal('show');
            }
            //$scope.auction_pigeon_list($scope, $scope.datas.selected_item);
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
        $scope.item_edit = function ($scope, item) {
            $scope.datas.item_view_type = "edit";
            $scope.datas.selected_item = item;
            if($scope.datas.cur_cat < 0) {
                $('#bannerEdit').modal('show');
            } else {
                $('#itemEdit').modal('show');
            }
        }

        // 单个商品更新
        $scope.ajax_item_update = function() {
            var g = $scope.datas.selected_item;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mailBanner,
                _param: {
                    pk: g.pk,
                    poster: g.poster,
                    name: g.name,
                    sn: g.sn,
                    kind: g.kind,
                    url: g.url,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_update_callback = function (data) {
            if($scope.datas.cur_cat < 0) {
                $scope.get_cat_datas($scope);
                $('#bannerEdit').modal('hide');
            } else {
                $scope.get_cat_datas($scope);
                $('#itemEdit').modal('hide');
            }
        }

        // 删除banner
        $scope.ajax_remove_banner = function(pk) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mailBannerDel,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.ajax_remove_cat_item = function(pk) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mallCatGoods,
                _param: {
                    pk: pk,
                    operate: "del"
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_remove = function ($scope, item) {
            if($scope.datas.cur_cat < 0) {
                $scope.ajax_remove_banner($scope, item.pk)
                    .then($scope.item_remove_callback)
                    .catch($scope.ajax_catch);
            } else {
                $scope.ajax_remove_cat_item($scope, item.pk)
                    .then($scope.item_remove_callback)
                    .catch($scope.ajax_catch);
            }
        }
        $scope.item_remove_callback = function (data) {
            $scope.get_cat_datas($scope);
        }

        // 上传文件
        $scope.add_files = function (tp) {
            var fileId = "poster_file";
            global.base_add_files($scope, fileId, tp);
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
        $scope.remove_poster = function () {
            if($scope.datas.selected_item) {
                try {
                    $scope.datas.selected_item["poster"] = "";
                } catch (e) {
                    // pass
                }
            }
        }


        // 编辑分类
        $scope.cat_edit = function ($scope) {
            $('#catEdit').modal('show');
        }
        $scope.remove_thumbnail = function (c) {
            c.thumbnail = "";
        }
        $scope.add_thumbnail = function (c, ind) {
            $scope.datas.cur_cat_ind = ind;
            var fileId = "poster_file";
            global.base_add_files($scope, fileId, "thumbnail", $scope.add_thumbnail_callback);
        }
        $scope.add_thumbnail_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.cat_list[$scope.datas.cur_cat_ind]["thumbnail"] = data.data.url;
            });
        }

        // 更新分类
        $scope.cat_update = function () {
            for(var i in $scope.datas.cat_list) {
                $scope.ajax_cat_update($scope.datas.cat_list[i])
                    .then($scope.cat_update_callback)
                    .catch($scope.ajax_catch);
            }
        }
        $scope.ajax_cat_update = function (cat) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mallCat,
                _param: {
                    pk: cat.pk,
                    thumbnail: cat.thumbnail,
                    name: cat.name,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.cat_update_callback = function (data) {
            $('#catEdit').modal('hide');
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
        $scope.get_cat_list($scope);

    }])
});
