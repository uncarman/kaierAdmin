define(function (require) {
    var app = require('../../js/app').app;

    app.controller('pigeonDept_1_1', ['$scope', '$sce', function ($scope, $sce) {

        global.on_load_func();

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
                _url: settings.ajax_func.mallGoodsList,
                _param: {
                    page: $scope.datas.cur_page,
                    state: $scope.datas.opt.state,
                    query: $scope.datas.opt.query
                }
            };
            return global.return_promise($scope, param);
        }

        $scope.reset_data = function(tp) {
            $scope.datas.opt.state = typeof tp != "undefined" ? tp : $scope.datas.opt.state;
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
                    $scope.datas.selected_good.info_h5 = $sce.trustAsHtml(Base64.decode((data.data.info ? data.data.info : "")));
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
                    $scope.datas.selected_good.info_h5 = $sce.trustAsHtml(Base64.decode((data.data.info ? data.data.info : "")));
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

        $scope.add_posters = function () {

            if($scope.datas.selected_good["pk"] != "") {
                $("#poster_file").click();
                $("#poster_file").off("change").on("change", function () {
                    var fileObj = document.getElementById("poster_file").files[0]; // js 获取文件对象
                    console.log(fileObj);
                    if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
                        return;
                    }
                    var formFile = new FormData();
                    formFile.append("file", fileObj); //加入文件对象

                    var file_kind = 0;
                    if((fileObj.type).indexOf("image/")>=0){
                        file_kind = 0;
                    } else if((fileObj.type).indexOf("video/")>=0) {
                        file_kind = 1;
                    } else {
                        alert("只能上传图片或视频");
                    }

                    ajax_base_upload(formFile).then(function(data){
                        $scope.$apply(function () {
                            $scope.datas.selected_good["posters"].push({
                                kind: file_kind,
                                url: data.data.url,
                            });
                        });
                    }).catch(function(data){
                        alert("获取数据失败(add_posters):"+data.error);
                    });

                    // $.ajax({
                    //     url: "/Admin/Ajax/VMKHandler.ashx",
                    //     data: data,
                    //     type: "Post",
                    //     dataType: "json",
                    //     cache: false,//上传文件无需缓存
                    //     processData: false,//用于对data参数进行序列化处理 这里必须false
                    //     contentType: false, //必须
                    //     success: function (result) {
                    //         alert("上传完成!");
                    //     },
                    // })
                });
            }
        };

        // 获取单个商品详情
        function ajax_good_detail(id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mailGoods,
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

        // 删除单个商品
        function ajax_remove_data(pk) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.mallGoodsList,
                _param: {
                    pk: pk,
                }
            };
            return global.return_promise($scope, param);
        }
        
        // 上传文件
        function ajax_base_upload(formFile) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.baseUpload,
                _is_form_file: true,
                _param: formFile
            };
            return global.return_promise($scope, param);
        }
    }])
});
