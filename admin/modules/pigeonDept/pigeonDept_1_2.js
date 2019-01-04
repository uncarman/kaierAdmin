define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_1_2', ['$scope', function ($scope) {

        global.on_load_func();

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

        // 执行函数
        (function(){

            $scope.get_datas = get_datas;

            $scope.get_datas();

        })();

        function get_datas (page) {
            if(!$scope.ajax_loading) {
                $scope.datas.cur_page = page || $scope.datas.page_default;
                $scope.ajax_loading = true;

                ajax_data().then(function(data){
                    var total_page = data.data.total_page;
                    $scope.$apply(function(){
                        $scope.ajax_loading = false;
                        $scope.datas.dataList = data.data.items;
                        $scope.datas.pageList = []
                        for(var i = 1; i<=total_page; i++) {
                            $scope.datas.pageList.push(i);
                        }
                    });
                }).catch(function (data) {
                    alert("获取数据失败(ajax_code):"+data.error);
                });

            }
        }

        function ajax_data() {
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

        $scope.reset_data = function() {
            $scope.datas.cur_page = 1;
            $scope.get_datas();
        };

        $scope.is_view = function () {
            return $scope.datas.good_detail == "view";
        }

        $scope.good_view = function(pk) {
            ajax_good_detail(pk).then(function (data) {
                console.log(data);
                $scope.$apply(function () {
                    console.log(data);
                    $scope.datas.good_detail = "view";
                    $scope.datas.selected_good = data.data;
                    $('#goodDetail').modal('show');
                });
            }).catch(function (data) {
                alert("获取数据失败(good_edit):"+data.error);
            });
        }

        $scope.good_edit = function(pk) {
            ajax_good_detail(pk).then(function (data) {
                $scope.$apply(function () {
                    $scope.datas.good_detail = "edit";
                    $scope.datas.selected_good = data.data;
                    $('#goodDetail').modal('show');
                });
            }).catch(function (data) {
                alert("获取数据失败(good_edit):"+data.error);
            });
        }

        $scope.good_update = function () {
            ajax_good_update().then(function (data) {
                $scope.reset_data();
                $('#goodDetail').modal('hide');
            }).catch(function (data) {
                alert("获取数据失败(good_edit):"+data.error);
            });
            $('#goodEdit').modal('hide');
        }

        $scope.good_remove = function(good) {
            MyConfirm({
                showTitleBtn: false,
                txtTitle: "确定删除当前商品?",
                txtContent: "<div style='text-align: center; margin-bottom: 20px;'>"+good.name+"</div>",
                _OK: function(obj){
                    ajax_remove_data(good.pk).then(function(data){
                        $scope.reset_data();
                    }).catch(function(){
                        alert("获取数据失败(good_update):"+data.error);
                    });
                    obj.hide();
                },
                _Cancel: function(obj){
                    obj.hide();
                },
                isBtnOkHide: false,
                isBtnCancelHide: false,
            });
        }

        // 获取单个商品详情
        function ajax_good_detail(id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallPigeon,
                _param: {
                    pk: id,
                }
            };
            return global.return_promise($scope, param);
        }

        // 单个商品更新
        function ajax_good_update() {
            var g = $scope.datas.selected_good;
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

        // 删除单个商品
        function ajax_remove_data(pk) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallPigeonList,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
    }]);
});
