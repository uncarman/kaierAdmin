define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_1_1', ['$scope', '$sce', function ($scope, $sce) {

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
                state: "100",  // 默认全部
                query: "", // 商品列表
            }
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        $scope.ajax_data = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallGoodsList,
                _param: {
                    page: $scope.datas.cur_page,
                    state: $scope.datas.opt.state,
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
                selltype: settings.default_datas.goodSelltypes[0],
                transtype: settings.default_datas.goodTranstypes[0],
            };
            $scope.fill_posters();
            $scope.datas.selected_item.info_h5 = $sce.trustAsHtml("");
            $('#goodDetail').modal('show');
        }

        $scope.fill_posters = function () {
            // 补充空poster
            var tmp = [];
            for(var i=0; i<6; i++){
                if($scope.datas.selected_item.posters[i] && $scope.datas.selected_item.posters[i].url != "") {
                    tmp.push($scope.datas.selected_item.posters[i]);
                } else {
                    tmp.push({
                        kind: (i==0 ? 1 : 0),
                        url: "",
                    })
                }
            }
            $scope.datas.selected_item.posters = tmp;
        }

        // 获取单个商品详情
        $scope.ajax_item_detail =function(id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mailGoods,
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
                $scope.fill_posters();
                $scope.datas.selected_item.info_h5 = $sce.trustAsHtml(Base64.decode((data.data.info ? data.data.info : "")));
                $('#goodDetail').modal('show');
            });
        }

        $scope.item_edit_callback = function(data) {
            $scope.$apply(function () {
                $scope.datas.item_view_type = "edit";
                $scope.datas.selected_item = data.data;
                $scope.fill_posters();
                $scope.datas.selected_item.info_h5 = $sce.trustAsHtml(Base64.decode((data.data.info ? data.data.info : "")));
                $('#goodDetail').modal('show');
            });
        }

        // 单个商品更新
        $scope.ajax_item_update = function() {
            var g = $scope.datas.selected_item;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.mailGoodsUpdate,
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
                _method: 'get',
                _url: settings.ajax_func.mallGoodsList,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_remove_callback = function(good) {
            $scope.reset_datas($scope);
        }

        $scope.add_files = function (tp, ind) {
            if($scope.datas.selected_item["pk"] >= 0 ) {
                var fileId = "poster_file";
                $scope.datas.upload_file_posters_index = ind;
                global.base_add_files($scope, fileId, tp);
            }
        };
        $scope.add_file_callback = function (data) {
            $scope.$apply(function () {
                try {
                    if(angular.isArray($scope.datas.selected_item[$scope.datas.upload_file_type])) {
                        $scope.datas.selected_item[$scope.datas.upload_file_type][$scope.datas.upload_file_posters_index] = {
                            kind: $scope.datas.upload_file_file_kind,
                            url: data.data.url,
                        };
                    } else {
                        $scope.datas.selected_item[$scope.datas.upload_file_type] = data.data.url;
                    }
                } catch (e) {
                    // pass
                }
                $("#poster_file").val("");
            });
        }
        $scope.remove_poster = function (ind) {
            if($scope.datas.selected_item && $scope.datas.selected_item["posters"].length > 0) {
                try {
                    $scope.datas.selected_item["posters"].splice(ind, 1);
                    if($scope.datas.selected_item["posters"].length <= 0) {
                        $scope.datas.selected_item["thumbnail"] = "";
                    }
                } catch (e) {
                    // pass
                }
            }
        }
        $scope.remove_thumbnail = function () {
            if($scope.datas.selected_item) {
                try {
                    $scope.datas.selected_item["thumbnail"] = "";
                } catch (e) {
                    // pass
                }
            }
        }


        ////// 执行函数
        $scope.get_datas($scope);

        //年月日范围
        function shortcutMonth () {
            // 当月
            var nowDay = moment().get('date');
            var prevMonthFirstDay = moment().subtract(1, 'months').set({ 'date': 1 });
            var prevMonth2FirstDay = moment().subtract(2, 'months').set({ 'date': 1 });
            var prevMonth3FirstDay = moment().subtract(3, 'months').set({ 'date': 1 });
            var prevMonthDay = moment().diff(prevMonthFirstDay, 'days');
            var prevMonth2Day = moment().diff(prevMonth2FirstDay, 'days');
            var prevMonth3Day = moment().diff(prevMonth3FirstDay, 'days');
            return {
                now: '-' + (nowDay-1) + ',0',
                prev: '-' + prevMonthDay + ',-' + nowDay,
                prev2: '-' + prevMonth2Day + ',-' + (prevMonthDay+1),
                prev3: '-' + prevMonth3Day + ',-' + (prevMonth2Day+1)
            }
        }

        $(function(){
            $('.J-datepicker-day').datePicker({
                format:'YYYY-MM-DD',
            });
        });

    }])
});
