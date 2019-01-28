define(function (require) {
    var app = require('../js/app').app;

    app.controller('loginCtrl', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);

            $scope.loginStyle = {
                "margin-top": window.screen.availHeight/2 - $(".login").height()/2 - 60 + "px",
            }
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        var CODE_LENTH = 6;
        var CODE_TIME_SPAN = 10;

        // 当前页面默认值
        let datas = {
            mobile: null,
            mobile_error_show: false,
            mobile_error: false,
            code_interval: null,
            code_time_last: CODE_TIME_SPAN,
            code_identity: "",
            code_btn_txt: "获取验证码",
            code_btn_disabled: false,
            code: null,
            code_error_show: false,
            code_error: false,
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        // 检查手机号格式
        $scope.check_mobile = function () {
            $scope.datas.mobile_error = global.check_mobile_number($scope.datas.mobile);
            $scope.datas.mobile_error_show = !$scope.datas.mobile_error;
            return $scope.datas.mobile_error;
        };

        // 检查验证码格式
        $scope.check_code = function () {
            $scope.datas.code_error = $scope.datas.code === +$scope.datas.code && ($scope.datas.code+"").length == CODE_LENTH;
            $scope.datas.code_error_show = !$scope.datas.code_error;
            return $scope.datas.code_error;
        };

        // 获取验证码
        $scope.get_code = function () {
            if(!global.check_mobile_number($scope.datas.mobile)) {
                alert("请先输入正确的手机号");
                return false;
            }

            if($scope.ajax_loading) {
                return false;
            }

            if($scope.datas.code_interval) {
                // pass
            } else {
                $scope.ajax_loading = true;
                $scope.ajax_code().then(function(data){
                    $scope.ajax_loading = false;
                    console.log(data);
                    //$scope.datas.code_identity = data.data.code_identity;
                    $scope.datas.code_interval = setInterval(function () {
                        $scope.datas.code_time_last -= 1;
                        $scope.$apply(function(){
                            if($scope.datas.code_time_last > 0) {
                                $scope.datas.code_btn_txt = $scope.datas.code_time_last + "秒";
                                $(".login .btn-default").attr("disabled", true);
                            } else {
                                clearInterval($scope.datas.code_interval);
                                $scope.datas.code_interval = null;
                                $scope.datas.code_time_last = CODE_TIME_SPAN;
                                $scope.datas.code_btn_txt = "获取验证码";
                                $(".login .btn-default").attr("disabled", false);
                            }
                        });
                    }, 1000);
                }).catch(function (data) {
                    alert("获取数据失败(ajax_code):"+data.error);
                });
            }
        };
        
        // 获取验证码
        $scope.ajax_code = function () {
            // 重置数据
            clearInterval($scope.datas.code_interval);
            $scope.datas.code_interval = null;
            $scope.datas.code_time_last = CODE_TIME_SPAN;
            $scope.datas.code_identity = "";
            // 调用请求
            var param = {
                _method: 'get',
                _url: settings.ajax_func.getLoginCode,
                _param: {
                    phone: $scope.datas.mobile,
                }
            };
            return global.return_promise($scope, param);
        }

        // 点击注册
        $scope.do_login = function () {
            if($scope.ajax_loading) {
                return false;
            }

            let cm = $scope.check_mobile();
            let cc = $scope.check_code();
            let cci = true; // $scope.datas.code_identity != "";
            if(!cm || !cc) {
                // pass
            } else if(!cci) {
                alert("请先获取短信验证码");
            } else {
                $scope.ajax_loading = true;
                $scope.ajax_login().then(function(data){
                    console.log(data);
                    $scope.ajax_loading = false;
                    let _session = global.read_storage("session");
                    let old_from = _session["from"];

                    global.set_storage_key('session', [
                        {key: 'token', val: data.code},
                        {key: 'from', val: ""}
                    ]);

                    if (old_from && old_from.indexOf("register") < 0 && old_from.indexOf("login") < 0) {
                        global["goto"](old_from);
                    } else {
                        global["goto"](settings.default_page);
                    }
                }).catch(function (data) {
                    alert("获取数据失败(ajax_login):"+data.error);
                });
            }
        };

        // 登录
        $scope.ajax_login = function () {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.login,
                _param: {
                    phone: $scope.datas.mobile,
                    code: $scope.datas.code,
                    //code_identity: $scope.datas.code_identity,
                }
            };
            return global.return_promise($scope, param);
        }

        // 重置手机号
        $scope.reset_mobile = function() {
            $scope.data.mobile = '';
            $scope.data.mobile_error = false;
            setTimeout(function(){
                $("input").focus();
            }, 500);
        };

    }])
});
