define(function (require) {
    var app = require('../js/app').app;

    app.controller('dashboard', ['$scope', function ($scope) {

        global.on_load_func();

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
        	// pass
        });

        $scope.datas = {};

        // confirm 弹出框
        $scope.showConfirm = function () {
            MyConfirm({
                showTitleBtn: false,
                txtTitle: "文字标题",
                txtContent: "<div style='text-align: center; margin-bottom: 20px;'>文字内容是否确认收到款项 8720.0元</div>",
                _OK: function(obj){
                    alert("ok click");
                    obj.hide();
                },
                _Cancel: function(obj){
                    alert("cancel click");
                },
                isBtnOkHide: false,
                isBtnCancelHide: false,
            });
        };

        // 执行函数
		setTimeout(function(){
            //$scope.data = global.read_storage('session'); // 加载缓存数据
            //get_user_profile();
            $scope.get_datas();
        }, 0);

        $scope.get_datas = function(page) {
            if(!$scope.is_loading) {
                $scope.datas.cur_page = typeof page != "undefined" ? page : settings.page_default;
                $scope.is_loading = true;

                var param = {
                    _method: 'post',
                    _url: settings.ajax_func.getList,
                    _param: {
                        page: page,
                        per_page: settings.items_per_page
                    }
                };
                console.log(param);
                global.ajax_data($scope, param,
                    function (data) {
                        console.log(data);
                        let total_page = Math.ceil(data.total / settings.items_per_page);
                        $scope.$apply(function(){
                            $scope.is_loading = false;
                            $scope.datas.dataList = data.data;
                            $scope.datas.pageList = []
                            for(let i = 1; i<total_page; i++) {
                                $scope.datas.pageList.push(i);
                            }
                        });
                    });
            }
        }

        $scope.get_datas_prev= function () {
            let page = Math.max(1,($scope.datas.cur_page-1));
            if(page != $scope.datas.cur_page) {
                $scope.get_datas(page);
            }
        }
        $scope.get_datas_next = function () {
            let page = Math.min($scope.datas.pageList.length,($scope.datas.cur_page+1));
            if(page != $scope.datas.pageList.length) {
                $scope.get_datas(page);
            }
        }

        function get_user_profile(){
            var params = {
                _url: settings.ajax_func.user
            };

            global.ajax_data($scope, params, function (data) {
                console.log(data);
                $scope.$apply(function(){
                    $scope.user = data.data;
                });
            });
        }

        $scope.do_logout = function () {
            global.remote_do_logout(function(){
                global["goto"]('profile');
            });
        };

    }])
});
