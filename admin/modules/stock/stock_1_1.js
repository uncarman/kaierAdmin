define(function (require) {
    var app = require('../../js/app').app;

    app.controller('stock_1_1', ['$scope', function ($scope) {

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
                kind: "100",  // 默认全部
                query: "", // 商品列表
            }
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        // 库存鸽子列表
        $scope.ajax_data = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storePigeonList,
                _param: {
                    page: $scope.datas.cur_page,
                    kind: $scope.datas.opt.kind,
                    query: $scope.datas.opt.query
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.get_datas_callback = function(data) {
            var total_page = data.data.total_page;
            $scope.$apply(function(){
                $scope.ajax_loading = false;
                $scope.datas.dataList = data.data.items;
                $scope.datas.totalDataNum = data.data.total_num;
                $scope.datas.pageList = []
                for(var i = 1; i<=total_page; i++) {
                    $scope.datas.pageList.push(i);
                }
            });
        }

        // 获取血统列表
        $scope.get_blood_list = function ($scope) {
            $scope.ajax_blood_list()
                .then($scope.get_blood_list_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_blood_list = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storeBloodList,
                _param: {}
            };
            return global.return_promise($scope, param);
        }
        $scope.get_blood_list_callback = function (data) {
            $scope.$apply(function () {
                $scope.datas.bloodList = data.data;
            })
        };
        $scope.add_blood = function () {
            var blood = prompt("请输入血统名称?");
            if(blood) {
                $scope.ajax_add_blood(blood)
                    .then($scope.add_blood_callback)
                    .then($scope.ajax_catch);
            }
        }
        $scope.ajax_add_blood = function (blood) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.storeBlood,
                _param: {
                    blood: blood,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.add_blood_callback = function () {
            $scope.get_blood_list($scope);
        }
        


        // 鸽子详细
        $scope.item_create = function ($scope) {
            $scope.datas.item_view_type = "edit";
            $scope.datas.selected_item = {
                pk: 0,
            };
            $('#itemDetail').modal('show');
        }
        $scope.ajax_item_detail = function (id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.storePigeon,
                _param: {
                    pk: id,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_view_callback = function(data) {
            $scope.$apply(function () {
                $scope.datas.item_view_type = "view";
                $scope.datas.selected_item = data.data;
                $('#itemDetail').modal('show');
            });
        }
        $scope.item_edit_callback = function(data) {
            $scope.$apply(function () {
                $scope.datas.item_view_type = "edit";
                $scope.datas.selected_item = data.data;
                $('#itemDetail').modal('show');
            });
        }
        
        $scope.ajax_item_update = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.storePigeon,
                _param: {
                    pk: $scope.datas.selected_item.pk,
                    thumbnail: $scope.datas.selected_item.thumbnail,
                    name: $scope.datas.selected_item.name,
                    feather: $scope.datas.selected_item.feather,
                    gname: $scope.datas.selected_item.gname,
                    gid: $scope.datas.selected_item.gid,
                    location_state: $scope.datas.selected_item.location_state,
                    location: $scope.datas.selected_item.location,
                    blood: $scope.datas.selected_item.blood,
                    sex: $scope.datas.selected_item.sex,
                    kind: $scope.datas.selected_item.kind,
                    star: $scope.datas.selected_item.star,
                    health: $scope.datas.selected_item.health,
                    sterile: $scope.datas.selected_item.sterile,
                    achievement: $scope.datas.selected_item.achievement,
                    father: $scope.datas.selected_item.father,
                    mother: $scope.datas.selected_item.mother,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_update_callback = function (data) {
            $('#itemDetail').modal('hide');
            $scope.reset_datas($scope);
        }


        $scope.add_files = function (tp) {
            var fileId = "poster_file";
            global.base_add_files($scope, fileId, tp);
        };
        $scope.add_file_callback = function (data) {
            $scope.$apply(function () {

                $scope.datas.selected_item.thumbnail = data.data.url;
            })
        }
        $scope.remove_thumbnail = function () {
            $scope.datas.selected_item.thumbnail = "";
        }


        ////// 执行函数
        $scope.get_datas($scope);
        $scope.get_blood_list($scope);
    }])
});
